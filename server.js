// Imports
const cors = require ('cors');
var express     = require('express');
var bodyParser  = require('body-parser');
var apiRouter   = require('./apiRouter').router;

var server = express();


server.use(bodyParser.urlencoded({extended: true}));
server.use(cors());
server.use(bodyParser.json());
server.use('/api', apiRouter);

//start server

server.listen(4000, () => 
{console.log('server running on 4000')});


//MangoDB
const mongoose = require ('mongoose');
const User = require('./Schema/UserSchema');

//db connection 
const db = "mongodb+srv://dbUser:M7DVKlbd2Ci00gwt@myapp.joow6.mongodb.net/Myapp?retryWrites=true&w=majority";
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true}).then(() => console.log("Connection mongoDB OK (Myapp)")).catch(err => console.log(err));
mongoose.set('useFindAndModify', false);
