import { createTRPCContext } from "@/server/trpc";
import { trpcRouter } from "@/server/trpc/routers";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

function handler({ request }: { request: Request }) {
	return fetchRequestHandler({
		req: request,
		router: trpcRouter,
		endpoint: "/api/trpc",
		createContext: () => createTRPCContext(),
	});
}

export const APIRoute = createAPIFileRoute("/api/trpc/$")({
	GET: handler,
	POST: handler,
});
