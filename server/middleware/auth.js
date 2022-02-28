const { User } = require('../models/user');

let auth = (req,res,next) =>{
    //client 에서 쿠키 가져오기
    let token = req.cookies.x_auth;
    
    User.findByToken(token,(err,user)=>{ //토큰 찾는 메서드
        if(err) throw err; 
        if(!user) return res.json({
            isAuth : false,
            error : true
        });
        req.token = token;
        req.user = user;
        next();
    });
}


module.exports = { auth };