import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categoryLabels, type Project } from "@/data/projects";
import ProjectVisual from "./ProjectVisual";
import styles from "./projects.module.css";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={styles.card}>
      <Link href={`/project/${project.id}`} className={styles.cardLink}>
        <ProjectVisual project={project} />
        <div className={styles.cardBody}>
          <div className={styles.meta}>
            <span>{categoryLabels[project.category]}</span>
            <time className={styles.year} dateTime={project.startDate}>{project.startDate.slice(0, 7).replace("-", ".")}</time>
          </div>
          <h3>{project.title}<ArrowRight size={19} /></h3>
          <p className={styles.subtitle}>{project.subtitle}</p>
          <p className={styles.role}>{project.role}</p>
          <div className={styles.tags}>{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          <div className={styles.cardFooter}><span>{project.highlight}</span><span aria-hidden="true">↗</span></div>
        </div>
      </Link>
    </article>
  );
}
