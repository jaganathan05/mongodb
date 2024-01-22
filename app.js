const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

 const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById("65adf1bc0865936282ef01c5")
    .then(user => {
      console.log(user)
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
}); 

 app.use('/admin', adminRoutes);
 app.use(shopRoutes);

app.use(errorController.get404);
require('dotenv').config();


mongoose.connect(process.env.mongo_db_connection).then(res=>{
  User.findOne().then(user=>{
    if(!user){
      const user = new User({
        name:"Jaganathan",
        email:"jaganathanv888@gmail.com",
        cart:{
          items:[]
        }
      })
      
      user.save()
    }
  })
  
  app.listen(3000)
  console.log('connected')
}).catch(err=>{
  console.log(err)
})
