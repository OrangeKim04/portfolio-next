import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import styles from "@/components/projects/projects.module.css";

export default function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className={`${styles.shell} ${styles.preview}`}>
      <div className={styles.container}>
        <header className={styles.previewHeader}>
          <div>
            <span className="section-label">{"// 03. projects"}</span>
            <h2 id="projects-heading">최근 프로젝트</h2>
            <p>직접 만들고 해결한 경험들, 최근 시작한 프로젝트부터.</p>
          </div>
          <Link href="/projects" className={styles.viewAll}>프로젝트 전체 보기 <span>{projects.length}</span><ArrowRight size={15} /></Link>
        </header>
        <div className={styles.grid}>
          {projects.slice(0, 3).map(project => <ProjectCard key={project.id} project={project} />)}
        </div>
      </div>
    </section>
  );
}
