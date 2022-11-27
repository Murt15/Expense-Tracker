window.addEventListener('DOMContentLoaded',()=>{
    getleaderboard();
})


async function getleaderboard(){
   let response=await axios.get("http://localhost:8000/purchase/getLeaderboard")
   console.log(response);
}
