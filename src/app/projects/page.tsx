import type { Metadata } from "next";
import ProjectsCatalog from "@/components/projects/ProjectsCatalog";

export const metadata: Metadata = {
  title: "Projects | dev.gyuri",
  description: "PlanUp, 기업용 PMS, 놀이터백과, Okii, 서행, ZeroPick — 직접 고민하고 구현한 프로젝트를 소개합니다.",
};

export default function ProjectsPage() {
  return <ProjectsCatalog />;
}
