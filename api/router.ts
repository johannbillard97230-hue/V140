import { createRouter, publicQuery } from "./middleware";
import { mollieRouter } from "./mollieRouter";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  mollie: mollieRouter,
});

export type AppRouter = typeof appRouter;
