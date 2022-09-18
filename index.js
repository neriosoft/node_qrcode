const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const helmet = require('helmet');


//configure mongoose
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/QRProfile",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);
//init app 
const app = express();

//middleware  
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({extended:false})); 
app.use(helmet())

//assign port  
var port  = process.env.PORT || 3000;    
app.listen(port,()=>console.log('server run at '+port)); 