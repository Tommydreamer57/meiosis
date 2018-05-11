import axios from 'axios';

function convertOrderDates(orders) {
    return orders.map(order => ({
        ...order,
        timestamp: new Date(order.timestamp),
        timestring: new Date(order.timestamp).toString().replace(/(\d{4}) (\d{2}:\d{2})(:\d{2})(.*)$/, '$1')
    }));
}

export default {
    getEverything(update) {
        axios.get('/api/everything')
            .then(({ data: { products, cart, orders } }) => {
                orders = convertOrderDates(orders);
                update(model => ({
                    ...model,
                    products,
                    cart,
                    orders
                }));
            });
    },
    getProducts(update) {
        axios.get('/api/products')
            .then(({ data: products }) => {
                console.log(products);
                update(model => ({
                    ...model,
                    products
                }));
            });
    },
    addProduct(update, { name, price }) {
        axios.post('/api/products', { name, price })
            .then(({ data: products }) => {
                update(model => ({
                    ...model,
                    products
                }));
            });
    },
    getCart(update) {
        axios.get('/api/cart')
            .then(({ data: cart }) => {
                console.log(cart);
                update(model => ({
                    ...model,
                    cart
                }));
            });
    },
    addToCart(update, id) {
        axios.post(`/api/cart/${id}`)
            .then(({ data: cart }) => {
                console.log(cart);
                update(model => ({
                    ...model,
                    cart
                }));
            });
    },
    removeFromCart(update, id) {
        axios.delete(`/api/cart/${id}`)
            .then(({ data: cart }) => {
                update(model => ({
                    ...model,
                    cart
                }));
            });
    },
    removeOneFromCart(update, id) {
        axios.delete(`/api/cart/${id}/?amt=1`)
            .then(({ data: cart }) => {
                update(model => ({
                    ...model,
                    cart
                }));
            });
    },
    placeOrder(update) {
        axios.post('/api/orders')
            .then(({ data: { orders, cart } }) => {
                orders = convertOrderDates(orders);
                update(model => ({
                    ...model,
                    cart,
                    orders
                }));
            });
    }
}