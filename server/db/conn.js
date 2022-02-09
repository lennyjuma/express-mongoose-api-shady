const { MongoClient } = require('mongodb');
const connectionString = "mongodb://localhost:27017/odhis"
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db('sample_airbnb');
      console.log('Successfully connected to MongoDB.');

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};


// const mongoose = require('mongoose')
// const { mongoose } = require('mongodb')

// module.exports = () => {
//   mongoose.connect("mongodb://localhost:27017/odhis", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   mongoose.connection.on('open', () => {
//     console.log('MongoDB : Connected successfully');
//   })
//   mongoose.connection.on('error', (err) => {
//     console.log(`MongoDB ERROR : ${err}`);
//   })
// }