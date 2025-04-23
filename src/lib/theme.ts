import { extendTheme } from "@chakra-ui/react";

// Định nghĩa theme
const techTheme = extendTheme({
	// Màu sắc
	colors: {
		primary: {
			50: "#e0f7ff",
			100: "#b3e5ff",
			200: "#80d4ff",
			300: "#4dc3ff",
			400: "#26b5ff",
			500: "#00aaff", // Màu chính (xanh công nghệ)
			600: "#0099e6",
			700: "#0083cc",
			800: "#006db3",
			900: "#004d80",
		},
		accent: {
			500: "#ff4da6", // Màu hồng phấn trẻ trung
			600: "#e64594",
		},
		background: {
			dark: "#1a202c", // Nền tối
			light: "#f7fafc",
		},
	},
	// Font chữ
	fonts: {
		heading: `'Poppins', sans-serif`,
		body: `'Inter', sans-serif`,
	},
	// Styles toàn cục
	styles: {
		global: {
			body: {
				bg: "background.dark",
				color: "white",
			},
		},
	},
	// Tùy chỉnh components
	components: {
		Button: {
			baseStyle: {
				borderRadius: "lg", // Bo góc mềm
				fontWeight: "bold",
			},
			variants: {
				solid: {
					bg: "primary.500",
					color: "white",
					_hover: {
						bg: "primary.600",
						transform: "scale(1.05)", // Hiệu ứng zoom khi hover
						transition: "all 0.2s ease-in-out",
					},
				},
				outline: {
					borderColor: "primary.500",
					color: "primary.500",
					_hover: {
						bg: "primary.50",
					},
				},
			},
		},
		Card: {
			baseStyle: {
				bg: "background.dark",
				borderRadius: "xl",
				boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", // Shadow hiện đại
				p: 6,
			},
		},
	},
	// Hiệu ứng transition
	transition: {
		property: {
			common: "all 0.2s ease-in-out",
		},
	},
});

export default techTheme;
