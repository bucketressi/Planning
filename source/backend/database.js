var mongoose = require('mongoose');

var database = {};
database.init = function(app, config){
	mongoose.connect(app, config);
}

function connect(app, config){
	
}