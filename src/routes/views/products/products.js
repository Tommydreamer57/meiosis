import React from 'react';
import './products.css';

export default function createProducts(update) {
    function addToCart(id) {
        update(model => {
            let { cart, products } = model;
            let product = cart.find(product => product.id === id);
            if (product) {
                product.quantity++;
            } else {
                product = products.find(product => product.id === id);
                if (product) {
                    product = {
                        ...product,
                        quantity: 1
                    };
                    cart = [product, ...cart];
                }
            }
            return { ...model, cart };
        });
    }
    return {
        view(model) {
            console.log("PRODUCTS MODEL:");
            console.log(model);
            return (
                <section id="products" >
                    {model.products.map(product => (
                        <div className="product">
                            <h3>{product.name}</h3>
                            <button onClick={() => addToCart(product.id)} >ADD TO CART</button>
                        </div>
                    ))}
                </section>
            );
        }
    };
}
