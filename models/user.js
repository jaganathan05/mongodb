const getdb = require('../util/database').getdb;
const ObjectId = require('mongodb').ObjectId
class User {
  constructor(name,email,cart,id){
    this.name=name;
    this.email=email
    this.cart=cart
    this._id=id
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
  addToCart(product){
    const cartProductIndex = this.cart.items.findIndex(cp=>{
      return cp.productId.toString() === product._id.toString();
    })
    let newQuentity = 1;
    const updatedCartItems = [...this.cart.items];

    if(cartProductIndex >=0 ){
      newQuentity= this.cart.items[cartProductIndex].quantity + 1
      updatedCartItems[cartProductIndex].quantity = newQuentity;
    }
    else{
      updatedCartItems.push({productId: new ObjectId(product._id), quantity : newQuentity})
    }
    
    const updatedCart = { items:updatedCartItems}

    const db=getdb();
    return db.collection('users').updateOne({ _id: new ObjectId(this._id)},{$set:{cart: updatedCart}})
  }

  static findById(userId){
    const db = getdb();
    return db.collection('users').findOne({_id: new ObjectId(userId)})
  }
}



module.exports = User;
