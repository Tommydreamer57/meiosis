import React from 'react';
import axios from 'axios';
import http from '../../../http';

function calculateTotal(price, quantity) {
    price = fromMoney(price);
    return toMoney(price * quantity);
}

function fromMoney(amt) {
    return Number(String(amt).replace(/\$/, ''));
}

function toMoney(amt) {
    console.log(amt);
    return '$' + amt.toFixed(2);
}

export default function createCart(update) {
    // HTTP METHODS
    let removeFromCart = id => http.removeFromCart(update, id);
    let removeOneFromCart = id => http.removeOneFromCart(update, id);
    let addToCart = id => http.addToCart(update, id);
    let placeOrder = () => http.placeOrder(update);
    // COMPONENT
    return {
        view(model) {
            console.log("PRODUCTS MODEL:");
            console.log(model);
            return (
                <section id="cart" >
                    {model.cart.map(product => (
                        <div key={`Cart ${product.name} ${product.id}`} className="product" >
                            {/* {(() => console.log(product))()} */}
                            <h4>
                                {product.name} {product.price} x {product.quantity} = {calculateTotal(product.price, product.quantity)}
                            </h4>
                            <button onClick={() => addToCart(product.id)} >
                                INCREASE
                                </button>
                            {product.quantity > 1 &&
                                <button onClick={() => removeOneFromCart(product.id)} >
                                    REMOVE 1
                                </button>}
                            <button onClick={() => removeFromCart(product.id)} >
                                REMOVE ALL
                            </button>
                        </div>
                    ))}
                    <div className="product" >
                        <h4>
                            SUBTOTAL {toMoney(model.cart.reduce((total, product) => total + fromMoney(product.price) * product.quantity, 0))}
                        </h4>
                        <button onClick={placeOrder} >
                            PLACE ORDER
                        </button>
                    </div>
                </section>
            )
        }
    };
}
