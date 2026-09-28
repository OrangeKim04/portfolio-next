# Projects release

## Baseline and workflow
- Production baseline: be7db5d (merge of PR #11).
- Development baseline before this feature: 103ce99.
- Work branch: codex/projects-showcase.
- Existing workflow: dev push -> GitHub Actions Preview; dev -> main PR merge -> Production.
- Keep local untracked desktop.ini and the pre-existing nextdev log outside all commits.

## Scope
Six projects with shared typed content, local original assets, category filters,
concise details, metadata, real not-found handling, and desktop/mobile navigation.
No external CMS or database dependency is added to the project pages.
Existing home sections remain disabled; Projects is a dedicated route.

## Sources and editorial choices
Content comes from the supplied portfolio, application documents and Notion project pages.
Repo URLs and visual assets were inspected. See public/projects/SOURCES.md.
Use project development months rather than club membership periods.
Do not publish unsupported benchmark ratios, fabricated stars or example demo links.
Financial Agent and other proposed candidates are excluded until selected.

## Rollback
Use a normal revert, never reset or force-push shared branches.
After the release PR is merged, revert that merge with:
git revert -m 1 <release-merge-sha>
Push the revert through the same dev -> main workflow, or use GitHub's Revert PR.
The first parent of the release merge is the pre-release production state.
Revert the entire release together so content, assets and route code stay compatible.

## Validation
- Production build and TypeScript passed; all six detail routes prerendered.
- Scoped ESLint passed. Full repo lint: 43 errors in unchanged files.
- Local HTTP: catalog + six detail routes 200; unknown project 404.
- Browser: desktop/mobile, dark/light, images, filters, menu close, Escape focus return.
