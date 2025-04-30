import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { db } from "../db";
import { LanguageService } from "../services/language.service";
export const createTRPCContext = async () => {
	// opts: { headers: Headers }
	return {
		languageService: new LanguageService(db),
	};
};
const t = initTRPC.context<typeof createTRPCContext>().create({
	transformer: superjson,
});

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
