import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useGetDashboardProductsQuery, useGetDashboardCategoriesQuery } from "../../app/services/apiSlice";
import type { IProduct } from "../../interfaces";

const StatCard = ({ 
  label, 
  value, 
  isLoading = false 
}: { 
  label: string; 
  value: string | number; 
  isLoading?: boolean;
}) => {
  return (
    <Stat
      p={6}
      shadow="md"
      border="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      rounded="xl"
      bg={useColorModeValue("white", "gray.800")}
    >
      <StatLabel fontSize="lg" color={useColorModeValue("gray.600", "gray.400")}>
        {label}
      </StatLabel>
      <StatNumber fontSize="2xl" fontWeight="bold">
        {isLoading ? <Spinner size="sm" /> : value}
      </StatNumber>
    </Stat>
  );
};

const AdminDashboard = () => {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const color = useColorModeValue("gray.700", "gray.200");


  // Fetch products and categories data
  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useGetDashboardProductsQuery(undefined);

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetDashboardCategoriesQuery(undefined);

  // Calculate statistics
  const totalProducts = productsData?.data?.length || 0;
  const totalCategories = categoriesData?.data?.length || 0;
  
  // Calculate low stock products (stock <= 10)
  const lowStockProducts = productsData?.data?.filter(
    (product: IProduct) => product.stock! <= 10
  ).length || 0;

  // Check if there are any errors
  const hasError = productsError || categoriesError;

  if (hasError) {
    return (
      <Box
        bg={bgColor}
        minH="calc(100vh - 64px)"
        py={10}
      >
        <Container maxW="6xl">
          <Alert status="error" rounded="md">
            <AlertIcon />
            <AlertTitle>Error loading dashboard data!</AlertTitle>
            <AlertDescription>
              {productsError && "Failed to load products. "}
              {categoriesError && "Failed to load categories. "}
              Please try refreshing the page.
            </AlertDescription>
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      bg={bgColor}
      py={5}
    >
      <Container maxW="6xl">
        <Heading
          mb={8}
          bgGradient="linear(to-r, teal.400, blue.500)"
          bgClip="text"
          textAlign="center"
        >
          Admin Dashboard
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <StatCard 
            label="Total Products" 
            value={totalProducts}
            isLoading={productsLoading}
          />
          <StatCard 
            label="Total Categories" 
            value={totalCategories}
            isLoading={categoriesLoading}
          />
          <StatCard 
            label="Low Stock Products" 
            value={lowStockProducts}
            isLoading={productsLoading}
          />
        </SimpleGrid>

        {/* Optional: Display more detailed info when data is loaded */}
        {!productsLoading && !categoriesLoading && (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={6}>
            <Box
              p={6}
              shadow="md"
              border="1px solid"
              borderColor={borderColor}
              rounded="xl"
              bg={bgColor}
            >
              <Heading size="md" mb={4} color={color}>
                Products Overview
              </Heading>
              <Stat>
                <StatLabel>Average Stock Level</StatLabel>
                <StatNumber>
                  {productsData?.data?.length > 0
                    ? Math.round(
                        productsData.data.reduce((sum: number, product: IProduct) => sum + product.stock!, 0) /
                        productsData.data.length
                      )
                    : 0}
                </StatNumber>
              </Stat>
            </Box>

            <Box
              p={6}
              shadow="md"
              border="1px solid"
              borderColor={borderColor}
              rounded="xl"
              bg={bgColor}
            >
              <Heading size="md" mb={4} color={color}>
                System Status
              </Heading>
              <Stat>
                <StatLabel>Data Last Updated</StatLabel>
                <StatNumber fontSize="sm">
                  {new Date().toLocaleString()}
                </StatNumber>
              </Stat>
            </Box>
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
};

export default AdminDashboard;