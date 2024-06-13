import React, { useState, useEffect } from 'react';
import { Button, Modal, Divider } from 'antd';
import UserAvatar from '../../components/chat/UserAvatar';
import './candidateInfo.css';
import WebUserAvatar from './websiteUserAvatar';
import Tab from './tab';
import axios from 'axios';
import {

    updateAdminCandidateDataAsync,

} from "../../redux/slices/summarySlice";
import { useDispatch, useSelector } from "react-redux";

export const Item1 = ({ selectedCandidates }) => {
    
    return (
        <div className='candidateInfo'>
            <p className='info-title1'>Name:</p>
            <p>{selectedCandidates.name}</p>
            <p className='info-title'>Email:</p>
            <p >{selectedCandidates.email}</p>
            
            <p >{selectedCandidates.noticePeriod}</p>
            <p className='info-title'>Role:</p>
            <p>{selectedCandidates.jobRole}</p>
           
        </div>
    )
}



export const Item4 = ({selectedCandidates}) => {
    const [recruiters, setRecruiters] = useState([]);
    const [selectedRecruiter, setSelectedRecruiter] = useState("disabled");
    const dispatch = useDispatch();
    useEffect(() => {
        // Fetch the list of recruiters when the component mounts
        axios.get('https://hireflowapi.focusrtech.com:90/hiring/auth/getListOfRecruiter/')
            .then(response => {
                setRecruiters(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the recruiters!", error);
            });
    }, []);

    const handleSingleAssign = async () => {
        try {

            const editFormData={
                "resumeId":selectedCandidates.resumeId,
                "assigned": selectedRecruiter,
                "currentStatus": "ASSIGNED"
            };
            // Dispatch the async thunk action to update the data
            await dispatch(updateAdminCandidateDataAsync(editFormData));

            // Close the modal or handle any other actions upon successful update

            // Optionally, fetch updated candidate details
            // fetchCandidateDetails();
        } catch (error) {
            // Handle errors
            console.error("Error updating candidate data:", error);
            // Optionally, display an error message to the user
        } finally {

        }
    }

    return (
        <div className='Assign-tab'>
            <select name="cars" id="cars" className='select-assign' onChange={e => setSelectedRecruiter(e.target.value)} value={selectedRecruiter}>
                <option value="disabled" disabled selected>--Select HR--</option>
                {recruiters.map(recruiter => (
                    <option key={recruiter.id} value={recruiter.empId}>
                        {recruiter.username}
                    </option>
                ))}
            </select>

            <button className='assign-button' onClick={handleSingleAssign}>Assign</button>
        </div>
    );
}




const CandidateInfo = ({ showModal, isModalOpen, selectedCandidates, handleAssign, handleDownload}) => {

    console.log('selectedCandidates', selectedCandidates)


    const handleOk = () => {
        showModal();
    };

    const handleCancel = () => {
        showModal();
    };

    const items = [
        {
            "key": "1",
            "label": "Candidate Info",
            "children": <Item1 selectedCandidates={selectedCandidates} />

        },
        {
            "key": "2",
            "label": "Hold",
            "children": "content of the second tab"
        },
        {
            "key": "3",
            "label": "Delete Candidate",
            "children": "This is content of tab 3"
        },
        {
            "key": "4",
            "label": "Assign",
            "children": <Item4 selectedCandidates={selectedCandidates}/>

        }
    ]

    return (
        <div>

            <Modal
                title="Canidate Info"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                style={{ height: '100%' }}
            >
                <div className="conversation-avatar-web">

                    <WebUserAvatar selectedCandidates={selectedCandidates} handleDownload={handleDownload}/>
                </div>
                {/* <Divider /> */}
                <Tab items={items} />


            </Modal>
        </div>
    )
}

export default CandidateInfo;