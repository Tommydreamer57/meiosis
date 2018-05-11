import React from 'react';
import http from '../../../http';

export default function createAdd(update) {
    let $name, $price;
    let name = '';
    let price = 0;
    function addProduct() {
        http.addProduct(update, { name, price });
    }
    function onKeyDown({ target, key }) {
        if (key === 'Enter') {
            addProduct();
            $name.value = '';
            $price.value = null;
        }
    }
    function handleNameChange({ target }) {
        if (!$name) $name = target;
        name = target.value;
    }
    function handlePriceChange({ target }) {
        if (!$price) $price = target;
        price = target.value;
    }
    return {
        view(model) {
            return (
                <div className="product" >
                    <input
                        type="text"
                        placeholder="name"
                        onChange={handleNameChange}
                        onKeyDown={onKeyDown}
                    />
                    <input
                        type="number"
                        placeholder="price"
                        onChange={handlePriceChange}
                        onKeyDown={onKeyDown}
                    />
                </div>
            );
        }
    };
}
