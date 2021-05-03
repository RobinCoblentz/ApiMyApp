//imports
const bcrypt = require('bcrypt');
const User = require('../Schema/UserSchema');



//routes
module.exports = {
    //inscription
    verify:async function(req,res){
        console.log("verify")
        const filter = { phone: req.params.phone} 
        let user = await User.findOne(filter ,{phone: req.params.phone}, {new :true})
        res.send(user ? true : false)
    },

    register:async function(req,res){
        let user = req.body
        let userpass = (req.body.password)
        try{
            let hash = await bcrypt.hash(userpass, await bcrypt.genSalt())
            user.password = hash;
            var userhashed = new User(user)
            } catch (error) {
            console.log(error.message)    
            }
        userhashed.save()
        .then(() => {
        res.status(200).json()
        })
        .catch(err => {
            res.status(400).json(err)
            console.log(err)
        })
    },
    
    //connection
    login:async function(req,res){ 
        var pass = {pass : req.body.pass}
        var phone = {phone : req.body.phone}
        try {
        let user = await User.findOne(phone)
        let compare = await bcrypt.compare(Object.values(pass).toString(), user.password)
        res.send(compare ? true : false)
        console.log(compare ? true : false)
        }
        catch(error) {
            res.send(false)
        }
        
        
    },
    
    //update 
    gps:async function(req,res){ 
        
        var phone = {phone : req.body.phone}
        var lat = {lat : req.body.lat}
        var lng = {lng : req.body.lng}
        var isinjob = {isinjob : true}
        var lastsync = {lastsync : req.body.lastsync}
        const doc = await User.findOne(phone);
        await doc.updateOne(lastsync);
        await doc.updateOne(isinjob);
        if (lat !== null && lng !== null)
        {
        await doc.updateOne(lat);
        await doc.updateOne(lng);
        }
        console.log("save")
          res.send("stop")
    },

    //stopjob 
    stop:async function(req,res){ 
        var phone = {phone : req.body.phone}
        const doc = await User.findOne(phone);
        await doc.updateOne({isinjob: false});
        console.log("stopjob")
        res.send("stop")
        
    },
    

    //maintenances
    getall:async function(req,res){
        const user = await User.find({})
        res.send(user)
    },
    delall:async function(req,res){
        User.deleteMany().exec();
        console.log('database clear')
    },
}