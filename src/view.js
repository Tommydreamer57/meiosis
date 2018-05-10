import React from 'react';
import { nestComponent } from './meiosis';

// CHILD
function createTemperature(label, init = {}) {
    return function (update) {
        // EVENT
        function changeTemp(temp) {
            update(model => ({ ...model, temp }));
        }
        function changeUnit() {
            update(model => {
                let { unit, temp } = model;
                switch (unit) {
                    case 'C':
                        unit = 'F';
                        temp = Math.round(temp * 9 / 5 + 32);
                        break;
                    case 'F':
                        unit = 'C';
                        temp = Math.round((temp - 32) / 9 * 5);
                        break;
                    default:
                        unit = 'C';
                        break;
                }
                return { ...model, unit, temp };
            });
        }
        function model() {
            return { temp: 20, unit: 'C', ...init };
        }
        function view(model) {
            console.log(model);
            return (
                <div>
                    <h3>{label} Temperature: {model.temp || 0} {model.unit || 'C'}</h3>
                    <button onClick={() => changeTemp((model.temp || 0) + 1)} >+</button>
                    <button onClick={() => changeTemp((model.temp || 0) - 1)} >-</button>
                    <button onClick={changeUnit} >
                        CH
                    </button>
                </div>
            );
        }
        return { model, view };
    }
}

// PARENT
export default function createTemperaturePair(update) {
    let air = nestComponent(createTemperature("Air"), update, 'air');
    let water = nestComponent(createTemperature('Water', { temp: 26 }), update, 'water');
    let ground = nestComponent(createTemperature('Ground', { temp: 5, unit: 'F' }), update, 'ground');
    // function addPair() {
    //     update(model => ({
    //         air: { temp: 0, unit: 'C' },
    //         water: { temp: 0, unit: 'C' },
    //         pairs: [{ air: model.air, water: model.water }, ...model.pairs]
    //     }));
    // }
    function model() {
        console.log("GETTING PARENT MODEL");
        return { ...air.model(), ...water.model(), ...ground.model() };
    }
    function view(model) {
        console.log(model);
        return (
            <div>
                {air.view(model)}
                {water.view(model)}
                {ground.view(model)}
                {/* <button onClick={addPair} >ADD</button> */}
            </div>
        );
    }
    return { model, view };
}
