import React, { Component } from 'react';

export default class MouseTracker extends Component {
    constructor() {
        super();
        this.state = {
            pageX: 0,
            pageY: 0
        };
        this.updateCoordinates = this.updateCoordinates.bind(this);
    }
    updateCoordinates({ pageX, pageY }) {
        this.setState({
            pageX,
            pageY
        });
    }
    componentDidMount() {
        window.addEventListener('mousemove', this.updateCoordinates);
    }
    componentWillUnmount() {
        window.removeEventListener('mousemove', this.updateCoordinates);
    }
    render() {
        let { pageX, pageY } = this.state;
        let style = {
            position: 'fixed',
            background: 'black',
            zIndex: 999,
            opacity: 0.25
        }
        return (
            <div>
                <div
                    id="mouse-tracker-x"
                    style={{
                        ...style,
                        left: pageX - 0.5,
                        top: 0,
                        height: '100vh',
                        width: 1
                    }}
                />
                <div
                    id="mouse-tracker-x-y"
                    style={{
                        ...style,
                        top: pageY - 3,
                        left: pageX - 3,
                        height: 6,
                        width: 6
                    }}
                />
                <div
                    id="mouse-tracker-y"
                    style={{
                        ...style,
                        top: pageY - 0.5,
                        left: 0,
                        height: 1,
                        width: '100vw'
                    }}
                />
            </div>
        );
    }
}
