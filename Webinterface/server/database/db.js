let dbconfig = require("./dbconfig.json");
let url =
  "mongodb://" +
  /*
    dbconfig.user +
  ":" +
  dbconfig.pwd +
  "@" +
  */
  dbconfig.url +
  ":" +
  dbconfig.port +
  "/" +
  dbconfig.dbname;

const mongoose = require("mongoose");

mongoose.connect(
    url,
    {
      reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      reconnectInterval: 500,
      useNewUrlParser: true
    },
    (err) => {
      if (err) {
        callback(err);
      } else {
        console.log('Connected to MongoDB');
      }
    }
  );


const db = mongoose.connection;

db.on("error", err => {
  console.log("Error when connecting to mongoose");
  console.log(err);
});

db.once("open", function() {
  console.log("Mongoose connected");
});

process.on("SIGINT", function() {
  mongoose.connection.close(function() {
    console.log('Closed by User');
    process.exit(0);
  });
});

module.exports = db;
