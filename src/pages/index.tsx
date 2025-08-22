import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const HomePage = () => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      minH="calc(100vh - 64px)"
      display="flex"
      alignItems="center"
    >
      <Container maxW="4xl">
        <Stack spacing={6} textAlign="center">
          <Heading
            as="h1"
            size="2xl"
            bgGradient="linear(to-r, teal.400, blue.500)"
            bgClip="text"
          >
            Welcome to Our Store 🛒
          </Heading>
          <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.300")}>
            Discover the latest products, manage your cart, and explore the
            dashboard with ease.
          </Text>
          <Stack direction="row" justify="center" spacing={4}>
            <Button
              as={RouterLink}
              to="/products"
              colorScheme="teal"
              size="lg"
              rounded="full"
            >
              Shop Now
            </Button>
            <Button
              as={RouterLink}
              to="/dashboard"
              variant="outline"
              colorScheme="blue"
              size="lg"
              rounded="full"
            >
              Go to Dashboard
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default HomePage;
