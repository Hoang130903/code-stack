import React, { useState } from "react";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	VStack,
	Text,
	Divider,
	HStack,
	useColorModeValue,
} from "@chakra-ui/react";
import { FaGoogle, FaGithub, FaTwitter } from "react-icons/fa";

const LoginForm: React.FC = () => {
	const [formData, setFormData] = useState<any>({
		email: "",
		password: "",
	});
	const bgCard = useColorModeValue("background.dark", "gray.800");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form submitted:", formData);
		// Thêm logic đăng nhập tại đây (gọi API, v.v.)
	};

	const handleSocialLogin = (provider: string) => {
		console.log(`Login with ${provider}`);
		// Thêm logic đăng nhập qua Google, GitHub, X (Twitter) tại đây
	};

	return (
		<Box
			minH="100vh"
			display="flex"
			alignItems="center"
			justifyContent="center"
			bg="background.dark"
		>
			<Box
				bg={bgCard}
				p={8}
				borderRadius="xl"
				boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
				w={{ base: "90%", md: "400px" }}
			>
				<VStack spacing={6}>
					<Text fontSize="2xl" fontWeight="bold" fontFamily="heading">
						Đăng Nhập
					</Text>
					<form onSubmit={handleSubmit} style={{ width: "100%" }}>
						<VStack spacing={4}>
							<FormControl isRequired>
								<FormLabel>Email</FormLabel>
								<Input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									placeholder="Nhập email của bạn"
								/>
							</FormControl>
							<FormControl isRequired>
								<FormLabel>Mật khẩu</FormLabel>
								<Input
									type="password"
									name="password"
									value={formData.password}
									onChange={handleInputChange}
									placeholder="Nhập mật khẩu"
								/>
							</FormControl>
							<Button type="submit" variant="solid" w="full">
								Đăng Nhập
							</Button>
						</VStack>
					</form>
					<Divider />
					<Text>Hoặc đăng nhập bằng</Text>
					<HStack spacing={4} w="full" justify="center">
						<Button
							leftIcon={<FaGoogle />}
							variant="outline"
							onClick={() => handleSocialLogin("Google")}
							flex={1}
						>
							Google
						</Button>
						<Button
							leftIcon={<FaGithub />}
							variant="outline"
							onClick={() => handleSocialLogin("GitHub")}
							flex={1}
						>
							GitHub
						</Button>
						<Button
							leftIcon={<FaTwitter />}
							variant="outline"
							onClick={() => handleSocialLogin("X")}
							flex={1}
						>
							X
						</Button>
					</HStack>
				</VStack>
			</Box>
		</Box>
	);
};

export default LoginForm;
