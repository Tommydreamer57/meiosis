import React from 'react';
import ReactDOM from 'react-dom';
import { stream, scan, merge } from './meiosis';
import createView from './view';

(function (initialModel) {

    // UPDATE
    let update = stream(initialModel);

    // VIEW
    let View = createView(update);

    // MODELS
    let models = scan(merge, initialModel, update);

    // RENDER
    function render(model) {
        ReactDOM.render(<View {...model} />, document.getElementById('root'));
    }

    // CONNECT RENDER TO STREAMS
    models.map(render);
    models(initialModel);

})({
    air: { temp: 0, unit: 'C' },
    water: { temp: 0, unit: 'C' }
});
