const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
require('dotenv').config();
let _db;
const mongoConnect = callback => {
  MongoClient.connect(
    process.env.mongo_db_connection,
    { useUnifiedTopology: true }
  )
  
    .then(client => {
      console.log('Connected!');
      _db = client.db()
      callback();
    })
    .catch(err => {
      console.log(err);
    });
};

const getdb=()=>{
  if(_db){
    return _db
  }
  throw 'no database found'
}

module.exports = { mongoConnect, getdb};
