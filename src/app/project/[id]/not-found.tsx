import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-5 px-6 text-center">
      <span className="section-label">{"// 404"}</span>
      <h1 className="text-3xl font-bold">프로젝트를 찾을 수 없습니다.</h1>
      <p>주소를 확인하거나 프로젝트 목록에서 다시 선택해 주세요.</p>
      <Link href="/projects" className="btn-outline-tangerine">프로젝트 목록으로</Link>
    </main>
  );
}
