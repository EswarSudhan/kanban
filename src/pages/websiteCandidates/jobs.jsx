import { Divider, Table, Button, Input, Dropdown, Checkbox } from 'antd';
import React, { useState, useEffect } from 'react';
import { Breadcrumb, Modal, message } from 'antd';
import './jobs.css';
import { useNavigate } from 'react-router-dom';
import JobCreationForm from './createJob';
import Usernav from "../../components/usermanagement/Usernav";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { getWebJobs } from '../../redux/slices/webCandidatesSlice';
import EditJobForm from './editJob';
import { PlusOutlined, UserDeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import clearFilterPng from '../clear-filter.png';

const { Search } = Input;
const { TextArea } = Input;

const Jobs = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iseditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});
  const [selectedRowId, setSelectedRowId] = useState();
  const [jobCreated, setJobCreated] = useState(false);
  const [roleFilter, setRoleFilter] = useState([]);
  const [tempRoleFilter, setTempRoleFilter] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  const { jobDetails, isLoading, error } = useSelector((state) => state.webcandidate);
  const [messageApi, contextHolder] = message.useMessage();

  const errorMessage = (message) => {
    messageApi.open({
      type: 'error',
      content: message,
    });
  };
  const warningMessage = (message) => {
    messageApi.open({
      type: 'warning',
      content: message,
    });
  };

  const successMessage = (message) => {
    messageApi.open({
      type: 'success',
      content: message,
    });
  };

  const showModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const showeditModal = (param) => {
    if (selectedRowId) {
      setIsEditModalOpen(!iseditModalOpen);
      if (!param) {
        setIsEditModalOpen(false);
      }
    }
    else {
      warningMessage("Please select job to Edit");
    }
  };

  const deleteJob = () => {
    console.log("delete button clicked")
    if (selectedRowId) {
      const accessToken = localStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };
      selectedRows && axios.delete(`https://hireflowapidev.focusrtech.com:90/hiring/entryLevel/postJob/${selectedRows.id}`, config)
        .then(response => {
          console.log('Deleted Successfully');
          setJobCreated(!jobCreated);
          successMessage("Deleted successFully")
        })
        .catch(error => {
          console.error('Error fetching pullDraftLov:', error);
        });
    }
    else {
      warningMessage("Please select job to Edit");
    }


  };
  const [dataSource, setDataSource] = useState([]);
  const dataSourceDuplicate = [
    {
      id: '1',
      jobTitle: 'Jr. Sales',
      creationDate: '20-03-2024',
      expiryDate: '20-04-2024',
      experience: '3'
    },
    {
      id: '2',
      jobTitle: 'Oracle Db',
      creationDate: '20-03-2024',
      expiryDate: '20-04-2024',
      experience: '2'
    },
    {
      id: '3',
      jobTitle: 'SAP FICO',
      creationDate: '20-03-2024',
      expiryDate: '21-04-2024',
      experience: '8'
    },
    {
      id: '4',
      jobTitle: 'Python Dev',
      creationDate: '20-03-2024',
      expiryDate: '20-04-2024',
      experience: '10'
    },
    {
      id: '5',
      jobTitle: 'C# Dev',
      creationDate: '20-03-2024',
      expiryDate: '20-04-2024',
      experience: '10'
    }
  ];

  useEffect(() => {
    const fetchData = () => {
      const accessToken = localStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };

      axios.get('https://hireflowapidev.focusrtech.com:90/hiring/entryLevel/postJob', config)
        .then(response => {
          setDataSource(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };

    fetchData();

    console.log('datasource', dataSource);

  }, [jobCreated]);

  const handleRoleFilterChange = (checkedValues) => {
    setTempRoleFilter(checkedValues);
  };

  const applyRoleFilter = () => {
    setRoleFilter(tempRoleFilter);
    setIsDropdownVisible(false);
  };

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const filteredDataSource = dataSource.filter((item) =>
    (roleFilter.length === 0 || roleFilter.includes(item.jobTitle)) &&
    Object.values(item).join(" ").toLowerCase().includes(searchValue.toLowerCase())
  );

  const roleMenu = (
    <div onClick={(e) => e.stopPropagation()} className="dropdown-content">
      <Checkbox.Group onChange={handleRoleFilterChange} defaultValue={roleFilter}>
        {Array.from(new Set(dataSource.map((item) => item.jobTitle))).map((jobTitle, index) => (
          <div key={index} className="dropdown-checkbox-item">
            <Checkbox value={jobTitle}>
              {jobTitle}
            </Checkbox>
          </div>
        ))}
      </Checkbox.Group>
      <Button type="primary" onClick={applyRoleFilter} style={{ marginTop: '10px' }}>
        Apply Filter
      </Button>
    </div>
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedRows({ ...selectedRows, [name]: value });
  };

  const columns = [
    {
      title: 'Job Id',
      dataIndex: 'id',
      key: 'jobId',
      sorter: (a, b) => a.id - b.id,
      onCell: (record) => ({
        onClick: () => {
          console.log('record here', record)
          navigate('/webCandidates', { state: { jobId: record.id, jobTitle: record.jobTitle } });
        },
        style: { cursor: 'pointer' }
      })
    },
    {
      title: 'Role',
      dataIndex: 'jobTitle',
      key: 'role',
      onCell: (record) => ({
        onClick: () => {
          console.log('record here', record)
          navigate('/webCandidates', { state: { jobId: record.id, jobTitle: record.jobTitle } });
        },
        style: { cursor: 'pointer' }
      })
    },
    {
      title: 'Creation Date',
      dataIndex: 'jobCreationDate',
      key: 'creationDate',
      sorter: (a, b) => moment(a.creationDate, 'DD-MM-YYYY') - moment(b.creationDate, 'DD-MM-YYYY'),
      onCell: (record) => ({
        onClick: () => {
          console.log('record here', record)
          navigate('/webCandidates', { state: { jobId: record.id, jobTitle: record.jobTitle } });
        },
        style: { cursor: 'pointer' }
      })
    },
    {
      title: 'Set Expiry',
      dataIndex: 'expiryDate',
      key: 'setExpiry',
      sorter: (a, b) => moment(a.expiryDate, 'DD-MM-YYYY') - moment(b.expiryDate, 'DD-MM-YYYY'),
      onCell: (record) => ({
        onClick: () => {
          console.log('record here', record)
          navigate('/webCandidates', { state: { jobId: record.id, jobTitle: record.jobTitle } });
        },
        style: { cursor: 'pointer' }
      })
    },
    {
      title: 'Experience',
      dataIndex: 'experience',
      key: 'experience',
      sorter: (a, b) => a.experience - b.experience,
      onCell: (record) => ({
        onClick: () => {
          console.log('record here', record)
          navigate('/webCandidates', { state: { jobId: record.id, jobTitle: record.jobTitle } });
        },
        style: { cursor: 'pointer' }
      })
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys1, selectedRows1) => {
      console.log(`selectedRowKeys: ${selectedRowKeys1}`, 'selectedRows: ', selectedRows1);
      setSelectedRowId(selectedRowKeys1);
      setSelectedRows(selectedRows1[0]);
      console.log('selected row state', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  const handleCheckboxClick = (e) => {
    e.stopPropagation();
  };

  const handleOk = () => {
    const payload = {
      jobTitle: selectedRows.jobTitle,
      jobDescription: selectedRows.jobDescription,
      experience: selectedRows.experience,
      jobLocation: selectedRows.jobLocation,
      expiryDate: selectedRows.expiryDate,
      isActive: true
    };

    axios.put(`https://hireflowapidev.focusrtech.com:90/hiring/entryLevel/postJob/${selectedRows.id}`, payload)
      .then(response => {
        console.log('Response:', response.data);
        showeditModal();
        setJobCreated(!jobCreated);
      })
      .catch(error => {
        console.error('Error updating job:', error);
      });
  };

  const handleDraft = () => {
    const payload = {
      jobTitle: selectedRows.jobTitle,
      jobDescription: selectedRows.jobDescription,
      experience: selectedRows.experience,
      jobLocation: selectedRows.jobLocation,
      expiryDate: selectedRows.expiryDate,
      isActive: false
    };

    axios.put(`https://hireflowapidev.focusrtech.com:90/hiring/entryLevel/postJob/${selectedRows.id}`, payload)
      .then(response => {

        setJobCreated(!jobCreated);
      })
      .catch(error => {

      })
      .finally(() => {
        showeditModal();
      });
  };

  const handleCancel=()=>{
    showeditModal();
  }

  return (
    <>
      <Usernav />
      <div className='content-container'>
        <div className='breadcrump-container'>
          <Breadcrumb
            separator=">"
            items={[
              {
                title: 'Human Resource',
              },
              {
                title: 'Jobs',
              }
            ]}
          />
        </div>
        {contextHolder}
        <div className='heading-filter-container'>
          <h1 className='screen-title'>Jobs</h1>
          <div className='filter-container'>
            <div className='sample-container'>
              <Dropdown overlay={roleMenu} trigger={['click']} placement="bottomLeft" visible={isDropdownVisible} onVisibleChange={visible => setIsDropdownVisible(visible)} >
                <Button className='filters'><PlusOutlined /> New Filter</Button>
              </Dropdown>
              <Button className='filters' onClick={() => setRoleFilter([])}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={clearFilterPng} alt="Clear Filter" style={{ marginRight: 8, width: '15px', height: '15px', marginTop: '2px' }} />
                  <span>Clear Filter</span>
                </div>
              </Button>
            </div>
            {roleFilter.length > 0 && (
              <div style={{ marginTop: '10px' }}>
                <strong>Filtered By: </strong> {roleFilter.join(', ')}
              </div>
            )}
          </div>
        </div>

        <Divider />
        <div className='header-container'>
          <Button style={{ background: 'transparent', border: 'none', margin: '0 13px', cursor: 'pointer' }} onClick={showModal}><PlusOutlined /> Add Job</Button>
          <Button style={{ background: 'transparent', border: 'none', margin: '0 13px' }} onClick={deleteJob}><UserDeleteOutlined /> Delete Job</Button>
          <Button style={{ background: 'transparent', border: 'none', margin: '0 13px' }} onClick={showeditModal}><EditOutlined /> Edit Jobs</Button>
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
            dataSource={filteredDataSource}
            style={{ cursor: 'pointer' }}
            columns={columns}
            rowKey="id"
          />
        </div>
        <JobCreationForm isModalOpen={isModalOpen} showModal={showModal} setJobCreated={setJobCreated} />
        <Modal
          title="Job Edit Form"
          open={iseditModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="POST"
          cancelText="SAVE DRAFT"
          footer={null}

        >
          <div className="form-group">
            <div className="form-row">
              <div className="form-col">
                <div className='fieldOne'>
                  <label>Job Title</label>
                  <Input
                    type="text"
                    name="jobTitle"
                    value={selectedRows.jobTitle}
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
                  value={selectedRows.experience}
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
              value={selectedRows.jobDescription}
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
                  value={selectedRows.jobLocation}
                  onChange={handleChange}
                  placeholder="Type Job Location"
                />
              </div>
              <div className="form-col">
                <label>Job Expiry Date</label>
                <Input
                  type="date"
                  name="expiryDate"
                  value={selectedRows.expiryDate}
                  onChange={handleChange}
                  placeholder="Select Job Expiry Date"
                />
              </div>
            </div>
            <div>
              <div style={{ marginTop: '1rem', display:'flex', justifyContent:'flex-end'}}>
                <Button type='primary' style={{marginRight:'5px'}} onClick={handleDraft}>save draft</Button>
                <Button type='primary' onClick={handleOk}>post Job</Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}

export default Jobs;
