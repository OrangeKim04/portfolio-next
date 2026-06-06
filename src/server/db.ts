import { eq } from "drizzle-orm";
import { drizzle, LibSQLDatabase } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { blogInteractions, BlogInteraction, InsertUser, users } from "../../drizzle/schema";
import fs from "fs";
import path from "path";

let _db: LibSQLDatabase | null = null;

export function getDb(): LibSQLDatabase | null {
  if (!_db) {
    // Vercel 서버리스는 /tmp만 쓰기 가능
    const defaultUrl = process.env.VERCEL
      ? "file:/tmp/portfolio.db"
      : "file:./data/portfolio.db";
    const dbUrl = process.env.DATABASE_URL ?? defaultUrl;
    const normalizedUrl = dbUrl.startsWith("file:") ? dbUrl : `file:${dbUrl}`;
    const filePath = normalizedUrl.replace(/^file:/, "");
    const dir = path.dirname(filePath);
    try {
      if (dir && dir !== "." && !fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const client = createClient({ url: normalizedUrl });
      _db = drizzle(client);
    } catch (error) {
      console.warn("[Database] Failed to open database:", error);
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = getDb();
  if (!db) return;

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};

  const textFields = ["name", "email", "loginMethod"] as const;
  type TF = (typeof textFields)[number];
  const assign = (field: TF) => {
    if (user[field] === undefined) return;
    values[field] = user[field] ?? null;
    updateSet[field] = user[field] ?? null;
  };
  textFields.forEach(assign);

  if (user.lastSignedIn !== undefined) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  }
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === (process.env.OWNER_OPEN_ID ?? "")) {
    values.role = "admin";
    updateSet.role = "admin";
  }

  if (!values.lastSignedIn) values.lastSignedIn = new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();

  await db
    .insert(users)
    .values(values)
    .onConflictDoUpdate({ target: users.openId, set: updateSet as Partial<InsertUser> });
}

export async function getUserByOpenId(openId: string) {
  const db = getDb();
  if (!db) return undefined;
  return (await db.select().from(users).where(eq(users.openId, openId)).limit(1))[0];
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
