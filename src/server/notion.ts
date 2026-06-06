import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

let _notion: Client | null = null;
let _n2m: NotionToMarkdown | null = null;
let _dbProps: Record<string, any> | null = null;
let _dsId: string | null = null;

function clients() {
  if (!_notion) {
    const token = process.env.NOTION_TOKEN;
    if (!token) throw new Error("NOTION_TOKEN is not set in .env");
    _notion = new Client({ auth: token });
    _n2m = new NotionToMarkdown({ notionClient: _notion });
  }
  return { notion: _notion! as any, n2m: _n2m! };
}

function dbId() {
  const id = process.env.NOTION_DATABASE_ID;
  if (!id) throw new Error("NOTION_DATABASE_ID is not set in .env");
  return id;
}

// In @notionhq/client v5 (API 2025-09-03), databases.query was replaced by
// dataSources.query. The data_source_id differs from the database ID — it's
// found in the `data_sources` array of the database retrieve response.
async function getDataSourceId(): Promise<string> {
  if (_dsId) return _dsId;
  const { notion } = clients();
  const db = await notion.databases.retrieve({ database_id: dbId() });
  const ds = (db as any).data_sources?.[0];
  if (!ds?.id) throw new Error("No data_sources found in Notion database response");
  _dsId = ds.id;
  return _dsId!;
}

async function getDbProps(): Promise<Record<string, any>> {
  if (_dbProps) return _dbProps;
  const { notion } = clients();
  const dsId = await getDataSourceId();
  const ds = await notion.dataSources.retrieve({ data_source_id: dsId });
  _dbProps = (ds as any).properties ?? {};
  return _dbProps!;
}

// ── Property helpers ──────────────────────────────────────

function text(prop: any): string {
  if (!prop) return "";
  if (prop.type === "title")
    return (prop.title ?? []).map((t: any) => t.plain_text).join("");
  if (prop.type === "rich_text")
    return (prop.rich_text ?? []).map((t: any) => t.plain_text).join("");
  return "";
}

function pick(props: Record<string, any>, ...keys: string[]) {
  for (const k of keys) if (props[k] !== undefined) return props[k];
  return undefined;
}

function buildPublishedFilter(props: Record<string, any>): any | undefined {
  const statusProp = pick(props, "Status", "status", "Published", "published");
  if (!statusProp) return undefined;
  const name =
    statusProp.name ??
    Object.keys(props).find(k => props[k] === statusProp) ??
    "Status";
  if (statusProp.type === "status")
    return { property: name, status: { equals: "Published" } };
  if (statusProp.type === "select")
    return { property: name, select: { equals: "Published" } };
  if (statusProp.type === "checkbox")
    return { property: name, checkbox: { equals: true } };
  return undefined;
}

function buildFilter(
  dbProps: Record<string, any>,
  category?: string
): any | undefined {
  const pub = buildPublishedFilter(dbProps);
  const catKey = Object.keys(dbProps).find(k =>
    ["type", "Type", "category", "Category", "카테고리"].includes(k)
  );

  const parts: any[] = [];
  if (pub) parts.push(pub);
  if (category && category !== "all" && catKey) {
    parts.push({ property: catKey, select: { equals: category } });
  }

  if (parts.length === 0) return undefined;
  if (parts.length === 1) return parts[0];
  return { and: parts };
}

function fileUrl(f: any): string | null {
  if (!f) return null;
  if (f.type === "url") return f.url ?? null;
  if (f.type === "files" && f.files?.length) {
    const x = f.files[0];
    return x.type === "external" ? x.external.url : (x.file?.url ?? null);
  }
  return null;
}

function pageToPost(
  page: any,
  content: string | null = null,
  interactions?: { viewCount: number; likes: number }
): BlogPost {
  const p: Record<string, any> = page.properties ?? {};
  const tags: string[] = (
    pick(p, "Tags", "tags", "태그")?.multi_select ?? []
  ).map((t: any) => t.name);

  const coverImage: string | null =
    fileUrl(
      pick(
        p,
        "thumbnail",
        "Thumbnail",
        "Cover",
        "CoverImage",
        "Cover Image",
        "커버"
      )
    ) ??
    (page.cover?.type === "external"
      ? page.cover.external.url
      : (page.cover?.file?.url ?? null));

  return {
    id: page.id,
    notionPageId: page.id,
    slug: text(pick(p, "Slug", "slug")) || page.id,
    title: text(pick(p, "Name", "Title", "title", "제목")) || "Untitled",
    excerpt:
      text(
        pick(p, "Excerpt", "excerpt", "Description", "description", "요약")
      ) || null,
    content,
    category:
      pick(p, "type", "Type", "Category", "category", "카테고리")?.select
        ?.name ?? "",
    tags: JSON.stringify(tags),
    author: text(pick(p, "Author", "author", "작성자")) || "김규리",
    publishedAt: new Date(
      pick(
        p,
        "createdAt",
        "PublishedAt",
        "Published At",
        "Published",
        "Date",
        "date"
      )?.date?.start ?? page.created_time
    ),
    viewCount: interactions?.viewCount ?? 0,
    likes: interactions?.likes ?? 0,
    coverImage,
    readingTime:
      pick(p, "ReadingTime", "Reading Time", "읽기시간")?.number ?? 5,
    updatedAt: new Date(page.last_edited_time ?? Date.now()),
    createdAt: new Date(page.created_time ?? Date.now()),
  };
}

async function fetchExcerpt(pageId: string): Promise<string | null> {
  const { notion } = clients();
  try {
    const res = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 5,
    });
    for (const block of res.results as any[]) {
      const richText: any[] =
        block[block.type]?.rich_text ?? block[block.type]?.text ?? [];
      const raw = richText
        .map((t: any) => t.plain_text)
        .join("")
        .trim();
      if (raw.length > 10) {
        return raw.length > 120 ? raw.slice(0, 120) + "..." : raw;
      }
    }
  } catch {}
  return null;
}

// ── Public types ──────────────────────────────────────────

export interface BlogPost {
  id: string;
  notionPageId: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  category: string;
  tags: string;
  author: string;
  publishedAt: Date;
  viewCount: number;
  likes: number;
  coverImage: string | null;
  readingTime: number;
  updatedAt: Date;
  createdAt: Date;
}

// ── Exported functions ────────────────────────────────────

export async function getCategories(): Promise<{ id: string; name: string }[]> {
  const { notion } = clients();
  const dsId = await getDataSourceId();
  const res = await notion.dataSources.query({
    data_source_id: dsId,
    page_size: 100,
  });
  const seen = new Set<string>();
  for (const page of res.results as any[]) {
    const val = pick(
      page.properties ?? {},
      "type",
      "Type",
      "Category",
      "category",
      "카테고리"
    )?.select?.name;
    if (val) seen.add(val);
  }
  return Array.from(seen).map(name => ({ id: name, name }));
}

export async function getPublishedPosts(
  limit: number = 10,
  offset: number = 0,
  category?: string
): Promise<BlogPost[]> {
  const { notion } = clients();
  const [dbProps, dsId] = await Promise.all([getDbProps(), getDataSourceId()]);
  const filter = buildFilter(dbProps, category);

  console.log(
    `[Notion] getPublishedPosts 호출 | page=${Math.floor(offset / limit) + 1} limit=${limit} category=${category ?? "all"} filter=${JSON.stringify(filter)}`
  );

  const res = await notion.dataSources.query({
    data_source_id: dsId,
    ...(filter ? { filter } : {}),
    sorts: [{ timestamp: "created_time", direction: "descending" }],
    page_size: 100,
  });

  const pages = res.results.slice(offset, offset + limit) as any[];
  const posts = pages.map(p => pageToPost(p));

  // excerpt가 없는 글은 첫 블록에서 자동 생성
  const needsExcerpt = posts
    .map((p, i) => (!p.excerpt ? i : -1))
    .filter(i => i >= 0);
  if (needsExcerpt.length > 0) {
    const excerpts = await Promise.all(
      needsExcerpt.map(i => fetchExcerpt(pages[i].id))
    );
    needsExcerpt.forEach((postIdx, j) => {
      posts[postIdx].excerpt = excerpts[j];
    });
  }

  console.log(
    `[Notion] 결과 | total=${res.results.length} returned=${posts.length}`
  );
  posts.forEach((p, i) =>
    console.log(
      `  [${i + 1}] "${p.title}" | category=${p.category} | excerpt=${p.excerpt ? p.excerpt.slice(0, 40) + "…" : "null"}`
    )
  );

  return posts;
}

export async function getTotalPublishedCount(
  category?: string
): Promise<number> {
  const { notion } = clients();
  const [dbProps, dsId] = await Promise.all([getDbProps(), getDataSourceId()]);
  const filter = buildFilter(dbProps, category);

  const res = await notion.dataSources.query({
    data_source_id: dsId,
    ...(filter ? { filter } : {}),
    page_size: 100,
  });
  console.log(
    `[Notion] getTotalPublishedCount | category=${category ?? "all"} | total=${res.results.length}`
  );
  return res.results.length;
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { notion, n2m } = clients();
  const dbProps = await getDbProps();
  const hasSlugProp = !!(dbProps["Slug"] ?? dbProps["slug"]);

  let page: any = null;

  if (hasSlugProp) {
    const dsId = await getDataSourceId();
    const res = await notion.dataSources.query({
      data_source_id: dsId,
      filter: { property: "Slug", rich_text: { equals: slug } },
      page_size: 1,
    });
    page = res.results[0] ?? null;
  } else if (UUID_RE.test(slug)) {
    // slug가 Notion page ID인 경우 직접 조회
    page = await notion.pages.retrieve({ page_id: slug }).catch(() => null);
  }

  if (!page) return null;

  let content: string | null = null;
  try {
    const mdBlocks = await n2m.pageToMarkdown(page.id);
    const result = n2m.toMarkdownString(mdBlocks);
    content =
      typeof result === "string" ? result : ((result as any)?.parent ?? "");
    console.log("[Notion] 마크다운 변환 완료, 길이:", content?.length ?? 0);
  } catch (err) {
    console.error("[Notion] markdown 변환 실패:", err);
  }

  const post = pageToPost(page, content);
  console.log("[Notion] getPostBySlug 결과:", {
    id: post.id,
    title: post.title,
    category: post.category,
    tags: post.tags,
    publishedAt: post.publishedAt,
    contentLength: content?.length ?? 0,
  });
  return post;
}

export async function searchPosts(
  query: string,
  limit: number = 10
): Promise<BlogPost[]> {
  const { notion } = clients();
  const dbProps = await getDbProps();
  const pub = buildPublishedFilter(dbProps);

  const titleKey =
    Object.keys(dbProps).find(k => dbProps[k].type === "title") ?? "Name";
  const searchFilter: any = {
    and: [
      ...(pub ? [pub] : []),
      { property: titleKey, title: { contains: query } },
    ],
  };

  const dsId = await getDataSourceId();
  const res = await notion.dataSources.query({
    data_source_id: dsId,
    filter: searchFilter.and.length > 0 ? searchFilter : undefined,
    sorts: [{ timestamp: "created_time", direction: "descending" }],
    page_size: limit,
  });

  const posts = res.results.map((p: any) => pageToPost(p));
  console.log(
    `[Notion] searchPosts | query="${query}" | 결과=${posts.length}건`
  );
  posts.forEach((p: BlogPost, i: number) =>
    console.log(`  [${i + 1}] "${p.title}"`)
  );
  return posts;
}
