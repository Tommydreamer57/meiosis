import React from 'react';
import axios from 'axios';

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
    // function updateAmountInCart(id, amt) {
    //     axios.put(`/api/cart/${id}/?amt=${amt}`).then(cart => {
    //         update(model => ({
    //             ...model,
    //             cart
    //         }));
    //     });
    // }
    return {
        view(model) {
            console.log("PRODUCTS MODEL:");
            console.log(model);
            return (
                <section id="cart" >
                    {model.cart.map(product => (
                        <div key={`Cart ${product.name} ${product.id}`} className="product" >
                            {(() => console.log(product))()}
                            <h3>{product.name} {product.quantity}</h3>
                            {product.quantity > 1 && <button onClick={() => removeOneFromCart(product.id)} >REMOVE 1</button>}
                            <button onClick={() => removeFromCart(product.id)} >REMOVE ALL</button>
                        </div>
                    ))}
                </section>
            )
        }
    };
}
