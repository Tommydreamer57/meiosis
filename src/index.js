import React from 'react';
import ReactDOM from 'react-dom';
// import View, { initialModel } from './view/view';

// UTILITY

// STREAM
function stream(initial) {
    console.log("CREATING NEW STREAM");
    let mapFunctions = [];
    function createdStream(value) {
        console.log("INVOKED STREAM")
        mapFunctions.forEach(fn => fn(value));
    }
    createdStream.map = function (mapFn) {
        console.log("MAPPING STREAM")
        let newInitial;
        if (initial !== undefined) newInitial = mapFn(initial);
        let newStream = stream(newInitial);
        mapFunctions.push(function (value) {
            console.log("INVOKED MAP FUNCTION");
            newStream(mapFn(value));
        });
        return newStream;
    }
    return createdStream;
}

// SCAN
function scan(accumulator, initial, sourceStream) {
    console.log("SCANNING STREAM");
    let newStream = stream(initial);
    let accumulated = initial;
    sourceStream.map(function (value) {
        console.log("INVOKED SOURCESTREAM MAP FUNCTION");
        accumulated = accumulator(accumulated, value);
        newStream(accumulated);
    });
    return newStream;
}

// APPLICATION
function createView(update) {
    // EVENT
    function increment(value) {
        update({ value });
    }
    // VIEW
    return function View(model) {
        console.log(model);
        return (
            <div>
                <div>{model.label}: {model.value}</div>
                <button onClick={() => increment((model.value || 0) + 1)} >INCREMENT</button>
                <button onClick={() => increment((model.value || 0) - 1)} >DECREMENT</button>
            </div>
        );
    }
}

// MEIOSIS

// MODEL
let initialModel = {
    label: 'Counter',
    value: 0
};

// function updateModel(val) {
//     let counter = model.counter + val;
//     model = { ...model, counter };
//     return model;
// }

// UPDATE
let update = stream(initialModel);
let View = createView(update);

// MODELS
let models = scan(function (model, value) {
    return { ...model, ...value };
}, 0, update);

// RENDER
function render(model) {
    ReactDOM.render(<View {...model} />, document.getElementById('root'));
}

// CONNECT RENDER TO STREAMS
models.map(render);

models(initialModel);
