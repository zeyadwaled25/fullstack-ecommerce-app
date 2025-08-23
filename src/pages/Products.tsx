import { Grid, Text } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import type { IProductResponse, IProduct } from "../interfaces";
import { useQuery } from "react-query";
import ProductSkeleton from "../components/ProductCardSkeleton";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { selectNetwork } from "../app/features/networkSlice";
import { useSelector } from "react-redux";

const ProductsPage = () => {
  const {isOnline} = useSelector(selectNetwork);
  const navigate = useNavigate();
  const getProducts = async () => {
    const {data} = await axios.get<IProductResponse>(`${import.meta.env.VITE_SERVER_URL}/api/products?fields=title,description,price,stock&populate=*&sort=createdAt:DESC`)
    return data
  }

  const { isLoading, data } = useQuery("products", () => getProducts())
  if (isLoading || !isOnline) return (
    <Grid margin={30} templateColumns={'repeat(auto-fill, minmax(300px, 1fr))'} gap={'6'}>
      {Array.from({length: 20}, (_, idx) => <ProductSkeleton key={idx}/>)}
    </Grid>
  )

  return (
    <div>
      <Text
        display={"flex"}
        alignItems={"center"}
        gap={2}
        textAlign={'left'}
        ms={30}
        mt={5}
        w={"fit-content"}
        cursor={'pointer'}
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowBackIcon /> ProductsPage
      </Text>
      <Grid margin={30} templateColumns={'repeat(auto-fill, minmax(250px, 1fr))'} gap={'5'}>
        {data?.data.map((product: IProduct) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </Grid>
    </div>
  );
}

export default ProductsPage;