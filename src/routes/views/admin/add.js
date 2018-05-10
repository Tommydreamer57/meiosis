import React from 'react';

export default function createAdd(update) {
    let input = '';
    function addProduct(name) {
        update(model => {
            let { id } = model;
            let product = { name, id };
            return {
                ...model,
                id: id + 1,
                products: [
                    product,
                    ...model.products
                ]
            };
        });
    }
    function onChange({ target: { value } }) {
        input = value;
    }
    function onKeyDown({ target, key }) {
        if (key === 'Enter') {
            console.log(input);
            addProduct(input);
            target.value = '';
            input = '';
        }
    }
    return {
        view(model) {
            return (
                <input onChange={onChange} onKeyDown={onKeyDown} />
            );
        }
    };
}
