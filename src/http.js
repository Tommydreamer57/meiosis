import axios from 'axios';

export default {
    getProducts(update) {
        axios.get('/api/products').then(({ data: products }) => {
            console.log(products);
            update(model => ({
                ...model,
                products
            }));
        });
    },
    getCart(update) {
        axios.get('/api/cart').then(({ data: cart }) => {
            console.log(cart);
            update(model => ({
                ...model,
                cart
            }));
        });
    },
    addToCart(update, id) {
        axios.post(`/api/cart/${id}`).then(({ data: cart }) => {
            console.log(cart);
            update(model => ({
                ...model,
                cart
            }));
        });
    },
    removeFromCart(update, id) {
        axios.delete(`/api/cart/${id}`).then(({ data: cart }) => {
            update(model => ({
                ...model,
                cart
            }));
        });
    },
    removeOneFromCart(update, id) {
        axios.delete(`/api/cart/${id}/?amt=1`).then(({ data: cart }) => {
            update(model => ({
                ...model,
                cart
            }));
        });
    },
    placeOrder(update) {
        axios.post('/api/order').then(({ data: order }) => {
            console.log(order);
            update(model => ({
                ...model
            }));
        });
    }
}