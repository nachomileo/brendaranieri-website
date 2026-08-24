import type { Metadata } from "next";
import ProjectsArchive from "./projects-archive";

export const metadata: Metadata = {
  title: "Exhibitions & Projects — Brenda Ranieri",
  description: "Exhibitions, installations, collaborations and situated material research by visual artist Brenda Ranieri.",
};

export default function ProjectsPage() {
  return <ProjectsArchive />;
}
