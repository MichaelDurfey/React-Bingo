const path = require('path');
const express = require('express');

const app = express();
const routes = require('./router');


app.use(express.static(path.resolve(__dirname, '../dist')));

app.use('/', routes);

app.listen(3000, () => console.log('listening on 3000!'));
