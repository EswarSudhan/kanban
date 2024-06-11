import './tab.css';
import { useState } from 'react';

const Tab = ({ items }) => {

    const [selectedTab, setSelectedTab] = useState("1");

    const handleTabClick = (key) => {
        console.log('key', key);
        setSelectedTab(key);
    }

    return (
        <>       
         <div className='tab-container'>

            <ul >
                {items.map((item) => (
                    <li
                        key={item.key}
                        className={item.key === selectedTab ? "selected-list" : "tab-list"}
                        onClick={() => handleTabClick(item.key)}
                    >
                        {item.label}
                    </li>
                ))}
            </ul>
            <div className='tab-content-container'>
                {items.map((item) => (
                    item.key === selectedTab && (
                        <div key={item.key} className='show-content'>
                            {item.children}
                        </div>
                    )
                ))}
            </div>
        </div>
        </>

    )

}

export default Tab;

