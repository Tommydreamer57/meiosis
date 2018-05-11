import React from 'react';
import axios from 'axios';

export default function createAdd(update) {
    let $name, $price;
    let name = '';
    let price = 0;
    function addProduct() {
        axios.post('/api/products', { name, price }).then(({ data: products }) => {
            update(model => ({
                ...model,
                products
            }));
        });
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
