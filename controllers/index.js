const { Profile } = require('../models/index');
const Joi = require('joi');
const QRCode = require('qrcode');

//create and save a new profile
exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({message: 'Empty form!'})
    }

    const JoiSchema = Joi.object({
      
        firstName: Joi.string()
                  .min(5)
                  .max(30)
                  .required(),

        lastName: Joi.string()
                  .min(5)
                  .max(30)
                  .required()
    })

    const newProfile = JoiSchema.validate(req.body)

    if(newProfile.error)
    {  
    res.send(newProfile.error.details)
    }
    else {
        const profile = new Profile({
            newProfile
        })
    }
    //new profile
    profile.save(profile).then((data) => {
        const stringdata = JSON.stringify(data)
        QRCode.toString(stringdata,{type:'terminal'}, function (err, url) {
            if(err) return console.log("error occurred")
            res.send(url)
          })
        
        QRCode.toDataURL(stringdata, function (err, code) {
            if(err) return console.log("error occurred")
         
            // Printing the code
            console.log(code)
        })
    }).catch(err => {
        res.status(500).send({message: err.message})
    })
}

//retrieve and return all profiles and single profile
exports.find = (req, res)=> {
    if(!req.body) {
        res.status(400).send({message: 'Profile to update cannot be empty!'})
    }

    const id = req.params.id;
    Profile.findByIdAndUpdate(id, req.body, {userFindAndModify:false})
    .then(data => {
        if(!data) {
            res.status(404).send({ message: `Profile with id ${id} cannot be updated`})
        }
        else {
            res.send(data);
        }
    }).catch(err => res.status(500).send({message: 'Error updating profile'}))

}

//update an existing profile
exports.update = (req, res)=> {

}

//delete an existing profile
exports.delete = (req, res)=> {

}