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
                                    <h3>{product.name} {product.price} {product.quantity}</h3>
                                </div>
                            ))}
                        </div>
                    ))}
                </section>
            )
        }
    };
}
