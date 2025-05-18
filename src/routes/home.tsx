import { createFileRoute, Link } from "@tanstack/react-router";
import {
	Box,
	Button,
	Container,
	Flex,
	Grid,
	GridItem,
	Heading,
	HStack,
	Icon,
	IconButton,
	Input,
	InputGroup,
	Select,
	SimpleGrid,
	Stack,
	Table,
	Text,
	VStack,
	Wrap,
	WrapItem,
	Tag,
	Avatar,
	Card, Badge,
	Stat,
	useBreakpointValue,
	Drawer,
	useDisclosure,
	chakra,
	Separator as Divider
} from "@chakra-ui/react";
import {
	FiCode,
	FiSearch,
	FiFilter,
	FiChevronLeft,
	FiChevronRight,
	FiChevronsLeft,
	FiChevronsRight,
	FiAward,
	FiTrendingUp,
	FiUsers,
	FiList,
	FiGrid,
	FiCalendar,
	FiGift,
	FiZap,
	FiMenu,
	FiStar,
	FiCheckCircle,
	FiBell,
	FiUser,
	FiLogOut,
} from "react-icons/fi";
import React, { useState, useMemo } from "react";
import { useColorModeValue } from "@/components/ui/color-mode";
// --- START: Sample Data ---
interface Problem {
	id: string;
	title: string;
	difficulty: "Dễ" | "Trung bình" | "Khó";
	tags: string[];
	acceptance: string;
	status?: "Đã giải" | "Thử lại";
}

const sampleProblems: Problem[] = [
	{
		id: "p1",
		title: "Tổng hai số",
		difficulty: "Dễ",
		tags: ["Mảng", "Toán"],
		acceptance: "90.5%",
		status: "Đã giải",
	},
	{
		id: "p2",
		title: "Chuỗi đối xứng",
		difficulty: "Dễ",
		tags: ["Chuỗi"],
		acceptance: "85.2%",
	},
	{
		id: "p3",
		title: "Tìm cây khung nhỏ nhất",
		difficulty: "Trung bình",
		tags: ["Đồ thị", "Tham lam"],
		acceptance: "60.1%",
		status: "Thử lại",
	},
	{
		id: "p4",
		title: "Đường đi ngắn nhất Dijkstra",
		difficulty: "Trung bình",
		tags: ["Đồ thị", "Quy hoạch động"],
		acceptance: "55.8%",
	},
	{
		id: "p5",
		title: "Luồng cực đại",
		difficulty: "Khó",
		tags: ["Đồ thị", "Luồng"],
		acceptance: "30.7%",
	},
	{
		id: "p6",
		title: "Bài toán ba lô",
		difficulty: "Trung bình",
		tags: ["Quy hoạch động"],
		acceptance: "65.0%",
	},
	{
		id: "p7",
		title: "Phân tích số nguyên tố",
		difficulty: "Dễ",
		tags: ["Toán", "Số học"],
		acceptance: "88.2%",
	},
	{
		id: "p8",
		title: "Tìm kiếm nhị phân trên mảng xoay",
		difficulty: "Trung bình",
		tags: ["Mảng", "Chia để trị"],
		acceptance: "58.5%",
	},
	{
		id: "p9",
		title: "Cây đoạn (Segment Tree)",
		difficulty: "Khó",
		tags: ["Cấu trúc dữ liệu"],
		acceptance: "40.3%",
	},
	{
		id: "p10",
		title: "Ký tự xuất hiện nhiều nhất",
		difficulty: "Dễ",
		tags: ["Chuỗi", "Đếm"],
		acceptance: "92.1%",
	},
];

const sampleCategories = [
	{ name: "Mảng & Chuỗi", icon: FiList, count: 120 },
	{ name: "Đồ thị", icon: FiGrid, count: 85 },
	{ name: "Quy hoạch động", icon: FiTrendingUp, count: 95 },
	{ name: "Cấu trúc dữ liệu", icon: FiCode, count: 70 },
	{ name: "Toán học", icon: FiAward, count: 150 },
	{ name: "Tham lam", icon: FiStar, count: 60 },
];

const sampleTags = [
	"#array",
	"#string",
	"#dp",
	"#graph",
	"#greedy",
	"#math",
	"#datastructure",
	"#sort",
	"#search",
];

const sampleLeaderboard = [
	{
		rank: 1,
		name: "CoderPro123",
		avatar: "https://via.placeholder.com/30?text=C1",
		points: 15000,
	},
	{
		rank: 2,
		name: "LogicMaster",
		avatar: "https://via.placeholder.com/30?text=L2",
		points: 14500,
	},
	{
		rank: 3,
		name: "AlgoQueen",
		avatar: "https://via.placeholder.com/30?text=A3",
		points: 13800,
	},
	{
		rank: 4,
		name: "BugHunter",
		avatar: "https://via.placeholder.com/30?text=B4",
		points: 12000,
	},
	{
		rank: 5,
		name: "ScriptKid",
		avatar: "https://via.placeholder.com/30?text=S5",
		points: 11500,
	},
];

const sampleContests = [
	{
		id: "c1",
		name: "Thử Thách Thuật Toán Tháng 5",
		date: "20/05/2025",
		registered: 1200,
		type: "Cá nhân",
	},
	{
		id: "c2",
		name: "Đấu Trường Lập Trình Mùa Hè",
		date: "15/06/2025",
		registered: 850,
		type: "Đội nhóm",
	},
	{
		id: "c3",
		name: "Giải Vô Địch CodeMaster 2025",
		date: "01/08/2025",
		registered: 500,
		type: "Cá nhân",
	},
];
// --- END: Sample Data ---

// --- START: Reusable Components ---
const Header = () => {
	const bg = useColorModeValue("white", "gray.800");
	const color = useColorModeValue("gray.800", "white");
	const { open: isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef<HTMLButtonElement>(null);

	const isMobile = useBreakpointValue({ base: true, lg: false });

	return (
		<Box
			as="header"
			py={3}
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
						<HStack borderSpacing={2}>
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
					{isMobile ? (
						<IconButton
							ref={btnRef}
							aria-label="Mở menu"
							onClick={onOpen}
							variant="ghost"
							colorScheme="teal"
						>
							<FiMenu />
						</IconButton>
					) : (
						<HStack borderSpacing={4}>
							<Button
								as={Link}
								variant="ghost"
								colorScheme="teal"
								size="sm"
								to="/problems"
							>
								Bài tập
							</Button>
							<Button
								as={Link}
								variant="ghost"
								colorScheme="teal"
								size="sm"
								to="/contests"
							>
								Cuộc thi
							</Button>
							<Button
								as={Link}
								variant="ghost"
								colorScheme="teal"
								size="sm"
								to="/community"
							>
								Cộng đồng
							</Button>
							<Button
								as={Link}
								variant="ghost"
								colorScheme="teal"
								size="sm"
								to="/leaderboard"
							>
								Xếp hạng
							</Button>
							<IconButton
								aria-label="Thông báo"
								variant="ghost"
								size="sm"
							>
								<FiBell />
							</IconButton>
							<Avatar.Root size="sm">
								<Avatar.Fallback
									bg="teal.500"
									color="white"
									fontSize="0.8rem"
								>
									U
								</Avatar.Fallback>
								<Avatar.Image
									alt="User Avatar"
									borderRadius="full"
									boxSize="30px"
									objectFit="cover"
									src="https://placewaifu.com/image/200/200"
								/>
							</Avatar.Root>
						</HStack>
					)}
				</Flex>
			</Container>
			{/* Mobile Drawer Menu */}
			<Drawer.Root open={isOpen} onOpenChange={onClose}>
				<Drawer.Backdrop />
				<Drawer.Positioner>
					<Drawer.Content bg={bg}>
						<Drawer.CloseTrigger />
						<Drawer.Header borderBottomWidth="1px">
							<HStack borderSpacing={2}>
								<Icon
									as={FiCode}
									w={6}
									h={6}
									color="teal.500"
								/>
								<Text fontWeight="bold">CodeMaster</Text>
							</HStack>
						</Drawer.Header>

						<Drawer.Body>
							<VStack borderSpacing={4} align="stretch">
								<Button
									as={Link}
									variant="ghost"
									colorScheme="teal"
									justifyContent="flex-start"
									to="/home"
									onClick={onClose}
								>
									Trang chủ
								</Button>
								<Button
									as={Link}
									variant="ghost"
									colorScheme="teal"
									justifyContent="flex-start"
									to="/problems"
									onClick={onClose}
								>
									Bài tập
								</Button>
								<Button
									as={Link}
									variant="ghost"
									colorScheme="teal"
									justifyContent="flex-start"
									to="/contests"
									onClick={onClose}
								>
									Cuộc thi
								</Button>
								<Button
									as={Link}
									variant="ghost"
									colorScheme="teal"
									justifyContent="flex-start"
									to="/community"
									onClick={onClose}
								>
									Cộng đồng
								</Button>
								<Button
									as={Link}
									variant="ghost"
									colorScheme="teal"
									justifyContent="flex-start"
									to="/leaderboard"
									onClick={onClose}
								>
									Xếp hạng
								</Button>
								<Divider />
								<Button
									as={Link}
									variant="ghost"
									colorScheme="teal"
									justifyContent="flex-start"
									to="/profile"
									onClick={onClose}
								>
									<FiUser />
									Hồ sơ
								</Button>
								<Button
									as={Link}
									variant="ghost"
									colorScheme="teal"
									justifyContent="flex-start"
									to="/logout"
									onClick={onClose}
								>
									<FiLogOut />
									Đăng xuất
								</Button>
							</VStack>
						</Drawer.Body>
					</Drawer.Content>
				</Drawer.Positioner>
			</Drawer.Root>
		</Box>
	);
};

const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<Box
			bg={useColorModeValue("gray.100", "gray.900")}
			color={useColorModeValue("gray.700", "gray.200")}
			mt={16}
		>
			<Container maxW="container.xl" py={8}>
				<Text textAlign="center" fontSize="sm">
					&copy; {year} CodeMaster. Nơi tài năng lập trình tỏa sáng.
				</Text>
			</Container>
		</Box>
	);
};
// --- END: Reusable Components ---

// --- START: Page Specific Components ---
const ProblemsTable = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const problemsPerPage = 7;
	const [searchTerm, setSearchTerm] = useState("");
	const [difficultyFilter, setDifficultyFilter] = useState("");
	const [tagFilter, setTagFilter] = useState<string[]>([]);

	const filteredProblems = useMemo(() => {
		return sampleProblems
			.filter((problem) =>
				problem.title.toLowerCase().includes(searchTerm.toLowerCase())
			)
			.filter(
				(problem) =>
					difficultyFilter === "" ||
					problem.difficulty === difficultyFilter
			)
			.filter(
				(problem) =>
					tagFilter.length === 0 ||
					tagFilter.every((tag) =>
						problem.tags
							.map((t) => t.toLowerCase())
							.includes(tag.toLowerCase())
					)
			);
	}, [searchTerm, difficultyFilter, tagFilter]);

	const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);
	const currentProblems = filteredProblems.slice(
		(currentPage - 1) * problemsPerPage,
		currentPage * problemsPerPage
	);

	const difficultyColors = {
		Dễ: "green.500",
		"Trung bình": "orange.400",
		Khó: "red.500",
	};

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	// Pagination component from Chakra UI v3 docs
	const PaginationComponent = () => {
		const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
		const maxVisiblePages = 5;
		let startPage = Math.max(
			1,
			currentPage - Math.floor(maxVisiblePages / 2)
		);
		const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

		if (endPage - startPage + 1 < maxVisiblePages) {
			startPage = Math.max(1, endPage - maxVisiblePages + 1);
		}

		const visiblePages = pages.slice(startPage - 1, endPage);

		return (
			<HStack borderSpacing={2} mt={6} justifyContent="center">
				<IconButton
					aria-label="Trang đầu"
					onClick={() => handlePageChange(1)}
					disabled={currentPage === 1}
					size="sm"
				>
					<FiChevronsLeft />
				</IconButton>

				<IconButton
					aria-label="Trang trước"
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
					size="sm"
				>
					<FiChevronLeft />
				</IconButton>
				{startPage > 1 && <Text>...</Text>}
				{visiblePages.map((page) => (
					<Button
						key={page}
						onClick={() => handlePageChange(page)}
						variant={currentPage === page ? "solid" : "outline"}
						colorScheme="teal"
						size="sm"
					>
						{page}
					</Button>
				))}
				{endPage < totalPages && <Text>...</Text>}
				<IconButton
					aria-label="Trang sau"
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					size="sm"
				>
					<FiChevronRight />
				</IconButton>

				<IconButton
					aria-label="Trang cuối"
					onClick={() => handlePageChange(totalPages)}
					disabled={currentPage === totalPages}
					size="sm"
				>
					<FiChevronsRight />
				</IconButton>
			</HStack>
		);
	};

	return (
		<Box>
			<Stack
				direction={{ base: "column", md: "row" }}
				borderSpacing={4}
				mb={6}
			>
				<InputGroup
					flex={1}
					startElement={<Icon as={FiSearch} color="gray.300" />}
				>
					<Input
						placeholder="Tìm kiếm bài toán..."
						value={searchTerm}
						onChange={(e) => {
							setSearchTerm(e.target.value);
							setCurrentPage(1);
						}}
						w={"300px"}
					/>
				</InputGroup>
				<Select.Root
					value={difficultyFilter}
					onValueChange={({value}) => {
						setDifficultyFilter(value);
						setCurrentPage(1);
					}}
					multiple={false}
				>
					<Select.HiddenSelect />
					<Select.Control w={{ base: "full", md: "200px" }}>
						<Select.Trigger>
							<Select.ValueText placeholder="Độ khó" />
						</Select.Trigger>
						<Select.IndicatorGroup>
							<Select.Indicator />
							<Select.ClearTrigger />
						</Select.IndicatorGroup>
					</Select.Control>

					<Select.Positioner>
						<Select.Content>
							<Select.Item item="">Tất cả</Select.Item>
							<Select.Item item="Dễ">Dễ</Select.Item>
							<Select.Item item="Trung bình">
								Trung bình
							</Select.Item>
							<Select.Item item="Khó">Khó</Select.Item>
						</Select.Content>
					</Select.Positioner>
				</Select.Root>

				{/* Button lọc Tags giữ nguyên (không cần migrate) */}
				<Button
					colorScheme="teal"
					variant="outline"
					w={{ base: "full", md: "auto" }}
				>
					<FiFilter />
					Lọc Tags
				</Button>
			</Stack>

			<Box overflowX="auto">
				<Table.Root
					variant="line"
					
					size={useBreakpointValue({ base: "sm", md: "md" })}
				>
					<Table.Header>
						<Table.Row>
							<Table.ColumnHeader>Trạng thái</Table.ColumnHeader>
							<Table.ColumnHeader>
								Tên bài toán
							</Table.ColumnHeader>
							<Table.ColumnHeader>Độ khó</Table.ColumnHeader>
							<Table.ColumnHeader>Tags</Table.ColumnHeader>
							<Table.ColumnHeader>
								Tỷ lệ chấp nhận
							</Table.ColumnHeader>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{currentProblems.map((problem) => (
							<Table.Row
								key={problem.id}
								_hover={{
									bg: useColorModeValue(
										"gray.50",
										"gray.700"
									),
									cursor: "pointer",
								}}
								onClick={() =>
									alert(`Mở bài: ${problem.title}`)
								}
							>
								<Table.Cell>
									{problem.status === "Đã giải" && (
										<Icon
											as={FiCheckCircle}
											color="green.500"
										/>
									)}
									{problem.status === "Thử lại" && (
										<Icon as={FiZap} color="orange.400" />
									)}
								</Table.Cell>
								<Table.Cell fontWeight="medium">
									{problem.title}
								</Table.Cell>
								<Table.Cell>
									<Text
										color={
											difficultyColors[
												problem.difficulty
											] || "gray.500"
										}
										fontWeight="medium"
									>
										{problem.difficulty}
									</Text>
								</Table.Cell>
								<Table.Cell>
									<Wrap borderSpacing={1}>
										{problem.tags.map((tag) => (
											<WrapItem key={tag}>
												<Tag.Root
													size="sm"
													colorScheme="gray"
													variant="subtle"
												>
													<Tag.Label>{tag}</Tag.Label>
												</Tag.Root>
											</WrapItem>
										))}
									</Wrap>
								</Table.Cell>
								<Table.Cell fontVariantNumeric={"tabular-nums"}>
									{problem.acceptance}
								</Table.Cell>
							</Table.Row>
						))}
						{currentProblems.length === 0 && (
							<Table.Row>
								<Table.Cell colSpan={5} textAlign="center">
									Không tìm thấy bài toán nào phù hợp.
								</Table.Cell>
							</Table.Row>
						)}
					</Table.Body>
				</Table.Root>
			</Box>
			{totalPages > 1 && <PaginationComponent />}
		</Box>
	);
};

const LeftSidebar = () => {
	return (
		<VStack
			borderSpacing={8}
			align="stretch"
			p={4}
			bg={useColorModeValue("gray.50", "gray.800")}
			rounded="lg"
			boxShadow="sm"
		>
			<Box>
				<Heading
					size="sm"
					mb={3}
					color={useColorModeValue("gray.700", "gray.200")}
				>
					Chủ đề
				</Heading>
				<VStack align="stretch" borderSpacing={2}>
					{sampleCategories.map((category) => (
						<Button
							key={category.name}
							variant="ghost"
							colorScheme="teal"
							justifyContent="space-between"
							size="sm"
							fontWeight="normal"
						>
							<Icon as={category.icon} />
							<Text flex="1" textAlign="left">
								{category.name}
							</Text>
							<Badge
								colorScheme="gray"
								variant="solid"
								fontSize="0.7em"
							>
								{category.count}
							</Badge>
						</Button>
					))}
				</VStack>
			</Box>
			<Box>
				<Heading
					size="sm"
					mb={3}
					color={useColorModeValue("gray.700", "gray.200")}
				>
					Tags phổ biến
				</Heading>
				<Wrap borderSpacing={2}>
					{sampleTags.map((tag) => (
						<WrapItem key={tag}>
							<Tag.Root
								size="md"
								variant="subtle"
								colorScheme="teal"
								cursor="pointer"
								_hover={{
									bg: "teal.100",
									_dark: { bg: "teal.700" },
								}}
							>
								{tag}
							</Tag.Root>
						</WrapItem>
					))}
				</Wrap>
			</Box>
		</VStack>
	);
};

const RightSidebar = () => {
	return (
		<VStack
			borderSpacing={8}
			align="stretch"
			p={4}
			bg={useColorModeValue("gray.50", "gray.800")}
			rounded="lg"
			boxShadow="sm"
		>
			<Box>
				<Heading
					size="sm"
					mb={3}
					color={useColorModeValue("gray.700", "gray.200")}
				>
					Bảng xếp hạng
				</Heading>
				<VStack align="stretch" borderSpacing={3}>
					{sampleLeaderboard.map((user) => (
						<HStack
							key={user.rank}
							borderSpacing={3}
							_hover={{
								bg: useColorModeValue("gray.100", "gray.700"),
							}}
							p={1.5}
							rounded="md"
						>
							<Text
								fontWeight="bold"
								color="teal.500"
								w="20px"
								textAlign="center"
							>
								{user.rank}
							</Text>
							<Avatar.Root size="xs">
								<Avatar.Fallback name={user.name} />
								<Avatar.Image src={user.avatar} />
							</Avatar.Root>
							<Text
								fontSize="sm"
								fontWeight="medium"
								lineClamp={1}
							>
								{user.name}
							</Text>
							<Text fontSize="xs" color="gray.500" ml="auto">
								{user.points} pts
							</Text>
						</HStack>
					))}
					<Button
						size="xs"
						variant="ghost"
						colorScheme="teal"
						alignSelf="flex-end"
					>
						Xem tất cả
					</Button>
				</VStack>
			</Box>
			<ContestsEventsPreview />
		</VStack>
	);
};
	// <Box
	// 							p={6}
	// 							bg={useColorModeValue("white", "gray.800")}
	// 							rounded="lg"
	// 							boxShadow="base"
	// 						>
	// 							<Heading size="lg" mb={1}>
	// 								Chào mừng trở lại, Hoàng!
	// 							</Heading>
	// 							<Text
	// 								color={useColorModeValue(
	// 									"gray.600",
	// 									"gray.300"
	// 								)}
	// 							>
	// 								Hãy cùng chinh phục những thử thách mới hôm
	// 								nay.
	// 							</Text>
	// 							<Progress.Root
	// 								size="sm"
	// 								colorScheme="teal"
	// 								value={60}
	// 								mt={3}
	// 								rounded="full"
	// 							>
	// 								<Progress.Track>
	// 									<Progress.Range />
	// 								</Progress.Track>
	// 							</Progress.Root>

	// 							<HStack justifyContent="space-between" mt={1}>
	// 								<Text fontSize="xs" color="gray.500">
	// 									Tiến độ mục tiêu tuần: 60%
	// 								</Text>
	// 								<Link
	// 									to="/goals"
	// 									style={{
	// 										fontSize: "0.75rem",
	// 										color: "teal",
	// 									}}
	// 								>
	// 									Đặt mục tiêu
	// 								</Link>
	// 							</HStack>
	// 						</Box>
const StatsGamificationSection = () => {
	return (
		<Box
		py={8}
			bg={useColorModeValue("white", "gray.900")}
		>
			<Container maxW="container.xl">
				<Heading size="lg" mb={6} textAlign="center">
					Thành Tích Của Bạn
				</Heading>
				<SimpleGrid
					columns={{ base: 1, sm: 2, md: 4 }}
					gap={6}
				>
					<Stat.Root
						p={4}
						borderWidth="1px"
						rounded="md"
						borderColor={useColorModeValue("gray.200", "gray.700")}
					>
						<Stat.Label display="flex" alignItems="center">
							<Icon as={FiCheckCircle} mr={2} color="green.500" />
							Bài đã giải
						</Stat.Label>
						<Stat.ValueText>125</Stat.ValueText>
						<Stat.HelpText>
							<Stat.UpIndicator />5 bài trong tuần này
						</Stat.HelpText>
					</Stat.Root>

					<Stat.Root
						p={4}
						borderWidth="1px"
						rounded="md"
						borderColor={useColorModeValue("gray.200", "gray.700")}
					>
						<Stat.Label display="flex" alignItems="center">
							<Icon as={FiStar} mr={2} color="yellow.500" />
							Điểm kinh nghiệm
						</Stat.Label>
						<Stat.ValueText>8,750 XP</Stat.ValueText>
						<Stat.HelpText>
							<Stat.UpIndicator />
							250 XP hôm nay
						</Stat.HelpText>
					</Stat.Root>

					<Stat.Root
						p={4}
						borderWidth="1px"
						rounded="md"
						borderColor={useColorModeValue("gray.200", "gray.700")}
					>
						<Stat.Label display="flex" alignItems="center">
							<Icon as={FiAward} mr={2} color="blue.500" />
							Huy hiệu đạt được
						</Stat.Label>
						<Stat.ValueText>12</Stat.ValueText>
						<Stat.HelpText>"Thuật toán gia"</Stat.HelpText>
					</Stat.Root>

					<Stat.Root
						p={4}
						borderWidth="1px"
						rounded="md"
						borderColor={useColorModeValue("gray.200", "gray.700")}
					>
						<Stat.Label display="flex" alignItems="center">
							<Icon as={FiTrendingUp} mr={2} color="purple.500" />
							Chuỗi ngày luyện tập
						</Stat.Label>
						<Stat.ValueText>35 ngày</Stat.ValueText>
						<Stat.HelpText>Kỷ lục: 50 ngày</Stat.HelpText>
					</Stat.Root>
				</SimpleGrid>
			</Container>
		</Box>
	);
};

const ContestsEventsPreview = () => {
	return (
		<Box>
			<Heading
				size="sm"
				mb={3}
				color={useColorModeValue("gray.700", "gray.200")}
			>
				Cuộc Thi & Sự Kiện
			</Heading>
			<VStack borderSpacing={3} align="stretch">
				{sampleContests.slice(0, 2).map((contest) => (
					<Card.Root key={contest.id} variant="outline" size="sm">
						<Card.Body gap={2} p={4}>
							<Card.Title color="teal.500" fontSize="sm" mb={1}>
								{contest.name}
							</Card.Title>

							<Card.Description
								fontSize="xs"
								color={useColorModeValue(
									"gray.600",
									"gray.400"
								)}
							>
								<Icon as={FiCalendar} mr={1} />
								{contest.date}
							</Card.Description>

							<Card.Description
								fontSize="xs"
								color={useColorModeValue(
									"gray.600",
									"gray.400"
								)}
							>
								<Icon as={FiUsers} mr={1} />
								{contest.registered} người tham gia
							</Card.Description>

							<Card.Footer mt={2} p={0}>
								<Button
									size="xs"
									colorPalette={'green'}
									variant="ghost"
									colorScheme="teal"
								>
									Xem chi tiết
								</Button>
							</Card.Footer>
						</Card.Body>
					</Card.Root>
				))}
				<Button
					size="xs"
					variant="ghost"
					colorPalette="green"
					alignSelf="flex-start"
				>
					Xem tất cả sự kiện
				</Button>
			</VStack>
		</Box>
	);
};

const PersonalizedRecommendationsSection = () => {
	// This would typically fetch data based on user history
	const recommendedProblems: Problem[] = sampleProblems
		.slice(0, 3)
		.map((p) => ({ ...p, difficulty: "Trung bình" }));
	return (
		<Box py={{ base: 8 }}>
			<Container maxW="container.xl">
				<Heading
					size="lg"
					mb={6}
					textAlign={{ base: "center", md: "left" }}
				>
					Gợi Ý Cho Bạn <Icon as={FiGift} color="orange.400" />
				</Heading>
				<SimpleGrid
					columns={{ base: 1, md: 2, lg: 3 }}
					gap={6}
				>
					{recommendedProblems.map((problem) => (
						<Card.Root
							key={problem.id}
							variant="outline"
							_hover={{
								borderColor: "teal.400",
								boxShadow: "md",
							}}
						>
							<Card.Body>
								<Card.Title fontSize="md" mb={2}>
									{problem.title}
								</Card.Title>

								<HStack justifyContent="space-between">
									<Text
										fontSize="sm"
										color={useColorModeValue(
											"gray.600",
											"gray.400"
										)}
									>
										Độ khó:{" "}
										<chakra.span
											fontWeight="medium"
											color={
												problem.difficulty === "Dễ"
													? "green.500"
													: problem.difficulty ===
														  "Trung bình"
														? "orange.500"
														: "red.500"
											}
										>
											{problem.difficulty}
										</chakra.span>
									</Text>

									<Button
										size="sm"
										variant="ghost"
										colorScheme="teal"
									>
										Thử thách
									</Button>
								</HStack>

								<Wrap mt={2}>
									{problem.tags.map((tag) => (
										<WrapItem key={tag}>
											<Tag.Root size="sm">
												<Tag.Label>{tag}</Tag.Label>
											</Tag.Root>
										</WrapItem>
									))}
								</Wrap>
							</Card.Body>
						</Card.Root>
					))}
				</SimpleGrid>
			</Container>
		</Box>
	);
};

// --- END: Page Specific Components ---

// Main Home Page Component
function HomePage() {
	const showSidebars = useBreakpointValue({ base: false, lg: true });

	return (
		<Box>
			<Header />
			<Container maxW="container.2xl" py={6} px={{ base: 4, md: 6 }}>
				
						<StatsGamificationSection />
				<Grid
					templateAreas={
						showSidebars
							? `"nav main-content aside"`
							: `"main-content main-content main-content"`
					}
					gridTemplateColumns={
						showSidebars ? "280px 1fr 280px" : "1fr"
					}
					gap={6}
				>
					{showSidebars && (
						<GridItem area="nav">
							<LeftSidebar />
						</GridItem>
					)}

					<GridItem area="main-content">
						<VStack borderSpacing={8} align="stretch">
						
							<ProblemsTable />
						</VStack>
					</GridItem>

					{showSidebars && (
						<GridItem area="aside">
							<RightSidebar />
						</GridItem>
					)}
				</Grid>
				<PersonalizedRecommendationsSection />

				{/* Sections that can appear below the main grid */}
		
			</Container>
			<Footer />
		</Box>
	);
}

export const Route = createFileRoute("/home")({
	// Assuming '/home' is the route for the home page
	component: HomePage,
});
