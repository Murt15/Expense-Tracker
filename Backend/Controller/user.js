const User=require('../Models/user');

const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.postAddUser = async (req,res,next)=>{
    // console.log(req.body);
    const name=req.body.name;
    const emailId=req.body.emailid;
    const password=req.body.password;
    try {
        bcrypt.hash(password, saltRounds, async function(err, hash) {
            await User.create({ name:name,emailId:emailId,password:hash})
            res.json({alreadyexisting:false})
            console.log(err);
        });

        
        
    } catch (err) {
        console.log(err)
        res.json({alreadyexisting:true})
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
                    res.json({success:true})
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