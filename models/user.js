const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    name:{
        required: true,
        type: String,
        maxlength:50,
        minlength: 3,
    },
    email: {
        required:true,
        type: String,
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Invalid email or password'],
    },
    password: {
        type: String,
        required:[true, "Please enter a valid password"],
        minlength: [6, 'Minimum password length is 6 characters']
    },
});

userSchema.pre('save', async function(next){
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//static method to login user
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});

    if (user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

const User = mongoose.model('user', userSchema);

module.exports = User;