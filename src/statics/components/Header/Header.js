import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header({ cart }) {
    console.log("HEADER PROPS: ");
    console.log(arguments[0]);
    return (
        <header>
            <Link to="/">Home</Link>
            <ul>
                <li><Link to="/cart" >Cart ({cart.length})</Link></li>
                <li><Link to="/products" >Products</Link></li>
                <li><Link to="/admin" >Admin</Link></li>
            </ul>
        </header>
    );
}
