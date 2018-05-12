import React from 'react';

export default function createHome(update) {
    return {
        view(model) {
            return (
                <section id="home">
                    <h3>HOME</h3>
                </section>
            );
        }
    };
}
