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
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.imgur.com/46N7O1m.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.imgur.com/fu5axGM.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>

      </>
    
  )
}

export default Dashboard