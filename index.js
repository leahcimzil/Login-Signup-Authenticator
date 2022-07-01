const express = require('express');
const mongoose = require('mongoose');
require('./db')();
const authRoutes = require('./routes/routes');
const cookieParser = require('cookie-parser');
const {requireAuth, checkUser} = require('./middleware/auth');


const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');

app.get('*', checkUser);
app.get('/', (req, res)=> res.render('home'));
app.get('/burgers', requireAuth, (req,res)=> res.render('burgers'))
app.use(authRoutes);



const port = process.env.port || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}`));