const User = require('../models/user');
const jwt = require('jsonwebtoken');

//handle errors
const handleErrors = (err) =>{
    let errors = {email: '', password:''};


    // incorrect email
   if (err.message === 'incorrect email'){
       errors.email = 'Email is not registered'
   }
    
   // incorrect password
   if (err.message === 'incorrect password'){
       errors.password = 'Password is incorrect'
   }

    //duplicate error code
    if(err.code === 11000){
        errors.email = 'This email is already registered'
        return errors;
    }
    //validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) =>{
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

const maxAge = 3*24*60*60; //time in seconds
const createToken = (id) => {
    return jwt.sign({id}, 'SecreteKey', {expiresIn: maxAge});
}


module.exports.getSignup = (req, res)=>{
    res.render('signup');
}

module.exports.getLogin = (req, res)=>{
    res.render('login');
}

module.exports.postSignup =  async (req, res)=>{
    try{
        const user = await User.create({
            name: req.body.name, 
            email: req.body.email, 
            password: req.body.password
        });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).send({user: user._id});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

module.exports.postLogin =  async (req, res)=>{
    try{
        const user = await User.login(req.body.email, req.body.password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).send({user: user._id});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }

}