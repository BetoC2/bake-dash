const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Todo el show de express
const app = express();
const port = 3000;

app.use(express.json())
app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

