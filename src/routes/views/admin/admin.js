import React from 'react';
import createAdd from './add';

export default function createAdmin(update) {
    let add = createAdd(update);
    return {
        view(model) {
            return (
                <section id="admin" >
                    {add.view(model)}
                    {model.products.map(product => (
                        <div key={`Products ${product.name} ${product.id}`} className="product">
                            <h3>{product.name}</h3>
                            <h3>{product.price}</h3>
                        </div>
                    ))}
                </section>
            );
        }
    };
}
  