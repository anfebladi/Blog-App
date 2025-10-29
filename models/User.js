const mongoose = require("mongoose") // require mongoose
const { isEmail} = require("validator") // require validator
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({  //define how data should look like
    email: {
        type: String,
        required: [true, "please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail , "please try a valid email"]
    },
    password: {
        type: String,
        required: [true, "please enter a password"],
        minlength: [8, "minimum password length is 8 characters"]
    },
})

// hashing
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

//static method to login
// this = user
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email })
    if (user) {
       const auth = await bcrypt.compare(password , user.password)
       if (auth) {
          return user;
       }
       throw Error('incorrect password')
    }
    throw Error('incorrect email')
}



const User = mongoose.model("user", userSchema) // use userSchema for users collection

module.exports = User; //export User