import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
const prisma = new PrismaClient();

export const auth = betterAuth({
	//...
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		google: {
			clientId:
				process.env.GOOGLE_CLIENT_ID ||
				(() => {
					throw new Error("GOOGLE_CLIENT_ID is not defined");
				})(),
			clientSecret:
				process.env.GOOGLE_CLIENT_SECRET ||
				(() => {
					throw new Error("GOOGLE_CLIENT_ID is not defined");
				})(),
		},
	},
	database: prismaAdapter(prisma, {
		provider: "sqlite", // or "mysql", "postgresql", ...etc
	}),
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 10 * 60,
		},
	},
});
