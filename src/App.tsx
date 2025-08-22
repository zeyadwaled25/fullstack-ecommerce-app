import { Routes, Route } from "react-router-dom";
import HomePage from "./pages";
import ProductsPage from "./pages/Products";
import ProductPage from "./pages/SingelProduct";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./layout/AppLayout";
import CookieService from "./services/CookieService";
import CartDrawer from "./components/CartDrawer";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import AdminDashboard from "./pages/dashboard";
import DashboardProducts from "./pages/dashboard/DashboardProducts";
import DashboardCategories from "./pages/dashboard/DashboardCategories";

const App = () => {
  const token = CookieService.get('jwt');

  return (
    <>
      <CartDrawer />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:documentId" element={<ProductPage />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<DashboardProducts />} />
          <Route path="categories" element={<DashboardCategories />} />
        </Route>

        <Route path="/login" element={<LoginPage isAuthenticated={token} />} />
      </Routes>
    </>
  );
}

export default App;