// HRRContainer.jsx
import React, { useState, useEffect } from "react";
import { Modal, Button, Input} from "antd";
import "./hrrcontainer.css"; // Import the CSS file
import BarChartIcon from "@mui/icons-material/BarChart";
import axios from "axios";

const UserCard = ({ user, onClick, hrCount }) => {
  const getAvatarUrl = () => {
    return process.env.PUBLIC_URL + "/img/avtr2.jpg";
  };

  return (
    <div className="user-card-tech" onClick={() => onClick(user)}>
      <img className="avatar" src={getAvatarUrl()} alt="User Avatar" />
      <h3>{user.username}</h3>
      <p>{user.empId}</p>
      {/* <p>completed: {hrCount.completed}</p> */}
    </div>
  );
};

const Techcontainer = ({ users, fetchData }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [hrCount, setHrCount] = useState({});
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editUser, setEditUser] = useState({ name: '', email: '', empId: '' });

  const handleCountHrUser = async (selectedUser) => {
    const empId = selectedUser.empId;

    try {
      const response = await axios.get(
        `https://hireflowapi.focusrtech.com:90/hiring/auth/statsofinterviewer/${empId}`
      );
      setHrCount(response.data);
    } catch (error) {
      console.error("Error counting HR user:", error);
    }
  };

  const handleCardClick = (user) => {
    setSelectedUser(user);
    handleCountHrUser(user);
  };


  const handleEditUser = () => {
    setEditUser({
      name: selectedUser.username,
      email: selectedUser.email,
      empId: selectedUser.empId
    });
    setIsEditModalVisible(true);
  };

  const handleEditSave = async () => {
    const id = selectedUser.id;
    try {
      await axios.post(`https://hireflowapi.focusrtech.com:90/hiring/auth/updateUser/${id}/`, {
       
        username: editUser.name,
        email: editUser.email,
        empId: editUser.empId
      });
      fetchData();
    } catch (error) {
      console.error("Error updating user:", error.response.data);
    }
    setIsEditModalVisible(false);
    handleCloseModal();
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    const is_active = selectedUser.is_active;
    const id = selectedUser.id;
    try {
      await axios.put(
        `https://hireflowapi.focusrtech.com:90/hiring/auth/activeInactiveUser/${id}`,
        {
          is_active: !is_active,
        }
      );
      fetchData();
    } catch (error) {
      console.error("Error pausing user:", error.response.data);
    }
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const hrrUsers = users.filter((user) => user.roles === 3);

  return (
    <>
      <div className="header">
        <h2>Technical Interviewer</h2>
      </div>
      <div className="containerhrr">
        {hrrUsers.map((user) => (
          <UserCard key={user.id} user={user} onClick={handleCardClick} hrCount={hrCount} />
        ))}

        <Modal
        title="Edit User Details"
        visible={isEditModalVisible}
        onCancel={handleEditCancel}
        onOk={handleEditSave}
        width={'20%'}
      >
        <div>
          <label>Name:</label>
          <Input
            value={editUser.name}
            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
          />
          <label>Email:</label>
          <Input
            value={editUser.email}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
          />
          <label>Emp ID:</label>
          <Input
            value={editUser.empId}
            onChange={(e) => setEditUser({ ...editUser, empId: e.target.value })}
          />
        </div>
      </Modal>

        <Modal
          title="Role Interviewer"
          visible={selectedUser !== null}
          onCancel={handleCloseModal}
          width={'20%'}
          footer={[
            <div style={{display:"flex"}}>
            <Button type='primary' key="delete" onClick={handleEditUser}>
              Edit
            </Button>
            <Button type='primary' key="delete" style={{marginLeft:"10px"}} onClick={handleDeleteUser}>
              Delete
            </Button>
            </div>
            
          ]}
        >
          {selectedUser&& (
            <>
              <p>Name:   {selectedUser.username}</p> 
              <p>Email:   {selectedUser.email}</p>
               <p>Emp ID:   {selectedUser.empId}</p>
              <p>New Applicants: {hrCount.assignedCandidates}</p>
              <p>completed: {hrCount.completed}</p>
            </>
          )}
        </Modal>
      </div>
    </>
  );
};

export default Techcontainer;
