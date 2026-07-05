import { z } from "zod";
import { unstable_cache } from "next/cache";
import { publicProcedure, router } from "../trpc";
import {
  getBlogInteraction,
  getBlogInteractions,
  incrementBlogPostViews,
  incrementBlogPostLikes,
  decrementBlogPostLikes,
} from "../db";
import {
  getPublishedPosts,
  getTotalPublishedCount,
  getPostBySlug,
  searchPosts,
  getCategories,
} from "../notion";

const cachedGetPublishedPosts = unstable_cache(
  (limit: number, offset: number, category?: string) =>
    getPublishedPosts(limit, offset, category),
  ["notion-posts"],
  { revalidate: 60, tags: ["posts"] }
);

const cachedGetTotalCount = unstable_cache(
  (category?: string) => getTotalPublishedCount(category),
  ["notion-posts-count"],
  { revalidate: 60, tags: ["posts"] }
);

const cachedGetCategories = unstable_cache(
  () => getCategories(),
  ["notion-categories"],
  { revalidate: 300, tags: ["categories"] }
);

const cachedGetPostBySlug = unstable_cache(
  (slug: string) => getPostBySlug(slug),
  ["notion-post"],
  { revalidate: 60, tags: ["posts"] }
);

export const blogRouter = router({
  list: publicProcedure
    .input(z.object({
      page: z.number().int().positive().default(1),
      limit: z.number().int().positive().max(50).default(10),
      category: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const offset = (input.page - 1) * input.limit;
      const [posts, total] = await Promise.all([
        cachedGetPublishedPosts(input.limit, offset, input.category),
        cachedGetTotalCount(input.category),
      ]);
      const interactions = await getBlogInteractions(posts.map(p => p.slug));
      return {
        posts: posts.map(p => ({
          ...p,
          viewCount: interactions[p.slug]?.viewCount ?? 0,
          likes: interactions[p.slug]?.likes ?? 0,
        })),
        pagination: {
          page: input.page,
          limit: input.limit,
          total,
          pages: Math.ceil(total / input.limit),
        },
      };
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const post = await cachedGetPostBySlug(input.slug);
      if (!post) return null;
      const interaction = await getBlogInteraction(input.slug);
      return {
        ...post,
        viewCount: interaction?.viewCount ?? 0,
        likes: interaction?.likes ?? 0,
      };
    }),

  incrementView: publicProcedure
    .input(z.object({ slug: z.string() }))
    .mutation(async ({ input }) => {
      await incrementBlogPostViews(input.slug);
      const interaction = await getBlogInteraction(input.slug);
      return { viewCount: interaction?.viewCount ?? 1 };
    }),

  search: publicProcedure
    .input(z.object({ query: z.string().min(1), limit: z.number().int().positive().max(50).default(10) }))
    .query(async ({ input }) => searchPosts(input.query, input.limit)),

  like: publicProcedure
    .input(z.object({ slug: z.string() }))
    .mutation(async ({ input }) => {
      await incrementBlogPostLikes(input.slug);
      const interaction = await getBlogInteraction(input.slug);
      return { likes: interaction?.likes ?? 1 };
    }),

  unlike: publicProcedure
    .input(z.object({ slug: z.string() }))
    .mutation(async ({ input }) => {
      await decrementBlogPostLikes(input.slug);
      const interaction = await getBlogInteraction(input.slug);
      return { likes: interaction?.likes ?? 0 };
    }),

  categories: publicProcedure.query(async () => {
    const cats = await cachedGetCategories();
    return [{ id: "all", name: "전체" }, ...cats.map(c => ({ id: c.id, name: c.name }))];
  }),
});
