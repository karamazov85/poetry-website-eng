const express = require('express'); 
const PORT = process.env.PORT || 5500 // for HEROKU deployment
const controller = require('./src/js/controller');
const app = express();

app.set('view engine', 'ejs'); 
// the root directory (src) SHOULD NOT be part of any path in the ejs files themselves.
app.use(express.static('src'));
// middleware to parse req body
app.use(express.urlencoded({ extended: true }));
// fire up controller
controller(app);
// open port
app.listen(PORT);
console.log('listening to port 5500')




