// DEPENDENCIES
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
require('dotenv').config();
// MIDDLEWARES
const dbToReq = require('./middlewares/db');
const userToSession = require('./middlewares/user');
// CONTROLLERS
const pc = require('./controllers/products');
const cc = require('./controllers/carts');

// APP
const app = express();

// MIDDLEWARES
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(dbToReq);
app.use(userToSession);

// DB
massive(process.env.CONNECTION_STRING).then(db => {
    // db.seed().then(() => console.log('refreshed database'));
    app.set('db', db);
});

// ENDPOINTS

//USER

// PRODUCTS
app.get('/api/products', pc.readAll);
app.get('/api/products/:id', pc.readOne);
// CART
app.get('/api/cart', cc.read);
app.post('/api/cart/:product_id', cc.create);
app.delete('/api/cart/:product_id', cc.delete);

// ADMIN

// PRODUCTS
app.post('/api/products', pc.create);
app.put('/api/products', pc.update);
app.delete('/api/products/:id', pc.delete);

// LISTEN

app.listen(3020, () => console.log('meiosis on 3020!'));
