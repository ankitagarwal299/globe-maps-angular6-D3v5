const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);

//on connection 
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});

//om error
mongoose.connection.on('error', (err) => {
  console.log('Database Error ' + err)
});

const app = express();

const users = require('./routes/users');

const port = 3000;

//enabled cors
app.use(cors());

//Set static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser MW
app.use(bodyParser.json());

app.use('/users', users);
//or  app.use('/users',./routes/users);

//Index Route
app.get('/', (req, res) => { res.send('Invalid Endpoint') });

app.listen(port, () => {
  console.log('Server started on port ' + port);
});
