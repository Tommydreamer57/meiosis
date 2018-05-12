import React from 'react';
import { Switch, Route } from 'react-router-dom';
import createHome from './views/home/home';
import createCart from './views/cart/cart';
import createOrders from './views/orders/orders';
import createProducts from './views/products/products';
import createAdmin from './views/admin/admin';

export default function createRoutes(update) {
    let home = createHome(update);
    let cart = createCart(update);
    let orders = createOrders(update);
    let products = createProducts(update);
    let admin = createAdmin(update);
    return {
        view(model) {
            console.log("ROUTES MODEL:");
            console.log(model);
            return (
                <Switch>
                    <Route
                        exact path="/"
                        render={props => home.view(model, props)}
                    />
                    <Route
                        path="/cart"
                        render={props => cart.view(model, props)}
                    />
                    <Route
                        path="/orders"
                        render={props => orders.view(model, props)}
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
