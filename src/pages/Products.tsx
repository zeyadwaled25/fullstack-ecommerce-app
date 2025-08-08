import { Text } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
  return (
    <div>
      <Text textAlign={'center'} my={3}>ProductsPage</Text>
      <ProductCard />
    </div>
  );
}

export default ProductsPage;