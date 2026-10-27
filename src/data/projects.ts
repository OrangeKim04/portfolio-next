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
  period?: string;
  startDate?: string;
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
  sources?: { label: string; url: string }[];
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
    "features": [
      {
        "title": "Notion 글 검색·분류",
        "description": "Notion의 공개 상태와 카테고리 속성으로 글을 분류합니다. 제목 검색과 무한 스크롤로 글을 탐색하고, 상세 화면에서는 Markdown 본문과 목차를 확인합니다."
      },
      {
        "title": "프로젝트 소개와 근거 링크",
        "description": "프로젝트별 주요 기능·담당 역할·기술 스택·문제 해결 과정을 정적 데이터로 관리하고, 분야 필터와 GitHub 링크로 연결합니다."
      },
      {
        "title": "조회수·좋아요와 댓글",
        "description": "글 콘텐츠와 분리한 libSQL DB에 조회수·좋아요를 저장합니다. 브라우저 저장소로 조회·좋아요 상태를 유지하고, 댓글은 Giscus와 GitHub Discussions를 연결합니다."
      }
    ],
    "id": "portfolio",
    "title": "개인 포트폴리오 & 기술 블로그",
    "subtitle": "개발 경험과 기록을 한곳에",
    "description": "Notion을 글 작성 공간으로 사용하고, 프로젝트 소개와 기술 블로그를 함께 제공하는 개인 웹사이트입니다. 글 본문은 Notion에서 가져오고 조회수·좋아요는 별도 DB에서 관리합니다. AI 코딩 도구를 활용해 구현과 검증을 진행했으며, 개선 전후 측정 스크립트와 결과를 저장소에 남겼습니다.",
    "category": "fullstack",
    "activity": "개인 프로젝트",
    "role": "AI 도구를 활용한 풀스택 개발 · 콘텐츠 구성 · 배포",
    "tags": [
      "Next.js",
      "TypeScript",
      "Notion API",
      "tRPC"
    ],
    "highlight": "Notion 목록 조회 요청 12회 → 1회 · 실측 조건 공개",
    "contributions": [
      {
        "title": "콘텐츠와 사용자 반응 데이터 분리",
        "description": "Notion API 응답을 공통 글 모델로 변환하고 notion-to-md로 본문을 렌더링했습니다. 조회수·좋아요는 Drizzle ORM과 libSQL로 별도 관리하며, tRPC·SuperJSON으로 클라이언트와 서버의 타입 및 날짜 직렬화를 연결했습니다."
      },
      {
        "title": "목록 조회와 캐시 단위 정리",
        "description": "목록과 전체 개수를 같은 조회 결과에서 계산해 하나의 unstable_cache 항목으로 저장했습니다. 목록·상세는 60초, 카테고리는 300초 재검증 설정을 사용하며, 목록에서 표시하지 않는 요약 생성용 본문 호출을 제거했습니다."
      },
      {
        "title": "재현 가능한 측정과 배포 검증",
        "description": "AI 도구로 기준 커밋과 개선 코드를 비교하는 스크립트를 작성하고 실제 Notion 응답으로 호출 수와 처리 시간을 기록했습니다. dev Preview 배포 뒤 목록·마지막 페이지·카테고리를 확인하는 스모크 테스트를 추가하고, 검증 후 main 운영 배포를 진행했습니다."
      }
    ],
    "stack": [
      {
        "label": "화면",
        "items": [
          "Next.js 16",
          "React 19",
          "TypeScript",
          "Tailwind CSS",
          "Framer Motion",
          "Three.js"
        ]
      },
      {
        "label": "API·데이터",
        "items": [
          "tRPC",
          "TanStack Query",
          "Notion API",
          "notion-to-md",
          "libSQL",
          "Drizzle ORM"
        ]
      },
      {
        "label": "운영",
        "items": [
          "Vercel",
          "GitHub Actions",
          "Git"
        ]
      }
    ],
    "troubleshooting": [
      {
        "title": "숨겨진 요약과 중복 조회로 발생한 외부 API 호출",
        "problem": "글 10개 목록을 가져올 때 목록·개수 조회 2회와 화면에서 숨겨진 요약 생성용 본문 조회 10회가 발생했습니다.",
        "approach": "AI 도구를 활용해 자동 요약용 본문 요청을 제거하고 목록·개수 조회와 캐시를 통합했습니다. 실제 데이터 22개에서 첫 페이지 10개를 전후 각 10회, 순서를 번갈아 측정했습니다.",
        "result": "실측에서 Notion 요청은 12회에서 1회로 감소했습니다. Next 캐시를 제외한 조회 함수의 중앙값은 928ms에서 336ms로 줄었습니다. 전체 페이지 로딩 시간이나 운영 트래픽 성능을 측정한 수치는 아닙니다.",
        "reference": {
          "label": "측정 조건과 원본 결과",
          "url": "https://github.com/OrangeKim04/portfolio-next/blob/d137e0d416d051e45235a106b3eed5b351088ae9/docs/benchmarks/notion-list.md"
        }
      },
      {
        "title": "Vercel 업로드에서 소스 폴더가 제외된 빌드 실패",
        "problem": "로컬 DB 폴더를 제외하려던 .vercelignore의 data/ 규칙이 src/data까지 제외해 원격 빌드에서 프로젝트 모듈을 찾지 못했습니다.",
        "approach": "제외 경로를 /data/로 한정하고 Preview 명령 실패 시에도 오류 출력이 남도록 workflow를 수정했습니다.",
        "result": "소스 데이터가 배포에 포함되도록 수정했고, 수정 커밋의 Preview 배포 성공을 확인했습니다.",
        "reference": {
          "label": "배포 제외 경로 수정 커밋",
          "url": "https://github.com/OrangeKim04/portfolio-next/commit/62abd4c9ee6e2dd23b75f8c70690a30779a2684b"
        }
      }
    ],
    "github": "https://github.com/OrangeKim04/portfolio-next",
    "demo": {
      "label": "운영 사이트",
      "url": "https://portfolio-next-flame-seven.vercel.app"
    },
    "color": "#FF8C42",
    "wordmark": "dev.gyuri",
    "visualLabel": "BUILD · WRITE · SHARE",
    "sources": [
      {
        "label": "README · 기능과 데이터 구조",
        "url": "https://github.com/OrangeKim04/portfolio-next/blob/d137e0d416d051e45235a106b3eed5b351088ae9/README.md"
      },
      {
        "label": "블로그 라우터 · 캐시와 조회 분리",
        "url": "https://github.com/OrangeKim04/portfolio-next/blob/d137e0d416d051e45235a106b3eed5b351088ae9/src/server/routers/blog.ts"
      },
      {
        "label": "개선·검증 PR #18",
        "url": "https://github.com/OrangeKim04/portfolio-next/pull/18"
      }
    ]
  },
  {
    "features": [
      {
        "title": "객체 생성과 사용 책임 분리",
        "description": "회원·주문·할인 정책 예제로 구체 구현에 의존하는 구조를 분석하고, 설정 클래스와 생성자 주입을 통해 구현체 선택을 서비스 코드에서 분리했습니다."
      },
      {
        "title": "빈 조회·싱글톤·생명주기 실습",
        "description": "빈 조회와 주입, 컴포넌트 스캔, 싱글톤·프로토타입 스코프를 테스트 코드로 다룹니다. 공유 객체가 상태를 가질 때의 문제와 초기화·종료 시점을 학습합니다."
      },
      {
        "title": "스코프가 다른 빈의 연결",
        "description": "싱글톤과 요청·프로토타입 스코프의 생명주기 차이를 다루고, Provider 지연 조회와 scoped proxy로 실제 사용 시점에 객체를 연결하는 방식을 학습합니다."
      },
      {
        "title": "웹 요청 처리와 JPA 확장",
        "description": "Servlet/JSP부터 Spring MVC 요청·응답, Thymeleaf 상품 관리와 PRG 패턴, jpashop의 도메인 모델·JPA 연동까지 모듈별로 실습합니다. 출시 서비스가 아닌 학습 저장소입니다."
      }
    ],
    "id": "spring-study",
    "title": "Spring Study Archive",
    "subtitle": "직접 구현하며 이해하는 Spring의 원리",
    "description": "회원·주문·할인 정책 예제를 만들며 Spring의 의존성 주입과 객체 설계를 공부한 저장소입니다. 순수 Java로 객체를 연결해 본 뒤 같은 코드를 Spring 컨테이너로 옮겼고, MVC와 JPA 예제로 학습 범위를 넓혔습니다.",
    "category": "backend",
    "activity": "개인 학습 프로젝트 · Spring 핵심 원리",
    "role": "Java·Spring 예제 구현 및 리팩터링",
    "tags": [
      "Java",
      "Spring",
      "Spring MVC",
      "JPA"
    ],
    "highlight": "정책 변경에 유연한 객체 설계와 의존성 주입",
    "contributions": [
      {
        "title": "생성과 실행 책임의 분리",
        "description": "회원·주문·할인 정책 예제에서 구현 객체를 직접 선택하는 구조를 분석했습니다. AppConfig에 객체 생성과 연결 책임을 모으고 서비스는 생성자로 의존성을 받도록 변경했습니다."
      },
      {
        "title": "Spring 컨테이너로의 전환",
        "description": "순수 Java 설정을 ApplicationContext로 이관했습니다. @Configuration과 컨테이너의 싱글톤 관리, IoC와 DI의 동작을 비교하며 학습했습니다."
      },
      {
        "title": "웹 계층과 데이터 계층 실습",
        "description": "저장소를 core·servlet·springmvc·item-service·jpashop 모듈로 나누어 관리했습니다. Servlet/JSP, MVC 요청·응답, Thymeleaf 상품 관리, PRG 패턴과 JPA 도메인 설계를 학습했습니다."
      }
    ],
    "stack": [
      {
        "label": "백엔드",
        "items": [
          "Java",
          "Spring",
          "Spring Boot",
          "Spring MVC",
          "JPA"
        ]
      },
      {
        "label": "웹·도구",
        "items": [
          "Servlet",
          "JSP",
          "Thymeleaf",
          "Gradle",
          "IntelliJ IDEA"
        ]
      }
    ],
    "troubleshooting": [
      {
        "title": "할인 정책 변경이 주문 서비스 수정으로 이어지는 결합",
        "problem": "OrderServiceImpl이 구체 할인 정책을 직접 생성해, 정액 할인에서 정률 할인으로 바꿀 때 서비스 코드도 수정해야 했습니다. 인터페이스와 구현체에 동시에 의존하는 구조였습니다.",
        "approach": "구현체 선택을 AppConfig로 옮기고 생성자 주입으로 연결했습니다. 이후 Spring 컨테이너로 설정을 이관해 서비스가 DiscountPolicy 인터페이스에만 의존하도록 구성했습니다.",
        "result": "사용 영역과 구성 영역이 분리되어 할인 정책 변경을 설정에서 처리할 수 있게 됐습니다. 학습 예제를 통해 OCP·DIP와 의존성 주입의 관계를 확인했습니다."
      }
    ],
    "github": "https://github.com/OrangeKim04/spring-study-archive",
    "color": "#8EBE76",
    "wordmark": "Spring",
    "visualLabel": "LEARN · REFACTOR · UNDERSTAND",
    "sources": [
      {
        "label": "학습 모듈 구성",
        "url": "https://github.com/OrangeKim04/spring-study-archive/blob/4b0aa74bfbee6e49a60856716468621546e43a17/README.md"
      },
      {
        "label": "DI·싱글톤·스코프 학습 기록",
        "url": "https://github.com/OrangeKim04/spring-study-archive/blob/4b0aa74bfbee6e49a60856716468621546e43a17/core/README.md"
      }
    ]
  },
  {
    "features": [
      {
        "title": "자연어 질문과 금융 데이터",
        "description": "채팅 API로 질문을 받고 현재가·기업 정보·재무 정보·과거 시세·뉴스·투자 추천·애널리스트 정보·종목 검색 도구를 제공합니다."
      },
      {
        "title": "명확한 조회와 Agent 처리 분리",
        "description": "질문에서 종목과 조회 키워드를 찾으면 해당 도구를 직접 호출합니다. 직접 분기되지 않는 질문에는 Gemini와 LangChain Agent를 사용합니다."
      },
      {
        "title": "연동 상태와 도구 목록 확인",
        "description": "채팅 엔드포인트 외에 서버 상태와 사용 가능한 도구 목록을 확인하는 엔드포인트를 제공합니다. 프론트엔드와 금융 데이터 서버의 연동을 점검할 수 있습니다."
      }
    ],
    "id": "financial-agent",
    "title": "금융 데이터 LLM Agent",
    "subtitle": "주가·기업 정보·뉴스를 질문하는 금융 챗봇",
    "description": "자연어 금융 질문을 받아 Yahoo Finance 조회 도구와 LLM을 연결하는 Agent 서버입니다. 프론트엔드와 MCP 서버 사이의 중간 계층으로, 종목·조회 대상이 명확한 요청은 직접 조회하고 그 밖의 질문은 도구를 사용하는 Agent 경로로 처리합니다.",
    "category": "ai",
    "activity": "명지대학교 · 2025-2 공개소프트웨어실무",
    "role": "Agent 서버 구현",
    "tags": [
      "Gemini 2.5 Flash",
      "LangChain",
      "MCP",
      "ReAct"
    ],
    "highlight": "금융 데이터 조회 도구와 자연어 질문을 연결하는 Agent 서버",
    "contributions": [
      {
        "title": "프론트엔드·MCP 사이의 API 계층",
        "description": "FastAPI로 채팅·상태 확인·도구 목록 API를 구성하고 금융 데이터 조회 도구를 연결했습니다."
      },
      {
        "title": "질문별 실행 경로 구성",
        "description": "종목과 가격·재무·뉴스 등의 키워드가 확인되는 요청은 비동기 조회 도구로 분기했습니다. 다른 요청은 Gemini 2.5 Flash와 LangChain의 ReAct·AgentExecutor를 사용하는 경로로 처리했습니다."
      }
    ],
    "stack": [
      {
        "label": "Agent",
        "items": [
          "Python",
          "FastAPI",
          "Gemini 2.5 Flash",
          "LangChain",
          "AgentExecutor",
          "ReAct"
        ]
      },
      {
        "label": "연동",
        "items": [
          "MCP",
          "Yahoo Finance",
          "JSON",
          "비동기 Tool 호출"
        ]
      }
    ],
    "troubleshooting": [],
    "github": "https://github.com/MJU-OSS-2025",
    "color": "#89B8EC",
    "wordmark": "Finance AI",
    "visualLabel": "LIVE DATA · SELECTIVE REASONING",
    "sources": [
      {
        "label": "공개소프트웨어실무 팀 소개",
        "url": "https://github.com/MJU-OSS-2025/.github/blob/5f77d4eafb6fc21d400e68d60545ad1410ff3ded/profile/README.md"
      }
    ]
  },
  {
    "features": [
      {
        "title": "프로젝트 등록과 개발자 추천",
        "description": "발주처, 수행 기간, 요구 직무와 기술을 입력하면 프로젝트를 등록하고 적합도가 높은 개발자를 최대 5명 반환합니다. 각 후보의 추천 직무·점수·보유 기술·경력·평가 근거를 함께 제공합니다. 추천 결과가 실제 투입 인력으로 자동 등록되지는 않습니다."
      },
      {
        "title": "기간·상태별 프로젝트 탐색",
        "description": "전체·이번 달·이번 분기와 진행·완료 조건으로 프로젝트를 조회합니다. 상세에서는 참여 직원의 이름, 직무, 투입 기간과 보유 기술을 확인합니다."
      },
      {
        "title": "동료 평가 기록",
        "description": "평가 대상과 프로젝트를 지정하고 항목별 점수·서술형 내용을 저장합니다. 평가자별 작성 목록과 평가 상세를 조회할 수 있습니다."
      },
      {
        "title": "프로젝트 대시보드",
        "description": "전체 프로젝트 수, 진행·완료 비율과 중복을 제거한 투입 직원 수를 집계합니다."
      }
    ],
    "id": "pms",
    "title": "기업용 PMS",
    "subtitle": "프로젝트 요구 직무·기술에 맞는 개발자 추천",
    "description": "명지대학교 데이터베이스 설계 수업에서 만든 프로젝트·인력 평가 관리 API입니다. 프로젝트를 등록하면 경력·기술등급·보유 기술·직무별 평가를 조합해 적합도가 높은 개발자를 최대 5명 추천합니다. 프로젝트 목록과 투입 인력, 동료 평가를 조회할 수 있으며, 저는 프로젝트 등록·발주처 조회와 추천 사유의 정합성 개선을 담당했습니다.",
    "category": "backend",
    "activity": "명지대학교 · 2025-2 데이터베이스 설계 프로젝트",
    "role": "프로젝트 등록·발주처 조회 API · 개발자 추천 기능 개선",
    "tags": [
      "Java",
      "Spring Boot",
      "MySQL",
      "JPA"
    ],
    "featured": true,
    "highlight": "요구 직무·기술 기반 상위 5명 추천과 평가 근거 제공",
    "contributions": [
      {
        "title": "프로젝트 등록·발주처 조회",
        "description": "프로젝트 등록과 발주처 목록 조회 API를 구현했습니다. 요청 DTO·서비스·저장소를 연결하고 프로젝트에 필요한 직무와 기술 정보를 추천 처리에 전달했습니다."
      },
      {
        "title": "설명 가능한 추천 응답",
        "description": "추천 사유를 단일 문자열에서 평가 상세 목록으로 바꿨습니다. 해당 직무에서 받은 평가 항목명·점수·서술 내용을 응답에 담고, 기존 DB 컬럼에는 목록을 구분자로 연결해 저장하도록 처리했습니다."
      },
      {
        "title": "추천 사유의 대상 직원 필터링",
        "description": "참여 프로젝트에 속한 평가를 모두 가져오던 조회를 수정했습니다. 동료·PM·고객 평가의 평가 대상 직원 ID까지 확인해 추천받는 개발자 본인의 평가만 근거에 포함하도록 변경했습니다."
      }
    ],
    "stack": [
      {
        "label": "백엔드·데이터",
        "items": [
          "Java 17",
          "Spring Boot 4.0.0",
          "Spring Data JPA",
          "MySQL",
          "JPQL · Native SQL"
        ]
      },
      {
        "label": "문서·빌드",
        "items": [
          "SpringDoc OpenAPI",
          "Gradle",
          "Lombok"
        ]
      }
    ],
    "troubleshooting": [
      {
        "title": "추천 근거에 다른 직원의 평가가 포함되는 문제",
        "problem": "추천 사유를 만들 때 대상 개발자가 참여한 프로젝트 ID만으로 평가를 조회해, 같은 프로젝트의 다른 직원 평가까지 포함될 수 있었습니다.",
        "approach": "동료·PM·고객 평가 테이블을 연결한 쿼리에 평가 대상 직원 ID 조건을 추가했습니다. 추천 서비스도 프로젝트 ID와 직원 ID를 함께 받는 조회 메서드를 사용하도록 변경했습니다.",
        "result": "추천 사유 조회 범위를 해당 프로젝트에서 대상 개발자가 받은 평가로 제한했습니다. 추천 점수와 함께 전달하는 평가 근거가 다른 직원의 기록과 섞이지 않도록 수정했습니다.",
        "reference": {
          "label": "추천 사유 필터 수정 커밋",
          "url": "https://github.com/mju-db-design-2025/Backend/commit/b1c04d9855d2b7ff9ac3cc96e53e69d02241bb30"
        }
      }
    ],
    "github": "https://github.com/mju-db-design-2025/Backend",
    "color": "#FF8C42",
    "sources": [
      {
        "label": "기능·추천 기준 README",
        "url": "https://github.com/mju-db-design-2025/Backend/blob/d21cdddb3b50ef88e1f7a0bb9c703a1a3480f752/README.md"
      },
      {
        "label": "프로젝트 등록 구현",
        "url": "https://github.com/mju-db-design-2025/Backend/commit/0c2a1e83b14cb0ae8e65e653392ce8585c37e2a0"
      },
      {
        "label": "추천 사유 목록 구현",
        "url": "https://github.com/mju-db-design-2025/Backend/commit/701250a93f1fa6f59e7cdfa0cd3833b9025ca14e"
      }
    ]
  },
  {
    "features": [
      {
        "title": "목표 설정과 활동 인증",
        "description": "개인·친구·커뮤니티 목표를 생성하고 타이머 또는 사진으로 진행 상황을 기록합니다. 친구와 챌린지를 만들고 목표 달성을 함께 이어갑니다."
      },
      {
        "title": "친구 관계와 활동 확인",
        "description": "친구 신청·수락·거절·삭제·차단·신고를 지원합니다. 친구 목록에는 목표 수, 오늘의 활동 시간과 새 사진 인증 여부를 표시하고 신청·수락·거절에 맞는 알림을 생성합니다."
      },
      {
        "title": "계정과 마이페이지",
        "description": "프로필과 계정 정보를 확인하고 이메일 인증을 거쳐 이메일·비밀번호를 변경합니다. 기존 자체 가입 계정에 카카오 계정을 연결해 같은 사용자로 로그인할 수 있습니다."
      },
      {
        "title": "리포트와 배지",
        "description": "일간·주간 목표 달성 현황을 리포트로 확인하고 활동에 따른 배지를 받습니다."
      }
    ],
    "id": "planup",
    "title": "PlanUp",
    "subtitle": "친구와 목표를 정하고 활동을 인증하는 앱",
    "description": "학습·운동·독서 목표를 친구들과 공유하고 타이머나 사진으로 활동을 인증하는 소셜 플랫폼입니다. 목표·챌린지·리포트·배지 기능 가운데 친구 관계와 마이페이지 API를 맡았고, 이메일·비밀번호 변경과 기존 계정의 카카오 연동을 구현했습니다.",
    "category": "backend",
    "role": "친구 관리·마이페이지·계정 인증 API 개발",
    "tags": [
      "Spring Boot",
      "JPA",
      "MySQL",
      "Redis"
    ],
    "featured": true,
    "highlight": "친구 신청·차단, 이메일 인증과 비밀번호 재설정",
    "contributions": [
      {
        "title": "친구 관계의 상태 변화 처리",
        "description": "친구 신청·수락·거절·삭제·차단·신고 API를 구현하고 자기 자신에게 신청하거나 중복 신청하는 경우를 제한했습니다. 목록에 목표 수·활동 시간·사진 인증 여부를 실제 데이터로 연결하고, 신청·수락·거절 상황별 알림을 추가했습니다."
      },
      {
        "title": "인증 파라미터 처리 개선",
        "description": "@CurrentUser의 Long·User 파라미터를 모두 지원하도록 HandlerMethodArgumentResolver를 수정했습니다. Long 요청에는 JWT에서 얻은 사용자 ID를 반환하고, User 객체가 필요한 요청에만 저장소 조회를 수행합니다."
      },
      {
        "title": "이메일 인증과 계정 변경",
        "description": "이메일 변경 인증·재발송과 비밀번호 재설정 흐름을 구현했습니다. 로그인하지 않은 사용자도 이메일 인증 토큰으로 비밀번호를 바꿀 수 있도록 변경하고, 새 비밀번호와 확인값의 일치 여부를 검사했습니다."
      },
      {
        "title": "기존 계정의 카카오 연결",
        "description": "자체 가입 계정에 카카오 정보를 연결하고, 연결된 카카오 계정으로 로그인하면 기존 사용자로 인식하도록 구현했습니다. 중복 연동을 방지하는 오류 처리도 추가했습니다."
      }
    ],
    "stack": [
      {
        "label": "백엔드",
        "items": [
          "Java 17",
          "Spring Boot 3.3.4",
          "MySQL",
          "Gradle"
        ]
      },
      {
        "label": "인증·문서",
        "items": [
          "JWT",
          "Redis",
          "Swagger · OpenAPI"
        ]
      },
      {
        "label": "팀 운영 환경",
        "items": [
          "AWS EC2 · S3 · RDS",
          "GitHub Actions"
        ]
      }
    ],
    "troubleshooting": [
      {
        "title": "인증 사용자 ID를 받지 못하는 파라미터 처리 오류",
        "problem": "@CurrentUser Long userId를 사용하는 친구 API에서 사용자 ID가 null로 전달됐습니다. Resolver의 타입 검사 코드가 Long 대신 User를 비교하고 있었습니다.",
        "approach": "supportsParameter가 Long과 User를 모두 지원하도록 수정하고, 실제 반환값도 요청된 파라미터 타입에 따라 분기했습니다.",
        "result": "ID를 요청하는 API에는 사용자 ID를 직접 전달하고, 엔티티를 요청하는 경우에만 findById를 호출하도록 수정했습니다.",
        "reference": {
          "label": "인증 파라미터 수정 PR #61",
          "url": "https://github.com/UMC-Plan-up/Plan-up-server/pull/61"
        }
      },
      {
        "title": "이메일 변경 중 인증 토큰이 먼저 삭제되는 문제",
        "problem": "이메일 변경 인증 메일의 확인 버튼을 눌러도 인증에 실패했습니다. 변경을 완료하기 전에 토큰을 삭제하는 순서가 원인이었습니다.",
        "approach": "토큰을 이메일 변경 완료 후에 삭제하도록 처리 순서를 수정했습니다.",
        "result": "이메일 변경에 필요한 토큰을 처리 완료 시점까지 유지하도록 인증 흐름을 바로잡았습니다.",
        "reference": {
          "label": "토큰 삭제 시점 수정 PR #115",
          "url": "https://github.com/UMC-Plan-up/Plan-up-server/pull/115"
        }
      }
    ],
    "github": "https://github.com/UMC-Plan-up/Plan-up-server",
    "image": "/projects/planup.webp",
    "imageAlt": "함께하는 목표달성 앱 Plan-Up 공식 배너",
    "color": "#279CEB",
    "sources": [
      {
        "label": "서비스 기능 README",
        "url": "https://github.com/UMC-Plan-up/Plan-up-server/blob/763cc88e1f247c793746eacf0acecaa31e77d7bf/README.md"
      },
      {
        "label": "친구 알림 PR #132",
        "url": "https://github.com/UMC-Plan-up/Plan-up-server/pull/132"
      },
      {
        "label": "카카오 계정 연결 PR #136",
        "url": "https://github.com/UMC-Plan-up/Plan-up-server/pull/136"
      }
    ]
  },
  {
    "features": [
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
    "dataSources": [
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
    "id": "seohaeng",
    "title": "서행",
    "subtitle": "책방과 독서 스팟을 찾아 떠나는 강원도 여행",
    "description": "강원도의 독립서점·북카페·북스테이를 찾아 여행하고, 책 읽기 좋은 장소와 감상을 기록하는 모바일 앱입니다. 이정표에서 장소를 탐색하고, 공간책갈피로 독서 경험을 공유하며, 북챌린지와 날짜별 여행 일정으로 이어지는 흐름을 제공합니다. React Native 앱과 WebView 지도를 연결하고 지도 조회·선택 상태 복원·인증 흐름을 구현했습니다.",
    "category": "mobile",
    "period": "2025.05.19 — 2025.09.18",
    "startDate": "2025-05-19",
    "role": "프론트엔드 개발",
    "tags": [
      "React Native",
      "Expo",
      "TypeScript",
      "EAS"
    ],
    "highlight": "강원도 책방 지도·독서 기록·여행 일정",
    "contributions": [
      {
        "title": "앱과 웹 지도의 이벤트 연결",
        "description": "React Native WebView 안에서 카카오 지도를 표시하고 메시지로 지도 이벤트와 앱 상태를 연결했습니다. 지도 경계를 위도·경도 범위로 변환해 장소를 조회하며, 유형별 SVG 마커와 선택한 장소의 정보를 함께 표시했습니다."
      },
      {
        "title": "지도 조회 제어와 선택 상태 복원",
        "description": "지도 범위 변경 후 1초 동안 추가 변경이 없을 때 마커를 조회하도록 타이머를 정리했습니다. 필요한 장소 유형은 Promise.all로 병렬 조회하고, 관광지·음식점·축제는 선택한 필터에 대해서만 요청했습니다. Context에 선택 위치와 활성 마커를 저장해 검색·상세 화면에서 돌아온 뒤 다시 선택하도록 연결했습니다."
      },
      {
        "title": "인증 저장·복원과 재시도",
        "description": "소셜 로그인 인가 코드를 서버에 전달하고 신규 회원 여부에 따라 화면을 분기했습니다. AsyncStorage에 인증 정보를 저장하고 AuthProvider에서 복원합니다. 공통 인증 요청 함수에는 403 응답 시 토큰을 재발급받고 원래 요청을 한 번 다시 보내는 경로를 구성했습니다."
      },
      {
        "title": "여행 일정과 사진 기록의 데이터 구성",
        "description": "날짜별 장소·좌표·방문 순서를 일정 요청 모델로 변환하고, 번호 마커와 점선으로 등록 순서를 표시했습니다. 공간책갈피·리뷰·북챌린지는 이미지와 JSON을 FormData로 전송하고, 도서 검색 화면을 기록 용도에 따라 재사용했습니다."
      }
    ],
    "stack": [
      {
        "label": "앱·상태",
        "items": [
          "React Native 0.79",
          "Expo SDK 53",
          "TypeScript",
          "Expo Router",
          "React Context",
          "AsyncStorage"
        ]
      },
      {
        "label": "지도·기기",
        "items": [
          "Kakao Maps JavaScript SDK",
          "React Native WebView",
          "expo-location",
          "expo-image-picker",
          "react-native-svg"
        ]
      },
      {
        "label": "통신·빌드",
        "items": [
          "Fetch API",
          "FormData",
          "OAuth 인가 코드 연동",
          "EAS Build"
        ]
      }
    ],
    "troubleshooting": [
      {
        "title": "지도 이동 중 반복되는 장소 조회",
        "problem": "지도를 이동하거나 확대·축소하면 표시 범위가 연속으로 변경되어 마커 조회가 반복되는 경로가 있었습니다.",
        "approach": "useRef에 타이머를 보관하고 범위가 다시 바뀌면 기존 예약을 취소했습니다. 마지막 변경 뒤 1초 후에 범위·필터에 맞는 장소를 조회하고, effect 정리 시 타이머도 해제했습니다.",
        "result": "해당 조회 경로에서 연속 범위 변경을 마지막 변경 이후의 요청으로 묶었습니다.",
        "reference": {
          "label": "디바운싱 도입 커밋",
          "url": "https://github.com/SeoHaeng/SeoHaeng_FE/commit/f5cfc8a684a5c3af4910363c5963d8004851925d"
        }
      },
      {
        "title": "지도로 돌아왔을 때 선택한 장소 복원",
        "problem": "검색·상세 화면을 오갈 때 선택한 장소와 지도 위치를 이어서 보여줄 상태 관리가 필요했습니다.",
        "approach": "선택 좌표·활성 마커 ID·클릭한 장소 정보를 Context로 공유하고, 마커 조회가 끝난 뒤 선택한 마커를 다시 찾아 지도 활성화 명령과 연결했습니다.",
        "result": "화면 전환과 비동기 마커 로드를 거쳐 선택 상태를 복원하는 경로를 구성했습니다. 이 상태는 실행 중 메모리에 유지되며 앱 재시작 복원을 뜻하지 않습니다.",
        "reference": {
          "label": "선택 상태 복원 커밋",
          "url": "https://github.com/SeoHaeng/SeoHaeng_FE/commit/aaefb3b"
        }
      }
    ],
    "demo": {
      "label": "Google Play",
      "url": "https://play.google.com/store/apps/details?id=com.gyurijake.seohaengfe"
    },
    "github": "https://github.com/SeoHaeng/SeoHaeng_FE",
    "color": "#A5A0E8",
    "sources": [
      {
        "label": "프론트엔드 README",
        "url": "https://github.com/SeoHaeng/SeoHaeng_FE/blob/a9f694035705e307c709da5882acbbed8779c4d5/README.md"
      },
      {
        "label": "서비스 소개·외부 API",
        "url": "https://github.com/SeoHaeng/SeoHaeng_BE/blob/2343e587f1c5e581814eb33120ab9e14498980f5/README.md"
      }
    ]
  },
  {
    "features": [
      {
        "title": "이미지 영역 선택과 OCR 분석",
        "description": "사진에서 원재료 영역을 잘라 업로드하고 상품명·제조사를 확인한 뒤 영양성분과 감미료를 조회합니다. 스캔에 실패하면 품목제조보고번호를 직접 입력해 조회를 이어갑니다."
      },
      {
        "title": "식품 검색과 영양정보 비교",
        "description": "검색어별 식품 목록을 스크롤로 추가 조회합니다. 식품 상세에서 영양성분 함량·기준치 비율과 감미료의 분류·열량·GI 지수·설명 등을 확인합니다."
      },
      {
        "title": "재료 기반 레시피 추천·저장",
        "description": "입력한 재료로 추천 목록을 받은 뒤 선택한 레시피의 조리 단계를 생성합니다. 레시피를 저장하고 최근 저장 목록에서 다시 확인합니다."
      },
      {
        "title": "제로식품 커뮤니티",
        "description": "상품 리뷰·레시피·자유 게시판에서 이미지와 글을 공유하고 댓글·답글로 소통합니다. 커뮤니티는 다른 프론트엔드 팀원의 담당 영역입니다."
      }
    ],
    "id": "zeropick",
    "title": "ZeroPick",
    "subtitle": "사진으로 확인하는 제로식품 성분과 대체당",
    "description": "식품 원재료 이미지를 분석하고 영양성분·대체당 정보와 재료 기반 레시피를 탐색하는 모바일 중심 웹 서비스입니다. 프론트엔드 팀장으로 OCR·레시피·사용자 기능을 담당했습니다. OCR 인식과 감미료 매칭, 레시피 생성은 백엔드 API로 제공받고 이미지 전처리·결과 표시·실패 후 대체 입력을 연결했습니다.",
    "category": "frontend",
    "activity": "캡스톤디자인 4조",
    "team": "5명 · Frontend 2 / Backend 3",
    "role": "프론트엔드 팀장 · OCR·레시피·사용자 기능",
    "tags": [
      "React",
      "TypeScript",
      "Vite",
      "Vercel"
    ],
    "highlight": "식품 OCR 분석·상품 검색·AI 레시피",
    "contributions": [
      {
        "title": "OCR 실패 후에도 이어지는 분석 흐름",
        "description": "react-cropper로 선택한 영역을 Blob으로 변환해 FormData로 전송했습니다. OCR 오류의 detail을 useRef에 보관하고 품목제조보고번호로 상품을 다시 찾은 뒤 후속 확인 요청의 ocrText에 전달했습니다."
      },
      {
        "title": "영양성분 표시 로직 재사용",
        "description": "API 응답을 단위·기준치 비율·들여쓰기 정보를 가진 행 데이터로 변환하고 TanStack Table로 표시했습니다. OCR 결과와 검색 상세가 영양성분표·감미료 카드·저장 컴포넌트를 공유하도록 구성했습니다."
      },
      {
        "title": "추천과 상세 생성을 구분한 레시피 조회",
        "description": "재료 기반 추천 목록과 선택한 레시피의 상세 생성 요청을 나눴습니다. 입력 재료·추천 결과와 생성한 상세를 sessionStorage에 보관해 같은 조건으로 재진입할 때 재사용하며, 저장된 레시피는 ID로 조회합니다."
      },
      {
        "title": "응답 오류를 호출부에 전달하는 요청 함수",
        "description": "쿠키를 포함하는 customFetch에서 JSON·문자열·빈 응답을 처리하고 401이면 로그인 화면으로 이동하도록 구성했습니다. 실패 응답의 상태·상세를 호출부에 전달해 OCR 화면의 수동 조회와 연결했습니다."
      }
    ],
    "stack": [
      {
        "label": "프론트엔드",
        "items": [
          "React 19",
          "TypeScript",
          "Vite",
          "React Router",
          "styled-components"
        ]
      },
      {
        "label": "데이터·입력",
        "items": [
          "TanStack Query",
          "Zustand",
          "React Hook Form",
          "Yup",
          "sessionStorage"
        ]
      },
      {
        "label": "이미지·시각화",
        "items": [
          "react-cropper",
          "TanStack Table",
          "Framer Motion",
          "Vercel"
        ]
      }
    ],
    "troubleshooting": [
      {
        "title": "OCR 실패 시 대체 입력으로 분석 이어가기",
        "problem": "원재료 이미지 스캔이 실패하더라도 사용자가 제품을 직접 식별해 분석을 이어갈 경로가 필요했습니다.",
        "approach": "오류 상세를 useRef에 보관하고 품목제조보고번호 입력을 표시했습니다. 번호로 상품을 조회한 뒤 오류 상세와 제품 식별 정보를 후속 확인 요청에 전달했습니다.",
        "result": "이미지 재업로드만 요구하지 않고 수동 제품 조회로 분석을 이어가는 경로를 구현했습니다.",
        "reference": {
          "label": "OCR 화면 구현",
          "url": "https://github.com/capstoneMJU/frontend/blob/e3c2d12dfea3ef2470a11edb40808bb53dbbbee3/ZeroPick/src/pages/Home/CameraPage.tsx"
        }
      }
    ],
    "github": "https://github.com/capstoneMJU/frontend",
    "image": "/projects/zeropick.svg",
    "imageAlt": "ZeroPick 공식 로고",
    "color": "#A8CB74",
    "sources": [
      {
        "label": "프론트엔드 README·구현 설명",
        "url": "https://github.com/capstoneMJU/frontend/blob/e3c2d12dfea3ef2470a11edb40808bb53dbbbee3/README.md"
      },
      {
        "label": "팀과 역할 분담",
        "url": "https://github.com/capstoneMJU/.github/blob/d860f7e41df8272f5f47dfacfbf3b61e69e9dda4/profile/README.md"
      }
    ]
  },
  {
    "features": [
      {
        "title": "키워드 · 공통 관심사 찾기",
        "description": "입력한 키워드를 실시간으로 전송하고, 방에서 정한 공감 인원 기준을 충족한 키워드를 공개합니다. 공통 키워드를 선택하면 관련 질문 카드를 넘기며 대화를 이어갈 수 있습니다."
      },
      {
        "title": "TMI · 주인공 맞히기",
        "description": "참여자의 TMI를 모은 뒤 힌트를 보고 주인공에게 투표합니다. 수집·투표 진행률과 서버가 전달한 남은 시간을 표시하고, 라운드 결과와 최종 정답·오답 통계를 보여줍니다."
      },
      {
        "title": "밸런스 · 선택과 토론",
        "description": "질문 공개, 토론, A/B 투표, 결과 확인 순서로 진행합니다. 선택 비율을 게이지로 표시하고 라운드별 점수·순위와 최종 요약을 제공합니다."
      },
      {
        "title": "초대와 결과 카드 저장",
        "description": "방 입장 링크를 복사하거나 QR 코드를 PNG로 저장합니다. 모드별 결과 카드도 길게 누르면 이미지로 저장할 수 있으며 마우스와 터치 입력을 함께 처리합니다."
      }
    ],
    "id": "okii",
    "title": "Okii",
    "subtitle": "키워드·TMI·밸런스 게임으로 시작하는 대화",
    "description": "키워드로 공통 관심사를 찾고, TMI 퀴즈와 밸런스 게임으로 대화를 이어가는 아이스브레이킹 웹 서비스입니다. 방에 입장한 참여자는 같은 게임 단계를 실시간으로 전달받고, 종료 후 결과를 요약 카드로 저장할 수 있습니다. 저는 투표·결과·요약 화면과 초대 모달, 서버 연동, 브랜치별 배포 설정을 담당했습니다.",
    "category": "frontend",
    "role": "프론트엔드 개발 · CI/CD",
    "tags": [
      "React",
      "TypeScript",
      "STOMP",
      "GitHub Actions"
    ],
    "highlight": "세 가지 게임의 실시간 투표와 결과 요약",
    "contributions": [
      {
        "title": "투표 화면의 REST·실시간 연동",
        "description": "TMI의 투표 정보 조회·제출·게임 상태 조회 API와 WebSocket을 연결했습니다. 입장 시 게임 진행 상태에 맞춰 이동하도록 수정하고, 투표 진행 화면과 결과·요약 화면을 구현했습니다."
      },
      {
        "title": "라운드 결과와 최종 요약",
        "description": "밸런스 투표 결과·랭킹·게임 요약 화면과 API를 연결했습니다. 라운드 진행 여부에 따라 다음 화면을 구분하고, 키워드·TMI·밸런스 결과를 각 모드의 요약 카드로 구성했습니다."
      },
      {
        "title": "초대·종료 흐름과 이미지 저장",
        "description": "초대 링크·QR 모달, 방 만료 안내와 종료 요약 모달을 구현했습니다. 요약 카드의 DOM을 html2canvas로 캡처해 PNG로 저장하고, 초대 링크는 개발·운영 환경에 맞게 분기했습니다."
      },
      {
        "title": "브랜치별 배포 구성",
        "description": "GitHub Actions에서 main·develop을 대상으로 의존성 설치, 타입 검사와 빌드, SSH/SCP 전송을 수행하도록 설정했습니다. Mac mini의 운영·개발 배포 디렉터리를 구분하는 워크플로를 추가했습니다."
      }
    ],
    "stack": [
      {
        "label": "화면·상태",
        "items": [
          "React 19",
          "TypeScript",
          "React Router DOM",
          "Zustand",
          "Emotion"
        ]
      },
      {
        "label": "통신·공유",
        "items": [
          "Axios",
          "STOMP.js",
          "SockJS",
          "html2canvas",
          "qrcode.react",
          "Swiper"
        ]
      },
      {
        "label": "빌드·협업",
        "items": [
          "Vite",
          "GitHub Actions",
          "SSH/SCP",
          "ESLint",
          "Prettier",
          "Husky",
          "Commitlint"
        ]
      }
    ],
    "troubleshooting": [
      {
        "title": "방 나가기 뒤 종료 화면으로 다시 이동하는 문제",
        "problem": "일반 참여자가 채팅방을 나가면 메인으로 이동한 뒤 종료 화면으로 다시 이동하는 문제가 PR에 기록되어 있었습니다. 종료 요약으로 이동할 때 방 식별자 전달 형태도 일치하지 않았습니다.",
        "approach": "연결 해제 시 이동 조건을 수정하고, 종료 이벤트 이후에는 useRef로 보관한 종료 상태를 확인해 후속 메시지 처리를 중단했습니다. 라우터 state의 roomKey 전달 형태를 맞추고 만료된 방에 재입장하면 만료 페이지로 보내도록 수정했습니다.",
        "result": "PR #32에서 일반 참여자의 나가기 흐름, 방 종료 안내, 요약 조회용 roomKey 전달과 만료 방 리다이렉션을 함께 수정했습니다.",
        "reference": {
          "label": "방 종료·리다이렉션 수정 PR #32",
          "url": "https://github.com/IT-s-Time-6Team/FE/pull/32"
        }
      }
    ],
    "github": "https://github.com/IT-s-Time-6Team/FE",
    "image": "/projects/okii.svg",
    "imageAlt": "Okii의 대화 카드 그래픽",
    "color": "#E9A0B5",
    "sources": [
      {
        "label": "기능·기술 README",
        "url": "https://github.com/IT-s-Time-6Team/FE/blob/67a9282ea14fc1404eabeedb5b24ce9c415c5ebf/README.md"
      },
      {
        "label": "TMI 투표·실시간 연동 PR #63",
        "url": "https://github.com/IT-s-Time-6Team/FE/pull/63"
      },
      {
        "label": "밸런스 결과·요약 PR #76",
        "url": "https://github.com/IT-s-Time-6Team/FE/pull/76"
      },
      {
        "label": "개발 배포 설정 PR #43",
        "url": "https://github.com/IT-s-Time-6Team/FE/pull/43"
      }
    ]
  },
  {
    "features": [
      {
        "title": "종류·증상별 돌봄 안내",
        "description": "소동물 종류에 맞는 특징·먹이·사육 환경·놀이 방법을 안내합니다. 체중 감소, 털 빠짐, 소변 이상 등 증상별 건강 관리 정보도 제공합니다."
      },
      {
        "title": "병원 지도와 리뷰",
        "description": "지도에서 소동물 진료 병원을 찾고 병원 상세와 리뷰를 확인하는 화면을 제공합니다. 병원찾기 하위 화면과 지도·서버 데이터 연동을 구현했습니다."
      },
      {
        "title": "Q&A·일상·주간 챌린지",
        "description": "질문과 일상 게시물을 목록·상세 화면에서 확인합니다. 주간 주제에 참여하는 챌린지와 활동 배지를 통해 소동물 돌봄 경험을 나누는 흐름을 구성했습니다."
      },
      {
        "title": "사용자·반려동물 프로필",
        "description": "마이페이지에서 사용자 프로필 조회·수정과 반려동물 프로필 등록·수정·삭제 API를 연결했습니다. 활동 목표 배지도 마이페이지에 표시합니다."
      }
    ],
    "id": "littlepet",
    "title": "리틀펫",
    "subtitle": "소동물 병원 찾기와 반려동물 건강 관리",
    "description": "소동물의 특징·먹이·사육 환경을 안내하고 건강 기록, 병원 검색, 커뮤니티를 제공하는 반응형 웹 프로젝트입니다. 프론트엔드 팀은 2명으로 구성됐으며, 저는 병원찾기 하위 화면, 커뮤니티 목록·상세와 API 연동, 사용자·반려동물 프로필 연동을 담당했습니다.",
    "category": "frontend",
    "activity": "UMC 소동물 돌봄 웹 프로젝트",
    "team": "Frontend 2명 · 한채연 / 김규리",
    "role": "프론트엔드 개발 · API 연동 · 반응형 UI",
    "tags": [
      "React",
      "TypeScript",
      "Vite",
      "Kakao Maps"
    ],
    "highlight": "병원 탐색부터 반려동물 프로필까지",
    "contributions": [
      {
        "title": "병원찾기 화면과 지도 연동",
        "description": "건강 영역의 병원찾기 하위 페이지를 구현하고 지도·병원 API를 연결했습니다. 서버 응답 변경에 맞춰 화면을 조정하는 과정은 지도 연동 PR에 기록했습니다."
      },
      {
        "title": "커뮤니티 탐색 화면",
        "description": "Q&A·일상·챌린지 페이지, 글 상세와 글 등록 버튼을 구현했습니다. 이후 커뮤니티 게시물 조회를 연결하고 마이페이지의 목표 배지 표시를 추가했습니다."
      },
      {
        "title": "프로필 API와 메뉴 상태",
        "description": "사용자 프로필 조회·수정과 반려동물 프로필 등록·수정·삭제를 연결했습니다. 메뉴 선택 표시는 클릭 상태 대신 현재 URL을 기준으로 계산하도록 바꾸고 반응형 레이아웃을 조정했습니다."
      }
    ],
    "stack": [
      {
        "label": "화면·지도",
        "items": [
          "React",
          "TypeScript",
          "Vite",
          "styled-components",
          "React Router",
          "react-kakao-maps-sdk"
        ]
      },
      {
        "label": "데이터·개발 도구",
        "items": [
          "Axios",
          "TanStack Query",
          "Zustand",
          "ESLint",
          "Prettier",
          "Yarn"
        ]
      }
    ],
    "troubleshooting": [
      {
        "title": "새로고침과 이동 후 어긋나는 메뉴 활성 상태",
        "problem": "메뉴 클릭 때만 갱신하는 상태를 기준으로 색상을 표시해, 새로고침이나 다른 경로의 페이지 이동 후 현재 메뉴와 표시가 일치하지 않았습니다.",
        "approach": "React Router의 useLocation을 사용해 현재 pathname과 메뉴 경로를 비교하도록 수정했습니다. 활성 색상과 표시선을 실제 URL에 맞춰 계산했습니다.",
        "result": "클릭 여부와 무관하게 현재 경로를 기준으로 메뉴가 표시되도록 수정하고 반응형 UI도 함께 조정했습니다.",
        "reference": {
          "label": "메뉴 상태 수정 PR #26",
          "url": "https://github.com/Little-pet/UMC_LittlePet_Front/pull/26"
        }
      }
    ],
    "github": "https://github.com/Little-pet/UMC_LittlePet_Front",
    "image": "/projects/littlepet.svg",
    "imageAlt": "리틀펫 공식 로고",
    "color": "#6EA8FE",
    "sources": [
      {
        "label": "서비스 소개·프론트엔드 팀 README",
        "url": "https://github.com/Little-pet/UMC_LittlePet_Front/blob/ec8b5590584312005f0dd8f745e9369435bac4ea/README.md"
      },
      {
        "label": "병원 하위 화면 PR #18",
        "url": "https://github.com/Little-pet/UMC_LittlePet_Front/pull/18"
      },
      {
        "label": "프로필 연동 PR #40",
        "url": "https://github.com/Little-pet/UMC_LittlePet_Front/pull/40"
      },
      {
        "label": "커뮤니티·목표 배지 PR #49",
        "url": "https://github.com/Little-pet/UMC_LittlePet_Front/pull/49"
      },
      {
        "label": "메뉴 상태 수정 PR #26",
        "url": "https://github.com/Little-pet/UMC_LittlePet_Front/pull/26"
      }
    ]
  },
  {
    "features": [
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
    "dataSources": [
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
    "id": "playground",
    "title": "놀이터백과",
    "subtitle": "놀이터 시설·검사·보험 정보를 지도 한곳에",
    "description": "놀이터의 위치뿐 아니라 안전검사·보험·주변 안전시설을 함께 확인하는 지도 기반 앱입니다. 공공데이터를 JSON으로 정리하고 시설번호로 결합해 마포구 놀이터 상세 정보를 구성했습니다. 날씨와 서울 지역 대기질을 표시하며 즐겨찾기에서 선택한 시설을 다시 지도에서 볼 수 있습니다.",
    "category": "mobile",
    "period": "2024.10.28 — 2024.11.08",
    "startDate": "2024-10-28",
    "activity": "2024 제3회 오픈데이터포럼(ODF) 해커톤",
    "team": "2명 · 김규리 / 장민주",
    "role": "앱 개발",
    "tags": [
      "React Native",
      "Expo",
      "공공데이터 API"
    ],
    "featured": true,
    "highlight": "제3회 ODF 해커톤 최우수상 · 한국지능정보사회진흥원장상",
    "contributions": [
      {
        "title": "시설번호로 공공데이터 결합",
        "description": "앱에 포함한 놀이시설·검사·보험 JSON에서 pfctSn이 같은 항목을 찾아 하나의 마커 정보로 구성했습니다. 시설 상세에는 주소·설치 정보·놀이기구와 검사·보험 정보를 표시했습니다."
      },
      {
        "title": "지도 탐색과 즐겨찾기 연결",
        "description": "시설 유형별 정보를 지도에 표시하고 상세 정보 패널을 연결했습니다. 즐겨찾기에서 선택한 시설을 지도에 전달해 해당 위치로 이동하고 상세 정보를 다시 표시하는 흐름을 구성했습니다."
      },
      {
        "title": "정적 시설 정보와 현재 환경 정보 구분",
        "description": "시설 정보는 정리한 JSON으로 제공하고, 현재 날씨는 OpenWeather, 대기질은 에어코리아의 서울 지역 조회 응답을 사용했습니다."
      }
    ],
    "stack": [
      {
        "label": "앱·UI",
        "items": [
          "React Native",
          "Expo"
        ]
      },
      {
        "label": "데이터",
        "items": [
          "놀이터 시설·안전검사·보험 정보",
          "안전지킴이집·어린이보호구역·경찰관서",
          "OpenWeather",
          "에어코리아",
          "JSON 데이터 정리"
        ]
      }
    ],
    "troubleshooting": [
      {
        "title": "서로 나뉜 시설·검사·보험 정보 연결",
        "problem": "놀이시설의 기본 정보와 안전검사·보험 정보가 별도 데이터로 제공되어 시설별 상세 화면에 함께 구성해야 했습니다.",
        "approach": "JSON으로 정리한 데이터에서 시설번호 pfctSn이 일치하는 검사·보험 항목을 찾아 놀이시설 정보와 결합했습니다.",
        "result": "선택한 놀이터의 기본 정보와 검사·보험 정보를 하나의 상세 패널에서 표시하도록 구성했습니다.",
        "reference": {
          "label": "데이터 결합 코드",
          "url": "https://github.com/OrangeKim04/PLAYGROUND/blob/0172e60366a50db129bf91eb8587555465676c47/pages/main.js"
        }
      }
    ],
    "github": "https://github.com/OrangeKim04/PLAYGROUND",
    "image": "/projects/playground.png",
    "imageAlt": "놀이터백과의 놀이터 그래픽",
    "color": "#78BB9D",
    "sources": [
      {
        "label": "프로젝트·기간·팀·수상·사용 데이터",
        "url": "https://github.com/OrangeKim04/PLAYGROUND/blob/0172e60366a50db129bf91eb8587555465676c47/README.md"
      },
      {
        "label": "지도·데이터 결합 구현",
        "url": "https://github.com/OrangeKim04/PLAYGROUND/blob/0172e60366a50db129bf91eb8587555465676c47/pages/main.js"
      }
    ]
  },
  {
    "features": [
      {
        "title": "검색과 카테고리 탐색",
        "description": "검색어로 영화를 찾고 인기작·높은 평점·개봉 예정·현재 상영 카테고리의 목록을 탐색합니다. 한국어 정보와 성인 콘텐츠 제외 조건을 사용하는 검색 요청을 작성했습니다."
      },
      {
        "title": "스크롤로 다음 목록 불러오기",
        "description": "useInfiniteQuery로 페이지별 응답을 관리하고 화면 하단 감지 시 다음 페이지를 요청합니다. 카테고리를 queryKey에 포함해 서로 다른 목록 데이터를 구분합니다."
      },
      {
        "title": "영화·출연진·추천 상세",
        "description": "영화 ID로 작품 정보와 출연진·제작진을 조회해 함께 표시합니다. 상세 조회 결과는 영화 ID별 queryKey로 관리하고 관련 추천 콘텐츠 화면을 구성했습니다."
      },
      {
        "title": "로그인·가입 입력 검증",
        "description": "React Hook Form과 Yup으로 이메일·비밀번호 입력을 검증합니다. 회원가입에서는 비밀번호 확인 값의 일치 여부를 검사하고 로컬 인증 서버에 가입 요청을 보냅니다."
      }
    ],
    "id": "movie-study",
    "title": "UMC 영화 탐색 사이트",
    "subtitle": "React로 익힌 검색과 서버 상태 관리",
    "description": "UMC 명지대학교 7기 Web 스터디의 개인 실습으로 만든 영화 탐색 사이트입니다. 주차별 과제에서 검색·카테고리 목록·상세 정보·입력 폼을 구현하고, 10주차에는 TypeScript 타입과 TanStack Query를 사용한 조회 훅을 구성했습니다.",
    "category": "frontend",
    "activity": "대학생 개발 연합동아리 UMC 7기 · Web 스터디",
    "team": "스터디 저장소 내 김규리 개인 실습 폴더",
    "role": "프론트엔드 학습 및 기능 구현",
    "tags": [
      "React",
      "TypeScript",
      "TanStack Query",
      "React Router"
    ],
    "highlight": "영화 탐색·인증·무한 스크롤 구현",
    "contributions": [
      {
        "title": "주차별 화면·라우팅 실습",
        "description": "개인 실습 디렉터리에서 영화 카드, 검색·목록·상세 페이지와 로그인·가입 폼을 구현했습니다. React Router로 화면을 연결하고 styled-components로 화면별 스타일을 구성했습니다."
      },
      {
        "title": "조회 훅과 서버 상태 관리",
        "description": "상세 조회에는 useQuery를 사용하고 영화 ID를 캐시 키에 포함했습니다. 목록은 useInfiniteQuery와 useInView를 연결해 추가 페이지를 불러오며, 로딩 중 여부와 다음 페이지 존재 여부를 확인하도록 구성했습니다."
      },
      {
        "title": "타입과 입력 검증",
        "description": "영화·출연진·목록 응답에 TypeScript 인터페이스를 정의했습니다. 로그인과 회원가입은 React Hook Form과 Yup 스키마를 연결해 입력 오류를 구분했습니다."
      }
    ],
    "stack": [
      {
        "label": "화면",
        "items": [
          "React",
          "TypeScript",
          "React Router",
          "styled-components",
          "Vite"
        ]
      },
      {
        "label": "데이터·입력",
        "items": [
          "TanStack Query",
          "Axios",
          "react-intersection-observer",
          "React Hook Form",
          "Yup"
        ]
      }
    ],
    "troubleshooting": [],
    "github": "https://github.com/OrangeKim04/7th_Web_B",
    "color": "#C1A6E8",
    "wordmark": "Movie",
    "visualLabel": "SEARCH · DISCOVER · LEARN",
    "sources": [
      {
        "label": "스터디 운영·참여자 README",
        "url": "https://github.com/OrangeKim04/7th_Web_B/blob/ea9938403d1be1084ba48cfc363bfbac29ad0684/README.md"
      },
      {
        "label": "김규리 10주차 구현",
        "url": "https://github.com/OrangeKim04/7th_Web_B/tree/ea9938403d1be1084ba48cfc363bfbac29ad0684/제이-김규리/10주차/미션/src"
      }
    ]
  }
];

// Only repository-documented start dates participate in chronological ordering.
// Undated entries follow dated entries without inventing a project duration.
export const projects = [...projectEntries].sort((a, b) => (b.startDate ?? "").localeCompare(a.startDate ?? ""));

export function getProject(id: string) {
  return projects.find(project => project.id === id);
}
