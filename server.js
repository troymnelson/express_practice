const express = require('express');
const app = express();
const PORT = process.env.PORT || 3333;
const path = require('path');

// require api_routes file
const api_routes = require('./routes/api_routes');



// share static/browser files
app.use(express.static(path.join(__dirname, 'browser')));

// attach client-side form data to request.body object
app.use(express.urlencoded({ extended: true }));

// allow app to use json
app.use(express.json());

// load routes
app.use('/api', api_routes);


// start server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});