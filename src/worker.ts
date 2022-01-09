import { router } from "@trpc/server";
import { z } from "zod";
import { createFetchAPIHandler } from "@valu/trpc-fetch-api-adapter";

interface Context {
    city: string;
}

export const appRouter = router<Context>()
    .query("hello", {
        resolve({ ctx }) {
            return {
                message: `Hello ${ctx.city} from CloudFlare`,
            };
        },
    })
    .query("greet", {
        input: z.object({ name: z.string() }),
        resolve({ input }) {
            return {
                message: `Hello ${input.name}`,
            };
        },
    });

const respondWithTRPC = createFetchAPIHandler({
    router: appRouter,
    async createContext(req): Promise<Context> {
        return {
            city: req.cf?.city ?? "",
        };
    },
});

export type AppRouter = typeof appRouter;

async function respond(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (["/api", "/api/"].includes(url.pathname)) {
        return new Response("trcp api root", { status: 200 });
    }

    if (url.pathname.startsWith("/api/")) {
        return await respondWithTRPC(request);
    }

    return new Response("not found", { status: 404 });
}

addEventListener("fetch", async (event) => {
    event.respondWith(respond(event.request));
});
