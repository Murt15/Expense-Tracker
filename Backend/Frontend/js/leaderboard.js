const url="http://localhost:8000";
window.addEventListener('DOMContentLoaded',()=>{
    getleaderboard();
})


async function getleaderboard(){
   let response=await axios.get(`${url}/purchase/getLeaderboard`)
   for (var i=0;i<response.data.length;i++){
    showUser(response.data[i]);
   }
   //console.log(response);
}

function showUser(data){
    
    const parentNode=document.getElementById("user_list");
    const childHTML=`<ul class="user-heading-list">
                        <li class="user-heading-item">${data.name}</li>
                        
                        <button id="check-expenses" onClick=showExpense("${data.id}") class="expense">Check Expense</button>
                    </ul>`;

    parentNode.innerHTML=parentNode.innerHTML+childHTML;
}

async function showExpense (id){
    const obj={
        id:id
    }

    let response=await axios.post(`${url}/purchase/expense`,obj)
    console.log(response);
    const parentNode=document.getElementById("main-expense");
    parentNode.innerHTML='';
    for(let i=0;i<response.data.length;i++){
        const childHTML=`<div class="expense-list">
                            <li class="expense-item">${response.data[i].expenseAmount}</li>
                            <li class="expense-item">${response.data[i].description}</li>
                            <li class="expense-item">${response.data[i].category}</li>
                        </div>`
        parentNode.innerHTML=parentNode.innerHTML+childHTML;
    }
    
   
    const open = document.getElementById("check-expenses");
    const close = document.getElementById("close");
    const container = document.getElementById("container");
    
    open.addEventListener("click", () => {
        container.classList.add("active");
    });
    
    close.addEventListener("click", () => {
        container.classList.remove("active");
    });
}
