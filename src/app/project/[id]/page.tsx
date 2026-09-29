import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import ProjectDetail from "@/components/projects/ProjectDetail";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return projects.map(project => ({ id: project.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).id);
  return project
    ? { title: `${project.title} | dev.gyuri`, description: project.description }
    : { title: "프로젝트를 찾을 수 없습니다 | dev.gyuri" };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).id);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
