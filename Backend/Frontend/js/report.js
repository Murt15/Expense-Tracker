const token=localStorage.getItem('token');
const url="http://localhost:8000";


window.addEventListener('DOMContentLoaded', async ()=>{

    try {
        const response= await axios.get(`${url}/expense`,{headers:{'Authorization':token}});
        //console.log(response.data);
        var totalAmount=0;
        for (var i = 0; i < response.data.val.length; i++) {
            //console.log("1");
            //console.log(response.data[i].expenseAmount);
            totalAmount=totalAmount+response.data.val[i].expenseAmount;
            showExpense(response.data.val[i])
            
        }
        showtotal(totalAmount);
       
    } catch (err) {
        console.log(err)
    }
})

function showExpense(data){
    const arr=data.createdAt.split('T');
    // console.log(data.createdAt);
    // console.log(arr);
    const parentNode=document.getElementById("report");
    var childHTML=`<ul class="list-heading" id=${data.id}>
                        <li class="expense-item">${arr[0]}</li>
                        <li class="expense-item">${data.description}</li>
                        <li class="expense-item">${data.category}</li>
                        <li class="expense-item">${data.expenseAmount}</li>    
                    </ul>`;

    parentNode.innerHTML=parentNode.innerHTML+childHTML;

}

function showtotal(total){
    const parentNode=document.getElementById("report");
    var childHTML=`<h2>Total Expense : ${total}</h2>`;

    parentNode.innerHTML=parentNode.innerHTML+childHTML;
}