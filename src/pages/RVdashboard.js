import Kanbannav from "../components/usermanagement/Kanbannav";
import { useState, useEffect } from "react";
import { Tooltip, Legend, Area, Cell, Pie, PieChart, Radar, PolarRadiusAxis, PolarAngleAxis, PolarGrid, RadarChart, YAxis, XAxis, CartesianGrid, AreaChart, Line, LineChart } from 'recharts';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../../node_modules/@fullcalendar/daygrid/main.css'
import '../../node_modules/@fullcalendar/timegrid/main.css'
import './RVdashboard.css'
import { Popover, Overlay } from 'react-bootstrap';
import { ResponsiveContainer, FunnelChart, Funnel, LabelList } from 'recharts';
import { Link } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import DirectionsWalkSharpIcon from '@mui/icons-material/DirectionsWalkSharp';
import axios from 'axios';
 
 
const interviewEvents = [
    {
      title: 'Sudharsan',
      start: '2024-06-13T14:30:00'
    },
    {
        title: 'John Doe',
        url: 'https://google.com/',
        start: '2024-06-13',
    },
    {
      title: 'Nishadharan',
      start: '2024-06-19T17:00:00'
    },
    {
      title: 'Jane Smith',
      start: '2024-06-19'
    },
  ];
 
const funnel_data = [
    {
      "value": 100,
      "name": "Assigned",
      "fill": "#8884d8"
    },
    {
      "value": 80,
      "name": "Tech",
      "fill": "#83a6ed"
    },
    {
      "value": 50,
      "name": "Processed",
      "fill": "#8dd1e1"
    },
    {
      "value": 40,
      "name": "Completed",
      "fill": "#82ca9d"
    },
  ]
 
  const doughnutData = [
    { name: 'Yet to Start', value: 8 },
    { name: 'Shortlisted', value: 3 },
    { name: 'Not Shortlisted', value: 5 },
];
 
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
 
const radarData = [
  { role: 'Orc Tech', count: 120 },
  { role: 'Java FSD', count: 98 },
  { role: 'Orc DBA', count: 86 },
  { role: 'Orc Finance', count: 99 },
  { role: 'Orc HRMS', count: 85 },
  { role: 'Orc SCM', count: 65 },
  { role: 'Fresher', count: 50}
];
 
const areaChartData = [
  { month: 'Jan', Assigned: 30, Scheduled: 20, Selected: 10 },
  { month: 'Feb', Assigned: 50, Scheduled: 30, Selected: 20 },
  { month: 'Mar', Assigned: 45, Scheduled: 35, Selected: 25 },
  { month: 'Apr', Assigned: 60, Scheduled: 50, Selected: 40 },
  { month: 'May', Assigned: 70, Scheduled: 60, Selected: 50 },
  { month: 'Jun', Assigned: 80, Scheduled: 70, Selected: 60 },
  { month: 'Jul', Assigned: 75, Scheduled: 65, Selected: 55 },
  { month: 'Aug', Assigned: 85, Scheduled: 75, Selected: 65 },
  { month: 'Sep', Assigned: 95, Scheduled: 85, Selected: 75 },
  { month: 'Oct', Assigned: 100, Scheduled: 90, Selected: 80 },
  { month: 'Nov', Assigned: 85, Scheduled: 70, Selected: 55 },
  { month: 'Dec', Assigned: 90, Scheduled: 80, Selected: 70 },
];
 
const lineChartData = [
  { month: 'Jan', hiringRate: 5 },
  { month: 'Feb', hiringRate: 10 },
  { month: 'Mar', hiringRate: 8 },
  { month: 'Apr', hiringRate: 15 },
  { month: 'May', hiringRate: 20 },
  { month: 'Jun', hiringRate: 25 },
  { month: 'Jul', hiringRate: 18 },
  { month: 'Aug', hiringRate: 30 },
  { month: 'Sep', hiringRate: 28 },
  { month: 'Oct', hiringRate: 35 },
  { month: 'Nov', hiringRate: 40 },
  { month: 'Dec', hiringRate: 50 },
];
 
export default function RVdashboard (){
   
    const [target, setTarget] = useState(null);
    const [showPopover, setShowPopover] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [data1, setData1] = useState(null);
    const [data2, setData2] = useState(null);
    const [data3, setData3] = useState(null);
    const [data4, setData4] = useState(null);
    const [data5, setData5] = useState(null);
    const [data6, setData6] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
 
  const accessToken = localStorage.getItem('accessToken');
const config = {
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
};

  const fetchData1 = async () => {
    try {
      const response = await axios.get('https://hireflowapidev.focusrtech.com:90/hiring/entryLevel/calender');
      setData1(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData2 = async () => {
    try {
      const response = await axios.get('https://hireflowapidev.focusrtech.com:90/hiring/entryLevel/kanbancount',config);
      setData2(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData3 = async () => {
    try {
      const response = await axios.get('https://hireflowapidev.focusrtech.com:90/hiring/entryLevel/jobrolecount',config);
      setData3(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData4 = async () => {
    try {
      const response = await axios.get('https://hireflowapidev.focusrtech.com:90/hiring/entryLevel/walkincount',config);
      setData4(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
 
  const fetchData5 = async () => {
    try {
      const response = await axios.get('https://hireflowapidev.focusrtech.com:90/hiring/entryLevel/HRRPerformace',config);
      setData5(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchData6 = async () => {
    try {
      const response = await axios.get('https://hireflowapidev.focusrtech.com:90/hiring/entryLevel/HiringRate',config);
      setData6(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    fetchData1();
    fetchData2();
    fetchData3();
    fetchData4();
    fetchData5();
    fetchData6();
  }, []);
 
     
    return (
        <>
        <Kanbannav/>
        <div className="content">
        <div className="widgets">
            <div className="calendar-widget">
        <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={data1}
              height={450}
              eventColor="#378006"
            />
        </div>
        <div className="chart-container">
        <div className="funnel-chart-widget">
            <div className="widget-title">Kanban Status</div>
            <ResponsiveContainer width="100%" height={300}>
        <FunnelChart>
            <Tooltip />
            <Funnel
                dataKey="value"
                data={data2}
                isAnimationActive
            >
            <LabelList position="right" fill="#000" stroke="none" dataKey="name" style={{ fontSize: '0.85em' }}  />
            </Funnel>
        </FunnelChart>
        </ResponsiveContainer>
        <Link  style={{ display:'flex', alignItems:'center', justifyContent:'center'}} to="../kanban-recruit">Go to Kanban<LaunchIcon style={{marginLeft:'10px'}}/></Link>
        </div>
                    <div className="radar-chart-widget">
                            <div className="widget-title">Job Roles</div>
                            <ResponsiveContainer width="100%" height={300}>
                                <RadarChart outerRadius="80%" data={data3}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="role" />
                                    <PolarRadiusAxis angle={15} />
                                    <Radar name="Count" dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                    <Tooltip />
                                    <Legend />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="half-widget">
              <div className="card" style={{marginBottom: "10px"}}>
                <div className="card-icon">
                  <DirectionsWalkSharpIcon style={{ fontSize: 60, color: 'white' }}/>
                </div>
                <div className="card-content">
                  <div className="card-title">Walk-in Count</div>
                  <div className="card-count">{data4}</div>
                </div>
              </div>
              <div className="doughnut-chart-widget">
  <div className="widget-title">Tech Interviewer Status</div>
  <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={doughnutData}
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {doughnutData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
</div>
 
                   
                        </div>
                    </div>
                    <div className="area-chart-widget widget-wide">
                        <div className="widget-title">HRR Performance</div>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={data5}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Area type="monotone" dataKey="Assigned" stackId="1" stroke="#8884d8" fill="#8884d8" />
                                <Area type="monotone" dataKey="Scheduled" stackId="1" stroke="#83a6ed" fill="#83a6ed" />
                                <Area type="monotone" dataKey="Selected" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="line-chart-widget">
                            <div className="widget-title">Hiring Rate Over Time</div>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={data6}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="hiringRate" stroke="#8884d8" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
        </div>
        </div>
        </>
    )
   
}