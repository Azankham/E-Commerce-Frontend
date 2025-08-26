import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Footer from "./Components/Footer/Footer";
import men_banner from "./assets/banner.jpg";
import women_banner from "./assets/women_banner.avif";
import kids_banner from "./assets/kids_banner.jpg";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import { useEffect } from "react";

function App() {
  // const [backendMessage, setBackendMessage] = useState("");

  // FETCH BACKEND API HERE to test proxy
  useEffect(() => {
    fetch("/api/hello") // thanks to proxy, no full URL needed
      .then((res) => res.json())
      .then((data) => console.log("Backend says:", data.message))
      .catch((err) => console.log("Error fetching backend:", err));
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/login" element={<LoginSignup />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route
              path="/mens"
              element={<ShopCategory banner={men_banner} category="men" />}
            />
            <Route
              path="/womens"
              element={<ShopCategory banner={women_banner} category="women" />}
            />
            <Route
              path="/kids"
              element={<ShopCategory banner={kids_banner} category="kid" />}
            />
            <Route path="/cart" element={<Cart />} />
          </Route>

          <Route path="/product" element={<Product />} />
          <Route path="/product/:productId" element={<Product />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
