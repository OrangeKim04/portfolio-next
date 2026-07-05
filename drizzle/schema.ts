import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const blogInteractions = sqliteTable("blog_interactions", {
  slug: text("slug").primaryKey(),
  viewCount: integer("viewCount").default(0),
  likes: integer("likes").default(0),
});

export type BlogInteraction = typeof blogInteractions.$inferSelect;
