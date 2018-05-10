// DEPENDENCIES
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
require('dotenv').config();
// MIDDLEWARES
const addDbToReq = require('./middlewares/db');
// CONTROLLERS
const pc = require('./controllers/products');
const cc = require('./controllers/carts');


// APP
const app = express();

// MIDDLEWARES
app.use(bodyParser.json());
app.use(addDbToReq);

// DB
massive(process.env.CONNECTION_STRING).then(db => {
    db.seed().then(seed => {
        console.log(seed);
    });
    app.set('db', db);
});

// ENDPOINTS

//USER
app.get('/api/products', pc.readAll);
app.get('/api/products/:id', pc.readOne);

app.get('/api/cart', cc.read);
app.post('/api/cart/:product_id', cc.create);
app.delete('/api/cart/:product_id', cc.delete);

// ADMIN
app.post('/api/products', pc.create);
app.put('/api/products', pc.update);
app.delete('/api/products/:id', pc.delete);

app.listen(3020, () => console.log('meiosis on 3020!'));
