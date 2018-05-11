import React from 'react';
import './products.css';
import axios from 'axios';

export default function createProducts(update) {
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
                <section id="products" >
                    {model.products.map(product => (
                        <div key={`Products ${product.name} ${product.id}`} className="product">
                            <h3>{product.name} {product.price}</h3>
                            <button onClick={() => addToCart(product.id)} >ADD TO CART</button>
                        </div>
                    ))}
                </section>
            );
        }
    };
}
