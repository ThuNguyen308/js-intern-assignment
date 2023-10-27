import "./App.css";
import { useState, useEffect, useMemo } from "react";
import logo from "./assets/nike.png";
import trash from "./assets/trash.png";
import plus from "./assets/plus.png";
import minus from "./assets/minus.png";
import check from "./assets/check.png";
import data from "./data/shoes.json";
import { formatPrice } from "./helpers/format";

function App() {
  const [shoes, setShoes] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setShoes(data.shoes);
    const cartData = JSON.parse(localStorage.getItem("yourCart"));
    if (cartData) {
      setCart(cartData);
    }
  }, []);

  const totalPrice = useMemo(() => {
    return cart.reduce((total, p) => total + p.price * p.quantity, 0);
  }, [cart]);

  const handleAddToCart = (product) => {
    const newCart = [...cart, { ...product, quantity: 1 }];
    localStorage.setItem("yourCart", JSON.stringify(newCart));
    setCart(newCart);
  };

  const changeQuantity = (product, num, e) => {
    if (product.quantity + num === 0) {
      handleRemoveFromCart(product.id, e);
      return;
    }
    const newCart = cart.map((p) => {
      if (p.id === product.id) {
        return { ...p, quantity: p.quantity + num };
      }
      return p;
    });
    localStorage.setItem("yourCart", JSON.stringify(newCart));
    setCart(newCart);
  };

  const handleRemoveFromCart = (productId, e) => {
    const cartItem = e.target.closest(".cart-item");
    cartItem.classList.add("fade-out");
    cartItem.classList.add("zoom-in");
    setTimeout(() => {
      const newCart = cart.filter((p) => p.id !== productId);
      localStorage.setItem("yourCart", JSON.stringify(newCart));
      setCart(newCart);
    }, 1000);
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
                <div className="product-item" key={p.id}>
                  <div className="img">
                    <img src={p.image} alt={p.name} />
                  </div>
                  <h3 className="name">{p.name}</h3>
                  <p className="decs">{p.description}</p>
                  <div>
                    <span className="price">{formatPrice.format(p.price)}</span>
                    <button
                      className="btn-add"
                      onClick={() => handleAddToCart(p)}
                      disabled={cart.some((cp) => cp.id === p.id)}
                    >
                      {cart.some((cp) => cp.id === p.id) ? (
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
                    <div className="cart-item" key={p.id}>
                      <div className="left">
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
                            onClick={(e) => handleRemoveFromCart(p.id, e)}
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
