const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function(){
    mongoose.connect('mongodb://localhost/nodereact', { useNewUrlParser: true })
    .then(() => winston.info('Connected to MongoDB....'))
    .catch(err => console.log(err));
};