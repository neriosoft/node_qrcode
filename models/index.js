const { Schema } = require('mongoose');

const profileSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    }

});

module.exports = mongoose.model(Profile, profileSchema);