import { Button, Card, CardBody, CardFooter, Divider, Heading, Image, Stack, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import type { IProduct } from "../interfaces";
import { formattedPrice } from "../utils";

const ProductCard = (attributes: IProduct) => {
  const {id, documentId, title, description, price, thumbnail} = attributes
  const { colorMode } = useColorMode();

  return (
    <Card border={'1px solid #a8b5c8'} bg={'none'} key={id}>
      <CardBody py={5} px={4}>
        <Image
          src={thumbnail?.formats?.small?.url}
          alt={title}
          borderRadius='50%'
          width={'150px'}
          height={'150px'}
          mx={'auto'}
          objectFit={'cover'}
        />
        <Stack mt='6' spacing='3'>
          <Heading size='md' textAlign={'center'}>{title}</Heading>
          <Text color='gray.500' fontSize={'sm'} textAlign={'center'}>
            {description}
          </Text>
          <Text color='blue.400' fontSize='2xl' fontWeight="semibold" textAlign={'center'}>
            {formattedPrice(price)}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter p={3}>
        <Button
          as={Link}
          to={`/products/${documentId}`}
          bg={colorMode === "light" ? "#e6f3fd" : "teal.600"}
          color={colorMode !== "light" ? "#e6f3fd" : "teal.600"}
          size={"xl"}
          variant="outline"
          border={"none"}
          py={5}
          overflow={"hidden"}
          w={"full"}
          _hover={{
            bg: colorMode !== "light" ? "#e6f3fd" : "teal.500",
            color: colorMode === "light" ? "#e6f3fd" : "teal.500",
            border: "transparent",
          }}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard;