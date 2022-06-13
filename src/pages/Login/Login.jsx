import React from "react";
import "./login.css";
import { NavLink,useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useDispatch,useSelector} from 'react-redux'
import {actions} from '../../stores.js'



const Login = () => {
  const navigate = useNavigate()
  const dispatch= useDispatch();
  const state = useSelector((state) => state)
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
const loginData = (e)=>{
  const {name, value} = e.target;
  setLogin((data) => {
    return {
        ...data,
        [name]: value
    }
})
}
console.log(state)
const userLogin=async (e)=>{
  e.preventDefault();
  

  const { email, password } = login;
  // console.log(email);
  try {
      const res = await fetch("https://whizlabstask.herokuapp.com/user/login", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              
          },
          body: JSON.stringify({
              email, password
          })
      });


      const data = await res.json();
      console.log(data);
      const {token,user}=data

      if (res.status === 400 || !data) {
          console.log("Invalid Credentials");
          toast.error("Invalid Credentials", {
              position: "top-center"
          });
      } else {
          setLogin({ ...login, email: "", password: "" })
          console.log('user',user)
          dispatch(actions.login({token,user}))
          toast.success("Logged Successfully !", {
              position: "top-center"
          });
      }
  } catch (error) {
      console.log( error.message);
  }
  setTimeout(() => {
    navigate("/dashboard", { replace: true });
  }, 3000);

}
  return (
    <section>
      <div className="sign_container">
        <div className="sign_header">
          <img
            src="https://ccrs.pmi.org/image/providerlogo/1000001636"
            alt="signupimg"
          />
        </div>
        <div className="sign_form">
          <form method="POST" onSubmit={userLogin}>
            <h1>LOGIN</h1>
            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" onChange={loginData} value ={login.email}   required/>
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password"  onChange={loginData} value ={login.password}   required/> 
            </div>
            <button type="submit" className="signin_btn" >
              Login
            </button>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </form>
        </div>

        <div className="create_accountinfo">
          <p>Not Registered Yet?</p>
          <button className="linkbtn">
            {" "}
            <NavLink to="/register">Register Now</NavLink>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
