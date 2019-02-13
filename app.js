const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose');

const routes = require('./routes/readlater');
mongoose.Promise = global.Promise;
//mongoose.connect("mongodb://jimmy:pf634811@ds046267.mlab.com:46267/readlater", { useNewUrlParser: true }).then(
mongoose.connect("mongodb://localhost:27017/read-later", { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database '+ err)}
);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/', routes);
const port = process.env.PORT || 4000;

const server = app.listen(port, function(){
    console.log('Listening on port ' + port);
});