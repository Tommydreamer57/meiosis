import React from 'react';
import { Switch, Route } from 'react-router-dom';
import createProducts from './views/products/products';
import createCart from './views/cart/cart';
import createAdmin from './views/admin/admin';

export default function createRoutes(update) {
    let products = createProducts(update);
    let cart = createCart(update);
    let admin = createAdmin(update);
    return {
        view(model) {
            console.log("ROUTES MODEL:");
            console.log(model);
            return (
                <Switch>
                    <Route
                        exact path="/"
                        render={props => "HOME"}
                    />
                    <Route
                        path="/cart"
                        render={props => cart.view(model, props)}
                    />
                    <Route
                        path="/products"
                        render={props => products.view(model, props)}
                    />
                    <Route
                        path="/admin"
                        render={props => admin.view(model, props)}
                    />
                </Switch>
            );
        }
    };
}