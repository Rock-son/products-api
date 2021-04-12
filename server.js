const express = require("express");
const path = require("path");
const favicon = require('serve-favicon');
const bodyParser = require("body-parser");
// security
const helmet = require("./config/utils/helmet.js");
// db
const mongoose = require("mongoose");

// routes & routing functions
const getServerHealth = require("./config/utils/health");
const reportViolation = require("./config/utils/health");
const product = require("./routes/product");

const app = express();

// `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CONTAINER_NAME}:27017/${process.env.MONGO_DB}`
const dbConnectionString = `mongodb://${process.env.MONGO_CONTAINER_NAME}:27017`;
mongoose.connect(dbConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});
/* ****************** middleware ************************** */
// FAVICON
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')))
// BODYPARSER
app.use(bodyParser.json({ type: ["json", "application/json"] }));
// SECURITY
helmet(app);
// SET SETTINGS
app.set("env", "production");

/* ****************** routes *********************** */
// HEALTH CHECKING
app.get('/healthy', getServerHealth);
/* CSP VIOLATION LOGGING */
app.post("/report-violation", reportViolation);
// API ROUTING
app.use("/api", product);


module.exports = app;