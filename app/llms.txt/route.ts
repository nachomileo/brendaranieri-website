const content = `# Brenda Ranieri

Brenda Ranieri is a visual artist and ceramicist based in Madrid. Her practice explores matter, territory, water, collective processes and transformation.

## Main sections
- /projects — exhibitions, installations, collaborations and research
- /selected-artworks — selected individual works and their related projects
- /situated-processes — fieldwork, wild clays and studio research
- /shared-practices — workshops, encounters and co-creation
- /about — biography and artist statement
`;

export function GET() {
  return new Response(content, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
