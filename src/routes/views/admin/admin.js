import React from 'react';
import createAdd from './add';

export default function createAdmin(update) {
    let add = createAdd(update);
    return {
        view(model) {
            return (
                <section id="admin" >
                    {add.view(model)}
                </section>
            );
        }
    };
}
  