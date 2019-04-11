const express = require('express');
const winston = require('winston');
const cors = require('cors')
const path = require('path');

const bodyParser = require('body-parser');

const app = express();

require('./models/tasks')();
require('./startup/db')();


app.use('/api/tasks', require('./routes/task'));
app.use('/api/users', require('./routes/user'));

app.use(bodyParser.json())
app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));


// Server 

const port = process.env.PORT || 4000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));


