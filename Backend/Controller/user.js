const User=require('../Models/user');

exports.postAddUser = async (req,res,next)=>{
    // console.log(req.body);
    const name=req.body.name;
    const emailId=req.body.emailid;
    const password=req.body.password;
    try {
        await User.create({ name:name,emailId:emailId,password:password})
        res.json({alreadyexisting:false})
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
        
        let res1= await User.findAll({where:{emailId:emailId} })

         //console.log(res1.length)
         if(res1.length!==0){
            let res2=await User.findAll({where:{password:password}})
            //console.log(res2.length)
            if(res2.length!==0){
                res.json({success:true})
            }else{
                res.json({password:"incorrect"})
            }
         }else{
            res.json({success:false});
         }
        
    } catch (err) {
        console.log(err);
    }
    

}