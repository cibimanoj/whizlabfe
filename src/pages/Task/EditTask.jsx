import React from "react";
import Header from "../Dashboard/Header";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer,toast} from "react-toastify";
import {useLocation ,useNavigate} from "react-router-dom";
import { useState } from "react";
import {useDispatch} from "react-redux"
import { actions } from "../../stores.js";



const EditTask = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const state =location.state
    const [value,setValue]=useState({
        taskName: state.taskName,
        taskDescription:state.taskDescription,
        assignedTo: state.assignedTo,
        startDate: state.startDate,
        endDate: state.endDate,
        dueDate:state.dueDate,
        _id:state._id
    })
    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
      };

    const handleSubmit = async (id,e)=>{
        e.preventDefault();
        console.log(e)

        const {
          taskName,
          taskDescription,
          assignedTo,
          startDate,
          dueDate,
          endDate,
        } = value    
        try {
          const res = await fetch(`https://whizlabstask.herokuapp.com/task/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${state.token}`,
            },
            body: JSON.stringify({
              taskName,
              taskDescription,
              assignedTo,
              startDate,
              dueDate,
              endDate,
            }),
          });
    
          const data = await res.json();
          console.log(data);
          if (res.status === 400 || !data) {
            toast.warn("All fields are Required", {
              position: "top-center",
            });
          } else {
            setValue({
              ...value,
              taskName: "",
              taskDescription: "",
              assignedTo: "",
              startDate: "",
              dueDate: "",
              endDate: "",
            });
            toast.success("Updated successfully", {
              position: "top-center",
            });
            dispatch(actions.updateTask(value));
          }
        } catch (error) {
          console.log(error.message);
        }
        setTimeout(() => {
          navigate("/all-tasks", { replace: true });
        }, 3000);


    }
   
  return (
    <>
    <Header />
    <Container>
      <Form onSubmit={(e)=>handleSubmit(state._id,e)} >
      <h2 className="text-center">Edit Task</h2>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Task Name</Form.Label>
          <Form.Control
            type="text"
            name="taskName"
            value={value.taskName}
            onChange={handleChange}
            required
      
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Task Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="taskDescription"
            value={value.taskDescription}
            onChange={handleChange}
            required
     
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Assigned To</Form.Label>
          <Form.Control
            type="text"
            name="assignedTo"
            value={value.assignedTo}
            onChange={handleChange}
            required
          
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="text"
            name="startDate"
            value={value.startDate}
            onChange={handleChange}
            required
         
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="text"
            name="endDate"
            value={value.endDate}
            onChange={handleChange}
            required
           
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="text"
            name="dueDate"
            value={value.dueDate}
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
  )
}

export default EditTask