const userModel = require('../models/userModel.js');

module.exports.register = async function register(req, res){
    let userData = req.body;
    if(userData)
    {
        let user = await userModel.create(userData);
        if(user)
        {
            res.json({
                message: "User has been registered",
                userInfo: user
            })
        }
        else{
            res.json({
                message: "Fill all the required details"
            })
        }
    }
    else{
        res.json({
            message: "Fill all the credentials first"
        })
    }
}