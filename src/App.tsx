import { Routes, Route } from "react-router-dom";
import HomePage from "./pages";
import ProductsPage from "./pages/Products";
import ProductPage from "./pages/SingelProduct";
import Navbar from "./layout/Navbar";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<HomePage/>}/>
        <Route path="/products" element={<ProductsPage/>}/>
        <Route path="/products/:documentId" element={<ProductPage/>}/>
      </Routes>
    </>
  );
}

export default App;