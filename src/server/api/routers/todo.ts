import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { todos } from "~/server/db/schema";

export const todoRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ title: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(todos).values({
        title: input.title,
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const todo = await ctx.db.query.todos.findFirst({
      orderBy: (todos, { desc }) => [desc(todos.createdAt)],
    });

    return todo ?? null;
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.query.todos.findMany({});
  }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        done: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(todos)
        .set({
          done: input.done,
        })
        .where(eq(todos.id, input.id));
    }),
});
