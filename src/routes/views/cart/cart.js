import React from 'react';

export default function createCart(update) {
    return {
        view(model) {
            console.log("PRODUCTS MODEL:");
            console.log(model);
            return (
                <section id="cart" >
                    {model.cart.map(product => <div>{product.name} {product.quantity}</div>)}
                </section>
            )
        }
    };
}
