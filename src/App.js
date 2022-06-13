import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AddTask from "./pages/Task/AddTask";
import AllTasks from "./pages/Task/AllTasks";
import EditTask from "./pages/Task/EditTask";
import Profile from "./pages/Profile/Profile";
import UpdateProfile from "./pages/Profile/UpdateProfile"
import "bootstrap/dist/css/bootstrap.css";
import {useSelector} from 'react-redux'
import { BrowserRouter, Routes, Route,} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
function App() {
  const isLogged=useSelector(state=>state.isLogged)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="all-tasks" exact element={<AllTasks />} />
        <Route path="add-task" exact element={<AddTask />} />
        <Route path="/edit-task" exact element={<EditTask />} />
        <Route exact path="/profile"  element={<Profile />} />
        <Route exact path="/update-profile" element={<UpdateProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
