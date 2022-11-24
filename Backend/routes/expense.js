const express=require('express');

const expenseController=require('../Controller/expense')

const router=express.Router();

router.get('/',expenseController.getAddExpense)

router.post('/add-expense',expenseController.postAddExpense)

router.post('/delete-expense/:userid',expenseController.postDeleteExpense)

router.get('/edit-expense/:userid',expenseController.getEditExpense)


module.exports=router;

// router.post('/user/delete-user/:userid',expenseController.postDeleteUser)









