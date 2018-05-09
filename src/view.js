import React, { Component } from 'react';

export default function createView(update) {
    // EVENT
    function changeUnit(target, unit, temp) {
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
                break;
        }
        update({ [target]: { unit, temp } });
    }
    function changeTemp(target, temp) {
        update({ [target]: { temp } });
    }
    // VIEW
    return class View extends Component {
        incAirTemp = () => {
            changeTemp('air', this.props.air.temp + 1);
        }
        decAirTemp = () => {
            changeTemp('air', this.props.air.temp - 1);
        }
        changeAirUnit = () => {
            changeUnit('air', this.props.air.unit, this.props.air.temp);
        }
        incWaterTemp = () => {
            changeTemp('water', this.props.water.temp + 1);
        }
        decWaterTemp = () => {
            changeTemp('water', this.props.water.temp - 1);
        }
        changeWaterUnit = () => {
            changeUnit('water', this.props.water.unit, this.props.water.temp);
        }
        render() {
            let { incAirTemp, decAirTemp, changeAirUnit, incWaterTemp, decWaterTemp, changeWaterUnit } = this;
            let { air, water } = this.props;
            return (
                <div id="view">
                    <div>
                        <h3>AIR: {air.temp} {air.unit}</h3>
                        <button onClick={incAirTemp} >+</button>
                        <button onClick={decAirTemp} >-</button>
                        <button onClick={changeAirUnit} >
                            CH
                    </button>
                    </div>
                    <div>
                        <h3>WATER: {water.temp} {water.unit}</h3>
                        <button onClick={incWaterTemp} >+</button>
                        <button onClick={decWaterTemp} >-</button>
                        <button onClick={changeWaterUnit} >
                            CH
                    </button>
                    </div>
                </div>
            );
        }
    }
}
