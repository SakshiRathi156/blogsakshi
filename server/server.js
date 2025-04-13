require('dotenv').config();
//entry point for express app
const express = require('express')
const routes = require('./routes/blogroutes');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

connectDB();
// cherry  on the cake - 
//semicolons are optional due to a feature called automatic semicolon insertion (ASI) provided by javascript

//express app
const app = express()
app.use(express.json()); // To parse incoming JSON requests
const PORT = process.env.PORT || 5000;

// Use CORS middleware with more permissive options
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

//next: A callback function that, when called, passes control to the next middleware function in the stack. It is essential for proceeding to the next middleware or route handler.
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// API routes - use the routes directly without adding /api prefix
app.use(routes);

// Serve static assets in production
app.get('/', (req, res) => {
    res.send('API is running');
});



//  else {
//     app.get('/', (req, res) => {
//         res.send('Server is running!');
//     });
// }

//listen to requests
//to add these sensitive information like port number and env variables, we can have another env file that will not be part of the repository
//gitignore will contain env file
//routes
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//can use message property as well
//in package.json we can add nodemon server.js as dev, npm run dev will exactly do the same

