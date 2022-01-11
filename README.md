# tRPC running on a Cloudflare Worker 😎

With the help of https://github.com/valu-digital/npm-packages/tree/master/packages/trpc-fetch-api-adapter

This is bit hacky atm. See https://github.com/trpc/trpc/issues/1375


Running at https://trpc-demo.esamatti.workers.dev/api

Example https://trpc-demo.esamatti.workers.dev/api/hello

## Development

Get configure your Cloudflare Wrangler credentials, get pnpm and run:

```
pnpm install
pnpm run dev
```

# Client

See [src/client](/src/client.ts) and run it with

```
pnpm run run-client
```

## Deploy

Deploy it to `*.workers.dev` with:

```
pnpm deploy
```
