import React from 'react';
import { CloudDownloadOutlined } from '@ant-design/icons';

const WebUserAvatar = ({ selectedCandidates, handleDownload}) => {
  // Get the first letter of the username
  const firstLetter = selectedCandidates.name.charAt(0).toUpperCase();

  //   Style for the avatar container
  const avatarContainerStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  // Style for the avatar
  const avatarStyle = {
    backgroundColor: '#d9e7fc',
    color: '#0e2445',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '24px',
    marginRight: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    // border: '2px solid #007bff', // Add a border
    textTransform: 'uppercase', // Ensure consistent casing
  };

  const bottomHeaderItem={
    fontWeight:'none'
  }

  return (
    <div style={avatarContainerStyle}>

      <div style={avatarStyle}>
        {firstLetter}
      </div>
      <div>
        <span>{selectedCandidates.name}</span>
        <div className='bottom-header-item-container'>
          <span className='bottom-header-item1'>{selectedCandidates.resumeId}</span>
          
          <span className='bottom-header-item'>{selectedCandidates.jobRole}</span>
          
          <span className='bottom-header-item'><CloudDownloadOutlined onClick={()=>handleDownload(selectedCandidates.resumeId)}/></span>

          
        </div>
      </div>
    </div>
  );
};

export default WebUserAvatar;
