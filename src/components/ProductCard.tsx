import { Button, Card, CardBody, CardFooter, Divider, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import { Link } from "react-router-dom";

const ProductCard = () => {
  const { colorMode } = useColorMode();

  return (
    <Card maxW='sm' border={'1px solid #a8b5c8'} bg={'none'}>
      <CardBody>
        <Image
          src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
          alt='Green double couch with wooden legs'
          borderRadius='50%'
          width={'180px'}
          height={'180px'}
          mx={'auto'}
          objectFit={'cover'}
        />
        <Stack mt='6' spacing='3'>
          <Heading size='md' textAlign={'center'}>Living room Sofa</Heading>
          <Text fontSize={'sm'} textAlign={'center'}>
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces, earthy toned spaces and for people who love a chic design with a
            sprinkle of vintage design.
          </Text>
          <Text color='purple.600' fontSize='3xl' textAlign={'center'}>
            $450
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button
          as={Link}
          to={'/products/1'}
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