
// STREAM
export function stream(initial) {
    let mapFunctions = [];
    console.log("CREATING NEW STREAM", mapFunctions.length);
    function createdStream(value) {
        console.log("INVOKED STREAM", mapFunctions.length);
        mapFunctions.forEach(fn => fn(value));
    }
    createdStream.map = function (mapFn) {
        console.log("MAPPING STREAM", mapFunctions.length);
        let newInitial;
        if (initial !== undefined) newInitial = mapFn(initial);
        let newStream = stream(newInitial);
        mapFunctions.push(function (value) {
            console.log("INVOKED MAP FUNCTION", mapFunctions.length);
            newStream(mapFn(value));
        });
        return newStream;
    }
    return createdStream;
}

// SCAN
export function scan(accumulator, initial, sourceStream) {
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
    for (let prop in neww) {
        if (obj.hasOwnProperty(prop) && isObjNotArr(obj[prop]) && isObjNotArr(neww[prop])) {
            obj[prop] = merge(obj[prop], neww[prop]);
        } else {
            obj[prop] = neww[prop];
        }
    }
    return obj;
}

export default null;
