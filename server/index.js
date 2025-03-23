const path = require('path');
const http = require('http');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const { db } = require('./db');
const router = require('./router/route.js');
const { errorLogger } = require("./middleware");

// Check for dotenv errors
if (dotenv.error) { 
    console.log('dotenv file not found....');
    throw dotenv.error;
}

const app = express();
const staticFilesPath = path.join(__dirname, '../public');

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticFilesPath));
app.use(cors());

app.use('/api', router);

app.use(errorLogger);

const server = http.createServer(app);
server.listen((process.env.PORT || process.env.COMMON_PORT || 5000), async () => {
    console.log(` 🚀  Common API started on Port - ${process.env.PORT || process.env.COMMON_PORT || 5000}`);
});
