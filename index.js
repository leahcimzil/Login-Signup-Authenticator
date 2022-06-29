const express = require('express');
const app = express();
require('./db')();


app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res)=> res.render('home'));


const port = process.env.port || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}`));