import React, { useState, useContext } from "react";
import "./Navbar.css";
import logo from "../../assets/logonew1.jpeg";
import cart_icon from "../../assets/cart_icon.png";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartItems } = useContext(ShopContext);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    if (["men", "mens"].includes(query)) {
      navigate("/mens");
    } else if (["women", "womens"].includes(query)) {
      navigate("/womens");
    } else if (["kid", "kids"].includes(query)) {
      navigate("/kids");
    } else {
      alert(
        `Category "${searchQuery}" not found. Please search for "men", "women", or "kids".`
      );
    }
    setSearchQuery("");
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" height="50px" />
        <p>OMC</p>
      </div>
      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("home");
          }}
        >
          <Link style={{ textDecoration: "none", color: "#626262" }} to="/">
            Home
          </Link>
          {menu === "home" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("mens");
          }}
        >
          <Link style={{ textDecoration: "none", color: "#626262" }} to="/mens">
            Men
          </Link>
          {menu === "mens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("womens");
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "#626262" }}
            to="/womens"
          >
            Women
          </Link>
          {menu === "womens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("kids");
          }}
        >
          <Link style={{ textDecoration: "none", color: "#626262" }} to="/kids">
            Kids
          </Link>
          {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>

      <form className="nav-search" onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by category..."
        />
        <button type="submit">Search</button>
      </form>

      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button>Login/SignUp</button>
          </Link>
        )}

        <Link to="/cart">
          <img src={cart_icon} alt="" height="40px" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
