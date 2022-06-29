const express = require('express');
const app = express();
require('./db')();

app.set('view engine', 'ejs');
const port = process.env.port || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}`));