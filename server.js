var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');

var app = express();
var port = process.env.PORT || 3000;

//middlewares 
app.use(morgan('dev'));

//connect to db 
mongoose.connect('mongodb://localhost:27017/mean-app',function(err,data){
    if(err)
        console.log("Not connect to db");
    else
        console.log("connected to mongodb");    
});


app.listen(port,function(){
    console.log("running on the" + port);
}); 