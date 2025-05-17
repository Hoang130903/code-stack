import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton, // Renamed to avoid conflict
  Text,
  Textarea,
  Tabs,
  VStack,
  List, // Corrected from List.Root
  useBreakpointValue,
  chakra,
  Separator as Divider, // Changed from Separator
  Avatar,
  Badge,
  Wrap,
  Tag,
  createListCollection,
  Select,
} from "@chakra-ui/react";
import {
  FiCode,
  FiThumbsUp,
  FiThumbsDown,
  FiShare2,
  FiMessageCircle,
  FiBookOpen,
  FiEdit3,
  FiPlay,
  FiCheckSquare,
} from "react-icons/fi";
import { useState } from "react";
import { useColorModeValue } from "@/components/ui/color-mode"; // Assuming this path is correct for the project

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

const PageHeader = () => {
	const bg = useColorModeValue("white", "gray.800");
	const color = useColorModeValue("gray.800", "white");

	return (
		<Box
			as="header"
			py={1}
			px={{ base: 4, md: 8 }}
			bg={bg}
			boxShadow="sm"
			position="sticky"
			top="0"
			zIndex="sticky"
		>
			<Container maxW="container.2xl">
				<Flex justifyContent="space-between" alignItems="center">
					<Link to="/">
						<HStack gap={2}>
							<Icon as={FiCode} w={8} h={8} color="teal.500" />
							<Heading
								as="h1"
								size="md"
								color={color}
								letterSpacing="tight"
							>
								CodeMaster
							</Heading>
						</HStack>
					</Link>
					<HStack gap={4}>
						<Button
							asChild
							variant="ghost"
							colorPalette="teal"
							size="sm"
						>
							<Link to="/home">Trang chủ</Link>
						</Button>
						<Avatar.Root size="sm">
							<Avatar.Image
								src="https://via.placeholder.com/30"
								alt="User Name"
							/>
							<Avatar.Fallback name="User Name" />
						</Avatar.Root>
					</HStack>
				</Flex>
			</Container>
		</Box>
	);
};

// Problem Description Panel
const ProblemDescriptionPanel = () => {
	const problem = {
		id: "1",
		title: "Two Sum",
		fullTitle: "1. Two Sum",
		description:
			"Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
		examples: [
			{
				input: "nums = [2,7,11,15], target = 9",
				output: "[0,1]",
				explanation:
					"Because nums[0] + nums[1] == 9, we return [0, 1].",
			},
			{
				input: "nums = [3,2,4], target = 6",
				output: "[1,2]",
				explanation: "",
			},
			{
				input: "nums = [3,3], target = 6",
				output: "[0,1]",
				explanation: "",
			},
		],
		constraints: [
			"2 <= nums.length <= 10^4",
			"-10^9 <= nums[i] <= 10^9",
			"-10^9 <= target <= 10^9",
			"Only one valid answer exists.",
		],
		likes: "61.6K",
		dislikes: "1.2K",
		comments: "13K",
	};

	const bgColor = useColorModeValue("white", "gray.800");
	const panelBg = useColorModeValue("gray.50", "gray.700");
	const textColor = useColorModeValue("gray.700", "gray.200");
	const subduedTextColor = useColorModeValue("gray.500", "gray.400");

	return (
		<Flex
			direction="column"
			h="100%"
			bg={bgColor}
			rounded={{ md: "lg" }}
			overflowY="auto" // Allow scrolling within this panel
		>
			<Box p={{ base: 4, md: 6 }} flexGrow={1}>
				<Heading as="h1" size="lg" mb={4}>
					{problem.fullTitle}
				</Heading>
				<Tabs.Root
					variant="line"
					colorPalette="teal"
					size="sm"
					defaultValue="desc"
				>
					<Tabs.List mb={4}>
						<Tabs.Trigger value="desc">Mô tả</Tabs.Trigger>
						<Tabs.Trigger value="editorial">Hướng dẫn</Tabs.Trigger>
						<Tabs.Trigger value="solutions">Giải pháp</Tabs.Trigger>
						<Tabs.Trigger value="submissions">Nộp bài</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="desc" p={0}>
						<VStack align="stretch" gap={5}>
							<Text
								fontSize="md"
								color={textColor}
								whiteSpace="pre-wrap"
							>
								{problem.description}
							</Text>
							<Box>
								<Heading as="h3" size="sm" mb={2}>
									Ví dụ:
								</Heading>
								{problem.examples.map((example, index) => (
									<Box
										key={example.input} // Ensure unique key
										bg={panelBg}
										p={3}
										rounded="md"
										mb={3}
									>
										<Text fontWeight="medium" fontSize="sm">
											Ví dụ {index + 1}:
										</Text>
										<Text
											fontSize="sm"
											whiteSpace="pre-wrap"
										>
											<chakra.strong>
												Input:
											</chakra.strong>
											{example.input}
										</Text>
										<Text
											fontSize="sm"
											whiteSpace="pre-wrap"
										>
											<chakra.strong>
												Output:
											</chakra.strong>
											{example.output}
										</Text>
										{example.explanation && (
											<Text
												fontSize="sm"
												whiteSpace="pre-wrap"
												mt={1}
												color={subduedTextColor}
											>
												<chakra.strong>
													Giải thích:
												</chakra.strong>
												{example.explanation}
											</Text>
										)}
									</Box>
								))}
							</Box>
							<Box>
								<Heading as="h3" size="sm" mb={2}>
									Ràng buộc:
								</Heading>
								<List.Root gap={1}>
									{problem.constraints.map((constraint) => (
										<List.Item
											key={constraint}
											fontSize="sm"
											display="flex"
											alignItems="center"
										>
											<List.Indicator
												as={FiCode}
												color="teal.500"
												fontSize="xs"
												mr={2}
											/>
											{constraint}
										</List.Item>
									))}
								</List.Root>
							</Box>
							<VStack align="stretch" gap={3} pt={4}>
								<Heading as="h3" size="sm" mb={1}>
									Thông tin thêm
								</Heading>
								<HStack justifyContent="space-between">
									<Text
										fontSize="sm"
										color={subduedTextColor}
									>
										Độ khó:
									</Text>
									<Badge
										colorPalette="green"
										variant="solid"
										fontSize="xs"
									>
										Dễ
									</Badge>
								</HStack>
								<HStack justifyContent="space-between">
									<Text
										fontSize="sm"
										color={subduedTextColor}
									>
										Chủ đề:
									</Text>
									<Wrap gap={1}>
										<Tag.Root
											size="sm"
											colorPalette="blue"
											variant="subtle"
										>
											<Tag.Label>Mảng</Tag.Label>
										</Tag.Root>
										<Tag.Root
											size="sm"
											colorPalette="purple"
											variant="subtle"
										>
											<Tag.Label>Bảng băm</Tag.Label>
										</Tag.Root>
									</Wrap>
								</HStack>
								<HStack justifyContent="space-between">
									<Text
										fontSize="sm"
										color={subduedTextColor}
									>
										Lượt chấp nhận:
									</Text>
									<Text fontSize="sm" fontWeight="medium">
										75.2%
									</Text>
								</HStack>
							</VStack>
						</VStack>
					</Tabs.Content>
					<Tabs.Content value="editorial" p={4}>
						<Text color={textColor}>
							Nội dung hướng dẫn giải chi tiết sẽ ở đây.
						</Text>
					</Tabs.Content>
					<Tabs.Content value="solutions" p={4}>
						<Text color={textColor}>
							Các giải pháp từ cộng đồng sẽ được hiển thị ở đây.
						</Text>
					</Tabs.Content>
					<Tabs.Content value="submissions" p={4}>
						<Text color={textColor}>
							Lịch sử các lần nộp bài của bạn cho bài toán này.
						</Text>
					</Tabs.Content>
				</Tabs.Root>
			</Box>
			<Divider />
			<HStack
				p={{ base: 3, md: 4 }}
				gap={3}
				justifyContent="space-between"
				bg={useColorModeValue("gray.50", "gray.850")}
				borderBottomRadius={{ md: "lg" }}
			>
				<HStack gap={1}>
					<IconButton aria-label="Thích" variant="ghost" size="sm">
						<FiThumbsUp />
					</IconButton>
					<Text fontSize="sm" color={subduedTextColor}>
						{problem.likes}
					</Text>
					<IconButton
						aria-label="Không thích"
						variant="ghost"
						size="sm"
					>
						<FiThumbsDown />
					</IconButton>
				</HStack>
				<HStack gap={1}>
					<IconButton
						aria-label="Thêm vào danh sách"
						variant="ghost"
						size="sm"
					>
						<FiBookOpen />
					</IconButton>
				</HStack>
				<HStack gap={1}>
					<IconButton
						aria-label="Bình luận"
						variant="ghost"
						size="sm"
					>
						<FiMessageCircle />
					</IconButton>
					<Text fontSize="sm" color={subduedTextColor}>
						{problem.comments}
					</Text>
				</HStack>
				<IconButton aria-label="Chia sẻ" variant="ghost" size="sm">
					<FiShare2 />
				</IconButton>
			</HStack>
		</Flex>
	);
};

// Code Editor Area (Top part of the right panel)
const CodeEditorArea = () => {
	const languages = [
		{ value: "python", label: "Python" },
		{ value: "javascript", label: "JavaScript" },
		{ value: "java", label: "Java" },
		{ value: "cpp", label: "C++" },
		{ value: "csharp", label: "C#" },
	];
	const languageCollection = createListCollection({
		items: languages.map((lang) => ({
			value: lang.value,
			label: lang.label,
		})),
	});
	const [selectedLanguage, setSelectedLanguage] = useState<string>("python");
	const [code, setCode] = useState(
		"# Viết code của bạn ở đây\ndef twoSum(nums, target):\n    # Your logic here\n    return []"
	);

	const editorBg = useColorModeValue("gray.50", "gray.900");
	const editorColor = useColorModeValue("gray.800", "gray.100");

	const handleLanguageChange = (value: string | string[]) => {
		const lang = Array.isArray(value) ? value[0] : value;
		if (lang === undefined) return;
		setSelectedLanguage(lang);
		switch (lang) {
			case "javascript":
				setCode(
					"/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    // Your logic here\n    return [];\n};"
				);
				break;
			case "java":
				setCode(
					"class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your logic here\n        return new int[]{};\n    }\n}"
				);
				break;
			// Add other languages if needed
			default:
				setCode(
					"# Viết code của bạn ở đây\ndef twoSum(nums, target):\n    # Your logic here\n    return []"
				);
		}
	};

	return (
		<Flex
			direction="column"
			h="100%"
			overflow="hidden"
			position={"relative"}
		>
			<Box position="absolute" bottom={"10px"} right={"10px"} zIndex={1}>
				<HStack mt={4} justifyContent="flex-end" gap={3}>
					<Button colorPalette="gray" variant="outline" size="sm">
						<FiPlay />
						Chạy thử
					</Button>
					<Button colorPalette="green" size="sm">
						<FiCheckSquare />
						Nộp bài
					</Button>
				</HStack>
			</Box>
			<HStack
				p={1}
				borderBottomWidth="1px"
				borderColor={useColorModeValue("gray.200", "gray.700")}
				flexShrink={0}
			>
				<Select.Root
					collection={languageCollection}
					value={selectedLanguage ? [selectedLanguage] : []}
					onValueChange={(details) => {
						if (details.value.length > 0) {
							handleLanguageChange(details.value[0]);
						} else {
							handleLanguageChange("");
						}
					}}
					width="150px"
					size="xs"
				>
					<Select.Control>
						<Select.Trigger>
							<Select.ValueText placeholder="Chọn ngôn ngữ" />
						</Select.Trigger>
						<Select.IndicatorGroup>
							<Select.Indicator />
						</Select.IndicatorGroup>
					</Select.Control>
					<Select.Positioner>
						<Select.Content>
							{languageCollection.items.map((lang) => (
								<Select.Item item={lang} key={lang.value}>
									<Select.ItemText>
										{lang.label}
									</Select.ItemText>
								</Select.Item>
							))}
						</Select.Content>
					</Select.Positioner>
				</Select.Root>
				<IconButton
					aria-label="Thiết lập Editor"
					size="sm"
					variant="ghost"
				>
					<FiEdit3 />
				</IconButton>
			</HStack>
			<Box flexGrow={1} p={0.5} position="relative" overflow="hidden">
				<Textarea
					value={code}
					onChange={(e) => setCode(e.target.value)}
					placeholder="Viết code của bạn ở đây..."
					h="100%"
					fontFamily="monospace"
					fontSize="sm"
					bg={editorBg}
					color={editorColor}
					border="none"
					focusRingColor="transparent"
					resize="none"
					p={3}
					css={{
						// Using css prop for scrollbar styling
						"&::-webkit-scrollbar": {
							width: "8px",
						},
						"&::-webkit-scrollbar-track": {
							background: useColorModeValue(
								"gray.100",
								"gray.700"
							),
						},
						"&::-webkit-scrollbar-thumb": {
							background: useColorModeValue(
								"gray.400",
								"gray.500"
							),
							borderRadius: "4px",
						},
						"&::-webkit-scrollbar-thumb:hover": {
							background: useColorModeValue(
								"gray.500",
								"gray.400"
							),
						},
					}}
				/>
			</Box>
		</Flex>
	);
};

const TestAndResultPanel = () => {
	// toDo: Implement the test case and result logic
	return (
		<Box p={3} h="100%" overflowY="auto">
			<Box mt={2}>
				<Text fontSize="sm" fontWeight="bold" color="green.500">
					Test Case 1: Passed
				</Text>
				<Text fontSize="xs">Input: nums = [2,7,11,15], target = 9</Text>
				<Text fontSize="xs">Output: [0,1]</Text>
				<Text fontSize="xs">Expected: [0,1]</Text>
				<Text fontSize="xs">Runtime: 5ms</Text>
			</Box>
		</Box>
	);
};

// Main Resizable Component for the Right Side
const RightResizablePanel = () => {
	const panelBg = useColorModeValue("white", "gray.800");
	const handleBg = useColorModeValue("gray.200", "gray.600");
	const handleActiveBg = useColorModeValue("gray.300", "gray.500");

	return (
		<Flex
			direction="column"
			h="100%"
			bg={panelBg}
			boxShadow={{ md: "sm" }}
			rounded={{ md: "lg" }}
			overflow="hidden"
		>
			<PanelGroup direction="vertical">
				<Panel defaultSize={70} minSize={30}>
					<CodeEditorArea />
				</Panel>
				<PanelResizeHandle>
					<Flex
						alignItems="center"
						justifyContent="center"
						h="4px"
						bg={handleBg}
						outline="none"
						transition="background-color 0.2s"
						_hover={{ bg: handleActiveBg }}
						_active={{ bg: handleActiveBg }}
						data-panel-resize-handle-active // Attribute for potential active styling from library
					>
						<Box
							w="30px"
							h="4px"
							bg={useColorModeValue("gray.400", "gray.500")}
							rounded="full"
						/>
					</Flex>
				</PanelResizeHandle>
				<Panel
					defaultSize={30}
					minSize={20}
					collapsible
					collapsedSize={21}
				>
					<Box h="100%" overflowY="auto">
						<TestAndResultPanel />
					</Box>
				</Panel>
			</PanelGroup>
		</Flex>
	);
};

function RouteComponent() {
	const isMobile = useBreakpointValue({ base: true, lg: false });
	const panelBg = useColorModeValue("gray.100", "gray.900"); // Background for the panel group area
	const handleBg = useColorModeValue("gray.300", "gray.600");
	const handleActiveBg = useColorModeValue("gray.400", "gray.500");

	if (isMobile) {
		return (
			<Flex direction="column" minH="100vh" bg={panelBg}>
				<PageHeader />
				<VStack gap={0} flex="1" overflowY="auto" className="con cac">
					<Box w="100%">
						<ProblemDescriptionPanel />
					</Box>
					<Divider borderColor={handleBg} my={0} />
					<Box w="100%">
						<RightResizablePanel />
					</Box>
				</VStack>
			</Flex>
		);
	}

	return (
		<Flex
			direction="column"
			h="100vh"
			maxH="100vh"
			overflow="hidden"
			bg={panelBg}
		>
			<PageHeader />
			<Box flex="1" p={{ base: 1, md: 2 }} overflow="hidden">
				<PanelGroup
					direction="horizontal"
					style={{ height: "calc(100vh - 30px - 16px)" }}
				>
					<Panel defaultSize={50} minSize={30}>
						<Box h="100%" px={{ base: 1, md: 2 }} overflow="hidden">
							<ProblemDescriptionPanel />
						</Box>
					</Panel>
					<PanelResizeHandle>
						<Flex
							alignItems="center"
							justifyContent="center"
							w="4px"
							h="100%"
							bg={handleBg}
							outline="none"
							transition="background-color 0.2s"
							_hover={{ bg: handleActiveBg }}
							_active={{ bg: handleActiveBg }}
							data-panel-resize-handle-active // For library's active state styling
						>
							<Box
								h="30px"
								w="4px"
								bg={useColorModeValue("gray.400", "gray.500")}
								rounded="full"
							/>
						</Flex>
					</PanelResizeHandle>
					<Panel defaultSize={50} minSize={30}>
						<Box h="100%" px={{ base: 1, md: 2 }} overflow="hidden">
							<RightResizablePanel />
						</Box>
					</Panel>
				</PanelGroup>
			</Box>
		</Flex>
	);
}

export const Route = createFileRoute("/solving")({
	component: RouteComponent,
});
