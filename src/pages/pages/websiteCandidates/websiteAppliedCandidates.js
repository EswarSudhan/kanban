
import './websiteAppliedCandidates.css';
import { Divider, Table, Button, Modal, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import CandidateInfo from './candidateInfo';
import { CloudDownloadOutlined } from '@ant-design/icons';
import Usernav from '../../components/usermanagement/Usernav';
import axios from 'axios';
import { updateAdminCandidateDataAsync } from "../../redux/slices/summarySlice";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined } from '@ant-design/icons';
import holdPng from '../hold-png.png';
import assignPng from '../add-user.png';
import { ErrorMessage } from 'formik';


const WebCandidates = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { jobId, jobTitle } = location.state || {};
    console.log('jobId', jobId);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedCandidates, setSelectedCandidates] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [candidates, setCandidates] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [changingState, setChangingState] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const successMessage = (message) => {
        messageApi.open({
            type: 'success',
            content: message,
        });
    };
    const errorMessage = (message) => {
        messageApi.open({
            type: 'error',
            content: message,
        });
    };
    const showModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleDownload = async (resumeId) => {
        console.log(resumeId);

        try {
            const response = await axios.get(`https://hireflowapidev.focusrtech.com:90/hiring/auth/downloadResume/${resumeId}`, {
                responseType: 'blob',
            });
            console.log(response.headers);
            // const match = /filename="([^"]+)"/.exec(disposition);

            const blob = new Blob([response.data], { type: 'application/pdf' });

            const url = window.URL.createObjectURL(blob);

            window.open(url, '_blank'); // Open PDF in a new tab/window

            // Clean up
            window.URL.revokeObjectURL(url);
        } catch (error) {

            console.error('Error downloading file:', error);
        }
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
        axios.get(`https://hireflowapidev.focusrtech.com:90/hiring/entryLevel/applyJob/${jobId}`, config)
            .then(response => {
                const fetchedCandidates = response.data.map(candidate => ({
                    key: candidate.resumeId,
                    resumeId: candidate.resumeId,
                    name: candidate.name,
                    experience: candidate.yearsOfExperience,
                    appliedDate: candidate.appliedDate,
                    email: candidate.email,
                    resume: <CloudDownloadOutlined className="center-icon" />,
                    jobRole: candidate.jobRole
                }));
                setCandidates(fetchedCandidates);
            })
            .catch(error => {
                console.error('There was an error fetching the candidates!', error);
            });
    }, [changingState]);

    const columns = [
        {
            title: 'resume Id',
            dataIndex: 'resumeId',
            key: 'resumeId',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            onCell: (record) => ({
                onClick: () => {
                    setSelectedCandidates(record);
                    showModal();
                },
                style: { cursor: 'pointer' }
            })
        },
        {
            title: 'Experience',
            dataIndex: 'experience',
            key: 'experience',
        },
        {
            title: 'Applied On',
            dataIndex: 'appliedDate',
            key: 'appliedDate',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Resume ',
            dataIndex: 'resume',
            key: 'resume',
            className: 'center-column-header',
            onCell: (record) => ({
                onClick: () => {

                    handleDownload(record.resumeId);
                },
                style: { cursor: 'pointer' }
            })
        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedId(selectedRowKeys[0]);
        },
    };

    const handleClick = (path) => {
        if (path) {
            navigate(path);
        }
    };

    const handleAssign = () => {
        const apiUrl = "https://hireflowapidev.focusrtech.com:90/hiring/entryLevel/assignRole/";

        axios.post(apiUrl)
            .then(response => {
                // Handle response data
                setChangingState(!changingState);
            })
            .catch(error => {
                // Handle errors
                console.error("Error triggering Assign API:", error.message);
            });
    }

    const handleReject = () => {
        const editFormData = {
            "resumeId": selectedId,
            "currentStatus": "REJECTED"
        };

        // Dispatch the async thunk action to update the data
        const updateAdminCandidateData = (requestData) => {
            axios.post(`https://hireflowapidev.focusrtech.com:90/hiring/auth/updatedataadmin/${requestData.resumeId}`, requestData)
                .then((response) => {
                    console.log('Candidate data updated successfully:', response.data);
                    successMessage("Candidate Rejected !");
                })
                .catch((error) => {
                    errorMessage('Error while Rejecting');
                })
                .finally(() => {
                    setChangingState(!changingState);
                })
        };
        // Example usage:
        updateAdminCandidateData(editFormData);
    }
    const handleHold = () => {
        const editFormData = {
            "resumeId": selectedId,
            "currentStatus": "HOLD"
        };

        // Dispatch the async thunk action to update the data
        const updateAdminCandidateData = (requestData) => {
            axios.post(`https://hireflowapidev.focusrtech.com:90/hiring/auth/updatedataadmin/${requestData.resumeId}`, requestData)
                .then((response) => {
                    console.log('Candidate data updated successfully:', response.data);
                    successMessage("Candidate Holded !");
                })
                .catch((error) => {
                    errorMessage('Error while updating');
                })
                .finally(() => {
                    setChangingState(!changingState);
                })
        };
        // Example usage:
        updateAdminCandidateData(editFormData);
    }

    const filteredcandidates = candidates.filter(data => {
        const searchTerms = Object.values(data).join(" ").toLowerCase();
        return searchTerms.includes(searchValue.toLowerCase());
    });


    return (
        <>
            {contextHolder}
            <Usernav />
            <div className='content-container'>
                <div className='breadcrump-container'>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            Human Resource
                        </Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => handleClick('/jobs')} style={{ cursor: 'pointer' }}>
                            Jobs
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {jobTitle}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className='heading-filter-container'>
                    <h1 className='screen-title'>{jobTitle}</h1>
                    <div className='filter-container'>
                        <div className='sample-container'>
                            <button onClick={handleAssign}>
                                <span style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 8, marginTop: '5px' }}>
                                    <img src={assignPng} alt="Assign Image" style={{ width: '15px', height: '15px' }} />
                                </span>
                                <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>Assign</span></button>
                            {/* <button>New Filter</button>
                            <button>Clear Filter</button> */}
                        </div>
                    </div>
                </div>
                <Divider />
                <div className='header-container'>
                    <Button style={{ background: 'transparent', border: 'none', margin: '0 13px' }} onClick={handleReject}><DeleteOutlined />Delete</Button>
                    <Button style={{ background: 'transparent', border: 'none', margin: '0 13px' }} onClick={handleHold}>
                        <span style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 8, marginTop: '5px' }}>
                            <img src={holdPng} alt="Hold Image" style={{ width: '15px', height: '15px' }} />
                        </span>
                        <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>Hold</span>
                    </Button>
                    <Input.Search
                        style={{ width: '25%' }}
                        placeholder="Search..."
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </div>
                <div className='table-container'>
                    <Table rowSelection={{
                        type: 'radio',
                        ...rowSelection,
                    }}
                        className='transparent-row'
                        dataSource={filteredcandidates} style={{ cursor: 'pointer' }}
                        columns={columns}
                    />
                </div>
                <CandidateInfo showModal={showModal} isModalOpen={isModalOpen} selectedCandidates={selectedCandidates} handleAssign={handleAssign} handleDownload={handleDownload} />
            </div>
        </>
    );
}

export default WebCandidates;