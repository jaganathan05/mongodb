
const mongodb = require('mongodb');

const getdb = require('../util/database').getdb;
class Product{
    constructor (title,price,imageUrl,description,id,userId){
      this.title=title;
      this.price=price;
      this.imageUrl=imageUrl;
      this.description=description;
      this._id = id ? new mongodb.ObjectId(id) : null;
      this.userId=userId;

    }
    save(){
        const db = getdb();
        let dbob ;

        if(this._id){
  
          dbob=db.collection('products').updateOne({_id: this._id},{$set: this})

        }
        else{
    
          dbob = db.collection('products').insertOne(this)
        }
        return dbob 
        .then(result=>{
          console.log(result)
        }).catch(err=>{
          console.log(err)
        })
    }

    static fetchAll(){
      const db = getdb();
      return db.collection('products').find().toArray().then(result=>{
        //console.log(result)
        return result
      }).catch(err=>{
        console.log(err)
      });
    }

    static findById(prodId) {
      const db = getdb();
      return db.collection('products')
        .find({ _id: new mongodb.ObjectId(prodId) })
        .next()
        .then(result => {
          console.log(result);
          return result;
        })
        .catch(err => {
          console.log(err);
          throw err;
        });
    }

    static deleteById(prodId){
      const db = getdb();
    return db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId)})
    .then(result => {
      console.log(result);
      return result;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
    }
}



module.exports = Product;
