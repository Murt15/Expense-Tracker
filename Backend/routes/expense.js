const express=require('express');

const userController=require('../Controller/user')

const router=express.Router();

router.get('/user',userController.getAddExpense)

router.post('/user/add-expense',userController.postAddExpense)

router.post('/user/delete-expense/:userid',userController.postDeleteExpense)

router.get('/user/edit-expense/:userid',userController.getEditExpense)


module.exports=router;

// router.post('/user/delete-user/:userid',userController.postDeleteUser)









