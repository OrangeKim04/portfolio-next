import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

// Uses the same source as /projects so re-enabling this section cannot expose demo data.
export default function ProjectsSection() {
  return (
    <section id="projects" className="container max-w-300 py-24">
      <span className="section-label">{"// selected_work"}</span>
      <h2 className="text-3xl font-bold mt-3 mb-8">프로젝트</h2>
      <div className="grid gap-5 md:grid-cols-3">
        {projects.filter(project => project.featured).map(project => (
          <Link key={project.id} href={`/project/${project.id}`} className="border border-tangerine/25 rounded-xl p-6 no-underline text-inherit">
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p className="text-sm mt-3 leading-7 opacity-70">{project.subtitle}</p>
          </Link>
        ))}
      </div>
      <Link href="/projects" className="inline-flex items-center gap-2 text-tangerine mt-8">전체 프로젝트 <ArrowRight size={16} /></Link>
    </section>
  );
}
