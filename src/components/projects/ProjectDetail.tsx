import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ArrowRight, Code2, Check } from "lucide-react";
import { categoryLabels, projects, type Project } from "@/data/projects";
import ProjectVisual from "./ProjectVisual";
import styles from "./projects.module.css";

export default function ProjectDetail({ project }: { project: Project }) {
  const next = projects[(projects.findIndex(p => p.id === project.id) + 1) % projects.length];
  return (
    <main className={styles.shell}>
      <div className={styles.detailContainer}>
        <Link href="/projects" className={styles.back}><ArrowLeft size={15} /> 모든 프로젝트</Link>
        <header className={styles.detailHeader}>
          <span className="section-label">{"// "}{categoryLabels[project.category].toLowerCase()} · {project.id}</span>
          <h1>{project.title}</h1>
          <p className={styles.detailSubtitle}>{project.subtitle}</p>
        </header>
        <div className={styles.detailGrid}>
          <div className={styles.detailContent}>
            <div className={styles.detailVisual}><ProjectVisual project={project} /></div>
            <section className={styles.section}>
              <h2><span>01</span> 프로젝트 소개</h2>
              <p className={styles.description}>{project.description}</p>
              <div className={styles.highlight}><Check size={17} /><span>{project.highlight}</span></div>
            </section>
            <section className={styles.section}>
              <h2><span>02</span> 주요 기능</h2>
              <div className={styles.featureGrid}>
                {project.features.map(feature => <article key={feature.title} className={styles.feature}><h3>{feature.title}</h3><p>{feature.description}</p></article>)}
              </div>
              {project.dataSources && <div className={styles.dataSources}>
                <h3>사용한 API와 데이터</h3>
                {project.id === "playground" && <p>시설·안전 정보는 필요한 지역 데이터를 JSON으로 정리해 사용했습니다. 날씨와 대기질은 앱에서 API로 조회합니다.</p>}
                <dl>{project.dataSources.map(source => <div key={source.name}><dt>{source.name}</dt><dd>{source.usage}</dd></div>)}</dl>
              </div>}
            </section>
            <section className={styles.section}>
              <h2><span>03</span> 내가 맡은 일</h2>
              <div className={styles.contributions}>
                {project.contributions.map((item, index) => (
                  <div key={item.title} className={styles.contribution}>
                    <span className={styles.contributionNumber}>0{index + 1}</span>
                    <div><h3>{item.title}</h3><p>{item.description}</p></div>
                  </div>
                ))}
              </div>
            </section>
            <section className={styles.section}>
              <h2><span>04</span> 기술 스택</h2>
              <dl className={styles.stackGroups}>
                {project.stack.map(group => <div key={group.label}><dt>{group.label}</dt><dd className={styles.tags}>{group.items.map(item => <span key={item}>{item}</span>)}</dd></div>)}
              </dl>
            </section>
            {project.troubleshooting.length > 0 && <section className={styles.section}>
              <h2><span>05</span> 문제 해결 과정</h2>
              <div className={styles.troubleshooting}>
                {project.troubleshooting.map(item => (
                  <article key={item.title} className={styles.caseStudy}>
                    <h3>{item.title}</h3>
                    <dl>
                      <div><dt>문제</dt><dd>{item.problem}</dd></div>
                      <div><dt>접근·해결</dt><dd>{item.approach}</dd></div>
                      <div><dt>결과</dt><dd>{item.result}</dd></div>
                    </dl>
                    {item.reference && <a className={styles.reference} href={item.reference.url} target="_blank" rel="noopener noreferrer">{item.reference.label}<ArrowUpRight size={14} /><span className="sr-only"> (새 탭)</span></a>}
                  </article>
                ))}
              </div>
            </section>}
            {project.lessons && <section className={styles.section}><h2><span>{project.troubleshooting.length ? "06" : "05"}</span> 배운 점</h2><p className={styles.description}>{project.lessons}</p></section>}
          </div>
          <aside className={styles.sidebar} aria-label="프로젝트 정보">
            <span className="section-label">PROJECT INFO</span>
            <dl>
              <div><dt>기간</dt><dd>{project.period}</dd></div>
              {project.activity && <div><dt>활동·기관</dt><dd>{project.activity}</dd></div>}
              <div><dt>담당 역할</dt><dd>{project.role}</dd></div>
              {project.team && <div><dt>팀 구성</dt><dd>{project.team}</dd></div>}
              <div><dt>기술 스택</dt><dd><div className={styles.tags}>{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></dd></div>
            </dl>
            {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.primaryLink}><Code2 size={17} /> {project.id === "financial-agent" ? "팀 GitHub" : "GitHub 저장소"}<ArrowUpRight size={15} /><span className="sr-only"> (새 탭)</span></a>}
            {project.demo && <a href={project.demo.url} target="_blank" rel="noopener noreferrer" className={styles.secondaryLink}>{project.demo.label}<ArrowUpRight size={15} /><span className="sr-only"> (새 탭)</span></a>}
          </aside>
        </div>
        <Link href={`/project/${next.id}`} className={styles.nextProject}>
          <div><span className="section-label">NEXT PROJECT</span><h2>{next.title}</h2><p>{next.subtitle}</p></div><ArrowRight size={26} />
        </Link>
      </div>
    </main>
  );
}
