import { Button, Card, CardBody, CardFooter, Divider, Heading, Image, Stack, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import type { IProduct } from "../interfaces";

const ProductCard = (attributes: IProduct) => {
  const {id, documentId, title, description, price, thumbnail} = attributes
  const { colorMode } = useColorMode();

  return (
    <Card border={'1px solid #a8b5c8'} bg={'none'} key={id}>
      <CardBody>
        <Image
          src={`${import.meta.env.VITE_SERVER_URL}${thumbnail.url}`}
          alt={title} 
          borderRadius='50%'
          width={'180px'}
          height={'180px'}
          mx={'auto'}
          objectFit={'cover'}
        />
        <Stack mt='6' spacing='3'>
          <Heading size='md' textAlign={'center'}>{title}</Heading>
          <Text fontSize={'sm'} textAlign={'center'}>
            {description}
          </Text>
          <Text color='purple.600' fontSize='3xl' textAlign={'center'}>
            {`$${price}`}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button
          as={Link}
          to={`/products/${documentId}`}
          bg={colorMode === "light" ? "#e6f3fd" : "#9f7aea"}
          color={colorMode !== "light" ? "#e6f3fd" : "#9f7aea"}
          size={"xl"}
          variant="outline"
          border={"none"}
          py={5}
          overflow={"hidden"}
          w={"full"}
          _hover={{
            bg: colorMode !== "light" ? "#e6f3fd" : "#9f7aea",
            color: colorMode === "light" ? "white" : "#9f7aea",
            border: "transparent",
          }}
          mt={6}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard;