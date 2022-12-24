// Framework/Library for creating
// a server in node.
const express = require('express');
const path = require('path');
const modelRouter = require('./routes/api/model');
const reservationRouter = require('./routes/reservation');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Configure static assests. 
// Server can deliver html, css, 
// images, js scripts to browser
app.use(express.static(path.join(__dirname, 'build')));

/*
    API routes 
*/
app.use('/api/ml_model', modelRouter);
app.use('/reservations', reservationRouter);


/*
    Serve the REACT application
    All routes besides API calls 
    will be sent index.html 
    REACT will take care of 
    client-side routing 
*/

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Set development port to 3001
// REACT Dev Server uses 3000
// In production environment use
// the hosting process port number
const port = process.env.PORT || 3001;

app.listen(port, function() {
    console.log(`Server running on port ${port}`);
})