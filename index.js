const express = require('express');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');

//init app 
const app = express();

//fetch data from the reuqest    
app.use(express.urlencoded({extended:false})); 

// Print the QR code to terminal & Converting the data into base64
app.post('/', async (req,res) => {
    const stringdata = JSON.stringify(req.body)
    QRCode.toString(stringdata,{type:'terminal'}, function (err, url) {
        if(err) return console.log("error occurred")
        console.log(url)
      })
    
    QRCode.toDataURL(stringdata, function (err, code) {
        if(err) return console.log("error occurred")
     
        // Printing the code
        console.log(code)
    })
})

//assign port  
var port  = process.env.PORT || 3000;    
app.listen(port,()=>console.log('server run at '+port)); 