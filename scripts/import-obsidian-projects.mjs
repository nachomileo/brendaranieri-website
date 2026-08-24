import { promises as fs } from "node:fs";
import path from "node:path";

const sourceRoot = process.argv[2];
if (!sourceRoot) throw new Error("Pass the Obsidian 'Textos proyectos' directory as the first argument.");

const repoRoot = process.cwd();
const contentRoot = path.join(repoRoot, "content", "projects");
const imageRoot = path.join(repoRoot, "public", "images", "projects");

const slugify = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const clean = (value = "") => value.trim().replace(/^\*|\*$/g, "");

async function markdownFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return markdownFiles(target);
    return entry.isFile() && entry.name.endsWith(".md") ? [target] : [];
  }));
  return nested.flat();
}

function field(markdown, label) {
  return clean(markdown.match(new RegExp(`^- ${label}:\\s*(.*)$`, "mi"))?.[1]);
}

function section(markdown, heading, nextHeading) {
  const start = markdown.indexOf(`### ${heading}`);
  if (start < 0) return "";
  const bodyStart = markdown.indexOf("\n", start) + 1;
  const end = nextHeading ? markdown.indexOf(`### ${nextHeading}`, bodyStart) : markdown.indexOf("\n## ", bodyStart);
  return clean(markdown.slice(bodyStart, end < 0 ? markdown.length : end).trim());
}

const files = await markdownFiles(sourceRoot);
const projects = [];
const usedSlugs = new Set();

for (const source of files) {
  const markdown = await fs.readFile(source, "utf8");
  const titleEs = field(markdown, "Título en español") || path.basename(source, ".md");
  const titleEn = field(markdown, "Título en inglés") || titleEs;
  const titleSlug = slugify(titleEs);
  const slug = usedSlugs.has(titleSlug) ? slugify(path.basename(source, ".md")) : titleSlug;
  usedSlugs.add(slug);
  const period = field(markdown, "Año o período");
  const years = [...period.matchAll(/(?:19|20)\d{2}/g)].map((match) => Number(match[0]));
  const imageRows = [...markdown.matchAll(/^\|\s*(\d+\.\d+)\s*\|/gm)].map((match) => match[1]);
  const category = path.basename(path.dirname(source));
  const project = {
    slug,
    category,
    titleEs,
    titleEn,
    period,
    year: years.length ? Math.max(...years) : 0,
    status: field(markdown, "Estado"),
    type: field(markdown, "Tipo"),
    place: field(markdown, "Lugar o territorio"),
    exhibition: field(markdown, "Exposición"),
    institution: field(markdown, "Institución o galería"),
    curator: field(markdown, "Comisariado"),
    collaborators: field(markdown, "Colaboradores"),
    introEs: section(markdown, "Frase introductoria — ES", "Introductory sentence — EN"),
    introEn: section(markdown, "Introductory sentence — EN", "Texto completo — ES"),
    bodyEs: section(markdown, "Texto completo — ES", "Full text — EN"),
    bodyEn: section(markdown, "Full text — EN"),
    materials: field(markdown, "Materiales"),
    techniques: field(markdown, "Técnicas"),
    dimensions: field(markdown, "Dimensiones"),
    imageCount: Math.min(Math.max(imageRows.length, 3), 5),
  };
  projects.push(project);

  const projectContentDirectory = path.join(contentRoot, slug);
  await fs.mkdir(projectContentDirectory, { recursive: true });
  await fs.copyFile(source, path.join(projectContentDirectory, "project.md"));
  await fs.mkdir(path.join(imageRoot, slug), { recursive: true });
  await fs.writeFile(path.join(imageRoot, slug, ".gitkeep"), "");
}

projects.sort((a, b) => b.year - a.year || a.titleEs.localeCompare(b.titleEs, "es"));
projects.forEach((project, index) => { project.number = index + 1; });

const output = `// Generated from the Obsidian project archive. Do not edit manually.\nexport const projects = ${JSON.stringify(projects, null, 2)} as const;\n\nexport type Project = (typeof projects)[number];\n\nexport function getProject(slug: string) {\n  return projects.find((project) => project.slug === slug);\n}\n`;
await fs.writeFile(path.join(repoRoot, "lib", "projects.generated.ts"), output);

console.log(`Imported ${projects.length} projects from ${sourceRoot}`);
