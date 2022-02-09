const express = require('express');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// This section will help you get a list of all the records.
recordRoutes.route('/values').get(async function (_req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection('values')
    .find({}).limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching values from db!');
      } else {
        res.json(result);
      }
    });
});

// This section will help you create a new record.
recordRoutes.route('/values').post(function (req, res) {
  const dbConnect = dbo.getDb();
  const valuesJson = {
    /*solarPower: req.body.solarPower,
    load1Power: req.body.load1Power,
    load2Power: req.body.load2Power,
    load3Power: req.body.load3Power,
    acPower: req.body.acPower,*/
      solarPower: 80.9,
      load1Power: 15.5,
      load2Power: 22.6,
      load3Power: 88.6,
      acPower: 415.0,
    last_modified: new Date(),
  };

  dbConnect
    .collection('values')
    .insertOne(valuesJson, function (err, result) {
      if (err) {
        res.status(400).send('Error inserting matches!');
      } else {
        console.log(`Added a new match with id ${result.insertedId}`);
        res.status(204).send();
      }
    });
});

module.exports = recordRoutes;
