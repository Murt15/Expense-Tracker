const token=localStorage.getItem('token');
const url="http://localhost:8000";


window.addEventListener('DOMContentLoaded', ()=>{
    let page=1;
    getExpense(page);
})


async function getExpense(page){
    try {
        const response= await axios.get(`${url}/purchase/all-expense?page=${page}`,{headers:{'Authorization':token}});
        //console.log(response.data);
        var totalAmount=0;
        for (var i = 0; i < response.data.val.length; i++) {
            //console.log("1");
            //console.log(response.data[i].expenseAmount);
            totalAmount=totalAmount+response.data.val[i].expenseAmount;
            showExpense(response.data.val[i])
            
        }
        showPagination(response.data.currentPage,response.data.hasNextPage,response.data.hasPreviousPage,response.data.lastPage,response.data.nextPage,response.data.previousPage)
        showtotal(totalAmount);
       
    } catch (err) {
        console.log(err)
    }
}
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


function showPagination(currentPage,hasNextPage,hasPreviousPage,lastPage,nextPage,previousPage){
    pagination.innerHTML='';

    if(hasPreviousPage){
        const button2 = document.createElement('button');
        button2.classList.add('active');
        button2.innerHTML = previousPage;
        button2.addEventListener('click', ()=>getExpense(previousPage));
        pagination.appendChild(button2);

    }



    const button1 = document.createElement('button');
    button1.classList.add('active');
    button1.innerHTML = `<h3>${currentPage}<h3>`;
    
    button1.addEventListener('click', ()=>getExpense(currentPage))
    pagination.appendChild(button1);

    if(hasNextPage){
        const button3 = document.createElement('button');
        button3.classList.add('active');
        button3.innerHTML = nextPage;
        button3.addEventListener('click',()=>getExpense(nextPage))
        pagination.appendChild(button3);
    }
  
}
