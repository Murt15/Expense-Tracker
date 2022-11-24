const Expense=require('../Models/expense');



exports.getAddExpense=((req,res,next)=>{
    Expense.findAll()
    .then((val)=>{
        res.json(val);
    })
    .catch(err=>console.log(err))
})


exports.postAddExpense=((req,res,next)=>{
    console.log(req.body)
    const expenseAmount=req.body.amount;
    const description=req.body.description;
    const category=req.body.category;

    Expense.create({ expenseAmount:expenseAmount,description:description,category:category})
    .then((result) => {
        res.json(result.dataValues);
    })
    .catch((err) => {
        console.log(err)
    });
   
})

exports.postDeleteExpense=((req,res,next)=>{
    // console.log(req.params)
    const ExpenseId = req.params.userid;
    //console.log(ExpenseId);
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










