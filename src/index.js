const express = require('express');
const path = require('path');
const connection = require('./connection');
const app = express();
const port = 3000;
const user = require('./routes/users');
const login = require('./routes/login');
const product = require('./routes/product');
const recuperatePass = require('./routes/recuperatePass');
const bodyParser = require('body-parser');

//middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//rutas
app.use('/user', user);
app.use('/login', login);
app.use('/email', recuperatePass);
app.use('/product',product);
    

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})