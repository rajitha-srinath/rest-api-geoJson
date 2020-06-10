const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/ninjago', {useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

mongoose.connection.once('open', function(){
    console.log('Connection has been made');
}).on('error', function(error){
    console.log('Connection error:', error);
});

mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());

app.use('/api', require('./routes/api'));

app.use((err, req, res, next) => {
    // console.log(err);
    res.status(422).send({error: err.message});
});

app.listen(process.env.port || 4000, () => {
    console.log('now listening to request');
});