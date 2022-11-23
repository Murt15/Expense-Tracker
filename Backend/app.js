const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const sequelize=require('./utils/database');

const app=express();

const userRoutes=require('./routes/expense')


app.use(bodyParser.json({ extended: false }));
app.use(cors())

app.use(userRoutes);


sequelize.sync().then((result) => {
    app.listen(8000);
}).catch((err) => {
    console.log(err)
});




app.use((req,res,next)=>{
    res.status(404).send('<h1>Page Not Found</h1>')
})