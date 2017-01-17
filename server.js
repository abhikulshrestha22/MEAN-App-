var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser'); 
var User = require('./app/models/user');

var app = express();
var port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//middlewares 
app.use(morgan('dev'));

//connect to db 
mongoose.connect('mongodb://localhost:27017/mean-app',function(err,data){
    if(err)
        console.log("Not connect to db");
    else
        console.log("connected to mongodb");    
});

app.post('/users',function(req,res){
    // var user = new User();
    // user.username = req.body.username;
    // user.password= req.body.password;
    // user.email = req.body.email;

    var user = new User();
        user.username= req.body.username,
        user.password= req.body.password,
        user.email= req.body.email
        
    if(req.body.username==null || req.body.username=='' ||req.body.password==null ||req.body.password==''||req.body.email==null ||req.body.email=='' ){
        res.send('Ensure username,email and password were provided.')
    }
    else{
        user.save(function(err){
            if(err){
                res.send('Username or email already exists');
            }
            else{
                res.send("user created" + JSON.stringify(user,null,4));
            }
        });
    }
     
});


app.listen(port,function(){
    console.log("running on the" + port);
}); 