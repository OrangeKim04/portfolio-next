// Run: node scripts/benchmark-notion.cjs [--live]
// Live mode reads .env locally; only counts/timings are saved, never content or credentials.
const fs = require('node:fs');
const vm = require('node:vm');
const { execFileSync } = require('node:child_process');
const assert = require('node:assert/strict');
const ts = require('typescript');
const { performance } = require('node:perf_hooks');
const BASE = '45db9cad4a12491b58d4f9b365dac1eb53a792ef';
const before = execFileSync('git', ['show', `${BASE}:src/server/notion.ts`], { encoding: 'utf8' });
const after = fs.readFileSync('src/server/notion.ts', 'utf8');
function load(source, Client) {
  const mod = { exports: {} };
  const code = ts.transpileModule(source, { compilerOptions: {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020,
  }}).outputText;
  vm.runInNewContext(code, {
    exports: mod.exports, module: mod,
    require: name => name === '@notionhq/client' ? { Client } : require(name),
    process, console: { log() {}, warn() {}, error() {} }, Date,
  });
  return mod.exports;
}
async function invoke(api, version, limit = 10, offset = 0, category) {
  if (version === 'after') return api.getPublishedPostPage(limit, offset, category);
  const [posts, total] = await Promise.all([
    api.getPublishedPosts(limit, offset, category), api.getTotalPublishedCount(category),
  ]);
  return { posts, total };
}
function fixture(size) {
  let queries = 0;
  const pages = Array.from({ length: size }, (_, i) => ({
    id: `post-${i}`, created_time: '2026-01-01T00:00:00Z', last_edited_time: '2026-01-01T00:00:00Z',
    properties: { Name: { type: 'title', title: [{ plain_text: `Post ${i}` }] },
      Excerpt: { type: 'rich_text', rich_text: [{ plain_text: 'A stored excerpt' }] } },
  }));
  const requests = [];
  class Client {
    databases = { retrieve: async () => ({ data_sources: [{ id: 'fixture' }] }) };
    dataSources = {
      retrieve: async () => ({ properties: { Status: { name: 'Status', type: 'status' }, Category: { type: 'select' } } }),
      query: async args => {
        queries++; requests.push(args);
        const start = Number(args.start_cursor || 0);
        return { results: pages.slice(start, start + 100), has_more: start + 100 < size,
          next_cursor: start + 100 < size ? String(start + 100) : null };
      },
    };
  }
  return { Client, queries: () => queries, requests };
}
async function checks() {
  process.env.NOTION_TOKEN ||= 'fixture'; process.env.NOTION_DATABASE_ID ||= 'fixture';
  const cases = [];
  for (const size of [0, 25, 100, 125]) {
    const old = fixture(size), next = fixture(size);
    const a = await invoke(load(before, old.Client), 'before', 10, size > 100 ? 100 : 0, 'Engineering');
    const b = await invoke(load(after, next.Client), 'after', 10, size > 100 ? 100 : 0, 'Engineering');
    assert.equal(b.total, size);
    assert.equal(b.posts.length, Math.min(10, size > 100 ? size - 100 : size));
    if (size <= 100) assert.equal(JSON.stringify(a), JSON.stringify(b));
    assert.ok(next.requests.every(r => r.filter.and.length === 2 && r.sorts[0].direction === 'descending'));
    cases.push({ size, beforeQueries: old.queries(), afterQueries: next.queries(), beforeTotal: a.total,
      afterTotal: b.total, beforeReturned: a.posts.length, afterReturned: b.posts.length });
  }
  const missing = fixture(1);
  const originalQuery = new missing.Client().dataSources.query;
  class MissingExcerptClient extends missing.Client {
    constructor() {
      super();
      this.dataSources.query = async args => {
        const response = await originalQuery(args);
        response.results.forEach(page => { delete page.properties.Excerpt; });
        return response;
      };
      this.blocks = { children: { list: async () => { throw new Error('Unexpected excerpt fetch'); } } };
    }
  }
  const result = await invoke(load(after, MissingExcerptClient), 'after');
  assert.equal(result.posts[0].excerpt, null);
  assert.equal(missing.queries(), 1);
  fs.writeFileSync('docs/benchmarks/notion-fixtures.json', JSON.stringify({ cases, missingExcerpt: 'No block fetch; null retained' }, null, 2)+'\n');
  console.log(JSON.stringify({ fixtureChecks: cases }, null, 2));
  return cases;
}
async function live() {
  require('@next/env').loadEnvConfig(process.cwd());
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) throw new Error('Missing Notion configuration');
  const { Client: RealClient } = require('@notionhq/client');
  let metrics;
  class Client extends RealClient {
    constructor(options) {
      super({ ...options, fetch: async (...args) => {
        const path = new URL(String(args[0])).pathname;
        if (metrics) {
          metrics.httpRequests++;
          if (path.endsWith('/query')) metrics.queryRequests++;
          else if (path.endsWith('/children')) metrics.excerptRequests++;
          else metrics.metadataRequests++;
        }
        const res = await fetch(...args);
        if (metrics && !res.ok) metrics.httpErrors++;
        return res;
      }});
    }
  }
  const apis = { before: load(before, Client), after: load(after, Client) };
  // Warm module-level metadata only; no Next data cache is used in this service benchmark.
  for (const version of ['before', 'after']) await invoke(apis[version], version, 1);
  const samples = [];
  let expected;
  for (let pair = 0; pair < 10; pair++) {
    for (const version of pair % 2 ? ['after', 'before'] : ['before', 'after']) {
      metrics = { httpRequests: 0, queryRequests: 0, excerptRequests: 0, metadataRequests: 0, httpErrors: 0 };
      const start = performance.now();
      const result = await invoke(apis[version], version);
      const ms = performance.now() - start;
      // Ignore expiring image URLs; compare identifiers, text, order and total.
      const signature = JSON.stringify({ total: result.total, posts: result.posts.map(p => [p.id, p.slug, p.title, p.category, p.tags, p.author, p.publishedAt, p.readingTime]) });
      if (expected === undefined) expected = signature;
      assert.equal(signature, expected, 'Content changed during benchmark or output differs');
      samples.push({ pair, version, ms: Math.round(ms * 100) / 100, ...metrics, total: result.total, returned: result.posts.length });
      metrics = null;
      console.log(JSON.stringify(samples.at(-1)));
      await new Promise(resolve => setTimeout(resolve, 6000));
    }
  }
  const summary = {};
  for (const version of ['before', 'after']) {
    const rows = samples.filter(x => x.version === version);
    const times = rows.map(x => x.ms).sort((a,b) => a-b);
    summary[version] = { n: rows.length, medianMs: (times[4] + times[5]) / 2,
      p95Ms: times[Math.ceil(times.length * .95) - 1],
      meanHttpRequests: rows.reduce((n,x) => n+x.httpRequests,0)/rows.length,
      meanQueryRequests: rows.reduce((n,x) => n+x.queryRequests,0)/rows.length,
      httpErrors: rows.reduce((n,x) => n+x.httpErrors,0) };
  }
  const output = { recordedAt: new Date().toISOString(), baseline: BASE,
    scope: 'Actual Notion service functions, warm metadata, Next cache bypassed, list limit 10; excludes HTTP route, DB and browser. Alternating paired order, 6s pause between samples. Visible list fields and total checked equal; generated invisible excerpts intentionally omitted. p95 is exploratory with n=10.',
    summary, samples };
  fs.writeFileSync('docs/benchmarks/notion-live.json', JSON.stringify(output,null,2)+'\n');
  console.log(JSON.stringify(summary,null,2));
}
(async () => {
  if (process.argv.includes('--live')) await live();
  else await checks();
})().catch(error => { console.error(error.name, error.code || '', 'Benchmark failed; no credentials or response content printed.'); process.exitCode = 1; });
