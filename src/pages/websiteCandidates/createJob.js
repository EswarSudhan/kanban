import React, { useEffect, useState } from 'react';
import { Button, Modal, Dropdown, Menu, Input, DatePicker, Space, message } from 'antd';
import axios from 'axios'; // Import axios
import './createJob.css';
import moment from 'moment';
import { postJobs, getWebJobs } from '../../redux/slices/webCandidatesSlice';
import { useSelector, useDispatch } from "react-redux";

const { TextArea } = Input;

const JobCreationForm = ({ isModalOpen, showModal, setJobCreated }) => {
  const dispatch = useDispatch();
  const [changingState, setChangingState] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const errorMessage = (message) => {
    messageApi.open({
      type: 'error',
      content: message,
    });
  };
  const successMessage = (message) => {
    messageApi.open({
      type: 'success',
      content: message,
    });
  };

  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    experience: '',
    jobLocation: '',
    expiryDate: '',
    isActive: true
  });

  const handleOk = () => {
    // Retrieve access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    // Prepare the data for the API call
    const data = {
      ...formData,
      expiryDate: formData.expiryDate ? moment(formData.expiryDate).format('YYYY-MM-DD') : '' // Format date as required
    };
    data.isActive = true;
    console.log('data', data);
    // Make the API call


    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };

    axios.post('http://172.235.21.99:3105/hiring/entryLevel/postJob', data, config)
      .then((response) => {
        console.log(response.data);
        setChangingState(!changingState);
        setJobCreated((prev) => !prev);
        successMessage("Job posted successfully!")
      })
      .catch((error) => {
        console.error('There was an error posting the job!', error);
        errorMessage("Error while posting job")
      })
      .finally(() => {
        showModal();
      })
  };

  const handleCancel=()=>{
    showModal();
  }

  const handleDraft = () => {
    const accessToken = localStorage.getItem('accessToken');

    // Prepare the data for the API call
    const data = {
      ...formData,
      expiryDate: formData.expiryDate ? moment(formData.expiryDate).format('YYYY-MM-DD') : '' // Format date as required
    };
    data.isActive = false;

    // Make the API call


    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };

    axios.post('http://172.235.21.99:3105/hiring/entryLevel/postJob', data, config)
      .then((response) => {
        console.log(response.data);
        setChangingState(!changingState);
        setJobCreated((prev) => !prev);
        successMessage("Job saved successfully!")
      })
      .catch((error) => {
        console.error('There was an error posting the job!', error);
        errorMessage("Error while saving job")
      })
      .finally(() => {
        showModal();
      })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onChange = (date, dateString) => {
    console.log(dateString); // Log the selected date string
    setFormData({ ...formData, expiryDate: date }); // Update expiryDate in formData
  };

  const handlePullDraft = (item) => {
    axios.get(`http://172.235.21.99:3105/hiring/entryLevel/pullDraft/${item}`)
      .then(response => {

        setFormData(response.data);
      })
      .catch(error => {
        console.error('Error fetching pullDraftLov:', error);
      });
  };

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://172.235.21.99:3105/hiring/entryLevel/pullDraftLov')
      .then(response => {

        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching pullDraftLov:', error);
      });
  }, [changingState]);

  return (
    <>
      {contextHolder}
      <Modal
        title="Job Creation Form"
        visible={isModalOpen}
        
        onCancel={handleCancel}
        okText="POST"
        cancelText="SAVE DRAFT"
        footer={null}
      >
        <div>
          <Dropdown overlay={
            <Menu>
              {items.map((item, key) => (
                <Menu.Item key={key} onClick={() => handlePullDraft(item)}>
                  {item}
                </Menu.Item>
              ))}
            </Menu>
          } placement="bottomRight">
            <Button className="pullDraft">Pull Draft</Button>
          </Dropdown>
        </div>
        <div className="form-group">
          <div className="form-row">
            <div className="form-col">
              <div className='fieldOne'>
                <label>Job Title</label>
                <Input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="Type Job Title"
                />
              </div>
            </div>
            <div className="form-col">
              <label>Experience</label>
              <Input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Type Experience"
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Job Description</label>
          <TextArea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            placeholder="Type Job Description"
            rows={4}
          />
        </div>
        <div className="form-group">
          <div className="form-row">
            <div className="form-col">
              <label>Job Location</label>
              <Input
                type="text"
                name="jobLocation"
                value={formData.jobLocation}
                onChange={handleChange}
                placeholder="Type Job Location"
              />
            </div>
            <div className="form-col">
              <label>Job Expiry Date</label>
              <Input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="Select Job Expiry Date"
              />
            </div>
          </div>
          <div>
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
              <Button type='primary' style={{ marginRight: '5px' }} onClick={handleDraft}>save draft</Button>
              <Button type='primary' onClick={handleOk}>post Job</Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default JobCreationForm;
