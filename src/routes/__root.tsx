import { Provider } from "@/components/ui/provider";
import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
	}),
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Provider>
				<Outlet />
			</Provider>
		</RootDocument>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="vi">
			<head>
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Mono&display=swap"
					rel="stylesheet"
				/>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
