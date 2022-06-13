import React from "react";
import Header from "../Dashboard/Header";
import "./profile.css";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";


const Profile = () => {
  const [value, setProfile] = useState([])
  const state = useSelector((state) => state);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await fetch("https://whizlabstask.herokuapp.com/user/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.token}`,
          },
        });
        const data = await res.json();
        console.log(data.user, "checking the user");
      
        setProfile(data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, []);

  return (
    <>
       <Header />
       {  console.log(value,'value')}
      {value.map((user) =>  {
        return(
        <div class="page-content page-container" id="page-content">
          <div class="padding">
            <div class="row container d-flex justify-content-center">
              <div class="col-xl-6 col-md-12">
                <div class="card user-card-full">
                  <div class="row m-l-0 m-r-0">
                    <div class="col-sm-4 bg-c-lite-green user-profile">
                      <div class="card-block text-center text-white">
                        <div class="m-b-25">
                          <img
                            src="https://img.icons8.com/bubbles/100/000000/user.png"
                            class="img-radius"
                            alt="User-Profile-Image"
                          />
                        </div>
                        <h6 class="f-w-600">{user.firstName}</h6>
                        <p>Web Designer</p>
                        <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                      </div>
                    </div>
                    <div class="col-sm-8">
                      <div class="card-block">
                        <h6 class="m-b-20 p-b-5 b-b-default f-w-600">
                          Personal Info
                        </h6>
                        <div class="row">
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Email</p>
                            <h6 class="text-muted f-w-400">
                              {user.email}
                            </h6>
                          </div>
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Phone</p>
                            <h6 class="text-muted f-w-400">{user.mobile}</h6>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Frist name</p>
                            <h6 class="text-muted f-w-400">{user.firstName}</h6>
                          </div>
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Last Name</p>
                            <h6 class="text-muted f-w-400">{user.lastName}</h6>
                          </div>
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">City</p>
                            <h6 class="text-muted f-w-400">{user.city}</h6>
                          </div>
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Country</p>
                            <h6 class="text-muted f-w-400">{user.country}</h6>
                          </div>
                          <NavLink to ="/update-profile" state={{ ...value[0], token: state.token }}>
                          <Button
                            variant="outline-success" className="float-end" 
                      >Update Profile</Button>
                          </NavLink>
                        
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>)
})}
    </>
  );
};

export default Profile;
