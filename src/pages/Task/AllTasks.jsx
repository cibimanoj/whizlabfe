import Header from "../Dashboard/Header";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../stores.js";
import "./alltasks.css";

import {
  BsCalendar3,
  BsFillFilePersonFill,
  BsFillTrashFill,
  BsPencilSquare,
} from "react-icons/bs";

const AllTasks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    const fetchApi = async () => {
      // console.log(email);
      try {
        const res = await fetch("https://whizlabstask.herokuapp.com/task/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.token}`,
          },
        });
        const data = await res.json();
        console.log(data, "checking the data");
        dispatch(actions.viewTask(data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await fetch(`https://whizlabstask.herokuapp.com/task/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      dispatch(actions.deleteTask(id));
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      navigate("/all-tasks", { replace: true });
    }, 3000);
  };

  return (
    <>
      <Header />
      <Container>
        <Row xs={1} md={2} className="g-4">
          {state.task.map((task) => (
            <Col>
              <Card style={{ margin: "0.5rem" }}>
                <Card.Body>
                  <Card.Title>{task.taskName}</Card.Title>
                  <Card.Title className="float-end" style={{ display: "flex" }}>
                    <BsFillFilePersonFill
                      style={{ marginTop: "-28px", color: "#add8e6" ,cursor:"pointer"}}
                    />
                    <p
                      style={{
                        marginTop: "-25px",
                        color: "#808080",
                        fontSize: "14px",
                      }}
                    >
                      {task.assignedTo}
                    </p>
                  </Card.Title>

                  <Card.Text>{task.taskDescription}</Card.Text>
                  <Card.Title className="float-end" style={{ display: "flex" }}>
                    <label style={{ marginRight: "10px" }}>
                      <BsCalendar3
                        style={{ color: "#4293ff", marginLeft: "20px",cursor:"pointer" }}
                        title="Start Date"
                      />
                      <p style={{ fontSize: "12px", marginRight: "30px" }}>
                        {task.startDate}{" "}
                      
                      </p>
                    </label>
                    <label
                      style={{ marginRight: "10px", alignItems: "center" }}

                    >
                      <BsCalendar3
                        style={{ color: "#ff4254", marginLeft: "20px",cursor:"pointer" }}
                        title="End Date"
                      />
                      <p style={{ fontSize: "12px", marginRight: "30px" }}>
                        {task.endDate}
                      </p>
                    </label>
                    <label>
                      <BsCalendar3
                        style={{ color: "#ffbe42", marginLeft: "20px",cursor:"pointer" }}
                        title="Due Date"
                      />
                      <p style={{ fontSize: "12px", marginRight: "30px" }}>
                        {task.dueDate}{" "}
                      </p>
                    </label>
                  </Card.Title>
                  <NavLink
                    to="/edit-task"
                    state={{ ...task, token: state.token }}
                  >
                    <Button
                      style={{ marginRight: "1rem", marginTop: "1rem" }}
                      variant="outline-warning"
                    >
                      <BsPencilSquare />
                    </Button>
                  </NavLink>
                  <Button
                    style={{ marginRight: "1rem", marginTop: "1rem" }}
                    variant="outline-danger"
                    onClick={() => handleDelete(task._id)}
                  >
                    <BsFillTrashFill />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default AllTasks;
