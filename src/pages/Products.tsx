import { Grid, Text } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import type { IProductResponse, IProduct } from "../interfaces";
import { useQuery } from "react-query";
import ProductSkeleton from "../components/ProductCardSkeleton";

const ProductsPage = () => {
  const getProducts = async () => {
    const {data} = await axios.get<IProductResponse>(`${import.meta.env.VITE_SERVER_URL}/api/products?fields=title,description,price,stock&populate=*&sort=createdAt:DESC`)
    return data
  }

  const { isLoading, data } = useQuery("products", () => getProducts())
  if (isLoading) return (
    <Grid margin={30} templateColumns={'repeat(auto-fill, minmax(300px, 1fr))'} gap={'6'}>
      {Array.from({length: 20}, (_, idx) => <ProductSkeleton key={idx}/>)}
    </Grid>
  )

  return (
    <div>
      <Text textAlign={'center'} my={3}>ProductsPage</Text>
      <Grid margin={30} templateColumns={'repeat(auto-fill, minmax(300px, 1fr))'} gap={'6'}>
        {data?.data.map((product: IProduct) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </Grid>
    </div>
  );
}

export default ProductsPage;