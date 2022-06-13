import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsList } from "react-icons/bs";
import {LinkContainer} from "react-router-bootstrap"
import {useDispatch} from 'react-redux'
import { actions } from '../../stores';
import {useNavigate} from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logOut = ()=>{
    dispatch(actions.logout())
    toast.success("Logged out Successfully !", {
      position: "top-center"
  });
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 2000);
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <LinkContainer to ="/dashboard">
        <Navbar.Brand ><img src =" https://ccrs.pmi.org/image/providerlogo/1000001636" alt ="logo" style={{width: "200px",height: "40px"}}/></Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="navbarScroll">
            <BsList/>
            </Navbar.Toggle >
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <LinkContainer to ="/all-tasks">
            <Nav.Link style={{ fontWeight: 'bold', color:"black"}}>View Task</Nav.Link>
            </LinkContainer>
           <LinkContainer to ="/add-task">
           <Nav.Link  style={{ fontWeight: 'bold', color:"black"}}>Add Task</Nav.Link>
           </LinkContainer>
           <LinkContainer to ="/profile">
           <Nav.Link  style={{ fontWeight: 'bold', color:"black"}}>Profile</Nav.Link>
           </LinkContainer>
          </Nav>
            <Button variant="outline-success" onClick={logOut}>Logout</Button>
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header