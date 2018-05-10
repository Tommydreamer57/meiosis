import React from 'react';
import ReactDOM from 'react-dom';
import { nestComponent } from './meiosis';
import createTemperaturePair from './view';


// LIST
function createPairsList(update) {
    function model() {
        return { pairs: [] };
    }
    function view(model, { addPair }) {
        console.log(model);
        return (
            <div>
                {model.pairs.map(pair => <div>{JSON.stringify(pair)}</div>)}
                <button onClick={addPair} >ADD</button>
            </div>
        );
    }
    return { model, view };
}

// CREATE LIST
function createList(update) {
    function handleInput({ target: { value } }) {
        update(model => ({ ...model, input: value }));
    }
    function addItem() {
        update(model => ({ ...model, input: '', items: [model.input, ...model.items] }));
    }
    function model() {
        return { input: '', items: [] };
    }
    function onKeyDown({ key }) {
        if (key === 'Enter') addItem();
    }
    function view(model) {
        console.log(model);
        return (
            <div>
                <input onChange={handleInput} onKeyDown={onKeyDown} value={model.input} />
                <button onClick={addItem} >ADD</button>
                <div>
                    {model.items.map(item => <p>{item}</p>)}
                </div>
            </div>
        )
    }
    return { model, view }
}

// ROOT COMPONENT
export function createApp(update) {
    let temperature = nestComponent(createTemperaturePair, update, 'temperature');
    let pairs = createPairsList(update);
    let list = nestComponent(createList, update, 'list');
    console.log(temperature);
    console.log(list);
    function addPair() {
        update(model => ({
            ...model,
            temperatures: {
                air: { temp: 0, unit: 'C' },
                water: { temp: 0, unit: 'C' },
                ground: { temp: 0, unit: 'C' }
            },
            pairs: [
                { temperatures: model.temperatures },
                ...model.pairs,
                (function () {console.log(model)})()
            ]
        }));
    }
    function model() {
        return initialModel();
        return { ...temperature.model(), ...list.model(), ...pairs.model() };
    }
    function view(model) {
        console.log(model);
        return (
            <div id="app">
                {temperature.view(model)}
                {pairs.view(model, { addPair })}
                {list.view(model)}
            </div>
        )
    }
    return { model, view };
}

// INITIAL MODEL
export function initialModel() {
    return {
        temperature: {
            air: {
                temp: 20,
                unit: 'C'
            },
            water: {
                temp: 20,
                unit: 'C'
            },
            ground: {
                temp: 20,
                unit: 'F'
            }
        },
        pairs: [],
        list: {
            input: '',
            items: []
        }
    }
}

// RENDER
export function render(app) {
    return function (model) {
        console.log(model);
        ReactDOM.render(app.view(model), document.getElementById('root'));
    }
}
