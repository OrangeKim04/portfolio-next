# GitHub 근거 검토 — Okii · LittlePet · 영화 스터디 · 금융 Agent

조회일: 2026-10-26. README뿐 아니라 사용자 OrangeKim04가 작성한 PR과 필요한 구현 파일을 대조했다. 프로젝트 상세의 기존 PDF·Notion 기반 서술은 이번 GitHub-only 기준에서 다시 검증했다. JSON의 null은 화면에서 삭제할 필드이며, 미확인 기간을 커밋 날짜로 대체하지 않는다.

2026-10-27 보완: LittlePet develop package.json의 React·TypeScript·styled-components·React Router·Kakao Maps SDK·Axios·TanStack Query·Zustand를 확인했다. 기존 Notion·Discord·Figma 협업 도구는 확인하지 못해 스택에서 제외했다. 금융 Agent main.py 이력은 OrangeKim04의 Initial commit(`87ead6d1632f6c37128a3b7366add9d3e3edf57b`)과 Gemini 변경(`014bfd110134ac437fdbbeca1f7afdf8d47180e4`)을 확인해 서버 구현 기여를 뒷받침한다. 기간이나 독점 설계 판단의 근거로 확장하지 않는다.

## Okii

- 최신 develop: `67a9282ea14fc1404eabeedb5b24ce9c415c5ebf`.
- [README](https://github.com/IT-s-Time-6Team/FE/blob/67a9282ea14fc1404eabeedb5b24ce9c415c5ebf/README.md)는 세 모드, REST 상태 조회+STOMP 이벤트, Zustand persist와 메모리 연결 객체 구분, 모드별 화면 재사용, 초대 QR와 html2canvas 이미지 저장을 상세 설명한다.
- 개인 기여: [#63](https://github.com/IT-s-Time-6Team/FE/pull/63) TMI 투표 UI/API/웹소켓 및 진행상태별 입장 이동; [#73](https://github.com/IT-s-Time-6Team/FE/pull/73) TMI 결과·요약·만료 페이지; [#76](https://github.com/IT-s-Time-6Team/FE/pull/76) 밸런스 결과·랭킹·요약; [#28](https://github.com/IT-s-Time-6Team/FE/pull/28) 초대·키워드·만료 모달; [#9](https://github.com/IT-s-Time-6Team/FE/pull/9) Portal 모달; [#34](https://github.com/IT-s-Time-6Team/FE/pull/34) Mac mini 배포; [#43](https://github.com/IT-s-Time-6Team/FE/pull/43) develop CI/CD.
- 실제 트러블슈팅: [#30](https://github.com/IT-s-Time-6Team/FE/pull/30)에 일반 참여자 나가기 후 종료 화면 재이동 문제가 기록되고, [#32](https://github.com/IT-s-Time-6Team/FE/pull/32), merge `e7edfc5d29150d3fe4279ac11efa89d1ff43948e`, 에 이동 조건·종료 상태 useRef·roomKey 전달·만료방 처리 수정이 있다.
- **기존 주장 삭제:** '게임 모드 누락 해결'은 구체 변경 근거 미확인. '반복 수동 배포를 완전히 해결', 'VITE_BASE_URL을 환경별 주입해 설정 혼동 해결'도 그대로 쓰지 않는다. 최신 README는 workflow/env의 VITE_API_URL과 소스 VITE_BASE_URL 불일치를 명시한다. Nginx 직접 설정·전면 운영 정상화를 입증하지 않는다.
- **미확인:** 전체 7명 및 역할별 구성, 정확한 기간, 잇타 7기 활동. README와 조사한 PR에서 확인되지 않으므로 이번 교체안에서는 제거한다. 개인 기여가 확인되지 않는 키워드 분석·공용 화면 전체 설계는 본인 성과에 넣지 않고 서비스 기능으로만 설명한다.

## LittlePet

- main `ec8b5590584312005f0dd8f745e9369435bac4ea`, develop `ac0c7c4edfd4e5c908cf438f9b2d69ffe39b4776`.
- [루트 README](https://github.com/Little-pet/UMC_LittlePet_Front/blob/ec8b5590584312005f0dd8f745e9369435bac4ea/README.md): 돌봄/건강 기록/병원/커뮤니티, FE 한채연·김규리 2명, React·TypeScript·Vite와 협업 규칙. 하위 README는 Vite 기본 템플릿.
- 개인 PR: [#18](https://github.com/Little-pet/UMC_LittlePet_Front/pull/18) 병원찾기 하위 화면; [#50](https://github.com/Little-pet/UMC_LittlePet_Front/pull/50) 지도·병원 API; [#11](https://github.com/Little-pet/UMC_LittlePet_Front/pull/11) 커뮤니티 목록·상세; [#49](https://github.com/Little-pet/UMC_LittlePet_Front/pull/49) 게시물 조회·목표 배지; [#40](https://github.com/Little-pet/UMC_LittlePet_Front/pull/40) 프로필 CRUD.
- [#26](https://github.com/Little-pet/UMC_LittlePet_Front/pull/26), merge `4a6734bfec8f746246c3bb2a9a214a9f1e132d3f`: useState 메뉴 선택을 useLocation.pathname 기반으로 변경. 새로고침/페이지 이동시 색상이 틀리던 문제와 수정이 PR 본문·diff에서 일치.
- **과장 금지:** #49는 검색·게시물 수정·대댓글 미구현 명시. #40은 사용자 사진 변경과 동물 종 카테고리 변경 문제를 명시. 후속 해결 입증 없이 모두 완성·안정화했다는 주장 금지.
- **삭제:** 전체9명 구성, 정확한 기간, FE 4→2 감소, 데모데이 브라우저 오류, 홈 인기글·랭킹 개인 담당, 필터 제안·공용컴포넌트 문서화는 조사한 GitHub 근거만으로 확정 불가. FE2와 프로필·병원·커뮤니티 개인 기여는 확실하다.

## UMC 영화 스터디

- main `ea9938403d1be1084ba48cfc363bfbac29ad0684`.
- [README](https://github.com/OrangeKim04/7th_Web_B/blob/ea9938403d1be1084ba48cfc363bfbac29ad0684/README.md): UMC MJU 7th Web, 김규리·방세현, 주차별 개인 구현 및 PR 리뷰 규칙. 제품 설명 README는 없음.
- [개인 10주차 src](https://github.com/OrangeKim04/7th_Web_B/tree/ea9938403d1be1084ba48cfc363bfbac29ad0684/제이-김규리/10주차/미션/src): useGetInfiniteMovies.ts의 category queryKey·useInfiniteQuery, popular.tsx의 useInView·fetchNextPage, detail.tsx의 영화ID queryKey·useQuery, useGetDetail.ts의 영화/credits 조회와 타입, search.tsx의 한국어·성인제외 검색, login/sign-up의 React Hook Form·Yup, sign-up의 로컬 인증 API 요청 확인.
- **삭제:** 정확한 기간, 실제 성능 수치, 과거 오류와 해결 과정의 추정. useMutation은 별도 TodoList 실습의 존재를 영화 앱에 섞지 않도록 영화 설명에서 제외. '1명 프로젝트' 대신 스터디 저장소 내 개인 실습임을 명시.

## 금융 Agent

- 공개 조직 프로필 `5f77d4eafb6fc21d400e68d60545ad1410ff3ded`: [명지대 2025-2 공개소프트웨어실무](https://github.com/MJU-OSS-2025/.github/blob/5f77d4eafb6fc21d400e68d60545ad1410ff3ded/profile/README.md).
- 비공개 yahoo-finance-llm-agent master `014bfd110134ac437fdbbeca1f7afdf8d47180e4`의 README/main.py 확인. 공개 페이지에는 조직 링크만 유지하고 높은 수준의 기능·기술 요약만 제공한다. 코드와 비밀값은 문서/사이트에 복사하지 않는다.
- README는 자연어 해석·MCP 금융 조회·대화 응답, /chat·/health·/tools를 설명한다. 환경 예시는 오래된 OpenAI 값이지만 구현은 FastAPI·Gemini 2.5 Flash·LangChain ReAct·AgentExecutor다.
- main.py에서 종목+키워드 직접 금융 도구 분기와 그 외 Agent 호출, 8종 도구를 확인했다. 모든 복합 질문을 정확히 분류한다는 의미는 아니므로 '그 밖의 질문'이라고 한정한다.
- **삭제:** 2초→0.3초의 벤치마크나 측정 코드 없음. 프롬프트 단축 시도/실측 토큰 절감 등 경험 서술 근거 없음. 정확한 기간·전체 팀 구성도 미확인. 공개 팀 소개만으로 세부 개인 저작을 확정하지 않으며 역할의 상세 설계 독점 표현은 피한다.
