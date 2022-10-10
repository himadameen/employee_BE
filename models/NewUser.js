const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const NewUserSchema = mongoose.Schema({

    fullName : {
        type : String,
        required : true
    },
    email :  {
        type : String,
        required : true,
        unique : true
    },
    mobile : {
        type : Number,
    },
    address : {
        type : String,
    },
    password : {
        type : String,
        required : true,
    },
    re_password : {
        type : String,
        required : true,
    },
    tokens : [
        {
            token : {
                type :String,
                required : true
            }
        }
    ]
})



// hashing the passwords : [bcrypt JS]

NewUserSchema.pre('save', async function (next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.re_password = await bcrypt.hash(this.re_password, 12);
    }
    next();
});

// generating token ::

NewUserSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id : this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token : token });
        await this.save();
        return token;
    }
    catch(err){
        console.log(err);
    }
}


module.exports = mongoose.model('NewUser', NewUserSchema);


