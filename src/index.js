import ReactDOM from 'react-dom';
import initialize from './meiosis';
import createApp from './app';

// REACTDOM RENDER
function render(app) {
    let $root = document.getElementById('root');
    return function (model) {
        ReactDOM.render(app.view(model), $root);
    }
}

// INITIALIZE MEIOSIS
initialize(createApp, render);
