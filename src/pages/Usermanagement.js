import React from 'react';
import HRRContainer from '../components/usermanagement/HRRContainer';
import HRRHeader from '../components/usermanagement/HRRHeader';
import Techheader from '../components/usermanagement/Techheader';
import Techcontainer from '../components/usermanagement/Techcontainer';
import Usernav from '../components/usermanagement/Usernav';
import { Button, Input, Select, notification } from "antd";
import { useState, useEffect } from "react";
//////////////////////////////////////////////////////////////////////////////////
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import axios from "axios";
const Usermanagement = () => {
  const [loading, setLoading] = useState(false);
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [empIdError, setEmpIdError] = useState("");
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    ROLE: "",
    Empid: "",
    Username: "",
    Password: "",
    email: "",
  });

  const fetchData = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        "http://172.235.10.116:7000/hiring/auth/getAllUsers",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log('users', users)
      setUsers(response.data);

    } catch (error) {
      console.error("Failed to fetch users:", error.message);
    }
  };

  const fetchRoles=()=>{
    const token = localStorage.getItem("accessToken");
    console.log("Token", token);
    axios
      .get("http://172.235.10.116:7000/hiring/auth/getAllRoles", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setRoles(res.data);
      })
      .catch((err) => {
        console.log("Error in Lifecycle", err);
      });
  };

  useEffect(() => {
    fetchData();
    fetchRoles();
  }, []);

  const handleAddUser = () => {
    setLoading(true);
    const postData = {
      email: newUser.email,
      username: newUser.Username,
      password: newUser.Password,
      empId: newUser.Empid,
      roles: newUser.ROLE,
    };

    axios
      .post("http://172.235.10.116:7000/hiring/auth/register/", postData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log("User registration successful", response.data);
        // Additional logic if needed, e.g., updating the UI
        setLoading(false);
        notification.success({
          message: "User registration Successful",
          description: "You have successfully logged in.",
        });
        handleCloseAddUserModal();
        fetchData();
        setNewUser({
          ROLE: "",
          email: "",
          Empid: "",
          Username: "",
          Password: "",
        });
      })

      .catch((error) => {
        console.error("Error in user registration", error);
        setLoading(false);

        if (error.response) {
          const errorData = error.response.data;

          // Check for specific error messages and update state variables
          setEmailError(errorData.email ? errorData.email[0] : "");
          setUsernameError(errorData.username ? errorData.username[0] : "");
          setEmpIdError(errorData.empId ? errorData.empId[0] : "");
          setRoleError(errorData.roles ? errorData.roles[0] : "");
          setPasswordError(errorData.password ? errorData.password[0] : "");
        }

        notification.error({
          message: "User registration failed",
          description: "Please check the form for errors.",
        });
      });
  };

  const handleRoleChange = (value) => {
    setNewUser((prevUser) => ({ ...prevUser, ROLE: value }));
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, email: value }));
  };

  const handleEmpidChange = (e) => {
    const { value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, Empid: value }));
  };

  const handleUsernameChange = (e) => {
    const { value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, Username: value }));
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, Password: value }));
  };

  const handleAddUserClick = () => {
    setAddUserModalOpen(true);
  };
  const handleCloseAddUserModal = () => {
    setAddUserModalOpen(false);
  };
  return (

    <div>
      <Usernav />
      <div className="header">
        <h2>HR Recruiter</h2>
        <span onClick={handleAddUserClick} style={{display:'flex'}}>
          <PersonAddAlt1Icon style={{ marginRight: "5px" }} />
        
        </span>
        {isAddUserModalOpen && (
          <>
            <div
              className="modal-backdrop"
              onClick={handleCloseAddUserModal}
            ></div>
            <div className="add-user-modal">
              <Select
                style={{ width: "91%", height: "100%" }}
                name="ROLE"
                value={newUser.ROLE}
                onChange={handleRoleChange}
                placeholder="Select the role"
              >
                <option value="" disabled>
                  Select a role
                </option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </Select>
              {roleError && (
                <p
                  style={{ color: "red", marginTop: 0 }}
                  className="error-message"
                >
                  {roleError}
                </p>
              )}
              <Input
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleEmailChange}
                placeholder="Enter the Email"
              />
              {emailError && (
                <p
                  style={{ color: "red", marginTop: 0 }}
                  className="error-message"
                >
                  {emailError}
                </p>
              )}
              <Input
                type="text"
                name="Empid"
                value={newUser.Empid}
                onChange={handleEmpidChange}
                placeholder="Enter the Empid"
              />
              {empIdError && (
                <p
                  style={{ color: "red", marginTop: 0 }}
                  className="error-message"
                >
                  {empIdError}
                </p>
              )}
              <Input
                type="text"
                name="Username"
                value={newUser.Username}
                onChange={handleUsernameChange}
                placeholder="Enter the Username"
              />
              {usernameError && (
                <p
                  style={{ color: "red", marginTop: 0 }}
                  className="error-message"
                >
                  {usernameError}
                </p>
              )}
              <Input
                type="text"
                name="Password"
                value={newUser.Password}
                onChange={handlePasswordChange}
                placeholder="Enter the password"
              />
              {passwordError && (
                <p
                  style={{ color: "red", marginTop: 0 }}
                  className="error-message"
                >
                  {passwordError}
                </p>
              )}

              <div className="button-container">
                <Button loading={loading} type="submit" onClick={handleAddUser}>
                  Add User
                </Button>
                <Button type="submit" onClick={handleCloseAddUserModal}>
                  Cancel
                </Button>
              </div>
            </div>
          </>
        )}

      </div>
      <HRRContainer users1={users} fetchData={fetchData} />
      {/* <Techheader /> */}
      <Techcontainer users={users} fetchData={fetchData}/>

    </div>
  );
};

export default Usermanagement;