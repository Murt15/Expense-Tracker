const express=require('express');

const userController=require('../Controller/user')

const router=express.Router();

router.post('/signup',userController.postAddUser)

router.post('/login',userController.postLoginUser)

router.get('/forgotpassword',userController.getForgotPassword);

module.exports=router;