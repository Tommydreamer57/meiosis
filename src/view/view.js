import React from 'react';

export const initialModel = {
    label: 'Counter',
    counter: 0
};

export default function View(model) {
    return (
        <div>
            {model.label}: {model.counter}
        </div>
    );
}
