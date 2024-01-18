const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://jaganathanv888:Jack%40888@cluster0.7zpv1uv.mongodb.net/?retryWrites=true&w=majority',
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
