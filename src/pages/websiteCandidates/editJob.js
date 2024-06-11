// import React, { useEffect, useState } from 'react';
// import { Button, Modal, Dropdown, Menu, Input, DatePicker, Space } from 'antd';
// import axios from 'axios';

// import moment from 'moment';
// import { postJobs, getWebJobs } from '../../redux/slices/webCandidatesSlice';
// import { useSelector, useDispatch } from "react-redux";

// const { TextArea } = Input;

// const EditJobForm = ({ iseditModalOpen, showeditModal, setJobCreated, selectedRowId }) => {
//     const dispatch = useDispatch();
//     console.log('selectedRowId', selectedRowId[0]);


//     const handleOk = async () => {
        
//         showeditModal();
//     };

//     const handleDraft = () => {
        
//         showeditModal();
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEditData({ ...editData, [name]: value });
//     };
    
//     // console.log('editData', editData);
//     return (
//         <>
//             <Modal
//                 title="Job Edit Form"
//                 open={iseditModalOpen}
//                 onOk={handleOk}
//                 onCancel={handleDraft}
//                 okText="POST"
//                 cancelText="SAVE DRAFT"
//             >
//                 <div className="form-group">
//                     <div className="form-row">
//                         <div className="form-col">
//                             <div className='fieldOne'>
//                                 <label>Job Title</label>
//                                 <Input
//                                     type="text"
//                                     name="jobTitle"
//                                     value={''}
//                                     onChange={handleChange}
//                                     placeholder="Type Job Title"
//                                 />
//                             </div>
//                         </div>
//                         <div className="form-col">
//                             <label>Experience</label>
//                             <Input
//                                 type="text"
//                                 name="experience"
//                                 value={''}
//                                 onChange={handleChange}
//                                 placeholder="Type Experience"
//                             />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="form-group">
//                     <label>Job Description</label>
//                     <TextArea
//                         name="jobDescription"
//                         value={''}
//                         onChange={handleChange}
//                         placeholder="Type Job Description"
//                         rows={4}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <div className="form-row">
//                         <div className="form-col">
//                             <label>Job Location</label>
//                             <Input
//                                 type="text"
//                                 name="jobLocation"
//                                 value={''}
//                                 onChange={handleChange}
//                                 placeholder="Type Job Location"
//                             />
//                         </div>
//                         <div className="form-col">
//                             <label>Job Expiry Date</label>
//                             <Input
//                                 type="date"
//                                 name="expiryDate"
//                                 value={''}
//                                 onChange={handleChange}
//                                 placeholder="Select Job Expiry Date"
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </Modal>
//         </>
//     );
// };

// export default EditJobForm;
