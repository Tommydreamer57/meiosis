import React from 'react';
import './products.css';
import http from '../../../http';

export default function createProducts(update) {
    // HTTP METHODS
    let addToCart = id => http.addToCart(update, id);
    // COMPONENT
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
