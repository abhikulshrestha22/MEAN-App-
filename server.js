var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser'); 
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');

var app = express();
var port = process.env.PORT || 3000;


//middlewares 
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use('/api',appRoutes);

//connect to db 
mongoose.connect('mongodb://localhost:27017/mean-app',function(err,data){
    if(err)
        console.log("Not connect to db");
    else
        console.log("connected to mongodb");    
});

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'/public/app/views/index.html'));
});


app.listen(port,function(){
    console.log("running on the" + port);
}); 
