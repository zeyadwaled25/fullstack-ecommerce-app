import { useEffect } from "react";

import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";

import { useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import axios from "axios";
import ProductDetailsSkeleton from "../components/ProductDetailsSkeleton";
import { useQuery } from "react-query";
import { formattedPrice } from "../utils";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/features/cart/cartSlice";

const ProductPage = () => {
  const { id, documentId } = useParams();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();


  const getProductList = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/products/${documentId}?fields=title,description,price,stock&populate=*&sort=createdAt:DESC`
    );
    return data;
  };

  const { isLoading, data } = useQuery(["products", id], getProductList);
  const goBack = () => navigate(-1);

  useEffect(() => {
    document.title = `Product ${data?.data?.title} Page`;
  }, []);

  const dispatch = useDispatch()
  const addToCartHandler = () => {
    dispatch(addToCart(data.data))
  }

  if (isLoading)
    return (
      <Box maxW="sm" mx="auto" my={20}>
        <ProductDetailsSkeleton />
      </Box>
    );
  
  return (
    <>
      <Flex
        alignItems="center"
        maxW="xs"
        mx="auto"
        my={7}
        fontSize="lg"
        cursor="pointer"
        onClick={goBack}
      >
        <BsArrowLeft />
        <Text ml={2}>Back</Text>
      </Flex>

      <Card
        maxW="xs"
        mx="auto"
        mb={20}
        border="1px solid #a8b5c8"
        bg="none"
      >
        <CardBody>
          <Image
            src={`${import.meta.env.VITE_SERVER_URL}${data?.data?.thumbnail?.url}`}
            alt={data?.data?.title}
            borderRadius="lg"
            h="190px"
            w="full"
            objectFit={'cover'}
          />
          <Stack mt="6" spacing="3">
            <Heading size="md" textAlign="center">
              {data?.data?.title}
            </Heading>
            <Text textAlign="center" color="gray.500">
              {data?.data?.description}
            </Text>
            <Flex justify="space-between" px={2} maxW="full">
              <Text color="blue.400" fontSize="xl" fontWeight="semibold">
                {(data?.data?.category) ? data?.data?.category?.title : "No Category"}
              </Text>
              <Text color="green.400" fontSize="xl" fontWeight="bold">
                {formattedPrice(data?.data?.price)}
              </Text>
            </Flex>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button
            variant="solid"
            colorScheme="purple"
            onClick={addToCartHandler}
            w="full"
            size="lg"
            bg={colorMode === "light" ? "#e6f3fd" : "teal.600"}
            color={colorMode !== "light" ? "#e6f3fd" : "teal.600"}
            _hover={{
              bg: colorMode !== "light" ? "#e6f3fd" : "teal.500",
              color: colorMode === "light" ? "#e6f3fd" : "teal.500",
              border: "transparent",
            }}
            p={8}
            textTransform={"uppercase"}
          >
            Add to cart
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProductPage;