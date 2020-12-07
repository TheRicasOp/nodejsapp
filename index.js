/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const body_parser = require("body-parser");
const cors = require('cors');
const admin = require('firebase-admin');

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */

/**
 * Routes Definitions
 */
//Prueba
app.get("/", (req, res) => {
    res.status(200).send("WHATABYTE: Food For Devs");
  });

//getUsers

/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
