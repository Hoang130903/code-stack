import { paginationQuerySchema } from "@/validations/paginationQuerySchema";
import { z } from "better-auth";

const input = paginationQuerySchema.extend({
	search: z.string().optional(),
});

export type GetLanguagesInput = z.infer<typeof input>;

const getLanguageHandler = async ({
	ctx,
	input,
}: TRPCHandlerParam<GetLanguagesInput>) => {
	const result = await ctx.languageService.findAll(input);
	return [result.data, result.total] as const;
};
getLanguageHandler.input = input;
export default getLanguageHandler;
