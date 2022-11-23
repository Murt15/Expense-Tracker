async function  login(event){
   
    const name=event.target.name.value
    const emailid=event.target.emailid.value
    const password=event.target.password.value

    const obj={
        name:name,emailid:emailid,password:password
    }
    try {
        let details=await axios.post("http://localhost:8000/user/login",obj);
    } catch (err) {
        console.log(err)
    }
}