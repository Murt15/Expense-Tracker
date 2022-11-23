const express=require('express');

const userController=require('../Controller/user')

const router=express.Router();

router.post('/user/signup',userController.postAddUser)

module.exports=router;