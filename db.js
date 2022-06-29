const mongoose = require('mongoose');

module.exports = function(){
	
    mongoose.connect('mongodb+srv://blakcice:password4321@cluster1.ag15qku.mongodb.net/auth', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
.then(()=>console.log('connected to database'))
.catch(err=>console.log('Failed to connect to database...', err));
}


