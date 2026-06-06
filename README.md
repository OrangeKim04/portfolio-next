# 김규리 | 백엔드 개발자 포트폴리오

포트폴리오 & 기술 블로그입니다.

🔗 **배포 주소:** https://portfolio-next-flame-seven.vercel.app

---

## 주요 기능

- **포트폴리오** — 프로젝트 소개, 기술 스택, 경력 정보
- **기술 블로그** — Notion을 CMS로 사용한 블로그 (카테고리 필터, 무한 스크롤, 검색)
- **다크 / 라이트 모드** — 블로그 섹션 진입 시 토글 가능
- **조회수 & 좋아요** — 게시글별 인터랙션 저장
- **Google Analytics** — 방문자 통계 연동
- **반응형 디자인** — 모바일 / 태블릿 / 데스크탑 지원

---

## 기술 스택

### Frontend
| 분류 | 기술 |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| 3D | Three.js |
| UI | Lucide React, Sonner (toast) |

### Backend / API
| 분류 | 기술 |
|---|---|
| API | tRPC v11 |
| Data Fetching | TanStack React Query v5 |
| Serialization | SuperJSON |
| CMS | Notion API v5 (`@notionhq/client`) |
| Markdown | notion-to-md |

### Database
| 분류 | 기술 |
|---|---|
| DB | SQLite (libsql / `@libsql/client`) |
| ORM | Drizzle ORM |

### 인프라
| 분류 | 기술 |
|---|---|
| 배포 | Vercel |
| 분석 | Google Analytics 4 |
| 캐싱 | Next.js `unstable_cache` (Notion 응답 60초 캐싱) |

---

## 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx              # 홈 (포트폴리오)
│   ├── blogs/page.tsx        # 블로그 목록
│   ├── blog/[id]/page.tsx    # 블로그 상세
│   ├── projects/page.tsx     # 프로젝트 목록
│   └── api/trpc/[trpc]/      # tRPC API 라우트
├── components/
│   ├── Navbar.tsx
│   ├── TerminalLoader.tsx    # 터미널 스타일 로딩 UI
│   └── sections/             # 홈 섹션 컴포넌트
├── server/
│   ├── notion.ts             # Notion API 함수
│   ├── db.ts                 # SQLite DB 함수
│   ├── trpc.ts               # tRPC 초기화
│   └── routers/              # tRPC 라우터
├── contexts/
│   └── ThemeContext.tsx      # 다크/라이트 모드
└── lib/
    └── trpc.ts               # tRPC 클라이언트
drizzle/
└── schema.ts                 # DB 스키마 (users, blog_interactions)
```

---

## 로컬 실행

```bash
npm install
npx drizzle-kit push
npm run dev
```
