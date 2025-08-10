import { Grid, Text } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import type { IProductResponse, IProduct } from "../interfaces";

const ProductsPage = () => {
  const [productList, setProductList] = useState<IProduct[]>([])

  useEffect(() => {
    (() => {
      axios.get<IProductResponse>("http://localhost:1337/api/products?fields=title,description,price,stock&populate=*&sort=createdAt:DESC")
      .then(res => setProductList(res.data.data))
      .catch(err => console.log(err))
    })()
  }, [])

  return (
    <div>
      <Text textAlign={'center'} my={3}>ProductsPage</Text>
      <Grid margin={30} templateColumns={'repeat(auto-fill, minmax(300px, 1fr))'} gap={'6'}>
        {productList.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </Grid>
    </div>
  );
}

export default ProductsPage;