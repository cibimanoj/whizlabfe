import React from "react";
import "./home.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Home = () => {
  return (
    <Container>
      <div className="homepage">
        <div className="logo">
            <img
              src="https://ccrs.pmi.org/image/providerlogo/1000001636"
              alt="logo"
              className="img"
            />
        </div>
        <div className="homeContent">
          <Container fluid>
            <Row>
              <Col>
                <h1 className="title">
                  Task <span className="span">Manager</span> App
                </h1>
                <p>
                  Collaborate, manage projects, and reach new productivity
                  peaks. From high rises to the home office, the way your team
                  works is unique accomplish it all with using this app.
                  Powering a productive team means using a powerful tool (and
                  plenty of snacks). From meetings and projects to events and
                  goal setting, Trello’s intuitive features give any team the
                  ability to quickly set up and customize workflows for just
                  about anything.
                </p>
                <Link to="/login">
                  <Button variant="outline-warning">Login</Button>{" "}
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </Container>
  );
};

export default Home;
