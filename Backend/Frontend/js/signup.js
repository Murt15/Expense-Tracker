async function  signup(event){
    event.preventDefault();
    const name=event.target.name.value
    const emailid=event.target.emailid.value
    const password=event.target.password.value

    const signupObj={
        name:name,emailid:emailid,password:password
    }
    try {
        let res=await axios.post("http://localhost:8000/user/signup",signupObj);
        if(res.data.alreadyexisting==true){
            window.alert("User Already Registered");
        }else{
            window.alert("User Registered")
        }
    } catch (err) {
        console.log(err)
    }
}

async function login(event){
    event.preventDefault();
    const emailid=event.target.emailid.value
    const password=event.target.password.value
    loginObj={
        emailid:emailid,
        password:password

    }

    try {
        let res=await axios.post("http://localhost:8000/user/login",loginObj);
        console.log(res.data)
        if (res.data.success==true){
            window.alert("User Logged In Successfully")
        }else if(res.data.password=="incorrect"){
            window.alert("Password is Incorrect")

        }else{
            window.alert("User Not Registered")
        } 
        
    } catch (err) {
        console.log(err)
    }
}