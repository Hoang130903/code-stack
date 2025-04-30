import getLanguageHandler from "../handlers/language/getLanguages";
import { createTRPCRouter, publicProcedure } from "../index";

export const languageRouter = createTRPCRouter({
	getLanguages: publicProcedure
		.input(getLanguageHandler.input)
		.query(getLanguageHandler),
});
