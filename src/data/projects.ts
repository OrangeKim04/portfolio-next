export type ProjectCategory = "backend" | "frontend" | "mobile" | "ai" | "fullstack";

export interface Troubleshooting {
  title: string;
  problem: string;
  approach: string;
  result: string;
  reference?: { label: string; url: string };
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: ProjectCategory;
  period: string;
  startDate: string;
  activity?: string;
  team?: string;
  role: string;
  tags: string[];
  featured?: boolean;
  highlight: string;
  features: { title: string; description: string }[];
  dataSources?: { name: string; usage: string }[];
  contributions: { title: string; description: string }[];
  stack: { label: string; items: string[] }[];
  troubleshooting: Troubleshooting[];
  lessons?: string;
  github?: string;
  demo?: { label: string; url: string };
  image?: string;
  imageAlt?: string;
  color: string;
  wordmark?: string;
  visualLabel?: string;
}

export const categoryLabels: Record<ProjectCategory, string> = {
  backend: "Backend", frontend: "Frontend", mobile: "Mobile", ai: "AI / LLM", fullstack: "Full-stack",
};

const projectEntries: Project[] = [
  {
    features: [
      {
        "title": "글 검색과 분류",
        "description": "Notion에 작성한 개발 글을 카테고리별로 모아 보고, 검색과 무한 스크롤로 이전 글을 찾을 수 있습니다."
      },
      {
        "title": "프로젝트와 개발 기록",
        "description": "프로젝트별 기능·담당 업무·문제 해결 경험을 상세 페이지에서 소개하고 GitHub 저장소로 연결합니다."
      },
      {
        "title": "읽기 환경",
        "description": "다크·라이트 테마와 모바일 화면을 지원하고, 게시글의 조회수와 좋아요를 저장합니다."
      }
    ],
    id: "portfolio", title: "개인 포트폴리오 & 기술 블로그", subtitle: "개발 경험과 기록을 한곳에",
    description: "Notion에서 작성한 글과 프로젝트 경험을 보여주는 개인 웹사이트입니다. Next.js의 화면부터 tRPC API, 조회수·좋아요 저장, GitHub Actions 기반 배포까지 연결했습니다.",
    category: "fullstack", period: "2026.03 — 현재", startDate: "2026-03-01", activity: "개인 프로젝트", team: "1명 · 개인 개발", role: "풀스택 개발 · 디자인 · 배포 · AI 검증 흐름 설계",
    tags: ["Next.js", "TypeScript", "Notion API", "tRPC"], highlight: "Notion 글 검색·프로젝트 소개·조회수와 좋아요",
    contributions: [
      { title: "Notion 기반 콘텐츠 관리", description: "Notion API로 글과 카테고리를 가져오고 Markdown으로 변환해 블로그에 표시했습니다. 검색·무한 스크롤·글 상세 화면과 프로젝트 목록을 구성했습니다." },
      { title: "타입을 공유하는 API와 인터랙션 데이터", description: "tRPC와 TanStack Query를 연결해 클라이언트·서버 간 타입을 공유했습니다. 조회수와 좋아요는 Notion 콘텐츠와 분리해 libSQL·Drizzle ORM으로 관리하고, 콘텐츠 요청에는 캐시를 적용했습니다." },
      { title: "반응형 UI와 배포 자동화", description: "귤을 모티프로 한 히어로, 다크·라이트 테마와 반응형 화면을 구성했습니다. dev는 Preview, main은 Production으로 연결해 GitHub Actions에서 빌드와 Vercel 배포를 자동화했습니다." },
      { title: "AI 생성 코드의 독립 검증", description: "코드를 만드는 Generator와 검토하는 Reviewer의 맥락을 분리했습니다. 경계값·예외 입력·API 오류·데이터 정합성·상태 변화·회귀 영향의 6개 항목으로 검토하고, 수정 뒤 실제 실행 결과를 확인하는 흐름을 적용했습니다." },
    ],
    stack: [{ label: "화면", items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"] }, { label: "API·데이터", items: ["tRPC", "TanStack Query", "Notion API", "notion-to-md", "libSQL", "Drizzle ORM"] }, { label: "운영", items: ["Vercel", "GitHub Actions", "Git"] }],
    troubleshooting: [
      { title: "코드 생성과 검증이 같은 전제를 반복하는 문제", problem: "코드를 생성한 AI에 검증까지 맡기면 생성 과정의 전제를 유지해 요구사항 누락이나 예외 상황을 놓치는 경우가 있었습니다. 검증 프롬프트만 보강해도 비슷한 판단이 반복됐습니다.", approach: "Reviewer에는 생성 과정의 설명을 제외하고 원본 요구사항과 변경 코드만 전달했습니다. 검토 항목을 6개로 고정하고, 발견한 문제를 수정한 뒤 실행으로 확인하도록 단계를 분리했습니다.", result: "코드를 만든 뒤 별도의 검토를 거쳐 수정하고, 마지막에 직접 실행해 확인했습니다. 검토 의견만으로 완료 처리하지 않고 실제 동작을 확인하는 과정을 두었습니다." },
    ],
    github: "https://github.com/OrangeKim04/portfolio-next", demo: { label: "운영 사이트", url: "https://portfolio-next-flame-seven.vercel.app" },
    color: "#FF8C42", wordmark: "dev.gyuri", visualLabel: "BUILD · WRITE · SHARE",
  },
  {
    features: [
      {
        "title": "회원·주문·할인 예제",
        "description": "회원 등급에 따라 할인 정책을 적용하는 예제로 객체 간 의존성과 생성자 주입을 실습했습니다."
      },
      {
        "title": "상품 관리 웹 예제",
        "description": "Servlet/JSP와 Spring MVC의 요청 처리를 비교하고, Thymeleaf 화면과 PRG 패턴을 적용한 상품 관리 예제를 만들었습니다."
      },
      {
        "title": "JPA 애플리케이션 실습",
        "description": "별도 jpashop 모듈에서 도메인 모델과 JPA 연동을 학습했습니다. 서비스 출시 목적이 아닌 학습 저장소입니다."
      }
    ],
    id: "spring-study", title: "Spring Study Archive", subtitle: "직접 구현하며 이해하는 Spring의 원리",
    description: "회원·주문·할인 정책 예제를 만들며 Spring의 의존성 주입과 객체 설계를 공부한 저장소입니다. 순수 Java로 객체를 연결해 본 뒤 같은 코드를 Spring 컨테이너로 옮겼고, MVC와 JPA 예제로 학습 범위를 넓혔습니다.",
    category: "backend", period: "2026.01 시작", startDate: "2026-01-12", activity: "개인 학습 프로젝트 · Spring 핵심 원리", team: "1명 · 개인 학습", role: "Java·Spring 예제 구현 및 리팩터링",
    tags: ["Java", "Spring", "Spring MVC", "JPA"], highlight: "정책 변경에 유연한 객체 설계와 의존성 주입",
    contributions: [
      { title: "생성과 실행 책임의 분리", description: "회원·주문·할인 정책 예제에서 구현 객체를 직접 선택하는 구조를 분석했습니다. AppConfig에 객체 생성과 연결 책임을 모으고 서비스는 생성자로 의존성을 받도록 변경했습니다." },
      { title: "Spring 컨테이너로의 전환", description: "순수 Java 설정을 ApplicationContext로 이관했습니다. @Configuration과 컨테이너의 싱글톤 관리, IoC와 DI의 동작을 비교하며 학습했습니다." },
      { title: "웹 계층과 데이터 계층 실습", description: "저장소를 core·servlet·springmvc·item-service·jpashop 모듈로 나누어 관리했습니다. Servlet/JSP, MVC 요청·응답, Thymeleaf 상품 관리, PRG 패턴과 JPA 도메인 설계를 학습했습니다." },
    ],
    stack: [{ label: "백엔드", items: ["Java", "Spring", "Spring Boot", "Spring MVC", "JPA"] }, { label: "웹·도구", items: ["Servlet", "JSP", "Thymeleaf", "Gradle", "IntelliJ IDEA"] }],
    troubleshooting: [
      { title: "할인 정책 변경이 주문 서비스 수정으로 이어지는 결합", problem: "OrderServiceImpl이 구체 할인 정책을 직접 생성해, 정액 할인에서 정률 할인으로 바꿀 때 서비스 코드도 수정해야 했습니다. 인터페이스와 구현체에 동시에 의존하는 구조였습니다.", approach: "구현체 선택을 AppConfig로 옮기고 생성자 주입으로 연결했습니다. 이후 Spring 컨테이너로 설정을 이관해 서비스가 DiscountPolicy 인터페이스에만 의존하도록 구성했습니다.", result: "사용 영역과 구성 영역이 분리되어 할인 정책 변경을 설정에서 처리할 수 있게 됐습니다. 학습 예제를 통해 OCP·DIP와 의존성 주입의 관계를 확인했습니다." },
    ],
    github: "https://github.com/OrangeKim04/spring-study-archive", color: "#8EBE76", wordmark: "Spring", visualLabel: "LEARN · REFACTOR · UNDERSTAND",
  },
  {
    features: [
      {
        "title": "자연어 금융 질문",
        "description": "종목의 현재가·기업 정보·뉴스를 질문하면 Yahoo Finance 데이터를 조회해 답합니다."
      },
      {
        "title": "여러 종류의 조회 도구",
        "description": "현재가, 기업 정보, 재무 정보, 과거 시세, 뉴스, 애널리스트 정보와 티커 검색 도구를 Agent에 연결했습니다."
      },
      {
        "title": "질문에 따른 처리 방식",
        "description": "대상이 명확한 조회는 도구를 바로 호출하고, 비교·해석이 필요한 질문은 조회 결과를 바탕으로 LLM이 답변을 만듭니다."
      }
    ],
    id: "financial-agent", title: "금융 데이터 LLM Agent", subtitle: "주가·기업 정보·뉴스를 질문하는 금융 챗봇",
    description: "주가·기업 정보·뉴스를 자연어로 물어보는 금융 챗봇입니다. 최신 정보는 Yahoo Finance에서 가져오고, Gemini가 조회 결과를 바탕으로 답변합니다. 저는 프론트엔드와 MCP 서버 사이에서 질문을 처리하는 Agent 백엔드를 맡았습니다.",
    category: "ai", period: "2025.11 — 2025.12", startDate: "2025-11-01", activity: "명지대학교 · 2025-2 공개소프트웨어실무", role: "Agent 백엔드 설계 · 외부 데이터 연동",
    tags: ["Gemini 2.5 Flash", "LangChain", "MCP", "ReAct"], highlight: "단순 조회는 직접 호출, 복합 질문은 Agent 추론",
    contributions: [
      { title: "실시간 금융 데이터 연결", description: "Gemini 2.5 Flash와 LangChain을 사용하고 Yahoo Finance의 시세·기업 정보·뉴스를 조회하는 MCP 서버를 연동했습니다. MCP 응답은 JSON 형식으로 통일했습니다." },
      { title: "요청 성격에 따른 경로 분리", description: "티커와 현재가·주가·뉴스 같은 키워드만으로 대상과 도구가 결정되는 요청은 MCP를 비동기로 직접 호출했습니다. 종목 비교나 뉴스·시세의 해석이 필요한 질문은 AgentExecutor와 ReAct로 처리했습니다." },
      { title: "최신 정보의 근거 확보", description: "최신 정보가 필요한 질문에서는 모델의 기존 지식 대신 외부 조회 결과를 사용하도록 Tool 호출 규칙을 설정했습니다." },
    ],
    stack: [{ label: "Agent", items: ["Python", "FastAPI", "Gemini 2.5 Flash", "LangChain", "AgentExecutor", "ReAct"] }, { label: "연동", items: ["MCP", "Yahoo Finance", "JSON", "비동기 Tool 호출"] }],
    troubleshooting: [
      { title: "단순 현재가 조회에도 발생하던 LLM 지연과 토큰 사용", problem: "AAPL 현재가처럼 대상이 명확한 질문도 추론 → Tool 선택 → MCP 호출 → 해석을 모두 거치며 2초 이상 걸렸습니다. 프롬프트를 줄여도 LLM 호출 지연은 남았습니다.", approach: "명확한 조회 요청은 티커·키워드로 분기해 MCP를 직접 호출하고, 맥락 판단이 필요한 요청만 ReAct를 사용하도록 처리 구조를 변경했습니다.", result: "개발 중 측정한 단순 조회 응답시간은 2초대에서 0.3초대로 줄었습니다. 이 경로는 LLM을 호출하지 않아 LLM 토큰도 사용하지 않았습니다. 복합 질문은 계속 Agent가 처리합니다." },
    ],
    github: "https://github.com/MJU-OSS-2025",
    color: "#89B8EC", wordmark: "Finance AI", visualLabel: "LIVE DATA · SELECTIVE REASONING",
  },
  {
    features: [
      {
        "title": "소동물 돌봄 정보",
        "description": "소동물 종류에 따른 먹이·사육 환경·놀이 방법과 증상별 건강 관리 정보를 제공합니다."
      },
      {
        "title": "병원 탐색과 건강 기록",
        "description": "지도에서 소동물 진료 병원을 찾고 리뷰를 확인할 수 있으며, 반려동물의 건강 정보를 기록하는 기능을 제공합니다."
      },
      {
        "title": "Q&A·일상·챌린지",
        "description": "질문과 일상을 올리고 주간 챌린지에 참여할 수 있습니다. 홈에서는 인기 글과 챌린지 랭킹을 보여줍니다."
      },
      {
        "title": "나와 반려동물 프로필",
        "description": "사용자·반려동물 프로필과 활동 배지를 마이페이지에서 관리합니다."
      }
    ],
    id: "littlepet", title: "리틀펫", subtitle: "소동물 병원 찾기와 반려동물 건강 관리",
    description: "소동물의 관리·건강 정보, 병원 탐색과 커뮤니티를 제공하는 반응형 웹 서비스입니다. UMC 7기 프로젝트에서 프론트엔드를 맡아 병원찾기, 커뮤니티, 홈과 마이페이지를 구현하고 API를 연결했습니다.",
    category: "frontend", period: "2025.01.07 — 2025.02.21", startDate: "2025-01-07", activity: "대학생 개발 연합동아리 UMC 7기 · Web(React)", team: "9명 · Frontend 2 / Backend 5 / Design 1 / PM 1", role: "프론트엔드 개발 · API 연동 · 반응형 UI",
    tags: ["React", "TypeScript", "Vite", "Kakao Maps"], highlight: "병원 탐색부터 반려동물 프로필까지",
    contributions: [
      { title: "소동물 병원 탐색", description: "건강 영역의 병원찾기와 하위 페이지를 구현하고 카카오맵 및 서버 API를 연동했습니다. 병원이 없는 지역의 표시와 필터를 검토하며 사용 흐름을 개선하는 의견을 제안했습니다." },
      { title: "커뮤니티와 홈 화면", description: "Q&A·일상·챌린지 목록과 상세 화면을 구현하고 게시물을 연동했습니다. 홈의 챌린지 랭킹과 인기글에도 UI와 API를 연결했습니다." },
      { title: "마이페이지와 프로필", description: "마이페이지의 API 연동을 맡아 사용자 프로필 조회·수정, 반려동물 프로필 등록·수정·삭제와 목표 배지를 연결했습니다. 연동 과정의 오류는 백엔드와 공유하며 조율했습니다." },
      { title: "반응형과 공동 컴포넌트", description: "담당 화면에 반응형 레이아웃을 적용하고 내비게이션은 프론트엔드 팀원과 함께 구현했습니다. 공용 컴포넌트에는 설명을 남겨 협업 시 용도를 파악하기 쉽게 했습니다." },
    ],
    stack: [{ label: "프론트엔드", items: ["React", "TypeScript", "Vite", "styled-components", "React Router", "Kakao Maps API"] }, { label: "협업·품질", items: ["GitHub", "Notion", "Discord", "Figma", "ESLint", "Prettier", "Yarn"] }],
    troubleshooting: [
      { title: "새로고침과 이동 후 어긋나는 메뉴 활성 상태", problem: "메뉴 클릭 때만 갱신하는 상태를 기준으로 색상을 표시해, 새로고침이나 다른 경로의 페이지 이동 후 현재 메뉴와 표시가 일치하지 않았습니다.", approach: "React Router의 useLocation을 사용해 현재 pathname과 메뉴 경로를 비교하도록 수정했습니다. 활성 색상과 표시선을 실제 URL에 맞춰 계산했습니다.", result: "클릭 여부와 무관하게 현재 경로를 기준으로 메뉴가 표시되도록 수정하고 반응형 UI도 함께 조정했습니다.", reference: { label: "메뉴 상태 수정 PR #26", url: "https://github.com/Little-pet/UMC_LittlePet_Front/pull/26" } },
    ],
    lessons: "당초 4명 예정이던 프론트엔드를 2명이 진행하며 PM·디자이너·백엔드와 적극적으로 조율했습니다. 데모데이에서 기기·브라우저에 따른 오류를 경험하며 개발 기기에서의 정상 동작뿐 아니라 실제 사용자 환경의 검증이 필요함을 배웠습니다.",
    github: "https://github.com/Little-pet/UMC_LittlePet_Front", image: "/projects/littlepet.svg", imageAlt: "리틀펫 공식 로고", color: "#6EA8FE",
  },
  {
    features: [
      {
        "title": "영화 검색과 목록",
        "description": "영화를 검색하거나 카테고리별 목록을 탐색합니다. 무한 스크롤과 페이지네이션으로 다음 결과를 불러옵니다."
      },
      {
        "title": "작품 상세 정보",
        "description": "선택한 영화의 출연진·제작자와 관련 추천 콘텐츠를 확인합니다."
      },
      {
        "title": "회원가입과 로그인",
        "description": "사용자 입력을 받아 가입·로그인 요청을 보내는 화면을 구현했습니다."
      }
    ],
    id: "movie-study", title: "UMC 영화 탐색 사이트", subtitle: "React로 익힌 검색과 서버 상태 관리",
    description: "UMC 7기 Web 스터디에서 개인으로 구현한 영화 탐색 사이트입니다. 영화 검색과 카테고리별 목록, 상세 정보, 로그인·회원가입을 연결하며 React의 화면 구성과 데이터 관리를 학습했습니다.",
    category: "frontend", period: "2024.09.16 — 2024.12.15", startDate: "2024-09-16", activity: "대학생 개발 연합동아리 UMC 7기 · Web 스터디", team: "1명 · 스터디 내 개인 구현", role: "프론트엔드 학습 및 기능 구현",
    tags: ["React", "TypeScript", "TanStack Query", "React Router"], highlight: "영화 탐색·인증·무한 스크롤 구현",
    contributions: [
      { title: "영화 탐색 화면", description: "검색과 카테고리별 영화 목록, 출연진·제작자·추천 콘텐츠를 보여주는 상세 화면을 구현했습니다. styled-components로 UI를 분리하고 React Router로 페이지를 연결했습니다." },
      { title: "서버 데이터와 사용자 입력", description: "useQuery로 조회·캐시를 관리하고 useMutation으로 변경 요청과 결과 상태를 처리했습니다. 로그인·회원가입과 useInfiniteQuery 기반의 무한 스크롤·페이지네이션을 학습했습니다." },
      { title: "상태와 타입의 기초", description: "React 기본 Hook과 전역 상태 관리 방법을 익히고 TypeScript로 데이터 타입을 명시했습니다. Query Devtools로 데이터 상태를 확인했습니다." },
    ],
    stack: [{ label: "화면", items: ["React", "TypeScript", "React Router", "styled-components"] }, { label: "데이터·학습", items: ["TanStack Query", "Query Devtools", "Redux Toolkit / Zustand"] }],
    troubleshooting: [],
    lessons: "컴포넌트 분리, 라우팅, 서버 데이터 캐시와 변경 요청을 구분해 관리하는 방법을 익혔습니다. 데이터 상태를 개발 도구로 확인하며 화면에 반영되는 흐름을 이해했습니다.",
    github: "https://github.com/OrangeKim04/7th_Web_B", color: "#C1A6E8", wordmark: "Movie", visualLabel: "SEARCH · DISCOVER · LEARN",
  },
  {
    features: [
      {
        "title": "목표 설정과 인증",
        "description": "개인·친구·커뮤니티 목표를 만들고, 타이머 또는 사진으로 활동을 인증합니다."
      },
      {
        "title": "친구와 함께하는 챌린지",
        "description": "친구를 추가해 목표 달성에 도전하고 친구의 활동을 확인합니다. 신청·수락·차단 등 관계 상태를 관리합니다."
      },
      {
        "title": "활동 리포트와 배지",
        "description": "일간·주간 목표 달성 현황을 확인하고 활동에 따른 배지와 알림을 받습니다."
      }
    ],
    id: "planup", title: "PlanUp", subtitle: "친구와 목표를 정하고 활동을 인증하는 앱",
    description: "친구와 목표를 공유하고 서로의 도전을 응원하는 목표 달성 앱입니다. 백엔드 개발과 DB 설계를 맡아 친구 관계와 계정 인증 기능을 구현했습니다.",
    category: "backend", period: "2025.06.30 — 2025.08.22", startDate: "2025-06-30", activity: "대학생 개발 연합동아리 UMC 8기 · Server(Spring)", team: "10명 · Backend 4 / Android 4 / Design 1 / PM 1",
    role: "백엔드 개발 · DB 설계", tags: ["Spring Boot", "JPA", "MySQL", "Redis"], featured: true,
    highlight: "친구 신청·차단, 이메일 인증과 비밀번호 재설정",
    contributions: [
      { title: "친구 관계 관리", description: "친구 신청·수락·차단의 상태 변화와 양방향 관계 조회를 구현하고, 중복되는 친구 데이터를 제거했습니다." },
      { title: "인증 로직 공통화", description: "@CurrentUser와 ArgumentResolver로 반복되는 인증 처리를 분리했습니다. 사용자 ID만 필요한 요청은 JWT에서 값을 반환해 불필요한 DB 조회를 줄였습니다." },
      { title: "계정 보안과 데이터 정리", description: "이메일 인증과 비밀번호 재설정 토큰을 Redis TTL로 관리했습니다. 탈퇴 시 사용자 정보는 비활성화하고 친구 관계 데이터는 삭제하도록 처리했습니다." },
    ],
    stack: [
      { label: "백엔드", items: ["Java 17", "Spring Boot", "Spring Data JPA", "MySQL"] },
      { label: "인증·연동", items: ["JWT", "Redis TTL", "Gmail API", "Swagger"] },
      { label: "협업", items: ["GitHub Issue · PR · 코드리뷰", "Notion", "Discord"] },
    ],
    troubleshooting: [
      { title: "ID만 필요한 요청에서도 발생하던 DB 조회 제거", problem: "컨트롤러의 인증 코드를 @CurrentUser로 공통화한 뒤에도, Resolver가 항상 User 엔티티를 반환하면서 ID만 사용하는 API에서 불필요한 SELECT가 발생했습니다.", approach: "HandlerMethodArgumentResolver에서 파라미터 타입을 검사했습니다. Long이면 JWT Claim의 userId를 바로 반환하고, User 객체를 요청하는 경우에만 Repository를 조회하도록 분리했습니다.", result: "ID 기반 요청에서 사용자 조회 SELECT 1회를 제거하면서 컨트롤러의 인증 구현 의존성을 줄였습니다.", reference: { label: "인증 공통화 PR #61", url: "https://github.com/UMC-Plan-up/Plan-up-server/pull/61" } },
      { title: "친구 중복 노출과 타이머 오류의 전파 차단", problem: "양방향 친구 관계를 조회하면 같은 사람이 중복 노출됐고, 친구의 공부 시간 집계가 실패하면 전체 목록 응답도 실패할 수 있었습니다.", approach: "관계의 양쪽에서 상대방을 추출한 뒤 Stream.distinct()로 중복을 제거했습니다. 목표별 시간 조회에 개별 예외 처리를 두고 실패한 항목에는 0을 반환하도록 했습니다.", result: "친구 목록의 중복을 제거하고 일부 타이머 집계 실패가 전체 목록 조회 실패로 이어지지 않도록 처리했습니다.", reference: { label: "친구 목록 개선 PR #66", url: "https://github.com/UMC-Plan-up/Plan-up-server/pull/66" } },
    ],
    github: "https://github.com/UMC-Plan-up/Plan-up-server",
    demo: { label: "시연 영상", url: "https://www.youtube.com/watch?v=LVKu9gYQQ-k" },
    image: "/projects/planup.webp", imageAlt: "함께하는 목표달성 앱 Plan-Up 공식 배너", color: "#279CEB",
  },
  {
    features: [
      {
        "title": "프로젝트·인력 관리",
        "description": "SI 기업의 직원, 고객사, 프로젝트와 참여 인력을 관리하는 시스템입니다."
      },
      {
        "title": "개발자 추천",
        "description": "프로젝트에 필요한 직무를 기준으로 기본·기술·평가 점수를 계산해 개발자 상위 5명을 추천합니다."
      },
      {
        "title": "참여 이력과 평가",
        "description": "프로젝트 참여 이력과 직무별 평가를 연결해 추천에 필요한 평균 점수를 계산합니다."
      }
    ],
    id: "pms", title: "기업용 PMS", subtitle: "프로젝트에 맞는 개발자를 연결하다",
    description: "SI 기업에서 프로젝트에 투입할 개발자를 찾고 인력과 평가를 관리하는 시스템입니다. 직원 100명·프로젝트 100만 건을 가정한 테스트 데이터를 만들어 DB를 설계하고, 기간별 프로젝트 검색과 직무별 개발자 추천을 구현했습니다.",
    category: "backend", period: "2025.10.15 — 2025.12.01", startDate: "2025-10-15", activity: "명지대학교 · 데이터베이스설계 전공 수업", team: "4명 · Backend 2 / Frontend 2",
    role: "백엔드 개발 · DB 설계 · 배포", tags: ["Spring Boot", "MySQL", "JPA", "Railway"], featured: true,
    highlight: "100만 건 테스트 데이터 기반의 조회 최적화",
    contributions: [
      { title: "확장성을 고려한 데이터 설계", description: "직원과 직무별 정보를 슈퍼·서브타입으로 구분했습니다. 평가 데이터는 조회 패턴을 고려해 반정규화하고 조인 비용을 줄였습니다." },
      { title: "기간 조회 최적화", description: "100만 건의 더미 데이터를 적재하고 실행 계획을 분석했습니다. 시작일 기준 B-Tree 인덱스를 적용해 전체 테이블 조회를 범위 조회로 개선했습니다." },
      { title: "SQL 기반 개발자 추천", description: "기본 점수 30%·기술 점수 30%·평가 점수 40%를 합산해 적합한 개발자 상위 5명을 추천했습니다. JPQL과 서브쿼리로 직무별 평균 평가를 집계하고 개발자별 가장 적합한 직무를 선정했습니다." },
      { title: "클라우드 배포", description: "Railway에서 Spring Boot와 MySQL을 연결하고 환경변수와 초기 데이터를 설정했습니다. 배포 및 DB 연결 과정을 기술 블로그에 기록했습니다." },
    ],
    stack: [{ label: "백엔드·데이터", items: ["Java 17", "Spring Boot", "Spring Data JPA", "JPQL", "MySQL", "B-Tree Index"] }, { label: "배포·도구", items: ["Railway", "Gradle", "Swagger", "MySQL Workbench"] }],
    troubleshooting: [
      { title: "100만 건 데이터의 기간 검색 병목", problem: "직원 100명·프로젝트 100만 건을 가정한 테스트에서 특정 월의 프로젝트 조회가 0.547초 걸렸습니다. 전체 테이블 스캔과 정렬이 병목이었습니다.", approach: "캐시 영향을 배제한 쿼리와 실행 계획을 분석했습니다. 실시간 반영이 필요한 조건을 고려해 요약 테이블 대신 선택도가 높은 start_date에 B-Tree 인덱스를 적용했습니다.", result: "Index Range Scan을 유도했습니다. 테스트 환경의 측정 기록은 0.547초에서 표시 정밀도 미만인 0.000초로 줄었습니다. 이는 테스트 쿼리의 기록으로, 운영 환경의 응답시간과는 구분됩니다." },
      { title: "평가 조회의 다중 조인 축소", problem: "평가·상세·유형·점수를 분리한 모델에서는 평가를 조회할 때 4단계 조인이 필요했습니다.", approach: "쓰기보다 조회가 많은 사용 패턴을 고려해 점수를 평가 항목 테이블에 직접 저장하는 반정규화를 선택했습니다. 직원은 공통 속성과 직무별 서브타입을 분리해 확장성을 유지했습니다.", result: "점수 조회에 필요한 조인 단계를 줄이고, 해당 구조를 활용해 직무별 평균 평가와 추천 점수를 계산했습니다." },
    ],
    github: "https://github.com/mju-db-design-2025/Backend", color: "#FF8C42",
  },
  {
    features: [
      {
        "title": "놀이터 지도와 시설 상세",
        "description": "마포구 놀이터를 지도와 검색으로 찾고 주소·설치일·놀이기구 종류와 수량을 확인합니다. 시설 상세에는 안전검사와 보험 정보도 함께 표시합니다."
      },
      {
        "title": "주변 안전시설",
        "description": "안전지킴이집·경찰관서·어린이보호구역을 지도에 겹쳐 보여주어 놀이터 주변 환경을 살펴볼 수 있습니다."
      },
      {
        "title": "날씨와 대기질",
        "description": "현재 위치의 날씨와 서울 지역 대기질을 조회해 기온·습도·풍속·미세먼지·오존 정보를 보여줍니다."
      },
      {
        "title": "즐겨찾기와 공유",
        "description": "다시 찾고 싶은 놀이터를 즐겨찾기에 추가하고 시설 정보를 공유할 수 있습니다."
      }
    ],
    dataSources: [
      {
        "name": "행정안전부 · 전국어린이놀이시설정보서비스",
        "usage": "놀이터의 시설번호·이름·주소·위치·설치일을 정리해 지도와 상세 화면에 사용했습니다."
      },
      {
        "name": "행정안전부 · 전국어린이놀이시설기구정보서비스",
        "usage": "놀이터별 놀이기구의 종류와 수량을 표시했습니다."
      },
      {
        "name": "행정안전부 · 전국어린이놀이시설안전검사정보서비스",
        "usage": "시설번호로 연결해 검사 종류·검사일·통과 여부를 확인할 수 있도록 했습니다."
      },
      {
        "name": "행정안전부 · 전국어린이놀이시설우수시설정보서비스",
        "usage": "우수시설로 지정된 놀이터를 구분하는 데 사용했습니다."
      },
      {
        "name": "행정안전부 · 전국어린이놀이시설보험가입정보서비스",
        "usage": "보험 관리번호와 보험사 정보를 놀이시설 상세에 연결했습니다."
      },
      {
        "name": "안전지킴이집 데이터",
        "usage": "도움을 요청할 수 있는 주변 안전지킴이집의 위치를 지도에 표시했습니다."
      },
      {
        "name": "전국어린이보호구역표준데이터",
        "usage": "어린이보호구역의 위치와 도로 폭 데이터를 지도 표시에 사용했습니다."
      },
      {
        "name": "경찰청 · 경찰관서 위치 주소 현황",
        "usage": "마포구 경찰관서의 위치를 지도에서 볼 수 있도록 정리했습니다."
      },
      {
        "name": "한국환경공단 · 에어코리아 대기오염정보",
        "usage": "시도별 실시간 측정정보 API에서 서울 지역 대기질을 조회해 미세먼지(PM10)와 오존 정보를 표시했습니다."
      },
      {
        "name": "OpenWeather · Current Weather Data",
        "usage": "현재 위치의 위도·경도로 날씨를 조회하고 기온·체감온도·습도·풍향·풍속을 보여주었습니다."
      }
    ],
    id: "playground", title: "놀이터백과", subtitle: "놀이터 시설·검사·보험 정보를 지도 한곳에",
    description: "아이와 갈 놀이터를 고를 때 시설과 안전 정보를 따로 찾아봐야 하는 불편에서 시작한 지도 앱입니다. 마포구 놀이터의 놀이기구·안전검사·보험 정보와 주변 안전시설을 모아 보여주고, 날씨와 대기질도 확인할 수 있도록 만들었습니다. 2명이 기획과 UI를 함께 설계했고 앱 개발은 제가 맡았습니다.",
    category: "mobile", period: "2024.10.31 — 2024.11.09", startDate: "2024-10-31", activity: "제3회 오픈데이터포럼(ODF) 해커톤 · 행정안전부·오픈데이터포럼", team: "2명 · 공동 기획·UI 설계 / 본인 앱 개발 전담", role: "기획 · UI 설계 · 앱 개발",
    tags: ["React Native", "Expo", "공공데이터 API"], featured: true,
    highlight: "제3회 오픈데이터포럼 해커톤 최우수상",
    contributions: [
      { title: "공공데이터를 하나의 지도에", description: "행정안전부 놀이시설 데이터를 마포구 중심으로 정리하고 JSON으로 구조화했습니다. 시설번호(pfctSn)를 기준으로 안전검사·보험 정보를 연결해 시설 상세에 표시하고, 놀이기구 종류와 수량도 보여주었습니다." },
      { title: "야외 활동 정보 제공", description: "OpenWeather의 현재 날씨와 에어코리아의 서울 지역 대기질을 조회했습니다. 시설 데이터는 앱에 포함한 JSON을 사용하고, 수시로 바뀌는 날씨·대기질은 API 응답으로 표시했습니다." },
      { title: "현장에서 확인한 사용 경험", description: "직접 놀이터를 방문해 위치와 정보의 정확성, 사용 흐름을 점검했습니다. 제3회 오픈데이터포럼 해커톤에서 최우수상을 수상했습니다." },
    ],
    stack: [{ label: "앱·UI", items: ["React Native", "Expo", "Figma"] }, { label: "데이터", items: ["놀이터 시설·안전검사·보험 정보", "안전지킴이집·어린이보호구역·경찰관서", "OpenWeather", "에어코리아", "JSON 데이터 정리"] }],
    troubleshooting: [
      { title: "시설·검사·보험 데이터를 하나의 놀이터 정보로 묶기", problem: "놀이시설, 안전검사, 보험과 주변 안전시설이 서로 다른 데이터에 나뉘어 있었습니다. 시설명만으로 연결하면 같은 시설의 정보를 정확히 모으기 어려웠습니다.", approach: "필요한 데이터를 정리해 JSON으로 만들고, 놀이시설의 고유 번호 pfctSn으로 검사·보험 데이터를 찾아 결합했습니다. 지도에서는 시설 유형을 구분하고 상세 화면에서는 검사 종류·일자와 보험사를 함께 보여주었습니다.", result: "하나의 놀이터를 선택하면 흩어져 있던 시설·검사·보험 정보를 함께 볼 수 있게 됐습니다. 실제 놀이터를 방문해 위치와 표시 정보, 화면 이동을 점검했습니다." },
    ],
    lessons: "어린이 야외 활동 서포터즈 경험이 있는 팀원과 문제를 정의하고, 약 10일 동안 앱 개발을 전담했습니다. 최우수상(한국지능정보사회진흥원)을 수상했으며 현장 검증을 통해 정보의 정확성과 실제 사용 흐름의 중요성을 배웠습니다.",
    github: "https://github.com/OrangeKim04/PLAYGROUND", image: "/projects/playground.png", imageAlt: "놀이터백과의 놀이터 그래픽", color: "#78BB9D",
  },
  {
    features: [
      {
        "title": "방 개설과 초대",
        "description": "방을 만들고 참여자를 초대해 같은 대화방에서 게임을 시작합니다."
      },
      {
        "title": "세 가지 대화 게임",
        "description": "공통 관심사로 이야기하는 키워드 모드, 서로의 TMI를 맞히는 모드, 선택지를 고르는 밸런스 모드를 제공합니다."
      },
      {
        "title": "실시간 투표와 결과",
        "description": "투표 진행률, 힌트·토론, 결과와 점수를 함께 확인합니다. 종료 후에는 대화·게임 결과를 요약하고 저장합니다."
      }
    ],
    id: "okii", title: "Okii", subtitle: "키워드·TMI·밸런스 게임으로 시작하는 대화",
    description: "처음 만난 사람들이 같은 방에 들어와 키워드·TMI·밸런스 게임을 하며 대화를 시작하는 웹 서비스입니다. 저는 게임별 투표와 결과 요약 화면, 실시간 서버 연동, 개발·운영 자동 배포를 맡았습니다.",
    category: "frontend", period: "2025.03 — 2025.07", startDate: "2025-03-24", activity: "전국 대학생 IT 연합동아리 잇타(It's Time) 7기", team: "7명 · Frontend 3 / Backend 2 / 기획 1 / Design 1", role: "프론트엔드 개발 · CI/CD",
    tags: ["React", "TypeScript", "STOMP", "GitHub Actions"],
    highlight: "세 가지 게임의 실시간 투표와 결과 요약",
    contributions: [
      { title: "채팅방과 게임 모드별 공통 화면", description: "알림·초대·키워드 모달, 채팅방 종료 요약과 요약 저장 모달, 만료 페이지를 구현했습니다. 키워드·TMI·밸런스 3개 모드의 차이를 반영하면서 공통 화면을 재사용하도록 구성했습니다." },
      { title: "투표와 결과 화면", description: "TMI 투표의 진행·종료·요약 카드와 밸런스 투표의 결과·점수 공개 UI를 개발했습니다. STOMP.js와 SockJS로 실시간 데이터를 연동했습니다." },
      { title: "개발·운영 배포 자동화", description: "GitHub Actions와 Nginx로 브랜치별 빌드·배포 흐름을 구성하고, 개발과 운영 환경의 API 주소 및 배포 대상을 분리했습니다." },
    ],
    stack: [{ label: "프론트엔드", items: ["React", "TypeScript", "Vite", "Zustand", "React Router", "styled-components", "Emotion"] }, { label: "통신", items: ["STOMP.js", "SockJS", "Axios"] }, { label: "빌드·협업", items: ["GitHub Actions", "SSH", "Nginx", "ESLint", "Prettier", "Husky", "Figma", "Notion", "Discord"] }],
    troubleshooting: [
      { title: "화면 전환 중 게임 모드 누락", problem: "페이지를 이동할 때 게임 모드가 전달되지 않아 모드별 화면을 렌더링하는 과정에서 오류가 발생했습니다.", approach: "화면 간 상태 전달 경로를 추적하고, 전달 값에 대한 검증과 예외 처리를 추가했습니다.", result: "게임 모드 누락으로 발생한 렌더링 오류를 해결하고, 모드별 화면 흐름에서 입력 상태를 검증하도록 보완했습니다." },
      { title: "개발·운영 환경의 반복적인 수동 배포", problem: "배포할 때마다 브랜치, API 환경변수, 대상 서버를 직접 확인하고 파일을 전송해야 했습니다.", approach: "develop은 dev 서버, main은 production 서버에 연결하는 GitHub Actions 워크플로를 작성했습니다. VITE_BASE_URL을 환경별로 주입하고 Vite의 dist를 SSH로 전송해 Nginx에 반영했습니다.", result: "환경 확인·빌드·전송·반영을 브랜치별 자동 배포로 전환하고, 개발·운영 설정과 배포 대상이 섞일 가능성을 줄였습니다." },
    ],
    github: "https://github.com/IT-s-Time-6Team/FE", image: "/projects/okii.svg", imageAlt: "Okii의 대화 카드 그래픽", color: "#E9A0B5",
  },
  {
    features: [
      {
        "title": "이정표 · 지도에서 책방 찾기",
        "description": "강원도의 독립서점·북카페·북스테이·독서 스팟을 지도에서 찾습니다. 음식점·관광지·축제도 함께 표시하고 장소별 사진과 후기를 확인합니다."
      },
      {
        "title": "공간책갈피 · 읽은 책과 장소 기록",
        "description": "책 읽기 좋은 장소에 사진·감상과 도서 정보를 남깁니다. 네이버 책검색으로 책을 찾아 독서 스팟에 연결하고 다른 이용자와 공유합니다."
      },
      {
        "title": "북챌린지 · 익명 책 선물 릴레이",
        "description": "참여 서점에 책을 남기거나 선물받은 경험을 인증 게시판에 기록합니다. 게시물의 공감과 댓글로 다른 참여자와 소통합니다."
      },
      {
        "title": "취향길목 · 도서 여행 일정",
        "description": "달력에서 여행 날짜를 정하고 방문할 장소를 추가합니다. 선택한 장소를 지도에서 확인하며 나만의 여행 동선을 구성합니다."
      }
    ],
    dataSources: [
      {
        "name": "카카오 지도 API",
        "usage": "WebView 지도에 책방·독서 스팟·관광지 마커를 표시하고 현재 위치와 여행 동선을 확인합니다."
      },
      {
        "name": "한국관광공사 · TourAPI 국문 관광정보",
        "usage": "백엔드가 연동한 관광지·음식점·축제 데이터를 앱의 장소 검색과 상세 화면, 여행 일정에 사용합니다."
      },
      {
        "name": "네이버 · 책검색 API",
        "usage": "백엔드 검색 API를 통해 도서 정보를 받아 공간책갈피에 책을 연결합니다."
      }
    ],
    id: "seohaeng", title: "서행", subtitle: "책방과 독서 스팟을 찾아 떠나는 강원도 여행",
    description: "강원도의 독립서점·북카페·북스테이를 찾아 여행하고, 책을 읽은 장소와 감상을 기록하는 안드로이드 앱입니다. 지도에서 장소를 고르고 여행 일정을 짜는 것부터 독서 스팟 공유, 익명 책 선물 릴레이까지 제공합니다. 5명 팀에서 프론트엔드 개발과 앱 배포를 맡았습니다.",
    category: "mobile", period: "2025.05.01 — 2025.10.15", startDate: "2025-05-01", activity: "2025 관광데이터 활용 공모전 · 본선 진출", team: "5명 · Backend 2 / Frontend 1 / 기획 1 / Design 1",
    role: "프론트엔드 개발 · 앱 배포", tags: ["React Native", "Expo", "TypeScript", "EAS"],
    highlight: "강원도 책방 지도·독서 기록·여행 일정",
    contributions: [
      { title: "책방 지도와 장소 탐색", description: "독립서점·북카페·북스테이·독서 스팟을 유형별 마커로 표시했습니다. 화면에 보이는 지도 영역을 기준으로 장소를 불러오고, 음식점·관광지·축제 필터와 장소 상세 화면을 연결했습니다." },
      { title: "독서 기록·도서 검색과 여행 일정", description: "공간책갈피, 도서 검색·등록, 북챌린지 인증, 여행 일정 화면에 서버 API를 연결했습니다. 카카오 지도와 로그인은 WebView로 앱에 연동했습니다." },
      { title: "스토어 출시 지원", description: "Android AAB 생성, 서명, API 키 설정 등 배포 과정을 담당했습니다. 기획자에게 산출물과 가이드를 제공해 Google Play 출시를 함께 완료했습니다." },
    ],
    stack: [{ label: "앱", items: ["React Native", "Expo SDK 53", "TypeScript", "Expo Router", "styled-components"] }, { label: "외부 서비스", items: ["REST API", "Kakao Maps", "TourAPI", "네이버 책검색 API", "WebView", "OAuth 2.0", "Expo Location", "AsyncStorage"] }, { label: "빌드·출시", items: ["EAS", "Android AAB", "Google Play Console", "Vercel"] }],
    troubleshooting: [
      { title: "공모전 일정 안에서 외부 서비스와 앱 연결", problem: "제한된 개발 기간 안에 카카오 로그인과 지도 기반 탐색을 앱에 통합하고, 스토어 배포에 필요한 네이티브 설정까지 완료해야 했습니다.", approach: "WebView 기반의 하이브리드 방식을 선택해 카카오 로그인과 지도를 연결했습니다. Android AAB 빌드·서명·API 키 설정을 맡고, 기획자에게 스토어 등록용 산출물과 가이드를 전달했습니다.", result: "지도와 로그인 기능을 앱에서 사용할 수 있게 만들고 Google Play 출시를 완료했습니다. 기획자가 스토어 등록을 진행할 수 있도록 빌드 파일과 설정 방법을 전달했습니다." },
    ],
    demo: { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.gyurijake.seohaengfe" },
    github: "https://github.com/SeoHaeng/SeoHaeng_FE/tree/develop", color: "#A5A0E8",
  },
  {
    features: [
      {
        "title": "촬영·OCR 성분 분석",
        "description": "식품 사진을 촬영하거나 업로드하면 OCR 분석 결과로 원재료와 영양성분, 대체당 정보를 확인합니다."
      },
      {
        "title": "상품 검색",
        "description": "검색한 상품의 상세 정보와 영양성분을 살펴보고 제로식품 선택에 참고합니다."
      },
      {
        "title": "AI 레시피와 저장",
        "description": "AI 레시피를 추천받고 상세 내용을 확인합니다. 마이페이지에서 저장한 레시피와 OCR 결과를 다시 볼 수 있습니다."
      },
      {
        "title": "커뮤니티",
        "description": "사용자끼리 게시글을 작성하고 정보를 나눕니다. 커뮤니티는 다른 프론트엔드 팀원이 담당했습니다."
      }
    ],
    id: "zeropick", title: "ZeroPick", subtitle: "사진으로 확인하는 제로식품 성분과 대체당",
    description: "제로식품을 고를 때 원재료와 대체당 정보를 확인할 수 있도록 만든 웹 서비스입니다. 식품 사진의 OCR 분석 결과와 상품 정보, AI 레시피를 제공합니다. 캡스톤 디자인 팀장으로 일정을 관리했고, 커뮤니티를 제외한 주요 프론트엔드 화면과 디자인을 맡았습니다.",
    category: "frontend", period: "2025.04.01 — 2025.05.30", startDate: "2025-04-01", activity: "명지대학교 · 캡스톤 디자인 졸업작품", team: "5명 · Frontend 2 / Backend 3",
    role: "팀장 · 프론트엔드 개발 · UI/UX", tags: ["React", "TypeScript", "Vite", "Vercel"],
    highlight: "식품 OCR 분석·상품 검색·AI 레시피",
    contributions: [
      { title: "핵심 기능의 프론트엔드 구현", description: "OCR 촬영·분석, 상품 검색, AI 레시피, 마이페이지 화면과 API 연동을 담당했습니다." },
      { title: "일관된 디자인과 배포", description: "로고와 컬러, UI 컴포넌트를 설계하고 Vercel 기반 배포 환경을 구성했습니다." },
      { title: "팀의 개발 과정 지원", description: "기획부터 개발까지 일정을 관리했습니다. React·Git 교육과 페어 프로그래밍을 통해 팀원의 개발 참여를 도왔습니다." },
    ],
    stack: [{ label: "담당 프론트엔드", items: ["React", "TypeScript", "Vite", "styled-components", "Vercel"] }, { label: "팀 백엔드", items: ["Spring Boot", "OCR·AI 레시피 API 연동"] }, { label: "디자인·협업", items: ["Figma", "GitHub", "Notion", "Discord", "ESLint", "Prettier", "Husky"] }],
    troubleshooting: [
      { title: "팀의 개발 경험 차이와 일정 관리", problem: "개발 경험이 부족한 팀원이 있어 React 구현과 Git 협업을 함께 익히며 프로젝트 일정을 맞춰야 했습니다.", approach: "React 기초와 Git 사용을 교육하고 페어 프로그래밍을 진행했습니다. 팀장으로 기획부터 개발까지 마일스톤을 관리하고, 커뮤니티를 제외한 주요 화면 개발과 디자인 시스템을 맡았습니다.", result: "팀원의 개발 참여를 돕고 프로젝트를 완주했습니다. 서비스 로고·컬러·공통 UI를 통일하고 최종 발표용 전시 판넬과 시각 자료도 제작했습니다." },
    ],
    github: "https://github.com/capstoneMJU/frontend", image: "/projects/zeropick.svg", imageAlt: "ZeroPick 공식 로고", color: "#A8CB74",
  },
];

// Latest means project start date, not repository creation or last commit date.
export const projects = [...projectEntries].sort((a, b) => b.startDate.localeCompare(a.startDate));

export function getProject(id: string) {
  return projects.find(project => project.id === id);
}
