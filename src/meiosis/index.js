
// STREAM
export function stream(initial) {
    let mapFunctions = [];
    function createdStream(value) {
        mapFunctions.forEach(fn => fn(value));
    }
    createdStream.map = function (mapFn) {
        let newInitial;
        if (initial !== undefined) newInitial = mapFn(initial);
        let newStream = stream(newInitial);
        mapFunctions.push(function (value) {
            newStream(mapFn(value));
        });
        return newStream;
    }
    return createdStream;
}

// SCAN
export function scan(accumulator, initial, sourceStream) {
    let newStream = stream(initial);
    let accumulated = initial;
    sourceStream.map(function (value) {
        accumulated = accumulator(accumulated, value);
        newStream(accumulated);
    });
    return newStream;
}

function isObjNotArr(obj) {
    return (
        obj &&
        typeof obj === 'object' &&
        !Array.isArray(obj)
    );
}

// MERGE
export function merge(old, neww) {
    let obj = { ...old };
    if (typeof neww === 'function') {
        neww = neww(old);
    }
    for (let prop in neww) {
        if (obj.hasOwnProperty(prop) && isObjNotArr(obj[prop]) && isObjNotArr(neww[prop])) {
            obj[prop] = merge(obj[prop], neww[prop]);
        } else {
            obj[prop] = neww[prop];
        }
    }
    return obj;
}

// NEST UPDATE
function nestUpdate(update, prop) {
    return function (cb) {
        update(function (model) {
            // model[prop] = cb(model[prop]);
            // return model;
            return { ...model, [prop]: cb(model[prop]) };
        });
    }
}

// NEST
export function nestComponent(create, update, prop) {
    let component = create(nestUpdate(update, prop));
    let result = { ...component };
    if (component.model) {
        result.model = function () {
            return {
                [prop]: component.model()
            };
        }
    }
    if (component.view) {
        result.view = function (model) {
            return component.view(model[prop] || {});
        }
    }
    return result;
}

export default null;
