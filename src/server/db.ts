import { eq } from "drizzle-orm";
import { drizzle, LibSQLDatabase } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { blogInteractions, BlogInteraction } from "../../drizzle/schema";
import fs from "fs";
import path from "path";

let _db: LibSQLDatabase | null = null;

export function getDb(): LibSQLDatabase | null {
  if (!_db) {
    const dbUrl = process.env.DATABASE_URL ?? "file:./data/portfolio.db";
    const isRemote = dbUrl.startsWith("libsql://") || dbUrl.startsWith("https://");
    try {
      if (isRemote) {
        const authToken = process.env.TURSO_AUTH_TOKEN;
        if (!authToken) throw new Error("TURSO_AUTH_TOKEN is not set");
        const client = createClient({ url: dbUrl, authToken });
        _db = drizzle(client);
      } else {
        const normalizedUrl = dbUrl.startsWith("file:") ? dbUrl : `file:${dbUrl}`;
        const filePath = normalizedUrl.replace(/^file:/, "");
        const dir = path.dirname(filePath);
        if (dir && dir !== "." && !fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        const client = createClient({ url: normalizedUrl });
        _db = drizzle(client);
      }
    } catch (error) {
      console.warn("[Database] Failed to open database:", error);
    }
  }
  return _db;
}

export async function getBlogInteraction(slug: string): Promise<BlogInteraction | undefined> {
  const db = getDb();
  if (!db) return undefined;
  return (await db.select().from(blogInteractions).where(eq(blogInteractions.slug, slug)).limit(1))[0];
}

export async function getBlogInteractions(slugs: string[]): Promise<Record<string, BlogInteraction>> {
  if (!slugs.length) return {};
  const db = getDb();
  if (!db) return {};
  const rows = await db.select().from(blogInteractions);
  const map: Record<string, BlogInteraction> = {};
  for (const row of rows) {
    if (slugs.includes(row.slug)) map[row.slug] = row;
  }
  return map;
}

export async function incrementBlogPostViews(slug: string): Promise<void> {
  const db = getDb();
  if (!db) return;
  const existing = await getBlogInteraction(slug);
  if (existing) {
    await db.update(blogInteractions).set({ viewCount: (existing.viewCount ?? 0) + 1 }).where(eq(blogInteractions.slug, slug));
  } else {
    await db.insert(blogInteractions).values({ slug, viewCount: 1, likes: 0 });
  }
}

export async function incrementBlogPostLikes(slug: string): Promise<void> {
  const db = getDb();
  if (!db) return;
  const existing = await getBlogInteraction(slug);
  if (existing) {
    await db.update(blogInteractions).set({ likes: (existing.likes ?? 0) + 1 }).where(eq(blogInteractions.slug, slug));
  } else {
    await db.insert(blogInteractions).values({ slug, viewCount: 0, likes: 1 });
  }
}

export async function decrementBlogPostLikes(slug: string): Promise<void> {
  const db = getDb();
  if (!db) return;
  const existing = await getBlogInteraction(slug);
  if (existing) {
    await db.update(blogInteractions).set({ likes: Math.max(0, (existing.likes ?? 0) - 1) }).where(eq(blogInteractions.slug, slug));
  }
}
