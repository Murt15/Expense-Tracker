const Expense=require('../Models/expense');
const User=require('../Models/user');

const ITEMS_Per_Page=3;



exports.getAddExpense=((req,res,next)=>{
    const page=+req.query.page ||1;
    //console.log(req.user);
    var totalItems;
    req.user.countExpenses().
    then((num)=>{
        totalItems=num;
        return   req.user.getExpenses({
            offset: (page - 1) * ITEMS_Per_Page ,
            limit: ITEMS_Per_Page
        }) 
    })
    .then((val)=>{
        res.json({
            val:val,
            isPremium:req.user.isPremiumuser,
            currentPage: page,
            hasNextPage: totalItems > page * ITEMS_Per_Page,
            hasPreviousPage: page > 1,
            nextPage: +page + 1,
            previousPage: +page - 1,
            lastPage: Math.ceil(totalItems / ITEMS_Per_Page)
        });
    })
    .catch(err=>console.log(err))
})


exports.postAddExpense=((req,res,next)=>{
    //console.log(req.body)
    //const uid=req.user.id
    //console.log(uid);

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
        // console.log(result);
        res.json(result);
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










