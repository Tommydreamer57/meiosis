import React from 'react';

// -- Utility code

function nestUpdate(update, prop) {
    return function (func) {
        update(function (model) {
            model[prop] = func(model[prop]);
            return model;
        });
    };
};

function nest(create, update, prop) {
    var component = create(nestUpdate(update, prop));
    var result = Object.assign({}, component);
    if (component.model) {
        result.model = function () {
            var initialModel = {};
            initialModel[prop] = component.model();
            return initialModel;
        };
    }
    if (component.view) {
        result.view = function (model) {
            return component.view(model[prop]);
        };
    }
    return result;
};

// -- Application code

function convert(value, to) {
    if (to === "C") {
        return Math.round((value - 32) / 9 * 5);
    }
    else {
        return Math.round(value * 9 / 5 + 32);
    }
};

function createTemperature(label, init) {
    return function (update) {
        function increase(amount) {
            return function (_event) {
                update(function (model) {
                    model.value += amount;
                    return model;
                });
            };
        };
        function changeUnits(_event) {
            update(function (model) {
                var newUnits = model.units === "C" ? "F" : "C";
                model.value = convert(model.value, newUnits);
                model.units = newUnits;
                return model;
            });
        };

        function model() {
            return Object.assign({ value: 22, units: "C" }, init);
        };

        function view(model) {
            return (
                <div className="temperature">
                    <span>{label} Temperature: {model.value}&deg;{model.units}</span>
                    <div>
                        <button onClick={increase(1)}>Increase</button>
                        <button onClick={increase(-1)}>Decrease</button>
                    </div>
                    <div>
                        <button onClick={changeUnits}>Change Units</button>
                    </div>
                </div>
            );
        };
        return { model, view };
    };
};

function createTemperaturePair(update) {
    var air = nest(createTemperature("Air"), update, "air");
    var water = nest(createTemperature("Water", { value: 84, units: "F" }),
        update, "water");

    function model() {
        return Object.assign(air.model(), water.model());
    };

    function view(model) {
        return (
            <div>
                {air.view(model)}
                {water.view(model)}
            </div>
        );
    };
    return { model, view };
};

function createApp(update) {
    return nest(createTemperaturePair, update, "temperatures");
};

// -- Meiosis pattern setup code

var update = stream();
var app = createApp(update);

var models = scan(function (model, func) {
    return func(model);
}, app.model(), update);

var element = document.getElementById("root");

models.map(function (model) {
    ReactDOM.render(app.view(model), element);
});
