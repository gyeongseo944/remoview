const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/keys');

const { User } = require('./models/user');
const { auth } = require('./middleware/auth');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(config.mongoURI,
    {}).then(() => { console.log('DB CONNECTED') })
    .catch(err => { console.log('===DB error=== ::: ' + err) }
);


app.get('/api/user/auth',auth, (req, res) => {
   res.status(200).json({
       _id : req._id,
       isAuth : true,
       email : req.user.email,
       name : req.user.name,
       lastname : req.user.lastname,
       role : req.user.role
   });
});

app.post('/api/user/register', (req, res) => {
    const user = new User(req.body)

    user.save((err, userData) => {
        if (err) {
            console.log(err)
            return res.json({ success: false, err: "errored" })
        } else {
            return res.status(200).json({
                success:true
            });
        }
    });
});

app.post('/api/user/login', (req, res) => {
    //find email
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "Aute faild, email not found"
            });
        }
        //compare password 
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch){
                return res.json ({loginSuccess:false,message:"wrong password"})
            }
        })
        //generate token
        user.generateToken((err,user)=>{
            if(err) return res.status(400).send(err);
            console.log(user.token)
            res.cookie("x_auth",user.token)
                .status(200)
                .json({
                    loginSuccess:true,
                    message : "login successed!"
                });
        });
    });
});

app.get('/api/user/logout', auth, (req,res)=>{
    User.findOneAndUpdate({_id:req.user._id},{token:""},(err,doc)=>{
        if(err) return res.json({ success: false, err});
        return res.status(200).send({
            success:true
        })
    })
});

app.listen(5000);


