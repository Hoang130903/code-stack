import { createFileRoute, Link as TanStackLink } from "@tanstack/react-router";
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
  Link,
  SimpleGrid,
  Stack,
  Text,
  VStack, useBreakpointValue,
  chakra,
  useChakraContext
} from "@chakra-ui/react";
import {
  FaGithub,
  FaPuzzlePiece,
  FaTrophy,
  FaUsers, FaRocket, FaChartLine,
  FaBookOpen, FaSignInAlt, FaBars
} from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { useState } from "react";

const Logo = () => (
  <Heading as="h1" size="lg" color="text-primary">
    CodeMaster
  </Heading>
);

function Landing() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const displayMobileMenu = useBreakpointValue({ base: "block", md: "none" });
  const displayDesktopMenu = useBreakpointValue({ base: "none", md: "block" });

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navItems = [
    { label: "Tính Năng", href: "#features" },
    { label: "Thử Thách", href: "#problems" },
    { label: "Cuộc Thi", href: "#contests" },
    { label: "Cộng Đồng", href: "#community" },
  ];
  const system = useChakraContext();
  return (
    <Box bg="background" color="text" minH="100vh"
    style={ system.css({ colorPalette: 'green' })}>
     
      <Box
        as="header"
        py={4}
        px={{ base: 4, md: 8 }}
        borderBottomWidth="1px"
        borderColor="border-subtle"
        bg="background"
      >
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <TanStackLink to="/">
              <Logo />
            </TanStackLink>

            <HStack as="nav" borderSpacing={6} display={displayDesktopMenu}>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  fontWeight="medium"
                  color="text-subtle"
                  _hover={{ color: "text-primary", textDecoration: "none" }}
                >
                  {item.label}
                </Link>
              ))}
            </HStack>

            <HStack borderSpacing={3} display={displayDesktopMenu}>
              <Button
                as={TanStackLink}
                to="/auth/login"
                variant="ghost"
                colorPalette="brand"
                leftIcon={<FaSignInAlt />}
                size="sm"
                color="text-primary"
              >
                Đăng Nhập
              </Button>
              <Button
               variant={'solid'}
                size="sm"
              >
                Đăng Ký với GitHubádas
              </Button>
            </HStack>

            <IconButton
              aria-label="Mở menu"
              display={displayMobileMenu}
              onClick={toggleMobileMenu}
              variant="ghost"
              color="text"
            >
              <FaBars />
            </IconButton>
          </Flex>

          {isMobileMenuOpen && (
            <VStack
              as="nav"
              display={displayMobileMenu}
              py={4}
              borderSpacing={4}
              bg="background"
              position="absolute"
              top="68px"
              left={0}
              right={0}
              zIndex={20}
              boxShadow="md"
              borderBottomWidth="1px"
              borderColor="border-subtle"
            >
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  w="full"
                  textAlign="center"
                  py={3}
                  _hover={{ bg: "background-muted" }}
                  onClick={toggleMobileMenu}
                  color="text"
                >
                  {item.label}
                </Link>
              ))}
              <Button
                as={TanStackLink}
                to="/auth/login"
                variant="outline"
                colorPalette="brand"
                leftIcon={<FaSignInAlt />}
                w="80%"
                onClick={toggleMobileMenu}
              >
                Đăng Nhập
              </Button>
              <Button
                as={TanStackLink}
                to="/auth/register-github"
                colorPalette="brand"
                leftIcon={<FaGithub />}
                w="80%"
                onClick={toggleMobileMenu}
              >
                Đăng Ký với GitHub
              </Button>
            </VStack>
          )}
        </Container>
      </Box>

      <Container
        maxW="container.xl"
        py={{ base: 16, md: 28 }}
        px={{ base: 6, md: 8 }}
      >
        <VStack
          borderSpacing={{ base: 6, md: 8 }}
          textAlign="center"
          alignItems="center"
        >
          <Heading
            as="h2"
            size={{ base: "2xl", md: "4xl" }}
            fontWeight="extrabold"
            lineHeight="tight"
            color="text"
          >
            Chinh Phục Mọi Thử Thách Lập Trình với{" "}
            <chakra.span color="primary">CodeMaster</chakra.span>!
          </Heading>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            maxW="3xl"
            color="text-subtle"
          >
            Nâng tầm kỹ năng, giải quyết thuật toán, tham gia cuộc thi gay cấn
            và kết nối với cộng đồng lập trình viên tài năng. Bắt đầu hành trình
            của bạn ngay hôm nay!
          </Text>
          <Stack
            direction={{ base: "column", sm: "row" }}
            borderSpacing={4}
            justify="center"
            w="full"
            maxW="lg"
            pt={4}
          >
            <Button
              as={TanStackLink}
              colorPalette="brand"
              size="lg"
              w={{ base: "full", sm: "auto" }}
              px={8}
              py={7}
              boxShadow="md"
              _hover={{ boxShadow: "lg", bg: "brand.600" }}
            >
              <FaGithub />
              Đăng Ký Miễn Phí qua GitHub
            </Button>
            <Button
              as={TanStackLink}
              variant="outline"
              colorPalette="brand"
              size="lg"
              w={{ base: "full", sm: "auto" }}
              px={8}
              py={7}
              borderColor="primary"
              color="text-primary"
              _hover={{ bg: "primary-subtle-bg" }}
            >
              <FaPuzzlePiece />
              Khám Phá Bài Tập
            </Button>
          </Stack>
          <Text fontSize="sm" color="text-muted" pt={2}>
            Tham gia cùng hàng ngàn lập trình viên đang rèn luyện mỗi ngày.
          </Text>
        </VStack>

        <Box as="section" id="features" py={{ base: 20, md: 28 }}>
          <VStack
            borderSpacing={4}
            textAlign="center"
            mb={{ base: 12, md: 20 }}
          >
            <Text
              color="primary"
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              Tính Năng Vượt Trội
            </Text>
            <Heading as="h3" size={{ base: "xl", md: "2xl" }} color="text">
              Tại Sao Chọn CodeMaster?
            </Heading>
          </VStack>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            gap={{
              base: 8,
              md: 10,
            }}
          >
            {[
              {
                icon: FaBookOpen,
                title: "Thư Viện Bài Tập Khổng Lồ",
                text: "Hàng ngàn bài toán từ cơ bản đến nâng cao, đa dạng chủ đề và độ khó cập nhật liên tục.",
              },
              {
                icon: FaTrophy,
                title: "Cuộc Thi Hấp Dẫn",
                text: "Tham gia các cuộc thi định kỳ, đối đầu trực tiếp và giành lấy vinh quang cùng nhiều phần thưởng giá trị.",
              },
              {
                icon: FaUsers,
                title: "Cộng Đồng Sôi Nổi",
                text: "Kết nối, học hỏi và chia sẻ kinh nghiệm với cộng đồng lập trình viên đam mê từ khắp nơi.",
              },
              {
                icon: FaChartLine,
                title: "Theo Dõi Tiến Độ Chi Tiết",
                text: "Phân tích kỹ năng, theo dõi sự tiến bộ qua biểu đồ trực quan và xác định điểm cần cải thiện.",
              },
            ].map((feature) => (
              <VStack
                key={feature.title}
                borderSpacing={5}
                p={8}
                layerStyle="card"
                alignItems="flex-start"
              >
                <Icon as={feature.icon} w={12} h={12} color="primary" />
                <Heading as="h4" size="md" color="text">
                  {feature.title}
                </Heading>
                <Text color="text-subtle" lineHeight="tall">
                  {feature.text}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Box>

        <Box
          as="section"
          id="problems"
          py={{ base: 20, md: 28 }}
          bg="background-subtle"
          mx={{ base: -6, md: -8 }}
          px={{ base: 6, md: 8 }}
        >
          <VStack
            borderSpacing={4}
            textAlign="center"
            mb={{ base: 12, md: 20 }}
          >
            <Text
              color="primary"
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              Khám Phá Thử Thách
            </Text>
            <Heading as="h3" size={{ base: "xl", md: "2xl" }} color="text">
              Những Bài Toán Nổi Bật
            </Heading>
            <Text maxW="xl" color="text-subtle">
              Rèn luyện tư duy logic và kỹ năng giải quyết vấn đề với các dạng
              bài tập phổ biến, được tuyển chọn kỹ lưỡng.
            </Text>
          </VStack>
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={8}
          >
            {[
              {
                title: "Tìm Đường Đi Ngắn Nhất",
                difficulty: "Trung bình",
                tags: ["Graph", "BFS", "Dijkstra"],
              },
              {
                title: "Sắp Xếp Mảng Hiệu Quả",
                difficulty: "Dễ",
                tags: ["Array", "Sorting"],
              },
              {
                title: "Bài Toán Ba Lô Kinh Điển",
                difficulty: "Khó",
                tags: ["Dynamic Programming"],
              },
              {
                title: "Xử Lý Chuỗi Nâng Cao",
                difficulty: "Trung bình",
                tags: ["String", "Algorithm"],
              },
              {
                title: "Cấu Trúc Dữ Liệu Cây",
                difficulty: "Dễ",
                tags: ["Tree", "Data Structure"],
              },
              {
                title: "Quy Hoạch Động Cơ Bản",
                difficulty: "Trung bình",
                tags: ["DP", "入门"],
              },
            ].map((problem, index) => (
              <GridItem
                key={index}
                p={6}
                layerStyle="card"
                transition="all 0.2s ease-in-out"
                _hover={{ boxShadow: "lg", transform: "translateY(-4px)" }}
              >
                <Heading as="h4" size="md" mb={3} color="text">
                  {problem.title}
                </Heading>
                <Text fontSize="sm" color="text-muted" mb={4}>
                  Độ khó: {problem.difficulty}
                </Text>
                <HStack borderSpacing={2} wrap="wrap" mb={4}>
                  {problem.tags.map((tag) => (
                    <chakra.span
                      key={tag}
                      px={3}
                      py={1}
                      bg="primary-subtle-bg"
                      color="text-primary"
                      borderRadius="md"
                      fontSize="xs"
                      fontWeight="medium"
                    >
                      {tag}
                    </chakra.span>
                  ))}
                </HStack>
                <Button
                  as={TanStackLink}
                  to={`/problems/${problem.title.toLowerCase().replace(/\s+/g, "-")}`}
                  mt={4}
                  size="sm"
                  colorPalette="brand"
                  variant="outline"
                  rightIcon={<FiChevronRight />}
                >
                  Thử Sức Ngay
                </Button>
              </GridItem>
            ))}
          </Grid>
          <VStack mt={10}>
            <Button
              as={TanStackLink}
              to="/problems"
              colorPalette="brand"
              variant="ghost"
              size="lg"
              rightIcon={<FiChevronRight />}
              color="text-primary"
            >
              Xem Tất Cả Bài Tập
            </Button>
          </VStack>
        </Box>

        <Box as="section" id="cta" py={{ base: 20, md: 32 }}>
          <VStack
            borderSpacing={8}
            textAlign="center"
            layerStyle="cta-section"
            p={{ base: 10, md: 20 }}
            borderRadius="xl"
            boxShadow="xl"
          >
            <Heading
              as="h3"
              size={{ base: "xl", md: "3xl" }}
              fontWeight="bold"
              color="text-primary"
            >
              Sẵn Sàng Bứt Phá Giới Hạn Bản Thân?
            </Heading>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              maxW="2xl"
              color="primary-subtle-fg"
            >
              Đừng chần chừ! Tham gia CodeMaster ngay hôm nay để bắt đầu hành
              trình chinh phục thế giới thuật toán và trở thành một lập trình
              viên xuất sắc.
            </Text>
            <Button
              as={TanStackLink}
              to="/auth/register-github"
              colorPalette="accent"
              size="lg"
              leftIcon={<FaRocket />}
              px={12}
              py={8}
              fontSize="lg"
              boxShadow="lg"
              _hover={{ bg: "accent.600", transform: "translateY(-2px)" }}
            >
              Tham Gia Ngay Với GitHub!
            </Button>
          </VStack>
        </Box>
      </Container>

      <Box
        as="footer"
        bg="background-muted"
        color="text-subtle"
        py={12}
        px={{ base: 6, md: 8 }}
      >
        <Container maxW="container.xl">
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 4 }}
            borderSpacing={10}
            mb={10}
          >
            <VStack alignItems="flex-start" borderSpacing={4}>
              <Logo />
              <Text fontSize="sm" lineHeight="tall">
                Nền tảng rèn luyện kỹ năng lập trình và thuật toán hàng đầu,
                giúp bạn tự tin chinh phục mọi thử thách.
              </Text>
            </VStack>
            <VStack alignItems="flex-start" borderSpacing={4}>
              <Heading as="h5" size="sm" color="text">
                Sản phẩm
              </Heading>
              <Link href="#features" _hover={{ color: "text-primary" }}>
                Tính Năng
              </Link>
              <Link href="#problems" _hover={{ color: "text-primary" }}>
                Bài Tập
              </Link>
              <Link href="#contests" _hover={{ color: "text-primary" }}>
                Cuộc Thi
              </Link>
              <Link href="/pricing" _hover={{ color: "text-primary" }}>
                Gói Dịch Vụ
              </Link>
            </VStack>
            <VStack alignItems="flex-start" borderSpacing={4}>
              <Heading as="h5" size="sm" color="text">
                Công ty
              </Heading>
              <Link href="/about" _hover={{ color: "text-primary" }}>
                Về Chúng Tôi
              </Link>
              <Link href="/blog" _hover={{ color: "text-primary" }}>
                Blog
              </Link>
              <Link href="/careers" _hover={{ color: "text-primary" }}>
                Tuyển Dụng
              </Link>
              <Link href="/contact" _hover={{ color: "text-primary" }}>
                Liên Hệ
              </Link>
            </VStack>
            <VStack alignItems="flex-start" borderSpacing={4}>
              <Heading as="h5" size="sm" color="text">
                Pháp lý
              </Heading>
              <Link href="/terms" _hover={{ color: "text-primary" }}>
                Điều Khoản Dịch Vụ
              </Link>
              <Link href="/privacy" _hover={{ color: "text-primary" }}>
                Chính Sách Bảo Mật
              </Link>
              <Link href="/cookies" _hover={{ color: "text-primary" }}>
                Chính Sách Cookie
              </Link>
            </VStack>
          </SimpleGrid>
          <Flex
            direction={{ base: "column-reverse", md: "row" }}
            justify="space-between"
            align="center"
            borderTopWidth="1px"
            borderColor="border"
            pt={8}
          >
            <Text fontSize="sm" mt={{ base: 6, md: 0 }}>
              &copy; {new Date().getFullYear()} CodeMaster. Mọi quyền được bảo
              lưu.
            </Text>
            <HStack borderSpacing={5}>
              <Link href="https://github.com/your-org/codemaster">
                <Icon
                  as={FaGithub}
                  boxSize={5}
                  _hover={{ color: "text-primary" }}
                />
              </Link>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}

export const Route = createFileRoute("/")({
  component: Landing,
});
