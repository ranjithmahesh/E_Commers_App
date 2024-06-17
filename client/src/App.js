import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Layout from "./utils/Layout";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DetailsPage from "./pages/DetailsPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import { useEffect } from "react";

function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("token");

    if (!user) navigate("/login");
  }, [navigate]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route index path="/" element={<Home />} />
        <Route path="/list" element={<ProductList />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
