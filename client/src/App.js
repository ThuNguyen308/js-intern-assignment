import "./App.css";
import { useState, useEffect } from "react";

import logo from "./assets/nike.png";
import trash from "./assets/trash.png";
import plus from "./assets/plus.png";
import minus from "./assets/minus.png";
import check from "./assets/check.png";
import data from "./data/shoes.json";

import { formatPrice } from "./helpers/format";
import API from "./api.js";

function App() {
  const [shoes, setShoes] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    API.get("/")
      .then((response) => {
        // setShoes(data.shoes);
        setShoes(response.data.products);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
    const cartData = JSON.parse(localStorage.getItem("yourCart"));
    if (cartData) {
      setCart(cartData);
    }
  }, []);

  // caculate total Price in cart
  const caculateTotalPrice = (cart) => {
    setTotalPrice(cart.reduce((total, p) => total + p.price * p.quantity, 0));
  };

  // handle add product to cart
  const handleAddToCart = (product) => {
    const newCart = [...cart, { ...product, quantity: 1 }];
    localStorage.setItem("yourCart", JSON.stringify(newCart));
    caculateTotalPrice(newCart);
    setCart(newCart);
  };

  // handle change product's quantity to cart
  const changeQuantity = (product, num, e) => {
    if (product.quantity + num === 0) {
      handleRemoveFromCart(product._id, e);
      return;
    }
    const newCart = cart.map((p) => {
      if (p._id === product._id) {
        return { ...p, quantity: p.quantity + num };
      }
      return p;
    });
    caculateTotalPrice(newCart);
    localStorage.setItem("yourCart", JSON.stringify(newCart));
    setCart(newCart);
  };

  // handle remove product from cart
  const handleRemoveFromCart = (productId, e) => {
    const cartItem = e.target.closest(".cart-item");
    cartItem.classList.add("fade-out");
    cartItem.classList.add("zoom-in");
    const newCart = cart.filter((p) => p._id !== productId);
    localStorage.setItem("yourCart", JSON.stringify(newCart));
    caculateTotalPrice(newCart);

    setTimeout(() => {
      setCart(newCart);
    }, 600);
  };

  return (
    <div className="container">
      <div className="app">
        <div className="card">
          <div className="header">
            <img src={logo} alt="logo" className="logo" />
            <h2 className="title">Our products</h2>
          </div>
          <div className="content">
            <div className="product-list">
              {shoes.map((p) => (
                <div className="product-item" key={p._id}>
                  <div
                    className="img"
                    style={{ "--background-color": p.color }}
                  >
                    <img src={p.image} alt={p.name} />
                  </div>
                  <h3 className="name">{p.name}</h3>
                  <p className="decs">{p.description}</p>
                  <div>
                    <span className="price">{formatPrice.format(p.price)}</span>
                    <button
                      className="btn-add"
                      onClick={() => handleAddToCart(p)}
                      disabled={cart.some((cp) => cp._id === p._id)}
                    >
                      {cart.some((cp) => cp._id === p._id) ? (
                        <img src={check} alt="added" className="icon-check" />
                      ) : (
                        <span>ADD TO CART</span>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="header">
            <img src={logo} alt="logo" className="logo" />
            <div>
              <h2 className="title">Your cart</h2>
              <h2>{formatPrice.format(totalPrice)}</h2>
            </div>
          </div>
          <div className="content">
            <div className="cart-list">
              {cart.length > 0
                ? cart.map((p) => (
                    <div className="cart-item" key={p._id}>
                      <div
                        className="left"
                        style={{ "--background-color": p.color }}
                      >
                        <img src={p.image} alt={p.name} className="img" />
                      </div>
                      <div className="right">
                        <h5 className="name">{p.name}</h5>
                        <h3 className="price">{formatPrice.format(p.price)}</h3>
                        <div>
                          <div className="quantity-wrapper">
                            <button
                              className="btn-quantity"
                              onClick={(e) => changeQuantity(p, -1, e)}
                            >
                              <img src={minus} alt="minus" />
                            </button>
                            <span>{p.quantity}</span>
                            <button className="btn-quantity">
                              <img
                                src={plus}
                                alt="plus"
                                onClick={() => changeQuantity(p, 1)}
                              />
                            </button>
                          </div>
                          <button
                            className="btn-del"
                            onClick={(e) => handleRemoveFromCart(p._id, e)}
                          >
                            <img src={trash} alt="delete" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                : "Your cart is empty"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
