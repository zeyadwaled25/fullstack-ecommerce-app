import { Routes, Route } from "react-router-dom";
import HomePage from "./pages";
import ProductsPage from "./pages/Products";
import ProductPage from "./pages/SingelProduct";
import Navbar from "./layout/Navbar";

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/products" element={<ProductsPage/>}/>
        <Route path="/products/:documentId" element={<ProductPage/>}/>
      </Routes>
    </>
  );
}

export default App;