const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = (req, res, next) =>{
    const token = req.cookies.jwt

    if(!token) res.redirect('/login');

    jwt.verify(token, 'SecreteKey', (err, decoded)=>{
        if (err) {
            // console.log(err.message);
            res.redirect('/login');
    }
    // console.log(decoded);
    next();
})
};


//check current User

const checkUser  = (req,res,next)=>{
    const token = req.cookies.jwt;

    if(!token) {
        res.locals.user = null;
        next();
    }

    jwt.verify(token, 'SecreteKey', async (err, decoded)=>{
            if(err){
                res.locals.user = null;
                next();
            } else{
                let user = await User.findById(decoded.id);
                res.locals.user = user;
                next();
            }
        });
 
}

module.exports = { requireAuth,checkUser };



