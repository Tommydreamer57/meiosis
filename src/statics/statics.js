import React from 'react';
import { Route } from 'react-router-dom';
import MouseTracker from './components/MouseTracker/MouseTracker';
import Header from './components/Header/Header';

export default function createStatics(update) {
    return {
        view(model) {
            return (
                <div>
                    <Route path="/" render={props => <Header cart={model.cart} />} />
                    {/* <MouseTracker /> */}
                </div>
            );
        }
    };
}
