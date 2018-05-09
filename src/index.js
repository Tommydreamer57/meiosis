import React from 'react';
import ReactDOM from 'react-dom';
import { stream, scan, merge, nestComponent } from './meiosis';
import createTemperaturePair from './view';

(function (initialModel) {

    // UPDATE
    let update = stream(initialModel);

    // APP
    let app = nestComponent(createTemperaturePair, update, 'temperature');

    // MODELS
    let models = scan(merge, initialModel, update);

    // RENDER
    function render(model) {
        ReactDOM.render(app.view(model), document.getElementById('root'));
    }

    // CONNECT RENDER TO STREAMS
    models.map(render);
    models(initialModel);

})({
    // INITIAL STATE
    temperature: {
        air: { temp: 20, unit: 'C'},
        water: { temp: 20, unit: 'C'},
        pairs: []
    },
});
