import * as u from './utils';

export const {
    stream,
    scan,
    merge,
    nestComponent
} = u;

export default function initialize(createApp, initialModel, render) {
    // UPDATE
    let update = stream(initialModel); // -- must not be invoked here
    
    // APP
    let app = createApp(update);
    
    // MODELS
    let models = scan((model, cb) => cb(model), app.model(), update);
    
    // CONNECT RENDER TO STREAMS
    models.map(render(app));
    
    // INITIALIZE APP
    models(initialModel()); // -- must be invoked here
}
