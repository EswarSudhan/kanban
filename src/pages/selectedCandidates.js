// import React from 'react';
// import LongCardTable from './LongCardTable'; // Assuming LongCardTable component is in a separate file

// function MyPage() {
//   return (
//     <div className="container">
//       <h1 className="pageTitle">Selected Candidates</h1>
//       <LongCardTable
//         apiUrl="https://hireflowapi.focusrtech.com:90/hiring/auth/getselectedCandidate"
//         columns={['RES-ID', 'Name', 'HRR', 'Interviewers', 'finalRemarks']}
//       />
//       <style jsx>{`
//         .container {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           padding: 20px;
//         }
//         .pageTitle {
//           font-size: 24px;
//           margin-bottom: 20px;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default MyPage;

import React from 'react';
import LongCardTable from './LongCardTable';
import './selectedCandidates.css'
import { useState } from 'react';
import { Input } from 'antd';
 
function MyPage() {
  const [searchValue, setSearchValue] = useState("");
 
  return (
    <div className="container">
      <h1 className="pageTitle">Selected Candidates</h1>
    <div style={{width:"100%", display:'flex'}}>
      <div className="search" >
                <Input.Search
                style={{ width: '25%' }}
                placeholder="Search..."
                onChange={(e) => setSearchValue(e.target.value)}
                />
      </div>
      </div>
     
      <LongCardTable
        apiUrl="https://hireflowapi.focusrtech.com:90/hiring/auth/getselectedCandidate"
        columns={['RES-ID', 'Name', 'HRR', 'Interviewers', 'finalRemarks']}
        searchValue = {searchValue}
      />
    </div>
  );
}
 
export default MyPage;
