const User=require('../Models/user');



exports.getAddExpense=((req,res,next)=>{
    User.findAll()
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

    User.create({ expenseAmount:expenseAmount,description:description,category:category})
    .then((result) => {
        res.json(result.dataValues);
    })
    .catch((err) => {
        console.log(err)
    });
   
})

exports.postDeleteExpense=((req,res,next)=>{
    // console.log(req.params)
    const userId = req.params.userid;
    User.findByPk(userId)
    .then(val => {
      return val.destroy();
    })
    .then(result => {
      console.log('DESTROYED User');
      res.json();
    //   res.redirect('/user');
    })
    .catch(err => console.log(err));
})

exports.getEditExpense=((req,res,next)=>{
    const userId = req.params.userid;
    User.findByPk(userId)
    .then((val)=>{
        res.json(val)
    })
    .catch(err=>console.log(err))

})










