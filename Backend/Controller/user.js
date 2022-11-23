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