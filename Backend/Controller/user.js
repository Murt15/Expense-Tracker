const User=require('../Models/user');

const bcrypt = require('bcrypt');


const jwt=require('jsonwebtoken');

const saltRounds = 10;

function generateAccessToken(id){
    return jwt.sign({userId:id},'secretKey')
}


exports.postAddUser = async (req,res,next)=>{
    // console.log(req.body);
    const name=req.body.name;
    const emailId=req.body.emailid;
    const password=req.body.password;
    try {

        const find=await User.findAll({where:{emailId:emailId}})
        if(find.length==0){
            bcrypt.hash(password, saltRounds, async function(err, hash) {
                await User.create({ name:name,emailId:emailId,password:hash})
                res.json({alreadyexisting:false})
                console.log(err);
            });
        }else{
            res.json({alreadyexisting:true})
        }
      

        
        
    } catch (err) {
        console.log(err)
        
    }
    
}

exports.postLoginUser=async (req,res,next)=>{
    // console.log(req.body);
    const emailId=req.body.emailid;
    const password=req.body.password;

    try {
        
        let user= await User.findAll({where:{emailId:emailId} })

         //console.log(user.length)
         if(user.length!==0){
            let res2=await User.findAll({where:{password:password}})
            //console.log(res2.length)
            bcrypt.compare(password, user[0].password, function(err, result) {
                // result == true
                if(result==true){
                    res.json({success:true,token:generateAccessToken(user[0].id)})
                }else{
                    res.json({password:"incorrect"})
                }
            });
           
         }else{
            res.json({success:false});
         }
        
    } catch (err) {
        console.log(err);
    }
    

}