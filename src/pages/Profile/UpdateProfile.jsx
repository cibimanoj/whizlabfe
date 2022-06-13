import React from "react";
import Header from "../Dashboard/Header";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer,toast } from "react-toastify";
import {useLocation ,useNavigate} from "react-router-dom";
import { useState } from "react";

const UpdateProfile = () => {
    const location = useLocation()
    console.log(location)
    const navigate = useNavigate()
    const state = location.state

    const [user,setUser] = useState({
        email: state.email,
        mobile:state.mobile,
        firstName: state.firstName,
        lastName: state.lastName,
        city: state.city,
        country: state.country,
        _id:state._id
    })
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };
      const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(e)

        const {
          email,
          mobile,
          firstName,
          lastName,
          city,
          country,
        } = user   
        try {
          const res = await fetch(`https://whizlabstask.herokuapp.com/user/`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${state.token}`,
            },
            body: JSON.stringify({
                email,
                mobile,
                firstName,
                lastName,
                city,
                country,
            }),
          });
    
          const data = await res.json();
          console.log(data);
          if (res.status === 400 || !data) {
            toast.warn("All fields are Required", {
              position: "top-center",
            });
          } else {
            setUser({
              ...user,
              email: "",
              mobile: "",
              firstName: "",
              lastName: "",
              city: "",
              country: "",
            });
            toast.success("Updated successfully", {
              position: "top-center",
            });
          }
        } catch (error) {
          console.log(error.message);
        }
        setTimeout(() => {
          navigate("/profile", { replace: true });
        }, 3000);
    }

  return (
    <>
      <Header />
      <Container>
        <Form onSubmit={handleSubmit} >
          <h2 className="text-center">Update Profile</h2>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="text"
              name="Mobile"
              value={user.mobile}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={user.city}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              name="country"
              value={user.country}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="outline-success" className="float-end" type="submit">
            Save changes
          </Button>
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
        </Form>
      </Container>
    </>
  );

}
export default UpdateProfile;
