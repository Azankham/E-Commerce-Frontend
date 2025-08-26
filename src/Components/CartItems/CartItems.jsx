import React, { useContext } from "react";
import "./CartItems.css";
import remove_icon from "../../assets/remove.webp";
import { ShopContext } from "../../Context/ShopContext";
import PaymentButton from "./PaymentButton"; // Import the PaymentButton component

const CartItems = () => {
  const {
    getTotalCartAmount,
    all_product,
    cartItems,
    removeFromCart,
    clearCart, // Make sure this is available in your ShopContext
  } = useContext(ShopContext);

  // Get the user token from localStorage
  const userToken = localStorage.getItem("auth-token");

  const handlePaymentSuccess = () => {
    // This will be called after successful payment
    clearCart(); // Clear the cart
    alert("Payment successful! Your order has been placed.");
    // You could also redirect to an order confirmation page here
  };

  return (
    <div className="cartItems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartItems-format cartitems-format-main">
                <img src={e.image} alt="" height="100px" />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="cartitems-quantity">
                  {cartItems[e.id]}
                </button>
                <p>${e.new_price * cartItems[e.id]}</p>
                <img
                  src={remove_icon}
                  alt=""
                  onClick={() => removeFromCart(e.id)}
                  height="20px"
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Total</p>
              <p>${getTotalCartAmount()}</p>
            </div>
          </div>
          {/* Pass userToken to PaymentButton */}
          <PaymentButton
            amount={getTotalCartAmount()}
            userToken={userToken}
            onSuccess={handlePaymentSuccess}
            className="btn-success"
          />
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
