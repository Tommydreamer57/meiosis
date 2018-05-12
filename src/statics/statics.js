import React from 'react';
import { Route } from 'react-router-dom';
import MouseTracker from './components/MouseTracker/MouseTracker';
import Nav from './components/Nav/Nav';

export default function createStatics(update) {
    return {
        view(model) {
            return (
                <div>
                    <Route path="/" render={props => <Nav {...props} {...model} />} />
                    {/* <MouseTracker /> */}
                </div>
            );
        }
    };
}
