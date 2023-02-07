import "./SignUpInput.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const SignUpInput = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function formSubmitHandler(e) {
    e.preventDefault();
    const signupObj = {
      name: name,
      emailid: email,
      password: password,
    };
    try {
      let res = await axios.post(
        `http://localhost:8000/user/signup`,
        signupObj
      );
      if (res.data.alreadyexisting == true) {
        //console.log(res.data)
        // window.alert("User Already Registered");
      } else {
        // window.alert("User Registered")
      }
      //navigate to login page
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="form-div" onSubmit={formSubmitHandler}>
      <form className="login-form">
        <input
          type="name"
          className="form-input"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="email"
          value={email}
          className="form-input"
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          value={password}
          type="password"
          className="form-input"
          placeholder="Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <Link to="/login" className="form-link">
          Already Registered?Click here to Login
        </Link>
        <button type="submit" className="form-button">
          Login
        </button>
      </form>
    </div>
  );
};
export default SignUpInput;
