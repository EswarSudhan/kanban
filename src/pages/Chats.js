import axios from "axios";
import { useState } from "react";
import UserList from "../components/chat/UserList";
import ConversationHistory from "../components/chat/ConversationHistory";

// ////////////////////////////////////////////////////////////////

export default function Chats() {
    const [selectedUser, setSelectedUser] = useState({});
  
    const handleUserClick = async (user) => {
      const apiUrl = "http://172.235.10.116:7000/hiring/entryLevel/email";
      const recruiterMail = localStorage.getItem("mail");
  
      const payload = {
        recruiterMail: recruiterMail,
        candidateMail: "gauthammythireyan.km@focusrtech.com", // Use the clicked user's email from the userList
        password: "FCTai123",
      };
  
      try {
        const response = await axios.post(apiUrl, payload);
        console.log("API Response:", response.data);
  
        // Update the selected user in the state
        setSelectedUser(response.data);
      } catch (error) {
        console.error("Error making API request:", error);
      }
    };
  
    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <div style={{ flex: "1", backgroundColor: "#ece5dd" }}>
          <UserList onUserClick={handleUserClick} />
        </div>
        <div style={{ flex: "3.5", backgroundColor: "#f5f5f5" }}>
          <ConversationHistory selectedUser={selectedUser} />
        </div>
      </div>
    );
  }
  