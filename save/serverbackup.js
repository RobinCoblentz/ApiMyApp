
//OLD CODE 

const express = require('express');
const bodyParser = require('body-parser');
const cors = require ('cors')
const app = express();
const router = express.Router();
const jwt = require('jsonwebtoken');

//const AuthServer = require('./AuthServer');

//MangoDB
const mongoose = require ('mongoose');
const User = require('./Schema/UserSchema');

//jwt 
require ('dotenv').config()



//app.use(express.json())

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(bodyParser.json())
app.listen(4000, () => 
{console.log('server running on 4000')})



//db connection 
const db = "mongodb+srv://admin:formation123@isitestdb.s6tbx.mongodb.net/IsitestDB?retryWrites=true&w=majority";
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true}).then(() => console.log("Connection mongoDB OK (IsitestDB)")).catch(err => console.log(err))

//route

//add
app.use('/user', router)

router.route('/addadmin').post ((req,res) => {
    let user = new User({email:"admin@admin.com", password:"P@ssw0rd", chrono: 900 , note:0, end:false, admin:true  })
    user.save()
    .then(() => console.log(user.email + ' ajouter avec succes en tant que admin'))
    .catch(err => console.log(err))
})

router.route('/adduser').post((req,res) => {
    let user = new User(req.body)
    user.save()
    .then(() => {
    res.status(200).json(user.email + ' à était ajouter avec succes en tant que élève')
    })
    .catch(err => {
        res.status(400).json(err)
        console.log(err)
    })
})


//put

router.put('/:id/update',async function(req,res) //update
{   
    mongoose.set('useFindAndModify', false);
    const filter = { _id: req.params.id}
    let user = await User.findByIdAndUpdate(filter ,{email:"test@test.fr*"}, {new :true})
    res.send(user)
})



//get
router.get('/',async function(req,res)
{
    const user =await User.find({})
    res.send(user)
})

//verifmail
router.get('/:email/verify',async function(req,res)
{
    const filter = { email: req.params.email}
    let user = await User.findOne(filter ,{email: req.params.email}, {new :true})
    console.log(user)
    res.send(user ? true : false)
})

   
//connexion
router.get('/connectres', authentificateToken, async function(req,res){
    /*
    const filter = { email: mail, password : pass}
    let user = await User.findOne(filter ,{email: mail, password:pass}, {new :true}) 
    res.send(user ? true : false)
    //mail,pass =""
    */
    
})

//removeall
router.delete('/dlall',async function(req,res) //delet
{   
    User.deleteOne({}).exec();
})


function authentificateToken(req, res, nex) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        nex()
    } )
}

