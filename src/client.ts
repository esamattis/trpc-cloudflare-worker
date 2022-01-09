import fetch from "node-fetch";

Object.assign(global, { fetch });

import { createTRPCClient } from "@trpc/client";
import { httpLink } from "@trpc/client/links/httpLink";
import type { AppRouter } from "./worker";

const client = createTRPCClient<AppRouter>({
    //     url: "http://localhost:3000/trpc",
    links: [
        httpLink({
            //     url: "http://127.0.0.1:8787/api",
            url: "https://trpc-demo.esamatti.workers.dev/api",
        }),
    ],
});

async function main() {
    const res = await client.query("greet", { name: "Esa" });

    console.log(res);
}

main();
