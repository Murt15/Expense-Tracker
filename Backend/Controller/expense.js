const Expense=require('../Models/expense');
const User=require('../Models/user');




exports.getAddExpense=((req,res,next)=>{
    req.user.getExpenses() 
    .then((val)=>{
        res.json(val);
    })
    .catch(err=>console.log(err))
})


exports.postAddExpense=((req,res,next)=>{
    console.log(req.body)
    const uid=req.user.id
    console.log(uid);

    const expenseAmount=req.body.amount;
    const description=req.body.description;
    const category=req.body.category;
    //const uid=2;
    // User.findByPk(uid)
    // .then((user)=>{
    //    return 
    // })
    req.user.createExpense({ expenseAmount:expenseAmount,description:description,category:category})
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err)
    });
   
})

exports.postDeleteExpense=((req,res,next)=>{
    // console.log(req.params)
    const ExpenseId = req.params.userid;
    Expense.findByPk(ExpenseId)
    .then(val => {
      return val.destroy();
    })
    .then(result => {
      console.log('DESTROYED Expense');
      res.json();
    //   res.redirect('/Expense');
    })
    .catch(err => console.log(err));
})

exports.getEditExpense=((req,res,next)=>{
    const ExpenseId = req.params.userid;
    Expense.findByPk(ExpenseId)
    .then((val)=>{
        res.json(val)
    })
    .catch(err=>console.log(err))

})










