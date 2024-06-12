

// import React, { useEffect, useState } from "react";
// import './NewCandidateCards.css';
// // import {AccountCircleIcon} from '@mui/icons-material';

// import axios from 'axios';
// import { DownloadOutlined ,UserOutlined} from '@ant-design/icons';
// import { message,Button,Modal, Select } from 'antd';



// // import React, { useState } from "react";
// // import { message, Button, Modal, Select } from 'antd';
// // import { DownloadOutlined, UserOutlined } from '@ant-design/icons';
// // import axios from 'axios';

// const ProfileCard = ({ profile, fetchData }) => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [recruiters, setRecruiters] = useState([]);
//   const [selectedRecruiter, setSelectedRecruiter] = useState(null);

//   const showModal = async () => {
//     try {
//       const response = await axios.get('https://hireflowapidev.focusrtech.com:90/hiring/auth/getListOfRecruiter/');
//       setRecruiters(response.data);
//       setIsModalVisible(true);
//     } catch (error) {
//       console.error('Failed to fetch recruiters:', error);
//       message.error('Failed to fetch recruiters');
//     }
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   const handleSave = async (param) => {
//     if (!selectedRecruiter) {
//       message.error('Please select a recruiter');
//       return;
//     }
//     try {
//       const payload = {
//         "recruiterId": selectedRecruiter,
//         "profileId": profile.id,
//       };
//     //   console.log({"americA":profile.resumeId})
//       await axios.post('https://hireflowapidev.focusrtech.com:90/hiring/auth/assignIndividual', payload);
//       message.success('Successfully assigned');
//       setIsModalVisible(false);
//       fetchData(); // Call fetchData after successful assignment
//     } catch (error) {
//       console.error('Failed to assign:', error);
//     //   message.error('Failed to assign');
//     }
//   };

//   const handleChange = (value) => {
//     setSelectedRecruiter(value);
//   };

//   const handleDownload = async () => {
//     const resumeId = profile.resumeId;
//     try {
//       const response = await axios.get(`https://hireflowapidev.focusrtech.com:90/hiring/auth/downloadResume/${resumeId}`, {
//         responseType: 'blob',
//       });
//       const blob = new Blob([response.data], { type: 'application/pdf' });
//       const url = window.URL.createObjectURL(blob);
//       window.open(url, '_blank');
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       message.error('File not found!');
//       console.error('Error downloading file:', error);
//     }
//   };

// const buttonStyle = {
//     padding: '10px 15px',
//     margin: '0 5px',
//     border: 'none',
//     borderRadius: '5px',
//     backgroundColor: 'rgb(0,33,64)',
//     color: 'white',
//     cursor: 'pointer',
//     fontSize: '1em'
//   };
  
//   const handleStatusChange = async (status) => {
//     try {
//         const payload = {
//           "status": status,
//           "profileId": profile.id,
//         };
//       //   console.log({"americA":profile.resumeId})
//         await axios.post('https://hireflowapidev.focusrtech.com:90/hiring/auth/changestatusAdmin', payload);
//         message.success('Successfully changed status');
//         setIsModalVisible(false);
//         fetchData(); // Call fetchData after successful assignment
//       } catch (error) {
//         console.error('Failed to assign:', error);
//         // message.error('Failed to assign');
//       }

//   };

//     return (
//         // <div className="profile-card">
//         //     <AccountCircleIcon className="profile-icon" />
//         //     <h2>{profile.name || 'null'}</h2>
//         //     <p>Experience: {profile.experience} years</p>
//         //     <p>Job Role: {profile.jobRole || 'null'}</p>
//         //     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         //         <p>AI Score: {profile.aiScore || 'null'}</p>
//         //         <DownloadOutlined style={{ fontSize: '25px', cursor: 'pointer', color: 'rgb(0,33,64)' }} onClick={handleDownload} />
//         //     </div>

//         // </div>
//         <div className="profile-card">
//       <UserOutlined className="profile-icon" style={{ fontSize: '48px' }} />
//       <h2>{profile.name || 'null'}</h2>
//       <p>Experience: {profile.experience} years</p>
//       <p>Job Role: {profile.jobRole || 'null'}</p>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <p>AI Score: {profile.aiScore || 'null'}</p>
//         <DownloadOutlined 
//           style={{ fontSize: '25px', cursor: 'pointer', color: 'rgb(0,33,64)' }} 
//           onClick={handleDownload} 
//         />
//       </div>
//       <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
//         <Button type="primary" onClick={showModal}>Options</Button>
//         {profile.status === "NOT_ASSIGNED" && (
//             <p>Status: Not Assigned</p>
//         )}
//         {/* {profile.status === "NOT_ASSIGNED" && (
//             <p>Status: Not Assigned</p>
//         )} */}
//       </div>

//       <Modal
//         title="Assign Task"
//         visible={isModalVisible}
//         onCancel={handleCancel}
//         footer={[
//           <Button key="back" onClick={handleCancel}>
//             Cancel
//           </Button>,
//           <Button key="submit" type="primary" onClick={() => {handleSave(profile.resumeId)}}>
//             Save
//           </Button>,
//           <Button type="primary" onClick={() => handleStatusChange('INITIAL_ON_HOLD')}>On Hold</Button>,
//           <Button type="primary" onClick={() => handleStatusChange('REJECTED')}>Reject</Button>,
//         ]}
//       >
//         <Select
//           style={{ width: '100%' }}
//           placeholder="Select a recruiter"
//           onChange={handleChange}
//         >
//           {recruiters.map(recruiter => (
//             <Select.Option key={recruiter.id} value={recruiter.id}>
//               {recruiter.username}
//             </Select.Option>
//           ))}
//         </Select>
//       </Modal>
//     </div>
//     );
// };



// import React, { useEffect, useState } from "react";
// import './NewCandidateCards.css';
// import axios from 'axios';
// import { Table, message, Button, Modal, Select, Tooltip } from 'antd';
// import { DownloadOutlined, UserOutlined } from '@ant-design/icons';

// const ProfileCard = ({ profile, fetchData }) => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [recruiters, setRecruiters] = useState([]);
//   const [selectedRecruiter, setSelectedRecruiter] = useState(null);
//   const [selectedProfile, setSelectedProfile] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const showModal = async (profile) => {
//     try {
//       const response = await axios.get('https://hireflowapidev.focusrtech.com:90/hiring/auth/getListOfRecruiter/');
//       setRecruiters(response.data);
//       setSelectedProfile(profile);
//       setIsModalVisible(true);
//     } catch (error) {
//       console.error('Failed to fetch recruiters:', error);
//       message.error('Failed to fetch recruiters');
//     }
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   const handleSave = async () => {
//     if (!selectedRecruiter) {
//       message.error('Please select a recruiter');
//       return;
//     }
//     try {
//       const payload = {
//         recruiterId: selectedRecruiter,
//         profileId: selectedProfile.id,
//       };
//       await axios.post('https://hireflowapidev.focusrtech.com:90/hiring/auth/assignIndividual', payload);
//       message.success('Successfully assigned');
//       setIsModalVisible(false);
//       fetchData();
//     } catch (error) {
//       console.error('Failed to assign:', error);
//       message.error('Failed to assign');
//     }
//   };

//   const handleDownload = async (resumeId) => {
//     try {
//       const response = await axios.get(`https://hireflowapidev.focusrtech.com:90/hiring/auth/downloadResume/${resumeId}`, {
//         responseType: 'blob',
//       });
//       const blob = new Blob([response.data], { type: 'application/pdf' });
//       const url = window.URL.createObjectURL(blob);
//       window.open(url, '_blank');
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       message.error('File not found!');
//       console.error('Error downloading file:', error);
//     }
//   };

//   const handleStatusChange = async (status) => {
//     try {
//       const payload = {
//         status: status,
//         profileId: selectedProfile.id,
//       };
//       await axios.post('https://hireflowapidev.focusrtech.com:90/hiring/auth/changestatusAdmin', payload);
//       message.success('Successfully changed status');
//       setIsModalVisible(false);
//       fetchData();
//     } catch (error) {
//       console.error('Failed to change status:', error);
//       message.error('Failed to change status');
//     }
//   };

//   const columns = [
//     {
//       title: 'Avatar',
//       dataIndex: 'avatar',
//       key: 'avatar',
//       render: () => <UserOutlined style={{ fontSize: '25px' }} />,
//     },
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Experience',
//       dataIndex: 'experience',
//       key: 'experience',
//       render: text => `${text} years`,
//     },
//     {
//       title: 'Job Role',
//       dataIndex: 'jobRole',
//       key: 'jobRole',
//     },
//     {
//       title: 'AI Score',
//       dataIndex: 'aiScore',
//       key: 'aiScore',
//     },
//     {
//       title: 'Download',
//       key: 'download',
//       render: (text, record) => (
//         <Tooltip title="Download Resume">
//           <DownloadOutlined
//             style={{ fontSize: '20px', cursor: 'pointer' }}
//             onClick={() => handleDownload(record.resumeId)}
//           />
//         </Tooltip>
//       ),
//     },
//     {
//       title: 'Options',
//       key: 'options',
//       render: (text, record) => (
//         <Button type="primary" onClick={() => showModal(record)}>
//           Options
//         </Button>
//       ),
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: text => text === "NOT_ASSIGNED" ? "Not Assigned" : text,
//     }
//   ];

//   return (
//     <div className="container">
//       <Table
//         dataSource={Array.isArray(profile) ? profile : []}  // Ensure profile is an array
//         columns={columns}
//         rowKey="id"
//       />
//       <Modal
//         title="Assign Task"
//         visible={isModalVisible}
//         onCancel={handleCancel}
//         footer={[
//           <Button key="back" onClick={handleCancel}>
//             Cancel
//           </Button>,
//           <Button key="submit" type="primary" onClick={handleSave}>
//             Save
//           </Button>,
//           <Button type="primary" onClick={() => handleStatusChange('INITIAL_ON_HOLD')}>On Hold</Button>,
//           <Button type="primary" onClick={() => handleStatusChange('REJECTED')}>Reject</Button>,
//         ]}
//       >
//         <Select
//           style={{ width: '100%' }}
//           placeholder="Select a recruiter"
//           onChange={(value) => setSelectedRecruiter(value)}
//         >
//           {recruiters.map(recruiter => (
//             <Select.Option key={recruiter.id} value={recruiter.id}>
//               {recruiter.username}
//             </Select.Option>
//           ))}
//         </Select>
//       </Modal>
//     </div>
//   );
// };

// export default ProfileCard;


// import React, { useEffect, useState } from "react";
// import './NewCandidateCards.css';
// import axios from 'axios';
// import { Table, message, Button, Modal, Select, Tooltip, Flex } from 'antd';
// import { DownloadOutlined, UserOutlined } from '@ant-design/icons';

// const ProfileCard = ({ profile, fetchData }) => {  // Remove fetchData from props
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [recruiters, setRecruiters] = useState([]);
//   const [selectedRecruiter, setSelectedRecruiter] = useState(null);
//   const [selectedProfile, setSelectedProfile] = useState(null);

//   const showModal = async (profile) => {
//     try {
//         const response = await axios.get('https://hireflowapidev.focusrtech.com:90/hiring/auth/getListOfRecruiter/');
//         setRecruiters(response.data);
//         setSelectedProfile(profile); // Set selectedProfile here
//         setIsModalVisible(true);
//     } catch (error) {
//         console.error('Failed to fetch recruiters:', error);
//         message.error('Failed to fetch recruiters');
//     }
// };


//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   const handleSave = async () => {
//     if (!selectedRecruiter) {
//       message.error('Please select a recruiter');
//       return;
//     }
//     try {
//       const payload = {
//         "recruiterId": selectedRecruiter,
//         "profileId": selectedProfile.id,
//       };
//       await axios.post('https://hireflowapidev.focusrtech.com:90/hiring/auth/assignIndividual', payload);
//       console.log({"america":selectedProfile})
//       message.success('Successfully assigned');
//       setIsModalVisible(false);
//     } catch (error) {
//       console.error('Failed to assign:', error);
//       message.error('Failed to assign');
//     }
//   };

//   // const handleSave = async (param) => {
//   //   if (!selectedRecruiter) {
//   //     message.error('Please select a recruiter');
//   //     return;
//   //   }
//   //   try {
//   //     const payload = {
//   //       "recruiterId": selectedRecruiter,
//   //       "profileId": profile.id,
//   //     };
//   //   //   console.log({"americA":profile.resumeId})
//   //     await axios.post('https://hireflowapidev.focusrtech.com:90/hiring/auth/assignIndividual', payload);
//   //     message.success('Successfully assigned');
//   //     setIsModalVisible(false);
//   //     fetchData(); // Call fetchData after successful assignment
//   //   } catch (error) {
//   //     console.error('Failed to assign:', error);
//   //   //   message.error('Failed to assign');
//   //   }
//   // };
  

//   const handleDownload = async (resumeId) => {
//     try {
//       const response = await axios.get(`https://hireflowapidev.focusrtech.com:90/hiring/auth/downloadResume/${resumeId}`, {
//         responseType: 'blob',
//       });
//       const blob = new Blob([response.data], { type: 'application/pdf' });
//       const url = window.URL.createObjectURL(blob);
//       window.open(url, '_blank');
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       message.error('File not found!');
//       console.error('Error downloading file:', error);
//     }
//   };

//   const handleStatusChange = async (status) => {
//     try {
//       const payload = {
//         status: status,
//         profileId: selectedProfile.id,
//       };
//       await axios.post('https://hireflowapidev.focusrtech.com:90/hiring/auth/changestatusAdmin', payload);
//       message.success('Successfully changed status');
//       setIsModalVisible(false);
//     } catch (error) {
//       console.error('Failed to change status:', error);
//       message.error('Failed to change status');
//     }
//   };

//   const columns = [
//     {
//       title: 'Avatar',
//       dataIndex: 'avatar',
//       key: 'avatar',
//       render: () => <UserOutlined style={{ fontSize: '25px' }} />,
//     },
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Experience',
//       dataIndex: 'experience',
//       key: 'experience',
//       render: text => `${text} years`,
//     },
//     {
//       title: 'Job Role',
//       dataIndex: 'jobRole',
//       key: 'jobRole',
//     },
//     {
//       title: 'AI Score',
//       dataIndex: 'aiScore',
//       key: 'aiScore',
//     },
//     {
//       title: 'Download',
//       key: 'download',
//       render: (text, record) => (
//         <Tooltip title="Download Resume">
//           <DownloadOutlined
//             style={{ fontSize: '20px', cursor: 'pointer' }}
//             onClick={() => handleDownload(record.resumeId)}
//           />
//         </Tooltip>
//       ),
//     },
//     {
//       title: 'Options',
//       key: 'options',
//       render: (text, record) => (
//         <Button type="primary" onClick={() => showModal(record)}>
//           Options
//         </Button>
//       ),
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: text => text === "NOT_ASSIGNED" ? "Not Assigned" : "On Hold",
//     }
//   ];

//   return (
//     <div style={{display:"Flex", justifyContent:"center", width:"100%", marginTop:"20px"}}>
//     <div style={{width:"90%"}}>
//       <Table
//         dataSource={Array.isArray(profile) ? profile : []}  // Ensure profile is an array
//         columns={columns}
//         rowKey="id"
//       />
//       <Modal
//         title="Assign Task"
//         visible={isModalVisible}
//         onCancel={handleCancel}
//         footer={[
//           <Button key="back" onClick={handleCancel}>
//             Cancel
//           </Button>,
//           <Button key="submit" type="primary" onClick={handleSave}>
//             Assign
//           </Button>,
//           <Button type="primary" onClick={() => handleStatusChange('INITIAL_ON_HOLD')}>On Hold</Button>,
//           <Button type="primary" onClick={() => handleStatusChange('REJECTED')}>Reject</Button>,
//         ]}
//       >
//         <Select
//           style={{ width: '100%' }}
//           placeholder="Select a recruiter"
//           onChange={(value) => setSelectedRecruiter(value)}
//         >
//           {recruiters.map(recruiter => (
//             <Select.Option key={recruiter.id} value={recruiter.id}>
//               {recruiter.username}
//             </Select.Option>
//           ))}
//         </Select>
//       </Modal>
//     </div>
//     </div>
//   );
// };

// export default ProfileCard;



// export const Candidatecards = ({ selectedFilters, candidateCards }) => {
//     const [profileData, setProfileData] = useState([]);

//     // useEffect(() => {
//     //     const token = localStorage.getItem('accessToken');

//     //     const fetchData = async () => {
//     //         try {
//     //             const response = await axios.get('https://hireflowapidev.focusrtech.com:90/hiring/entryLevel/getAllCandidates', {
//     //                 headers: {
//     //                     Authorization: `Bearer ${token}`,
//     //                 }
//     //             });
//     //             // Extracting only required fields from the response and handling null values
//     //             const extractedData = response.data.map(profile => ({
//     //                 name: profile.name || 'null',
//     //                 experience: profile.experience || 'null',
//     //                 jobRole: profile.jobRole || 'null',
//     //                 aiScore: profile.resumeScore || 'null'
//     //             }));
//     //             console.log(response.data)
//     //             setProfileData(extractedData);
//     //         } catch (error) {
//     //             console.error('Error fetching data:', error);
//     //         }
//     //     };

//     //     if (token) {
//     //         fetchData();
//     //     } else {
//     //         console.error('Access token not found in localStorage.');
//     //     }
//     // }, []);


//     let filteredData = [...candidateCards];
//     console.log(filteredData);
//     selectedFilters.forEach(filter => {
//         if (filter === "AI Score Ascending") {
//             filteredData.sort((a, b) => a.resumeScore - b.resumeScore);
//         } else if (filter === "AI Score Descending") {
//             filteredData.sort((a, b) => b.resumeScore - a.resumeScore);
//         } else if (filter === "Experience Ascending") {
//             filteredData.sort((a, b) => a.yearsOfExperience - b.yearsOfExperience);
//         } else if (filter === "Experience Descending") {
//             filteredData.sort((a, b) => b.yearsOfExperience - a.yearsOfExperience);
//         } else if (filter === "Job Role Ascending") {
//             filteredData.sort((a, b) => (a.jobRole || '').localeCompare(b.jobRole || ''));
//         } else if (filter === "Job Role Descending") {
//             filteredData.sort((a, b) => (b.jobRole || '').localeCompare(a.jobRole || ''));
//         }
//     });

//     return (
//         <>
//             <div style={{ backgroundColor: "transparent" }}>
//                 <center>
//                     <h2 style={{ color: "rgb(0, 33, 64)" }}>List Of Candidates</h2><br></br>
//                 </center>
//                 {filteredData.length > 0 ? <div className="profile-card-container">
//                     {filteredData.map((profile, index) => (
//                         <ProfileCard key={index} profile={profile} />
//                     ))}
//                 </div> : <center><h2 className="profile-card-container">No New Candidates</h2></center>
//                 }

//             </div>
//         </>
//     );
// };


import React, { useEffect, useState } from "react";
import './NewCandidateCards.css';
import axios from 'axios';
import { Table, message, Button, Modal, Select, Tooltip, Flex } from 'antd';
import { DownloadOutlined, UserOutlined } from '@ant-design/icons';
 
const ProfileCard = ({ profile, fetchData }) => {  // Remove fetchData from props
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [recruiters, setRecruiters] = useState([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
 
  const showModal = async (profile) => {
    try {
        const response = await axios.get('https://hireflowapidev.focusrtech.com:90/hiring/auth/getListOfRecruiter/');
        setRecruiters(response.data);
        setSelectedProfile(profile); // Set selectedProfile here
        setIsModalVisible(true);
    } catch (error) {
        console.error('Failed to fetch recruiters:', error);
        message.error('Failed to fetch recruiters');
    }
};
 
 
  const handleCancel = () => {
    setIsModalVisible(false);
  };
 
  const handleSave = async () => {
    if (!selectedRecruiter) {
      message.error('Please select a recruiter');
      return;
    }
    try {
      const payload = {
        "recruiterId": selectedRecruiter,
        "profileId": selectedProfile.id,
      };
      await axios.post('https://hireflowapidev.focusrtech.com:90/hiring/auth/assignIndividual', payload);
      console.log({"america":selectedProfile})
      message.success('Successfully assigned');
      setIsModalVisible(false);
    } catch (error) {
      console.error('Failed to assign:', error);
      message.error('Failed to assign');
    }
  };
 
  // const handleSave = async (param) => {
  //   if (!selectedRecruiter) {
  //     message.error('Please select a recruiter');
  //     return;
  //   }
  //   try {
  //     const payload = {
  //       "recruiterId": selectedRecruiter,
  //       "profileId": profile.id,
  //     };
  //   //   console.log({"americA":profile.resumeId})
  //     await axios.post('https://hireflowapidev.focusrtech.com:90/hiring/auth/assignIndividual', payload);
  //     message.success('Successfully assigned');
  //     setIsModalVisible(false);
  //     fetchData(); // Call fetchData after successful assignment
  //   } catch (error) {
  //     console.error('Failed to assign:', error);
  //   //   message.error('Failed to assign');
  //   }
  // };
 
 
  const handleDownload = async (resumeId) => {
    try {
      const response = await axios.get(`https://hireflowapidev.focusrtech.com:90/hiring/auth/downloadResume/${resumeId}`, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      window.URL.revokeObjectURL(url);
    } catch (error) {
      message.error('File not found!');
      console.error('Error downloading file:', error);
    }
  };
 
  const handleStatusChange = async (status) => {
    try {
      const payload = {
        status: status,
        profileId: selectedProfile.id,
      };
      await axios.post('https://hireflowapidev.focusrtech.com:90/hiring/auth/changestatusAdmin', payload);
      message.success('Successfully changed status');
      setIsModalVisible(false);
    } catch (error) {
      console.error('Failed to change status:', error);
      message.error('Failed to change status');
    }
  };
 
  const columns = [
    {
      title: 'resume Id',
      dataIndex: 'resumeId',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Experience',
      dataIndex: 'experience',
      key: 'experience',
      render: text => `${text} years`,
      sorter :(a, b) => {
        const expA = a.experienc
        const expB = b.experience
        return expA - expB
      }
    },
    {
      title: 'Job Role',
      dataIndex: 'jobRole',
      key: 'jobRole',
      sorter: (a, b) => a.jobRole.localeCompare(b.jobRole),
    },
    {
      title: 'AI Score',
      dataIndex: 'aiScore',
      key: 'aiScore',
      sorter: (a, b) => a.aiScore - b.aiScore,
    },
    {
      title: 'Download',
      key: 'download',
      render: (text, record) => (
        <Tooltip title="Download Resume">
          <DownloadOutlined
            style={{ fontSize: '20px', cursor: 'pointer' }}
            onClick={() => handleDownload(record.resumeId)}
          />
        </Tooltip>
      ),
    },
    {
      title: 'Options',
      key: 'options',
      render: (text, record) => (
        <Button type="primary" onClick={() => showModal(record)}>
          Options
        </Button>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: text => text === "NOT_ASSIGNED" ? "Not Assigned" : "On Hold",
      sorter: (a, b) => {
        const statusA = a.status
        const statusB = b.status
        return statusA.localeCompare(statusB);
      },
    }
  ];
 
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "20px" }}>
      <div style={{ width: "90%" }}>
        <Table
          dataSource={Array.isArray(profile) ? profile : []}  // Ensure profile is an array
          columns={columns}
          rowKey="id"
        />
        <Modal
          title="Assign Task"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleSave}>
              Assign
            </Button>,
            <Button type="primary" onClick={() => handleStatusChange('INITIAL_ON_HOLD')}>On Hold</Button>,
            <Button type="primary" onClick={() => handleStatusChange('REJECTED')}>Reject</Button>,
          ]}
        >
          <Select
            style={{ width: '100%' }}
            placeholder="Select a recruiter"
            onChange={(value) => setSelectedRecruiter(value)}
          >
            {recruiters.map(recruiter => (
              <Select.Option key={recruiter.id} value={recruiter.id}>
                {recruiter.username}
              </Select.Option>
            ))}
          </Select>
        </Modal>
      </div>
    </div>
  );
};
 
export default ProfileCard;
