import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import createStatics from './statics/statics';
import createRoutes from './routes/routes';
import './app.css';
import http from './http';

// APP
export default function createApp(update) {
    // INITIAL DATA
    http.getEverything(update);
    // CHILDREN
    let statics = createStatics(update);
    let routes = createRoutes(update);
    // COMPONENT
    return {
        // TOP LEVEL MODEL
        model() {
            return {
                products: [],
                cart: [],
                orders: []
            };
        },
        // TOP LEVEL VIEW
        view(model) {
            console.log("APP MODEL: ");
            console.log(model);
            return (
                <Router>
                    <div id="app">
                        <div id="parallax-filter" />    
                        {statics.view(model)}
                        {routes.view(model)}
                    </div>
                </Router>
            );
        }
    };
}
