const functions = require("firebase-functions");

const express = require('express');
const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

require('dotenv').config();

const routes = require('./routes/routes') 

const app = express();

//MongoDB Connection
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (err) => {
    console.log(err);
})

database.once('connected', () => {
    console.log("Database Connected!")
})


//Setting up Swagger Doccumentation
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'MIS 753 Library REST API',
            description: "A REST API built with NodeJS, Express, and MongoDB. This API provides info about books stored in our 'library' on MongoDB."
        },
    },
    apis: ["./routes/routes.js"]
}


app.use(express.json());

//Routes
app.use('/v1/api/', routes);

//Swagger Docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


//Welcome Message
app.get('/', (req, res, next) => {
    res.send('Welcome to My REST API built with NodeJS, Express, and MongoDB. This API provides info about books stored in our "library" on MongoDB. To see the Swagger Documentation, type "/docs" in the URL.');
})

//404 Error Endpoint
app.use((req, res, next) => {
    res.status(404).send("404 Error! There was an issue with the endpoint! Please make sure everything is correct and include in your request!");
});

app.listen(3000, () => console.log('Server is up and running! 🚀'));

exports.app = functions.https.onRequest(app);
