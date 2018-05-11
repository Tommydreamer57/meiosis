import React from 'react';

export default function createOrders(update) {
    return {
        view(model) {
            return (
                <section id="orders">
                    {model.orders.map(order => (
                        <div className="order">
                            <h3>{order.timestring}</h3>
                            {order.products.map(product => (
                                <div className="product">
                                    <h3>{product.name}</h3>
                                    <h3>{product.price} x {product.quantity}</h3>
                                </div>
                            ))}
                            <div className="product" >
                                <h3>TOTAL</h3>
                                <h3>{order.total}</h3>
                            </div>
                        </div>
                    ))}
                </section>
            );
        }
    };
}
