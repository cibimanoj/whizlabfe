import React from "react";
import "./register.css";
import { useState } from "react";
import { NavLink, useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValue = {
  email: "",
  password: "",
  mobile: "",
  firstName: "",
  lastName: "",
  city: "",
  country: "",
};

const Register = () => {
  const [values, setValues] = useState(initialValue);
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(e);
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    const { email, mobile, password, firstName, lastName, city, country } =
      values;

    try {
      const res = await fetch("https://whizlabstask.herokuapp.com/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          mobile,
          password,
          firstName,
          lastName,
          city,
          country,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (res.status === 400 || !data) {
        toast.error("User Already Exists!", {
          position: "top-center",
        });
      } else {
        setValues({
          ...values,
          email: "",
          mobile: "",
          password: "",
          firstName: "",
          lastName: "",
          city: "",
          country: "",
        });
        toast.success("Register Successfull!", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log("front end error" + error.message);
    }
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 5000);
  };
  return (
    <section>
      <div className="sign_container">
        <div className="sign_header">
          <NavLink to="/home">
            <img
              src="https://ccrs.pmi.org/image/providerlogo/1000001636"
              alt="signupimg"
            />
          </NavLink>
        </div>
        <div className="sign_form">
          <form method="POST" onSubmit={onSubmit}>
            <h1>Create account</h1>
            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                values={values.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                values={values.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form_data">
              <label htmlFor="mobile">Mobile number</label>
              <input
                type="text"
                name="mobile"
                values={values.mobile}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form_data">
              <label htmlFor="name">First Name</label>
              <input
                type="text"
                name="firstName"
                values={values.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form_data">
              <label htmlFor="name">Last Name</label>
              <input
                type="text"
                name="lastName"
                values={values.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form_data">
              <label htmlFor="name">City</label>
              <input
                type="text"
                name="city"
                values={values.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form_data">
              <label htmlFor="name">Country</label>
              <input
                type="text"
                name="country"
                values={values.country}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="signin_btn">
              Register
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

            <div className="signin_info">
              <p>Already have an account?</p>
              <NavLink to="/login">
                <button className="linkbtn">Login</button>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
