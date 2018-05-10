import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import createStatics from './statics/statics';
import createRoutes from './routes/routes';
import './app.css';

// APP
export default function createApp(update) {
    // CHILDREN
    let statics = createStatics(update);
    let routes = createRoutes(update);
    // COMPONENT
    return {
        // TOP LEVEL MODEL
        model() {
            return {
                products: [
                    {
                        id: 1,
                        name: 'one'
                    },
                    {
                        id: 2,
                        name: 'two'
                    },
                    {
                        id: 3,
                        name: 'three'
                    }
                ],
                cart: [
                    {
                        id: 1,
                        name: 'one',
                        quantity: 2
                    },
                    {
                        id: 3,
                        name: 'three',
                        quantity: 3
                    }
                ],
                id: 4
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
