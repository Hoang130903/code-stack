import type { TRPCRouterRecord } from "@trpc/server";
// import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from "@server/trpc";
import { languageRouter } from "./language.router";

const peopleRouter = {
	list: publicProcedure.query(async () =>
		fetch("https://swapi.dev/api/people")
			.then((res) => res.json())
			.then((d) => d.results as { name: string }[])
	),
} satisfies TRPCRouterRecord;

export const trpcRouter = createTRPCRouter({
	people: peopleRouter,
	language: languageRouter,
});
export type TRPCRouter = typeof trpcRouter;
