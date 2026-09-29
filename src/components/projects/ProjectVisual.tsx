import Image from "next/image";
import { Database, MapPinned, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import styles from "./projects.module.css";

export default function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className={styles.visual} style={{ "--project-accent": project.color } as React.CSSProperties}>
      <div className={styles.visualGrid} />
      {project.image ? (
        <Image src={project.image} alt={project.imageAlt ?? project.title} fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
          className={project.id === "planup" ? styles.bannerImage : styles.logoImage} />
      ) : (
        <div className={styles.wordmark}>
          {project.id === "pms" ? <Database size={34} strokeWidth={1.3} /> : <MapPinned size={34} strokeWidth={1.3} />}
          <span>{project.id === "pms" ? "PMS" : "서행"}</span>
          <small>{project.id === "pms" ? "PROJECT × PEOPLE" : "SLOW JOURNEY, SEOUL"}</small>
        </div>
      )}
      <span className={styles.visualCorner} aria-hidden="true"><ArrowUpRight size={17} /></span>
    </div>
  );
}
