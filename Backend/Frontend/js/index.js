const token=localStorage.getItem('token');

const url="http://localhost:8000";

window.addEventListener('DOMContentLoaded', () => {
    
    //console.log(token);
    axios.get(`${url}/expense`,{headers:{'Authorization':token}})
        .then((response) => {
            console.log(response);
            for (var i = 0; i < response.data.val.length; i++) {
                
                showNewReponseOnScreen(response.data.val[i]);
                
            }
            if(response.data.isPremium==true){
                
                document.getElementById("razorpay-btn").style.display='none';
            }else{
                
                button();
            }
        })
        .catch((err) => console.log(err));
})


async function saveToBackend(event) {
    event.preventDefault();
    //const token=localStorage.getItem('token');
    //console.log(token)
    const amount = event.target.expenseamt.value;
    const description = event.target.description.value;
    const category = event.target.category.value;

    const obj = {
        amount: amount,
        description: description,
        category: category
    }

    try {
        let response = await axios.post(`${url}/expense/add-expense`, obj,{headers:{'Authorization':token}});
        //console.log(response)
        showNewReponseOnScreen(response.data);

    } catch (error) {
        console.log(error)
    }
}

function showNewReponseOnScreen(response) {
    document.getElementById('amt').value = '';
    document.getElementById('des').value = '';
    document.getElementById("cat").value = " ";

    const parentNode = document.getElementById("allExpenses");

    const childHTML = `<li id=${response.id} class="list">${response.expenseAmount}--${response.description}--${response.category}
                    <button onClick=deleteUser("${response.id}") class="bttd">Delete</button>
                    <button onClick=editUser("${response.id}","${response.expenseAmount}","${response.description}","${response.category}") class="btte">Edit</button>
                    </li>`


    parentNode.innerHTML = parentNode.innerHTML + childHTML;

}

function editUser(responseId) {

    const yurl = `${url}/expense/edit-expense/` + responseId;
    axios.get(yurl)
        .then((res) => {
            // console.log(res);
            document.getElementById('amt').value = res.data.expenseAmount;
            document.getElementById('des').value = res.data.description;
            document.getElementById("cat").value = res.data.category;
            deleteUser(responseId);
        }

        )
        .catch(err => console.log(err))

    // deleteUser(responseId);
}

async function deleteUser(responseId) {
    try {
        
        //console.log(responseId)

        const yurl = `${url}/expense/delete-expense/` + responseId;
        await axios.post(yurl);

        removeUserFromScreen(responseId);


    } catch (error) {
        console.log(error);
    }


}

function removeUserFromScreen(responseId) {

    const parentNode = document.getElementById("allExpenses");

    const childNodeToBeDeleted = document.getElementById(responseId);

    if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }

}

function button(){
    document.getElementById("dark-mode").style.display='none';
    document.getElementById("leader-board").style.display='none';
    document.getElementById("gen-report").style.display='none';
}
document.getElementById("razorpay-btn").onclick = async function (e) {
    const response  = await axios.get(`${url}/purchase/premiumMembership`, { headers: {"Authorization" : token} });
    //console.log(response);
    var options =
    {
     "key": response.data.key_id, 
     "name": "Test Company",
     "order_id": response.data.order.id, 
     "prefill": {
       "name": "Test User",
       "email": "test.user@example.com",
       "contact": "8108778886"
     },
     "theme": {
      "color": "#3399cc"
     },
   
     "handler": function (response) {
         console.log(response);
         axios.post('${url}/purchase/transactionstatus',{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, { headers: {"Authorization" : token} }).then(() => {
             alert('You are a Premium User Now')
         }).catch(() => {
             alert('Something went wrong. Try Again!!!')
         })
     },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response){
  alert(response.error.code);
  alert(response.error.description);
  alert(response.error.source);
  alert(response.error.step);
  alert(response.error.reason);
  alert(response.error.metadata.order_id);
  alert(response.error.metadata.payment_id);
 });
}


document.getElementById("logout").onclick= ()=>{
    window.location.href='../views/login.html'
    localStorage.removeItem('token');
}

document.getElementById("leader-board").onclick=()=>{
    window.location.href='../views/leaderboard.html'
}

document.getElementById("gen-report").onclick=()=>{
    window.location.href='../views/report.html'
}

document.getElementById("dark-mode").onclick=()=>{
    document.body.classList.toggle("dark");
}