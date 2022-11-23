const express=require('express');

const expenseController=require('../Controller/expense')

const router=express.Router();

router.get('/user',expenseController.getAddExpense)

router.post('/user/add-expense',expenseController.postAddExpense)

router.post('/user/delete-expense/:userid',expenseController.postDeleteExpense)

router.get('/user/edit-expense/:userid',expenseController.getEditExpense)


module.exports=router;

// router.post('/user/delete-user/:userid',expenseController.postDeleteUser)









