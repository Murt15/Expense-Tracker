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
            //console.log(res.data)
            window.alert("User Already Registered");
        }else{
            window.alert("User Registered")
        }
        window.location.href='../views/login.html'
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
        // console.log(res.data)
        if (res.data.success==true){
            window.localStorage.setItem('token',res.data.token)
            console.log(res.data.token)
            window.location.href='../views/index.html'
        }else if(res.data.password=="incorrect"){
            window.alert("Password is Incorrect")

        }else{
            window.alert("User Not Registered")
        } 
        
    } catch (err) {
        console.log(err)
    }
}

async function forgotpassword(event){
    let response=await axios.get("http://localhost:8000/user/forgotpassword")
}