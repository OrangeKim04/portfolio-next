export type ProjectCategory = "backend" | "frontend" | "mobile";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: ProjectCategory;
  period: string;
  team?: string;
  role: string;
  tags: string[];
  featured?: boolean;
  highlight: string;
  contributions: { title: string; description: string }[];
  github: string;
  demo?: { label: string; url: string };
  image?: string;
  imageAlt?: string;
  color: string;
}

export const categoryLabels: Record<ProjectCategory, string> = {
  backend: "Backend", frontend: "Frontend", mobile: "Mobile",
};

export const projects: Project[] = [
  {
    id: "planup", title: "PlanUp", subtitle: "함께 만드는 목표 달성 습관",
    description: "친구와 목표를 공유하고 서로의 도전을 응원하는 목표 달성 앱입니다. 백엔드 개발과 DB 설계를 맡아 친구 관계와 계정 인증 기능을 구현했습니다.",
    category: "backend", period: "2025.06 — 2025.08", team: "10명 · Backend 4 / Android 4 / Design 1 / PM 1",
    role: "백엔드 개발 · DB 설계", tags: ["Spring Boot", "JPA", "MySQL", "Redis"], featured: true,
    highlight: "친구 관계부터 인증까지, 일관된 데이터 흐름",
    contributions: [
      { title: "친구 관계 관리", description: "친구 신청·수락·차단의 상태 변화와 양방향 관계 조회를 구현하고, 중복되는 친구 데이터를 제거했습니다." },
      { title: "인증 로직 공통화", description: "@CurrentUser와 ArgumentResolver로 반복되는 인증 처리를 분리했습니다. 사용자 ID만 필요한 요청은 JWT에서 값을 반환해 불필요한 DB 조회를 줄였습니다." },
      { title: "계정 보안과 데이터 정리", description: "이메일 인증과 비밀번호 재설정 토큰을 Redis TTL로 관리했습니다. 탈퇴 시 사용자 정보는 비활성화하고 친구 관계 데이터는 삭제하도록 처리했습니다." },
    ],
    github: "https://github.com/UMC-Plan-up/Plan-up-server",
    demo: { label: "시연 영상", url: "https://www.youtube.com/watch?v=LVKu9gYQQ-k" },
    image: "/projects/planup.webp", imageAlt: "함께하는 목표달성 앱 Plan-Up 공식 배너", color: "#279CEB",
  },
  {
    id: "pms", title: "기업용 PMS", subtitle: "프로젝트에 맞는 개발자를 연결하다",
    description: "SI 기업의 프로젝트와 인력을 관리하고 적합한 개발자를 추천하는 시스템입니다. 100만 건의 테스트 데이터를 바탕으로 데이터 모델링과 조회 성능을 개선했습니다.",
    category: "backend", period: "2025.10 — 2025.12", team: "4명 · Backend 2 / Frontend 2",
    role: "백엔드 개발 · DB 설계 · 배포", tags: ["Spring Boot", "MySQL", "JPA", "Railway"], featured: true,
    highlight: "100만 건 테스트 데이터 기반의 조회 최적화",
    contributions: [
      { title: "확장성을 고려한 데이터 설계", description: "직원과 직무별 정보를 슈퍼·서브타입으로 구분했습니다. 평가 데이터는 조회 패턴을 고려해 반정규화하고 조인 비용을 줄였습니다." },
      { title: "기간 조회 최적화", description: "100만 건의 더미 데이터를 적재하고 실행 계획을 분석했습니다. 시작일 기준 B-Tree 인덱스를 적용해 전체 테이블 조회를 범위 조회로 개선했습니다." },
      { title: "개발자 추천과 배포", description: "기본·기술·평가 점수를 가중 합산해 프로젝트에 적합한 개발자를 추천했습니다. Railway에서 Spring Boot와 MySQL을 연결하고 배포 환경을 구성했습니다." },
    ],
    github: "https://github.com/mju-db-design-2025/Backend", color: "#FF8C42",
  },
  {
    id: "playground", title: "놀이터백과", subtitle: "안심하고 놀 수 있는 곳을 찾다",
    description: "놀이터와 주변 안전시설, 날씨와 대기질을 지도에서 함께 확인하는 위치 기반 앱입니다. 2인 팀에서 서비스 기획과 UI 설계에 참여하고 앱 개발을 전담했습니다.",
    category: "mobile", period: "2024.10 — 2024.11", team: "2명", role: "기획 · UI 설계 · 앱 개발",
    tags: ["React Native", "Expo", "공공데이터 API"], featured: true,
    highlight: "제3회 오픈데이터포럼 해커톤 최우수상",
    contributions: [
      { title: "공공데이터를 하나의 지도에", description: "놀이터 시설·안전검사·보험 정보와 어린이보호구역 등 주변 안전 정보를 사용자 위치를 기준으로 통합했습니다." },
      { title: "야외 활동 정보 제공", description: "날씨와 대기질 데이터를 함께 표시했습니다. 여러 API의 순차 호출로 발생하는 지연은 Promise.all을 통한 병렬 처리로 개선했습니다." },
      { title: "현장에서 확인한 사용 경험", description: "직접 놀이터를 방문해 위치와 정보의 정확성, 사용 흐름을 점검했습니다. 제3회 오픈데이터포럼 해커톤에서 최우수상을 수상했습니다." },
    ],
    github: "https://github.com/OrangeKim04/PLAYGROUND", image: "/projects/playground.png", imageAlt: "놀이터백과의 놀이터 그래픽", color: "#78BB9D",
  },
  {
    id: "okii", title: "Okii", subtitle: "첫 만남의 어색함을 대화로",
    description: "공통 관심사와 게임을 통해 자연스러운 대화를 돕는 실시간 아이스브레이킹 웹 서비스입니다. 프론트엔드 화면과 실시간 데이터 연동, 자동 배포 환경을 담당했습니다.",
    category: "frontend", period: "2025.03 — 2025.07", role: "프론트엔드 개발 · CI/CD",
    tags: ["React", "TypeScript", "STOMP", "GitHub Actions"],
    highlight: "실시간 상호작용과 환경별 자동 배포",
    contributions: [
      { title: "대화의 흐름을 연결하는 화면", description: "채팅방 초대·입장부터 투표, 진행률, 힌트와 토론, 결과 요약까지 게임 모드별 화면 흐름을 구현했습니다." },
      { title: "실시간 상태 연동", description: "STOMP와 SockJS로 서버 데이터를 연결했습니다. 화면 전환 시 게임 모드 누락을 추적하고 검증과 예외 처리를 추가했습니다." },
      { title: "개발·운영 배포 자동화", description: "GitHub Actions와 Nginx로 브랜치별 빌드·배포 흐름을 구성하고, 개발과 운영 환경의 API 주소 및 배포 대상을 분리했습니다." },
    ],
    github: "https://github.com/IT-s-Time-6Team/FE", image: "/projects/okii.svg", imageAlt: "Okii의 대화 카드 그래픽", color: "#E9A0B5",
  },
  {
    id: "seohaeng", title: "서행", subtitle: "서울을 천천히 발견하는 여행",
    description: "공공데이터를 활용해 서울 관광 정보를 안내하는 안드로이드 앱입니다. 2025 관광데이터 활용 공모전 프로젝트에서 프론트엔드 개발과 스토어 배포의 기술 과정을 담당했습니다.",
    category: "mobile", period: "2025.05 — 2025.10", team: "5명 · Backend 2 / Frontend 1 / 기획 1 / Design 1",
    role: "프론트엔드 개발 · 앱 배포", tags: ["React Native", "Expo", "TypeScript", "EAS"],
    highlight: "관광 정보 연동부터 Android 출시까지",
    contributions: [
      { title: "관광 정보와 위치 기반 탐색", description: "백엔드에서 제공하는 관광 데이터 API를 앱 화면에 연동하고, 위치 기반으로 정보를 탐색하는 기능을 구현했습니다." },
      { title: "외부 서비스 통합", description: "WebView를 활용해 카카오 로그인과 지도를 연동하고 네이티브 앱 안에서 외부 서비스를 사용할 수 있도록 구성했습니다." },
      { title: "스토어 출시 지원", description: "Android AAB 생성, 서명, API 키 설정 등 배포 과정을 담당했습니다. 기획자에게 산출물과 가이드를 제공해 Google Play 출시를 함께 완료했습니다." },
    ],
    github: "https://github.com/SeoHaeng/SeoHaeng_FE", color: "#A5A0E8",
  },
  {
    id: "zeropick", title: "ZeroPick", subtitle: "더 쉽게 이해하는 대체당 정보",
    description: "상품 촬영으로 영양 성분과 대체당 정보를 확인하고 AI 레시피를 추천받는 웹 서비스입니다. 캡스톤 디자인 팀장으로 일정과 디자인을 관리하고 주요 화면을 개발했습니다.",
    category: "frontend", period: "2025.04 — 2025.05", team: "5명 · Frontend 2 / Backend 3",
    role: "팀장 · 프론트엔드 개발 · UI/UX", tags: ["React", "TypeScript", "Vite", "Vercel"],
    highlight: "기획·디자인·개발을 연결한 팀 프로젝트",
    contributions: [
      { title: "핵심 기능의 프론트엔드 구현", description: "OCR 촬영·분석, 상품 검색, AI 레시피, 마이페이지 화면과 API 연동을 담당했습니다." },
      { title: "일관된 디자인과 배포", description: "로고와 컬러, UI 컴포넌트를 설계하고 Vercel 기반 배포 환경을 구성했습니다." },
      { title: "팀의 개발 과정 지원", description: "기획부터 개발까지 일정을 관리했습니다. React·Git 교육과 페어 프로그래밍을 통해 팀원의 개발 참여를 도왔습니다." },
    ],
    github: "https://github.com/capstoneMJU/frontend", image: "/projects/zeropick.svg", imageAlt: "ZeroPick 공식 로고", color: "#A8CB74",
  },
];

export function getProject(id: string) {
  return projects.find(project => project.id === id);
}
