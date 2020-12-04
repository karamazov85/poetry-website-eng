const express = require('express'); 
const PORT = process.env.PORT || 5500 
const controller = require('./src/js/controller');
const app = express();


app.set('view engine', 'ejs'); 

app.use(express.static('src'));

app.use(express.urlencoded({ extended: true }));

controller(app);

app.listen(PORT);





