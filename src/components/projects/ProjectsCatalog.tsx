"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Code2 } from "lucide-react";
import { projects, categoryLabels, type ProjectCategory } from "@/data/projects";
import ProjectCard from "./ProjectCard";
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
              <p>아이디어를 서비스로 옮기며 쌓은 경험들.<br />서비스 개발부터 개인 학습까지, 직접 만든 프로젝트를 소개합니다.</p>
              <span className={styles.total}><Code2 size={15} /> {String(projects.length).padStart(2, "0")} PROJECTS · {projects.at(-1)?.startDate.slice(0, 4)} — {projects[0].startDate.slice(0, 4)}</span>
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
          <span className={styles.resultCount} role="status">{visible.length}개의 프로젝트 · 시작일 최신순</span>
        </div>
        <div className={styles.grid}>
          <h2 className="sr-only">프로젝트 목록</h2>
          {visible.map(project => <ProjectCard key={project.id} project={project} />)}
        </div>
        <footer className={styles.footer}><span>작은 시도들이 모여, 다음 프로젝트로.</span><Link href="/blogs">개발 기록 보기 <ArrowRight size={14} /></Link></footer>
      </div>
    </main>
  );
}
