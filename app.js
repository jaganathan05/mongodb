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

// app.use((req, res, next) => {
//   User.findById("65a9fb3f384f725dac5132ca")
//     .then(user => {
//       console.log(user)
//       req.user = new User(user.name , user.email , user.cart , user._id);
//       next();
//     })
//     .catch(err => console.log(err));
// });

 app.use('/admin', adminRoutes);
 app.use(shopRoutes);

app.use(errorController.get404);
require('dotenv').config();


mongoose.connect(process.env.mongo_db_connection).then(res=>{
  app.listen(3000)
  console.log('connected')
}).catch(err=>{
  console.log(err)
})
