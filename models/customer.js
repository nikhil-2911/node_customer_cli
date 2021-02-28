const mongoose = require("mongoose");

// Customer Schema
const customerSchema = mongoose.Schema({
    firstname : {
        type : String,
        require : true
    },
    lastname : {
        type : String,
        require : true
    },
    phone : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    }
});

// Define and export
module.exports = mongoose.model('Customer' , customerSchema);