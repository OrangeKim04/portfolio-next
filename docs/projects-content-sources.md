# Project content provenance · 2026-09-29

Only project-related content from user-supplied documents is included. Private application details and contact information are not copied into the site.

## Content sources

- User-supplied portfolio PDF pp. 2–11: PMS exact dates, 4-person team, database model/index work; PlanUp dates, 10-person team, UMC and authentication/friend logic; Spring personal learning and DI refactoring.
- User-supplied Lotte application pp. 7–8, 11: Okii period and rendering issue, playground agency, APIs and parallel requests.
- User-supplied Hynix application pp. 5–8: playground team/role, PlanUp authentication, Okii environment-specific CI/CD, portfolio independent AI review, financial LLM Agent period/role/MCP routing and recorded timings.
- [Main portfolio](https://app.notion.com/p/2e9d4f0dcafe80159189cf26b264e87c): PMS, PlanUp and Spring details.
- [LittlePet](https://app.notion.com/p/2ead4f0dcafe81169447eb0c6d2ba6c0): exact dates, 9-person role breakdown, individual UI/API work and retrospective.
- [Okii](https://app.notion.com/p/Okii-2ead4f0dcafe8122871eefbf423f5db2): 7-person breakdown, modules, full stack and pipeline.
- [ZeroPick](https://app.notion.com/p/ZeroPick-2ead4f0dcafe818a8279cfe5d03d4fd8): dates, 5-person breakdown, capstone, leadership, major frontend features and design.
- [SeoHaeng](https://app.notion.com/p/SeoHaeng-2ead4f0dcafe818286dfe45aed037ab8): dates, 5-person breakdown, tourism contest, frontend, WebView and release responsibilities.
- [Movie study](https://app.notion.com/p/UMC-Web-7-2ead4f0dcafe81b1bf53c27e1d0c8756): dates, personal UMC study, features and learning results.
- LittlePet [README](https://github.com/Little-pet/UMC_LittlePet_Front), [PR #26](https://github.com/Little-pet/UMC_LittlePet_Front/pull/26) and its Navbar diff: useLocation/pathname-based selected-menu correction. PRs #11, #18, #40, #49 and #50 corroborate feature ownership; unfinished features in PR descriptions are not claimed complete.
- Source README/package definitions for Spring study and this portfolio: module organization and technology stack.

## Editorial decisions and open details

- All views use startDate descending; source date precision is preserved in displayed periods. A YYYY-MM-01 sorting key does not claim the first day when only a month is known.
- Okii end month follows the explicitly named project entry in the Lotte application (July); the Hynix experience entry includes August. No precise end day is invented.
- Portfolio began March 2026 according to the supplied application; June Git repository creation is not used as project start. Current maintenance is ongoing.
- Financial Agent institution, team and repository are not present in provided sources; requested from the user. Unknown fields are identified and no guessed GitHub link is published.
- SeoHaeng Notion says Seoul, whereas its repository README says book-based Gangwon travel. Requested clarification; neutral tourism wording until confirmed.
- PMS's reported 0.000s is display-precision-limited, not proof of zero latency or an exact 500x ratio.
- Agent timings are attributed to the supplied application and only describe simple retrieval requests.
- ZeroPick and SeoHaeng use documented collaboration/design constraints as problem-solving cases; no invented technical incident is added.
- Movie study has no documented troubleshooting incident; its learning outcomes remain explicit.
- Let's Eat has only an empty README, and deep-learning coursework lacks a personal contribution narrative in supplied sources. Do not invent standalone case studies from their repository names.
- Public-service employment projects are not included in this project expansion.

## Release

Baseline: PR #14 merge `11fdd578a811b48c10a12b5e2663223472a7cd2d`.
Deploy using dev Preview → dev-to-main merge → Production.
To undo this follow-up release, revert its merge commit with `git revert -m 1 <merge-sha>` through the same workflow.

## Validation

- Production build and TypeScript passed with all 11 project routes prerendered.
- ESLint passed for project data, project components, navigation and project/home route wrappers.
- Catalog, home and all 11 detail URLs returned 200; unknown project returned 404.
- Verified unique slugs, descending start dates, required content and local asset existence.
- Browser checks: home latest-three preview, all-projects navigation, AI filter, current-section indicator, mobile/light detail readability and loaded LittlePet asset without horizontal overflow.
- Hero change only retargets the existing scroll handler from disabled About to Projects; pre-existing lint findings in Hero and other unrelated code remain outside this change.
