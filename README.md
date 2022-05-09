# MIS-753-Library-Rest-API

This is a REST API built with NodeJS, Express, and MongoDB. This API provides info about books stored in our 'library' on MongoDB.

# To Get Started

You need to configure a mongoDB Database. Head over to https://account.mongodb.com/account/login and create your account, or sign in if you already have one.

After signing in, create a <b>Free Shared Cluster</b> and then add a username/password.

After this, connect to your cluster with MongoDB Compass and copy the connection String:

It will look something like this:
`mongodb+srv://testPerson:********@cluster0.xduyh.mongodb.net/testDatabase`

You will then need to create a .env file in the project directory

In the project directory paste this string:
`DATABASE_URL = mongodb+srv://testPerson:*******@cluster0.xduyh.mongodb.net/testDatabase`

## Run Project

In the project directory, you can run: 

### `npm install`

Installs the dependencies you need to run the application



### `npm start`

Runs the app in the development mode.\
The application is hosted on [http://localhost:3000](http://localhost:3000).

Open [http://localhost:3000/docs/](http://localhost:3000/v1/api/docs/) to view Swagger Documentation for REST API in the browser.


### `npm run dev`

Runs the app in the development mode.\
The application will reload if you make edits.\
