import React from "react";
import Header from "../Dashboard/Header";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state);

  const [task, setTask] = useState({
    taskName: "",
    taskDescription: "",
    assignedTo: "",
    startDate: "",
    endDate: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    const {
      taskName,
      taskDescription,
      assignedTo,
      startDate,
      dueDate,
      endDate,
    } = task;

    try {
      const res = await fetch("https://whizlabstask.herokuapp.com/task/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
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
        console.log("All fields are Required");
      } else {
        setTask({
          ...task,
          taskName: "",
          taskDescription: "",
          assignedTo: "",
          startDate: "",
          dueDate: "",
          endDate: "",
        });
        toast.success("Task Added successfully", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
    setTimeout(() => {
      navigate("/all-tasks", { replace: true });
    }, 5000);
  };
  return (
    <>
      <Header />
      <Container>
        <Form onSubmit={onSubmit}>
           <h2 className="text-center">Add Task</h2>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="text"
              name="taskName"
              value={task.taskName}
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
              value={task.taskDescription}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Assigned To</Form.Label>
            <Form.Control
              type="text"
              name="assignedTo"
              value={task.assignedTo}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="text"
              name="startDate"
              value={task.startDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="text"
              name="endDate"
              value={task.endDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="text"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="outline-success" className="float-end" type="submit">
            Add Task
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
};

export default AddTask;
