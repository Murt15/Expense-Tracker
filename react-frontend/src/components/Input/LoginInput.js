import "./SignUpInput.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const LoginInput = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const loginObj = {
      emailid: email,
      password: password,
    };
    try {
      let res = await axios.post(`http://localhost:8000/user/login`, loginObj);
      // console.log(res)
      if (res.data.success == true) {
        window.localStorage.setItem("token", res.data.token);
        navigate("/home");
      } else if (res.data.password == "incorrect") {
        // window.alert("Password is Incorrect")
      } else {
        // window.alert("User Not Registered")
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form-div">
      <form className="login-form" onSubmit={formSubmitHandler}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="form-input"
          placeholder="Email"
        ></input>
        <br />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-input"
          placeholder="Password"
        />
        <br />
        <Link to="/signup" className="form-link">
          Not Registered?Click here to Register
        </Link>
        <button type="submit" className="form-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginInput;
