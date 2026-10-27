# 서행·ZeroPick·놀이터백과 근거 조사

조회일: 2026-10-26. GitHub API의 README, 소스 및 커밋을 읽음. PDF·Notion 근거는 사용하지 않음. 구현 데이터 제안은 `mobile-updates.json`이며 null은 미확인 필드 제거 요청이다.

## 서행

- 최신 FE 소개 README: https://github.com/SeoHaeng/SeoHaeng_FE/blob/a9f694035705e307c709da5882acbbed8779c4d5/README.md
- 실제 구현 develop: `f7ff349d3332fc3f9d40164b51fe64aaf05dda70`. develop의 README는 짧으므로 main의 보강 README를 읽어야 한다. main README가 이 구현 SHA를 명시하고 코드 링크를 고정한다.
- BE 소개: https://github.com/SeoHaeng/SeoHaeng_BE/blob/2343e587f1c5e581814eb33120ab9e14498980f5/README.md
- 기간은 FE main 및 BE가 모두 2025.05.19~09.18로 일치. 기존 05.01~10.15는 충돌하므로 교체.
- 5명 팀과 FE 단독, 관광데이터 공모전 본선, 기획자에게 배포 파일·가이드 전달, 서명 담당은 이번 GitHub 근거에 없음. 삭제 권장. BE README의 BE 2명만으로 전체 5명 추론 금지.
- 지도 디바운싱 커밋 https://github.com/SeoHaeng/SeoHaeng_FE/commit/f5cfc8a684a5c3af4910363c5963d8004851925d 작성자 OrangeKim04 확인. milestone.tsx 실제 1000ms 및 clearTimeout, Promise.all 확인. 주변 주석은 1.5초라 쓰여 있으나 실행값은 1초.
- 지도 복원 https://github.com/SeoHaeng/SeoHaeng_FE/commit/aaefb3b 는 README 근거 링크. 메모리 Context이며 앱 재시작 영속 복원 아님.
- 추가할 기술: WebView 메시지 브리지, viewport 경계 조회, 필터별 요청, 인증 AsyncStorage 복원/403 재발급 후 1회 재시도, 날짜별 순서 데이터와 Polyline 표시, FormData 기록 업로드.
- 수치 개선, 안전한 암호화 토큰 저장, JWT 서명 검증, 자동 최적 경로는 주장 금지. 출시 링크 존재는 확인 가능.

## ZeroPick

- 최신 README https://github.com/capstoneMJU/frontend/blob/e3c2d12dfea3ef2470a11edb40808bb53dbbbee3/README.md
- 역할 근거 https://github.com/capstoneMJU/.github/blob/d860f7e41df8272f5f47dfacfbf3b61e69e9dda4/profile/README.md : 김규리 OCR·레시피·유저·프론트엔드 팀장, 임용진 커뮤니티. FE2/BE3 명시.
- 전체 팀장, 명지대학교 졸업작품, 기간2025.04.01~05.30, 교육·페어 프로그래밍·마일스톤 관리·전시 판넬·전체 디자인 주장은 이번 GitHub 근거로 확인되지 않음. 제거 권장.
- 기간 미확인: `period:null`. 기존 startDate 역시 근거 미확인으로 최신순 정렬용으로 은닉 유지하는 것도 피하는 편 권장. 타입/정렬 설계는 메인 담당 결정 필요.
- CameraPage 실제 코드 확인: `lastErrorDetailRef`, `/ocr/scan`, FormData file, 실패 detail 유지 후 `/foods/search-item-name?itemReportNo=...`, ocrText 재사용.
- CameraPage 변경 이력의 작성자 OrangeKim04 확인(1f79a84929da31cc43e3ce400765d5e1bf6c0a1b 등). README의 역할과 일치.
- README가 자세한 구현과 경로를 제공: useInfiniteQuery 검색어 queryKey, sessionStorage 레시피 재사용, 영양행 변환/TanStack Table, customFetch 공통 오류 해석, 상태 범위 구분.
- 커뮤니티 구현은 팀 기능 소개에만 표시. 개인 기여로 적지 않음.
- 90% OCR 정확도는 조직 README의 '목표'이므로 달성 성과로 적지 않음. 프론트엔드가 OCR 모델/AI 생성 자체를 개발한 것으로 적지 않음.

## 놀이터백과

- README https://github.com/OrangeKim04/PLAYGROUND/blob/0172e60366a50db129bf91eb8587555465676c47/README.md
- 기간 2024.10.28~11.08, 팀 김규리/장민주 2명, 제3회 ODF 해커톤 최우수상(한국지능정보사회진흥원장상) 명시.
- 기존 10.31~11.09는 충돌하여 변경. 공동 UI·앱개발 전담·현장 방문 검증·서포터즈 경험·약10일 회고는 GitHub 근거 미확인으로 삭제.
- main.js 확인: pfctSn으로 안전검사와 보험 JSON 결합, 즐겨찾기 시설번호 비교, favorite에서 넘어온 선택 마커 이동, 서울 sidoName 대기질 조회.
- InfoBox.js 확인: 즐겨찾기 토글, 시설번호, 상세 항목, 리뷰 화면 이동.
- README는 안전 별점·사용자 리뷰를 소개하나 실제 평점 산식/서버 저장 여부까지 검증하지 않아 신규 강조하지 않음. 현재 코드에 AsyncStorage import는 주석이므로 즐겨찾기 영속 보장 금지.
- README API10종 목록은 유지 가능. '국토교통부 안전지킴이집'의 제공기관은 확인 불명확하여 안전지킴이집 데이터 명칭만 유지 권장.
- Promise.all 성능 개선/현장검증 성과 추가 금지. 데이터 결합은 구현 과제로 기술하고 실제 오류 사고라고 단정하지 않음.
