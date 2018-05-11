import React from 'react';
import axios from 'axios';

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
    function removeFromCart(id) {
        axios.delete(`/api/cart/${id}`).then(({ data: cart }) => {
            update(model => ({
                ...model,
                cart
            }));
        });
    }
    function removeOneFromCart(id) {
        console.log(id);
        axios.delete(`/api/cart/${id}/?amt=1`).then(({ data: cart }) => {
            update(model => ({
                ...model,
                cart
            }));
        });
    }
    function addToCart(id) {
        axios.post(`/api/cart/${id}`).then(({ data: cart }) => {
            console.log(cart);
            update(model => ({
                ...model,
                cart
            }));
        });
    }
    return {
        view(model) {
            console.log("PRODUCTS MODEL:");
            console.log(model);
            return (
                <section id="cart" >
                    {model.cart.map(product => (
                        <div key={`Cart ${product.name} ${product.id}`} className="product" >
                            {/* {(() => console.log(product))()} */}
                            <h3>{product.name} {product.price} x {product.quantity} = {calculateTotal(product.price, product.quantity)}</h3>
                            <button onClick={() => addToCart(product.id)} >INCREASE</button>
                            {product.quantity > 1 && <button onClick={() => removeOneFromCart(product.id)} >REMOVE 1</button>}
                            <button onClick={() => removeFromCart(product.id)} >REMOVE ALL</button>
                        </div>
                    ))}
                    <div className="product" >
                        <h3>TOTAL</h3>
                        <h3>
                            {toMoney(model.cart.reduce((total, product) => total + fromMoney(product.price) * product.quantity, 0))}
                        </h3>
                    </div>
                </section>
            )
        }
    };
}
