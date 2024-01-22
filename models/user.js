const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    cart:{
        items:[{productId:{
            type:Schema.Types.ObjectId,
            ref:'Product'
        },quantity:{
            type:Number,
            require:true
        }}]
    }
})

module.exports = mongoose.model('User',userSchema);

// const getdb = require('../util/database').getdb;
// const ObjectId = require('mongodb').ObjectId
// class User {
//   constructor(name,email,cart,id){
//     this.name=name;
//     this.email=email
//     this.cart=cart
//     this._id=id
//   }
//   save(){
//     const db = getdb();
//     db.collection('users').insertOne(this)
//     .then(res=>{
//       console.log(res)
//     })
//     .catch(err=>{
//       console.log(err);
//     }
//     )
//   }
//   getCart(){
//     const db = getdb()
//     const productIds = this.cart.items.map(i=>{
//       return i.productId;
//     })
//     return db.collection('products').find({_id: {$in: productIds}}).toArray().then(products=>{
//       return products.map(p=>{
//         return { ...p,quantity:this.cart.items.find(i=>{
//           return (i.productId.toString()=== p._id.toString())
//         }).quantity}
//       })
//     })
//   }
//   addToCart(product){
//     const cartProductIndex = this.cart.items.findIndex(cp=>{
//       return cp.productId.toString() === product._id.toString();
//     })
//     let newQuentity = 1;
//     const updatedCartItems = [...this.cart.items];

//     if(cartProductIndex >=0 ){
//       newQuentity= this.cart.items[cartProductIndex].quantity + 1
//       updatedCartItems[cartProductIndex].quantity = newQuentity;
//     }
//     else{
//       updatedCartItems.push({productId: new ObjectId(product._id), quantity : newQuentity})
//     }
    
//     const updatedCart = { items:updatedCartItems}

//     const db=getdb();
//     return db.collection('users').updateOne({ _id: new ObjectId(this._id)},{$set:{cart: updatedCart}})
//   }

//   static findById(userId){
//     const db = getdb();
//     return db.collection('users').findOne({_id: new ObjectId(userId)})
//   }

//   deleteItemFromCart(productId){
//     const updatedCartItems = this.cart.items.filter(item=>{
//       return item.productId.toString() !== productId.toString()
//     });
//     const db=getdb();
//     return db.collection('users').updateOne({ _id: new ObjectId(this._id)},{$set:{cart: {items: updatedCartItems}}})
//   }
//   getOrder(){
//     const db = getdb();
//     return db.collection('orders').find({'user._id': new ObjectId(this._id)}).toArray()
//   }

//   addOrder(){
//     const db = getdb()
//     return this.getCart().then(products=>{
//       const order = {
//         items: products,
//         user: {
//           _id : new ObjectId(this._id),
//           name: this.name
//         }
//       }
//       return db.collection('orders').insertOne(order)
//     })
//     .then(result=>{
//       this.cart = { items:[]};

//       return db.collection('users').updateOne({ _id: new ObjectId(this._id)},{$set:{cart: {items: []}}})
//     })
//   }
// }



// module.exports = User;
