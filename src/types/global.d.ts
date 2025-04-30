import type { TRPCContext } from "@server/trpc";

declare global {
	type TRPCHandlerParam<T> = {
		ctx: TRPCContext;
		input: T;
	};
}
