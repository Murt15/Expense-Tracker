const express=require('express');

const userController=require('../Controller/user')

const router=express.Router();

router.post('/user/signup',userController.postAddUser)

router.post('/user/login',userController.postLoginUser)

module.exports=router;