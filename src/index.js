require('dotenv').config();
const cron = require('node-cron');
//const express = require('express');
const saveAllFramesImport = require('./picture.js');

//let app = express();

// Tasks to be run
cron.schedule(process.env.CRON_INTERVAL, saveAllFramesImport);

//saveAllFrames();
//app.listen(3000);
