import React from 'react';

export default function createOrders(update) {
    return {
        view(model) {
            return (
                <section id="orders">
                    {model.orders.map(order => (
                        <div className="order">
                            <header>
                                <h3>Order From {order.timestring}</h3>
                            </header>
                            <div className="product-wrapper">
                                {order.products.map(product => (
                                    <div className="product">
                                        <h5>{product.name}</h5>
                                        <h5 className="q-and-p" >
                                            <span>{product.quantity}</span>
                                            x
                                        <span>{product.price}</span>
                                        </h5>
                                    </div>
                                ))}
                                <div className="product" >
                                    <h5>TOTAL</h5>
                                    <h5>{order.total}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            );
        }
    };
}
