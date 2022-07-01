module.exports.getSignup = (req, res)=>{
    res.render('signup');
}

module.exports.getLogin = (req, res)=>{
    res.render('login');
}

module.exports.postSignup =  (req, res)=>{
    res.send('signup');
}

module.exports.postLogin =  (req, res)=>{
    res.send('login');
}