// CI read-only smoke test for the exact protected Vercel deployment.
const { execFileSync } = require('node:child_process');
const assert = require('node:assert/strict');
const deployment = process.env.PREVIEW_URL;
assert.ok(deployment && process.env.VERCEL_TOKEN, 'Deployment URL and Vercel token required');
function read(path) {
  return execFileSync('npx', ['--yes', 'vercel', '--token', process.env.VERCEL_TOKEN, 'curl', path,
    '--deployment', deployment,
    '--', '--silent', '--show-error', '--fail'], { encoding: 'utf8', maxBuffer: 5 * 1024 * 1024 });
}
function list(input) {
  const response = JSON.parse(read('/api/trpc/blog.list?input=' + encodeURIComponent(JSON.stringify({ json: input }))));
  const result = response.result?.data?.json;
  assert.ok(result && Array.isArray(result.posts), 'Valid list response required');
  assert.equal(result.pagination.pages, Math.ceil(result.pagination.total / input.limit));
  return result;
}
try {
  assert.ok(read('/blogs').includes('<html'), 'Blog document must load');
  const first = list({ page: 1, limit: 10 });
  assert.equal(first.posts.length, Math.min(first.pagination.total, 10));
  const lastPage = Math.max(1, first.pagination.pages);
  const last = list({ page: lastPage, limit: 10 });
  assert.equal(last.pagination.total, first.pagination.total);
  assert.equal(last.posts.length, Math.max(0, first.pagination.total - (lastPage - 1) * 10));
  const category = first.posts.find(p => p.category)?.category;
  if (category) {
    const filtered = list({ page: 1, limit: 10, category });
    assert.ok(filtered.posts.length > 0);
    assert.ok(filtered.posts.every(p => p.category === category));
    assert.ok(filtered.pagination.total <= first.pagination.total);
  }
  console.log(JSON.stringify({ smoke: 'passed', total: first.pagination.total,
    firstPage: first.posts.length, lastPage: last.posts.length, categoryChecked: !!category }));
} catch (error) {
  // Do not print child_process error objects: spawnargs contain the token.
  console.error('Deployment smoke test failed:', error.name);
  process.exitCode = 1;
}
