const getdb = require('../util/database').getdb;
const ObjectId = require('mongodb').ObjectId
class User {
  constructor(name,email){
    this.name=name;
    this.email=email
  }
  save(){
    const db = getdb();
    db.collection('users').insertOne(this)
    .then(res=>{
      console.log(res)
    })
    .catch(err=>{
      console.log(err);
    }
    )
  }
  static findById(userId){
    const db = getdb();
    return db.collection('users').findOne({_id: new ObjectId(userId)})
  }
}



module.exports = User;
