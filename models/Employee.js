const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({

        username : {
            type : String,
            required: true,
            unique:true
        },
        email : {
            type : String,
            required: true,
            unique: true
        },
        phone : {
            type: Number,
        },
        status : {
            type : String,
        },
        gender : {
            type : String
        },
        profile : {
            type : String
        }

});

module.exports = mongoose.model('Employee', EmployeeSchema);
