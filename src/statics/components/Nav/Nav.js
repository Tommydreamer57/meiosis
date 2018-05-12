import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

export default function Nav({ cart, orders, location: { pathname } }) {
    console.log("Nav PROPS: ");
    console.log(arguments[0]);
    return (
        <nav>
            <Link to="/">Home</Link>
            <div id="filler" />
            <ul>
                <li className={pathname === '/cart' ? 'link-current' : ''} ><Link to="/cart" >Cart ({cart.length})</Link></li>
                <li className={pathname === '/orders' ? 'link-current' : ''} ><Link to="/orders" >Orders ({orders.length})</Link></li>
                <li className={pathname === '/products' ? 'link-current' : ''} ><Link to="/products" >Products</Link></li>
                <li className={pathname === '/admin' ? 'link-current' : ''} ><Link to="/admin" >Admin</Link></li>
            </ul>
        </nav>
    );
}
