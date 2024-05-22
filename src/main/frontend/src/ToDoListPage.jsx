import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaStar, FaRegStar } from 'react-icons/fa';
import './css/todoList.css';
import TimeTableImage from "./images/Time table.png";
import CalendarImage from "./images/Calendar.png";
import TodoListImage from "./images/할 일 list.png";
import SettingImage from "./images/Setting.png";
import AddImage from "./images/plus.png";
import axios from 'axios';

const ToDoListPage = () => {
    const [schedules, setSchedules] = useState([]);
    const navigate = useNavigate();

    const categoryMap = {
        0: '졸프',
        1: '약속',
        2: '예약',
        3: '수업'
    };
/*
    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
        const flexibleSchedules = storedEvents.filter(event => event.flexTitle); // Filter flexible schedules
        const sortedSchedules = flexibleSchedules.sort((a, b) => {
            const dateA = new Date(a.flexDeadline);
            const dateB = new Date(b.flexDeadline);
            return dateA - dateB;
        });
        setSchedules(sortedSchedules);
    }, []);

    const handleDelete = (index) => {
        const updatedSchedules = schedules.filter((_, i) => i !== index);
        setSchedules(updatedSchedules);
        localStorage.setItem('events', JSON.stringify(updatedSchedules));
    };*/
    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/unfixed-schedules');
                setSchedules(response.data);
            } catch (error) {
                console.error('Error fetching schedules:', error);
            }
        };

        fetchSchedules();
    }, []);
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/unfixed-schedules/${id}`);
            setSchedules(schedules.filter(schedule => schedule.unfixedCode !== id));
        } catch (error) {
            console.error('Error deleting schedule:', error);
        }
    };


    const handleEdit = (index) => {
        navigate(`/edit/${index}`);
    };

    const goToTimeLine = () => {
        navigate('/timeLine');
    };

    const goToCalendar = () => {
        navigate('/Main');
    };

    const goToToDoList = () => {
        navigate('/ToDoList');
    };

    const goToSetting=()=>{
        navigate('/Setting');
    }

    const goToAddFlexSchedule = () => {
        navigate('/addFlexSchedule')
    }

    const renderStars = (importance) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < importance) {
                stars.push(<FaStar key={i} style={{ color: '#80A160' }} />);
            } else {
                stars.push(<FaRegStar key={i} style={{ color: 'gray' }} />);
            }
        }
        return stars;
    }

    return (
        <div className="todolist-gray-box">
            {/* 할 일 리스트 헤더 */}
            <div className="todolist-header">
                <p className="todolist-title">할 일 리스트</p>
            </div>

            <div className="flexible-schedule-header">
                <span>유동스케줄</span>
                <img className="AddImage" src={AddImage} alt="Add" onClick={goToAddFlexSchedule} />
            </div>

            {/* 할 일 리스트 본문 */}
            <div className="todolist-content">
                <div className="todolist-schedule-container">
                    {schedules.map((schedule, index) => (
                        <div key={index} className="todo-item">
                            <div className="todo-header">
                                <h3>{schedule.unfixedTitle}</h3>
                                <div className="todo-actions">
                                    <FaEdit onClick={() => handleEdit(schedule.unfixedCode)} />
                                    <FaTrash onClick={() => handleDelete(schedule.unfixedCode)} />
                                </div>
                            </div>
                            <div className="todo-details">
                                <p>예상 소요시간: {schedule.unfixedTime}</p>
                                <p>마감기한: {schedule.unfixedDeadline}</p>
                                <p>중요도: {renderStars(schedule.unfixedImportance)}</p>
                                <p>카테고리: {schedule.categoryId !== null ? categoryMap[schedule.categoryId] : '졸프'}</p>
                                <p>장소: {schedule.placeId}</p>
                                <p>메모: {schedule.unfixedMemo}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 하단 메뉴 바 */}
            <div className="menu">
                <div className="menu-details">
                    <img className="TimeTableImage" src={TimeTableImage} alt="Time Table" onClick={goToTimeLine} />
                    <p>Time table</p>
                </div>
                <div className="menu-details">
                    <img className="CalendarImage" src={CalendarImage} alt="Calendar" onClick={goToCalendar} />
                    <p>Calendar</p>
                </div>
                <div className="menu-details">
                    <img className="TodoListImage" src={TodoListImage} alt="To Do List" onClick={goToToDoList} />
                    <p>To Do list</p>
                </div>
                <div className="menu-details">
                    <img className="SettingImage" src={SettingImage} alt="Setting" onClick={goToSetting} />
                    <p>Setting</p>
                </div>
            </div>
        </div>
    );
};

export default ToDoListPage;
