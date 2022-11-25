const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const sequelize=require('./utils/database');

const app=express();

const User=require('./Models/user');

const Expenses=require('./Models/expense');



const userRoutes=require('./routes/user');
const expenseRoutes=require('./routes/expense')

//Relations
//One to Many
Expenses.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Expenses);

app.use(bodyParser.json({ extended: false }));
app.use(cors())
app.use('/expense',expenseRoutes);
app.use('/user',userRoutes);


sequelize
//.sync({force:true})
.sync()
.then((result) => {
    app.listen(8000);
}).catch((err) => {
    console.log(err)
});




app.use((req,res,next)=>{
    res.status(404).send('<h1>Page Not Found</h1>')
})