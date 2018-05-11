import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import createStatics from './statics/statics';
import createRoutes from './routes/routes';
import './app.css';
import axios from 'axios';

// APP
export default function createApp(update) {
    // INITIAL DATA
    axios.get('/api/products').then(({ data: products }) => {
        console.log(products);
        update(model => ({
            ...model,
            products
        }));
    });
    axios.get('/api/cart').then(({ data: cart }) => {
        console.log(cart);
        update(model => ({
            ...model,
            cart
        }));
    });
    // CHILDREN
    let statics = createStatics(update);
    let routes = createRoutes(update);
    // COMPONENT
    return {
        // TOP LEVEL MODEL
        model() {
            return {
                products: [],
                cart: []
            };
        },
        // TOP LEVEL VIEW
        view(model) {
            console.log("APP MODEL: ");
            console.log(model);
            return (
                <Router>
                    <div id="app">
                        {statics.view(model)}
                        {routes.view(model)}
                    </div>
                </Router>
            );
        }
    };
}
