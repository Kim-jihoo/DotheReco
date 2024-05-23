import React, { useState, useEffect } from 'react';
import './css/recoIng.css';
import { useNavigate, useLocation } from "react-router-dom";
import TimeTableImage from "./images/Time table.png";
import CalendarImage from "./images/Calendar.png";
import TodoListImage from "./images/할 일 list.png";
import SettingImage from "./images/Setting.png";
import axios from 'axios';

// 카테고리별 색상 정의
const categoryColors = {
    1: '#F0CAB9', // 약속
    2: '#FAE4A8', // 예약
    3: '#B9DEF0', // 수업
    // 추가 카테고리와 색상을 여기에 정의
};

const categoryNames = {
    0: '졸프',
    1: '약속',
    2: '예약',
    3: '수업'
};

const RecoIng = ({ recommendedSchedules }) => {
    const navigate = useNavigate();
    const location = useLocation(); // useLocation 훅 사용하여 location 변수 정의
    //const [dates, setDates] = useState([]);
    const [timeTable, setTimeTable] = useState([]);
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [schedules, setSchedules] = useState([]);
    const [selectedSchedules, setSelectedSchedules] = useState([]);
/*
    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
        const flexibleSchedules = storedEvents.filter(event => event.flexTitle);
        const sortedSchedules = flexibleSchedules.sort((a, b) => {
            const dateA = new Date(a.flexDeadline);
            const dateB = new Date(b.flexDeadline);
            return dateA - dateB;
        });
        setSchedules(sortedSchedules);
    }, []);

    useEffect(() => {
        const loadEvents = () => {
            const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
            const today = new Date();
            const eventsForSelectedDate = storedEvents.filter(event => {
                const eventDate = new Date(event.fixedStartDay);
                return eventDate.toDateString() === today.toDateString();
            });

            const timeTableEvents = eventsForSelectedDate.map(event => ({
                startTime: event.fixedStartTime,
                endTime: event.fixedEndTime,
                event: event.fixedTitle,
                category: event.categoryCode
            }));
            setTimeTable(timeTableEvents);
        };
        loadEvents();
    }, []);
*/
    useEffect(() => {
        if (!location.state?.todayEvents) {
            const fetchTodaySchedules = async () => {
                const today = new Date().toISOString().split('T')[0];
                console.log("Fetching schedules for date:", today); // 요청 날짜를 로그로 확인
                try {
                    const response = await axios.get(`http://localhost:8080/api/fixed/date/${today}`);
                    console.log("Response data:", response.data); // 응답 데이터를 로그로 확인
                    const eventsForToday = response.data.map(event => ({
                        startTime: event.fixedStartTime,
                        endTime: event.fixedEndTime,
                        event: event.fixedTitle,
                        category: event.categoryCode
                    }));
                    setTimeTable(eventsForToday);
                } catch (error) {
                    console.error('일정을 가져오는 중 오류 발생:', error);
                }
            };

            fetchTodaySchedules();
        }
    }, [location.state]);

    const goToTimeLine = () => {
        navigate('/timeLine');
    };

    const goToCalendar = () => {
        navigate('/Main');
    };

    const goToToDoList = () => {
        navigate('/ToDolist');
    };

    const goToSetting = () => {
        navigate('/Setting');
    }

    const formatTime = (time) => {
        const [hour, minute] = time.split(':');
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minute} ${ampm}`;
    };

    const calculateTimeDifference = (startTime, endTime) => {
        const start = new Date(`1970-01-01T${startTime}Z`);
        const end = new Date(`1970-01-01T${endTime}Z`);
        return (end - start) / (1000 * 60);
    };

    const getCategoryColor = (categoryCode) => {
        return categoryColors[categoryCode] || '#DBE9CD';
    };

    const getCategoryName = (categoryCode) => {
        return categoryNames[categoryCode] || '졸프';
    };

    const filteredTimeTable = timeTable.filter(item => {
        const [hour] = item.startTime.split(':');
        return parseInt(hour) >= 7 || parseInt(hour) === 0;
    });

    const toggleSideBar = () => {
        setIsSideBarOpen(!isSideBarOpen);
    };

    const closeSideBar = () => {
        setIsSideBarOpen(false);
    };

    const handleScheduleChange = (index) => {
        const updatedSelectedSchedules = [...selectedSchedules];
        if (updatedSelectedSchedules.includes(index)) {
            const scheduleIndex = updatedSelectedSchedules.indexOf(index);
            updatedSelectedSchedules.splice(scheduleIndex, 1);
        } else {
            updatedSelectedSchedules.push(index);
        }
        setSelectedSchedules(updatedSelectedSchedules);
    };


    return (
        <div className={`recoing-gray-box ${isSideBarOpen ? 'sidebar-open' : ''}`}>
            <button type="button" className="recoing-back-button" onClick={() => window.history.back()}>
                &lt;
            </button>
            <button type="button" className="recoing-edit-submit" onClick={toggleSideBar}>
                수정
            </button>
            <button type="submit" className="recoing-submit" form="reco-form">추천</button>
            <button type="submit" className="recoing-complete-submit" form="reco-form" onClick={goToTimeLine}>완료</button>

            {/* 타임 테이블 */}
            <div className="recoing-timetable-container">
                <div className="recoing-timetable">
                    {[...Array(17)].map((_, hour) => (
                        <div className="recoing-hour" key={hour}>
                            <div className="recoing-half-hour">
                                <div className="recoing-time-label">{formatTime(`${hour + 7}:00`)}</div>
                                {filteredTimeTable.map((item, index) => {
                                    const [startHour, startMinute] = item.startTime.split(':').map(Number);
                                    const [endHour, endMinute] = item.endTime.split(':').map(Number);
                                    if (startHour === hour + 7 && startMinute <= 30) {
                                        const duration = calculateTimeDifference(item.startTime, item.endTime);
                                        return (
                                            <div
                                                className="timeline-event"
                                                key={index}
                                                style={{
                                                    top: `${startMinute}px`,
                                                    height: `${duration * 1.4}px`,
                                                    backgroundColor: getCategoryColor(item.category)
                                                }}
                                            >
                                                <div className="event-title">{item.event}</div>
                                                <div className="event-time">
                                                    {formatTime(item.startTime)} - {formatTime(item.endTime)}
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                            <div className="recoing-half-hour">
                                <div className="recoing-time-label">{formatTime(`${hour + 7}:30`)}</div>
                                {filteredTimeTable.map((item, index) => {
                                    const [startHour, startMinute] = item.startTime.split(':').map(Number);
                                    const [endHour, endMinute] = item.endTime.split(':').map(Number);
                                    if (startHour === hour + 7 && startMinute > 30) {
                                        const duration = calculateTimeDifference(item.startTime, item.endTime);
                                        return (
                                            <div
                                                className="timeline-event"
                                                key={index}
                                                style={{
                                                    top: `${startMinute}px`,
                                                    height: `${duration * 1.4}px`,
                                                    backgroundColor: getCategoryColor(item.category)
                                                }}
                                            >
                                                <div className="event-title">{item.event}</div>
                                                <div className="event-time">
                                                    {formatTime(item.startTime)} - {formatTime(item.endTime)}
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 사이드바 */}
            <div className={`sidebar ${isSideBarOpen ? 'open' : ''}`}>
                <div className="sidebar-content">
                    <h2 className="reco-sidebar-flex">유동 스케줄</h2>
                    <ul className="schedule-list">
                        {schedules.map((schedule, index) => (
                            <li key={index} className="schedule-item">
                                {schedule.flexTitle}
                                <input
                                    type="checkbox"
                                    checked={selectedSchedules.includes(index)}
                                    onChange={() => handleScheduleChange(index)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* 하단 메뉴 바 */}
            <div className="menu">
                <div className="menu-details" onClick={goToTimeLine}>
                    <img className="TimeTableImage" src={TimeTableImage} alt="Time Table"/>
                    <p>Time table</p>
                </div>
                <div className="menu-details" onClick={goToCalendar}>
                    <img className="CalendarImage" src={CalendarImage} alt="Calendar"/>
                    <p>Calendar</p>
                </div>
                <div className="menu-details" onClick={goToToDoList}>
                    <img className="TodoListImage" src={TodoListImage} alt="To Do List"/>
                    <p>To Do list</p>
                </div>
                <div className="menu-details" onClick={goToSetting}>
                    <img className="SettingImage" src={SettingImage} alt="Setting"/>
                    <p>Setting</p>
                </div>
            </div>

            {/* 화면을 클릭하면 사이드바 닫기 */}
            {isSideBarOpen && <div className="sidebar-overlay" onClick={closeSideBar}></div>}
        </div>
    );
};

export default RecoIng;
