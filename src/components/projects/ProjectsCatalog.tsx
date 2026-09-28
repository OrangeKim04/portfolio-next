"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Code2 } from "lucide-react";
import { projects, categoryLabels, type ProjectCategory } from "@/data/projects";
import ProjectVisual from "./ProjectVisual";
import styles from "./projects.module.css";

export default function ProjectsCatalog() {
  const [category, setCategory] = useState<ProjectCategory | "all">("all");
  const visible = projects.filter(project => category === "all" || project.category === category);
  const filters = [{ id: "all", label: "전체" }, ...Object.entries(categoryLabels).map(([id, label]) => ({ id, label }))];

  return (
    <main className={styles.shell}>
      <div className={styles.container}>
        <Link href="/" className={styles.back}><ArrowLeft size={15} /> 홈으로</Link>
        <header className={styles.header}>
          <span className="section-label">{"// selected_work"}</span>
          <div className={styles.headingRow}>
            <h1>만들고, 연결하고,<br /><span>해결한 것들.</span></h1>
            <div className={styles.intro}>
              <p>아이디어를 서비스로 옮기며 쌓은 경험들.<br />직접 고민하고 구현한 여섯 개의 프로젝트를 소개합니다.</p>
              <span className={styles.total}><Code2 size={15} /> 06 PROJECTS · 2024 — 2025</span>
            </div>
          </div>
        </header>
        <div className={styles.toolbar}>
          <div className={styles.filters} role="group" aria-label="프로젝트 분야 필터">
            {filters.map(filter => (
              <button key={filter.id} type="button" aria-pressed={category === filter.id}
                onClick={() => setCategory(filter.id as ProjectCategory | "all")}
                className={category === filter.id ? styles.filterActive : styles.filter}>
                {filter.label}<span>{filter.id === "all" ? projects.length : projects.filter(p => p.category === filter.id).length}</span>
              </button>
            ))}
          </div>
          <span className={styles.resultCount} role="status">{visible.length}개의 프로젝트</span>
        </div>
        <div className={styles.grid}>
          {visible.map(project => (
            <article key={project.id} className={styles.card}>
              <Link href={`/project/${project.id}`} className={styles.cardLink}>
                <ProjectVisual project={project} />
                <div className={styles.cardBody}>
                  <div className={styles.meta}>
                    <span>{categoryLabels[project.category]}</span>
                    {project.featured && <span className={styles.featured}>SELECTED</span>}
                    <span className={styles.year}>{project.period.slice(0, 4)}</span>
                  </div>
                  <h2>{project.title}<ArrowRight size={19} /></h2>
                  <p className={styles.subtitle}>{project.subtitle}</p>
                  <p className={styles.role}>{project.role}</p>
                  <div className={styles.tags}>{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                  <div className={styles.cardFooter}><span>{project.highlight}</span><span aria-hidden="true">↗</span></div>
                </div>
              </Link>
            </article>
          ))}
        </div>
        <footer className={styles.footer}><span>작은 시도들이 모여, 다음 프로젝트로.</span><Link href="/blogs">개발 기록 보기 <ArrowRight size={14} /></Link></footer>
      </div>
    </main>
  );
}
