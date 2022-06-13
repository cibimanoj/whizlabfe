import React from 'react'
import Header from "./Header"
import Carousel from 'react-bootstrap/Carousel';

const Dashboard = () => {
  return (
      <>
      <Header/>
      <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.imgur.com/Fr1AkwB.jpeg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p style={{fontSize: "25px",fontFamily: "Montserrat"}}>Login page</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.imgur.com/46N7O1m.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p style={{fontSize: "25px",marginBottom:"-10px",fontFamily: "Montserrat"}}>All Tasks Page</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.imgur.com/fu5axGM.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p style={{fontSize: "25px",fontFamily: "Montserrat"}}>
          User Profile Page
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

      </>
    
  )
}

export default Dashboard