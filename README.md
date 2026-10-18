# 포트폴리오

학습하고 경험한 내용을 기록하는 포트폴리오 & 기술 블로그입니다.

🔗 **배포 주소:** [dev.gyuri](https://portfolio-next-flame-seven.vercel.app)

---

## 주요 기능

- **포트폴리오** — 홈의 최근 프로젝트 미리보기, 분야별 프로젝트 필터와 시작일 최신순 목록
- **프로젝트 상세** — 주요 기능, 담당 역할, 기술 스택, 문제 해결 과정과 사용한 API·데이터 소개
- **기술 블로그** — Notion을 CMS로 사용한 블로그 (카테고리 필터, 무한 스크롤, 전체 검색)
- **다크 / 라이트 모드** — 첫 화면을 제외한 홈 섹션과 프로젝트·블로그 페이지에서 전환 가능
- **조회수 & 좋아요** — 게시글별 인터랙션 저장
- **댓글 & 반응** — Giscus를 통한 GitHub Discussions 연동
- **반응형 디자인** — 모바일 / 태블릿 / 데스크탑 지원

---

## 기술 스택 및 선택 이유

### Frontend

| 기술 | 용도 |
|---|---|
| **Next.js 16** (App Router) | 페이지 라우팅 및 서버사이드 렌더링. tRPC API 라우트 호스팅 |
| **TypeScript** | 클라이언트-서버 간 타입 공유, 런타임 오류 사전 방지 |
| **Tailwind CSS v4 / CSS Modules** | 유틸리티 클래스와 프로젝트 페이지 전용 스타일 구성 |
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
| **Next.js `unstable_cache`** | 게시글 목록·개수·상세는 60초, 카테고리는 300초 주기로 서버 캐시 재검증 |

### Database

| 기술 | 용도 |
|---|---|
| **SQLite / Turso** (`@libsql/client`) | 블로그 게시글별 **조회수 · 좋아요 수** 저장. 로컬 SQLite 파일 또는 원격 libSQL DB 연결 |
| **Drizzle ORM** | SQLite 스키마 정의 및 타입 안전한 쿼리 작성 |

### 인프라

| 기술 | 용도 |
|---|---|
| **Vercel** | Next.js 배포 플랫폼. 서버리스 함수로 tRPC API 라우트 실행 |
| **GitHub Actions** | `dev` 브랜치 push → Preview 자동 배포, `main` 브랜치 push → Production 자동 배포 |
| **Google Analytics 4** | 페이지별 방문자 수, 유입 경로 분석 |
| **Giscus** | GitHub Discussions 기반 블로그 댓글과 반응 |

---

## 아키텍처

```
브라우저
  └── React Query (클라이언트 캐싱 60s)
        └── tRPC Client (SuperJSON 직렬화)
              └── Next.js API Route (/api/trpc)
                    ├── Notion API ─── unstable_cache (게시글 60s / 카테고리 300s)
                    └── SQLite / Turso ─── 조회수 · 좋아요 읽기/쓰기

프로젝트 페이지 ─── src/data/projects.ts (정적 콘텐츠)
블로그 댓글 ─── Giscus ─── GitHub Discussions
```

---

## 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx                  # 홈 (소개, 최근 프로젝트, 최근 글)
│   ├── blogs/page.tsx            # 블로그 목록 (무한 스크롤)
│   ├── blog/[id]/page.tsx        # 블로그 상세 (TOC, 좋아요, 공유, 댓글)
│   ├── projects/page.tsx         # 프로젝트 목록 및 분야 필터
│   ├── project/[id]/page.tsx     # 프로젝트 상세 및 메타데이터
│   └── api/trpc/[trpc]/route.ts  # tRPC API 엔드포인트
├── components/
│   ├── Navbar.tsx                # 네비게이션 (다크/라이트 토글 포함)
│   ├── TerminalLoader.tsx        # 터미널 스타일 로딩 UI
│   ├── GiscusComments.tsx        # GitHub Discussions 댓글 연동
│   ├── projects/                # 프로젝트 카드, 상세, 비주얼 및 스타일
│   └── sections/                 # 홈 섹션 컴포넌트
├── data/
│   └── projects.ts               # 프로젝트 콘텐츠 및 타입 정의
├── server/
│   ├── notion.ts                 # Notion API 호출 (게시글 조회, 카테고리 등)
│   ├── db.ts                     # SQLite 연결 및 조회수·좋아요 CRUD
│   ├── trpc.ts                   # tRPC 서버 초기화
│   └── routers/blog.ts           # 블로그 관련 tRPC 프로시저
└── contexts/
    ├── ThemeContext.tsx          # 다크/라이트 모드 상태 관리
    └── LoadingContext.tsx        # 페이지 로딩 상태 관리
drizzle/
└── schema.ts                     # DB 스키마 (blog_interactions 테이블)
public/projects/                  # 프로젝트 이미지와 에셋 출처
```

---

## 로컬 실행

CI와 동일하게 Node.js 22를 사용합니다. 저장소 루트에 `.env` 파일을 생성합니다.

```dotenv
NOTION_TOKEN=your_notion_integration_token
NOTION_DATABASE_ID=your_notion_database_id
DATABASE_URL=file:./data/portfolio.db
# 선택: Google Analytics 측정 ID
NEXT_PUBLIC_GA_ID=
```

블로그를 사용하려면 Notion 통합에 해당 데이터베이스 접근 권한을 연결해야 합니다. `NOTION_DATABASE_ID`에는 데이터베이스 ID를 넣으며, 데이터 소스 ID는 코드에서 조회합니다.

Notion 속성은 `Name` 또는 `Title`(제목), `Slug`(텍스트), `Category`(선택), `Tags`(다중 선택), `Excerpt`(텍스트) 등을 인식합니다. `Status`(상태·선택)의 값이 `Published`이거나 `Published` 체크박스가 선택된 글을 공개합니다. 공개 여부 속성이 없으면 별도의 공개 필터를 적용하지 않습니다.

다음 명령으로 의존성과 로컬 DB 테이블을 준비한 뒤 개발 서버를 실행합니다. DB 초기화 명령은 `.env`를 명시적으로 읽습니다.

```bash
npm ci
node -e "require('node:fs').mkdirSync('data', { recursive: true })"
node --env-file=.env node_modules/drizzle-kit/bin.cjs push
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인합니다. 프로젝트 목록·상세 콘텐츠는 Notion이 아닌 `src/data/projects.ts`에서 관리합니다.

원격 DB 연결 시 앱은 `DATABASE_URL`과 `TURSO_AUTH_TOKEN`을 사용합니다. 위 테이블 초기화 명령은 로컬 SQLite용입니다. Giscus 설정은 `src/components/GiscusComments.tsx`에 있으며, 다른 저장소에서 운영할 때 저장소와 Discussions 카테고리 ID를 변경합니다.

프로덕션 빌드와 실행:

```bash
npm run build
npm run start
```

---

## CI/CD

| 브랜치 | 동작 |
|---|---|
| `dev` push | GitHub Actions → Vercel **Preview** 자동 배포 |
| `main` push | GitHub Actions → Vercel **Production** 자동 배포 |

두 워크플로 모두 의존성 설치와 프로덕션 빌드 검사를 통과한 뒤 Vercel에 배포합니다. `main`에 커밋이 올라가도 배포가 완료될 때까지 운영 사이트에는 이전 버전이 표시됩니다. GitHub Actions의 **Deploy to Production** 성공 여부와 실제 배포 주소를 함께 확인합니다.

GitHub Actions에는 `NOTION_TOKEN`, `NOTION_DATABASE_ID`, `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` 시크릿을 설정합니다. `NEXT_PUBLIC_GA_ID`는 선택 사항입니다. 워크플로의 빌드 검사에서는 로컬 SQLite 경로를 사용하며, 실제 운영용 Notion·DB·Analytics 환경변수는 Vercel 프로젝트에도 설정합니다.
