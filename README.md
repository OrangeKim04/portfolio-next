# 포트폴리오

학습하고 경험한 내용을 기록하는 포트폴리오 & 기술 블로그입니다.

🔗 **배포 주소:** https://portfolio-next-flame-seven.vercel.app

---

## 주요 기능

- **포트폴리오** — 프로젝트 소개, 기술 스택, 경력 정보
- **기술 블로그** — Notion을 CMS로 사용한 블로그 (카테고리 필터, 무한 스크롤, 전체 검색)
- **다크 / 라이트 모드** — 블로그 섹션 진입 시 전환 가능
- **조회수 & 좋아요** — 게시글별 인터랙션 저장
- **반응형 디자인** — 모바일 / 태블릿 / 데스크탑 지원

---

## 기술 스택 및 선택 이유

### Frontend

| 기술 | 용도 |
|---|---|
| **Next.js 16** (App Router) | 페이지 라우팅 및 서버사이드 렌더링. tRPC API 라우트 호스팅 |
| **TypeScript** | 클라이언트-서버 간 타입 공유, 런타임 오류 사전 방지 |
| **Tailwind CSS v4** | 유틸리티 클래스 기반 스타일링. 인라인 스타일 대비 유지보수성 개선 |
| **Framer Motion** | 스크롤 진입 시 페이드인 애니메이션 등 인터랙션 구현 |
| **Three.js** | 히어로 섹션 3D 배경 렌더링 |
| **TanStack React Query v5** | 클라이언트에서 서버 상태 관리 및 60초 캐싱으로 불필요한 API 재요청 방지 |

### Backend / API

| 기술 | 용도 |
|---|---|
| **tRPC v11** | REST 없이 TypeScript 타입 그대로 클라이언트-서버 통신. 별도 API 스펙 작성 불필요 |
| **Notion API v5** | 블로그 CMS로 활용. 노션에 글을 작성하면 자동으로 블로그에 반영됨 |
| **notion-to-md** | Notion 블록 구조를 Markdown으로 변환하여 본문 렌더링 |
| **SuperJSON** | tRPC 통신 시 `Date` 등 JSON 직렬화 불가 타입을 안전하게 처리 |
| **Next.js `unstable_cache`** | Notion API 응답을 서버에서 60초간 캐싱하여 응답 속도 개선 |

### Database

| 기술 | 용도 |
|---|---|
| **SQLite** (`@libsql/client`) | 블로그 게시글별 **조회수 · 좋아요 수** 저장. Notion에 저장하기 어려운 실시간 인터랙션 데이터를 별도 관리 |
| **Drizzle ORM** | SQLite 스키마 정의 및 타입 안전한 쿼리 작성 |

### 인프라

| 기술 | 용도 |
|---|---|
| **Vercel** | Next.js 배포 플랫폼. 서버리스 함수로 tRPC API 라우트 실행 |
| **GitHub Actions** | `dev` 브랜치 push → Preview 자동 배포, `main` 브랜치 push → Production 자동 배포 |
| **Google Analytics 4** | 페이지별 방문자 수, 유입 경로 분석 |

---

## 아키텍처

```
브라우저
  └── React Query (클라이언트 캐싱 60s)
        └── tRPC Client (SuperJSON 직렬화)
              └── Next.js API Route (/api/trpc)
                    ├── Notion API ─── unstable_cache (서버 캐싱 60s)
                    └── SQLite DB  ─── 조회수 · 좋아요 읽기/쓰기
```

---

## 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx                  # 홈 (포트폴리오)
│   ├── blogs/page.tsx            # 블로그 목록 (무한 스크롤)
│   ├── blog/[id]/page.tsx        # 블로그 상세 (TOC, 좋아요, 공유)
│   ├── projects/page.tsx         # 프로젝트 목록
│   └── api/trpc/[trpc]/route.ts  # tRPC API 엔드포인트
├── components/
│   ├── Navbar.tsx                # 네비게이션 (다크/라이트 토글 포함)
│   ├── TerminalLoader.tsx        # 터미널 스타일 로딩 UI
│   └── sections/                 # 홈 섹션 컴포넌트
├── server/
│   ├── notion.ts                 # Notion API 호출 (게시글 조회, 카테고리 등)
│   ├── db.ts                     # SQLite 연결 및 조회수·좋아요 CRUD
│   ├── trpc.ts                   # tRPC 서버 초기화
│   └── routers/blog.ts           # 블로그 관련 tRPC 프로시저
├── contexts/
│   └── ThemeContext.tsx          # 다크/라이트 모드 상태 관리
drizzle/
└── schema.ts                     # DB 스키마 (blog_interactions 테이블)
```

---

## 로컬 실행

```bash
npm install
npx drizzle-kit push
npm run dev
```

---

## CI/CD

| 브랜치 | 동작 |
|---|---|
| `dev` push | GitHub Actions → Vercel **Preview** 자동 배포 |
| `main` push | GitHub Actions → Vercel **Production** 자동 배포 |
