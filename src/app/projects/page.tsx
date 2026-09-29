import type { Metadata } from "next";
import ProjectsCatalog from "@/components/projects/ProjectsCatalog";

export const metadata: Metadata = {
  title: "Projects | dev.gyuri",
  description: "LLM Agent, PlanUp, 기업용 PMS, 리틀펫부터 개인 학습까지. 프로젝트별 역할, 팀 구성, 기술 스택과 문제 해결 경험을 소개합니다.",
};

export default function ProjectsPage() {
  return <ProjectsCatalog />;
}
