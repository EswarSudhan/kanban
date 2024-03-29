// HRRContainer.jsx
import React, { useState, useEffect, useRef } from "react";
import "./hrrcontainer.css"; // Import the CSS file
import BarChartIcon from "@mui/icons-material/BarChart";
import axios from "axios";

const UserCard = ({ user, onClick }) => {
  const getAvatarUrl = () => {
    return process.env.PUBLIC_URL + "./img/avtr2.jpg";
  };

  return (
    <div className="user-card-tech" onClick={() => onClick(user)}>
      <img className="avatar" src={getAvatarUrl()} alt="User Avatar" />
      <h3>{user.username}</h3>
      <p>{user.empId}</p>
      <p>completed: {user.Completed}</p>
    </div>
  );
};

const UserDetailsModal = ({ user, onClose, onDelete }) => {
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="user-details-modal" ref={modalRef}>
      <h3>{user.name}</h3>
      <p>Role: {user.roles}</p>
      <p>New Applicants: {user.NewApplicants}</p>
      <p>Verified: {user.Verified}</p>
      <p>Assigned to tech: {user.AssignedToTech}</p>
      <p>waiting for approval: {user.WaitingForApproval}</p>
      <p>completed: {user.Completed}</p>
      <div className="button-container">
        <button onClick={onDelete}>Delete</button>
        <button>Pause</button>
      </div>
      <span>
        <BarChartIcon />
        Show Analytics
      </span>
    </div>
  );
};
const Techcontainer = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Fetch users from the API using Axios
    const token = localStorage.getItem("accessToken");
    const fetchUsers = async () => {
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
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error.message);
      }
    };

    // Call the fetchUsers function
    fetchUsers();
  }, []); // Empty dependency array means this effect will run only once, similar to componentDidMount

  const handleCardClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleDeleteUser = () => {
    // Implement your delete logic here
    console.log("Deleting user:", selectedUser);
    // Update users state after deletion if needed
    // setUsers(users.filter(user => user.name !== selectedUser.name));
    handleCloseModal();
  };

  const hrrUsers = users.filter((user) => user.roles === 3);

  return (
    <div className="container">
      {hrrUsers.map((user) => (
        <UserCard key={user.id} user={user} onClick={handleCardClick} />
      ))}

      {selectedUser && (
        <>
          <div className="modal-backdrop" onClick={handleCloseModal}></div>
          <UserDetailsModal
            user={selectedUser}
            onClose={handleCloseModal}
            onDelete={handleDeleteUser}
          />
        </>
      )}
    </div>
  );
};

export default Techcontainer;
