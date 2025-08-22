import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";

const StatCard = ({ label, value }: { label: string; value: string | number }) => {
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
        {value}
      </StatNumber>
    </Stat>
  );
};

const AdminDashboard = () => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      minH="calc(100vh - 64px)"
      py={10}
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
          <StatCard label="Total Products" value="120" />
          <StatCard label="Total Users" value="45" />
          <StatCard label="Pending Orders" value="8" />
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
