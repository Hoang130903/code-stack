import { ChakraProvider } from "@chakra-ui/react";
import type { ColorModeProviderProps } from "./color-mode";
import { system } from "./theme";
import { ThemeProvider } from "next-themes";

export function Provider(props: ColorModeProviderProps) {
	return (
		<ChakraProvider value={system}>
			<ThemeProvider attribute="class" disableTransitionOnChange>
				{props.children}
			</ThemeProvider>
		</ChakraProvider>
	);
}
