const token=localStorage.getItem('token');

window.addEventListener('DOMContentLoaded', () => {
    
    //console.log(token);
    axios.get("http://localhost:8000/expense",{headers:{'Authorization':token}})
        .then((response) => {
            for (var i = 0; i < response.data.length; i++) {
                showNewReponseOnScreen(response.data[i])
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
        let response = await axios.post("http://localhost:8000/expense/add-expense", obj,{headers:{'Authorization':token}});
        console.log(response)
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

    const url = 'http://localhost:8000/expense/edit-expense/' + responseId;
    axios.get(url)
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
        const url = 'http://localhost:8000/expense/delete-expense/' + responseId;
        await axios.post(url);
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

