const express = require('express'); 
const controller = require('./src/js/controller');
const app = express();

// set view engine
app.set('view engine', 'ejs'); 

// the root directory (src) SHOULD NOT be part of any path in the ejs files themselves.
app.use(express.static('src'));

// fire up controller
controller(app);

app.listen(5500);
console.log('listening to port 5500')




