import React, { useState, useEffect, useRef } from 'react';
import './css/Timeline.css';
import { useNavigate } from "react-router-dom";
import TimeTableImage from "./images/Time table.png";
import CalendarImage from "./images/Calendar.png";
import TodoListImage from "./images/할 일 list.png";
import SettingImage from "./images/Setting.png";
import mapImage from "./images/map.png";
import recommendationImage from "./images/recommendation.png";
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

const TimelineMake = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(0);
    const [dates, setDates] = useState([]);
    const [reminders, setReminders] = useState([
        { id: 1, text: '집 가기 전에 토익 단어 50개 외우기', checked: true },
        { id: 2, text: 'CU 광교중앙점 삼각김밥 사오기', checked: true },
        { id: 3, text: '고양이 예방접종 예약', checked: false }
    ]);

    const [timeTable, setTimeTable] = useState([]);

    const dateScrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    useEffect(() => {
        const today = new Date();
        const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        const dateList = [];
        for (let i = -4; i <= 4; i++) {
            const newDate = new Date(today);
            newDate.setDate(today.getDate() + i);
            const isoDate = new Date(newDate.setHours(0, 0, 0, 0)).toISOString().split('T')[0]; // ISO 형식으로 변환
            dateList.push({
                day: days[newDate.getUTCDay()],
                date: newDate.getUTCDate(),
                fullDate: isoDate // YYYY-MM-DD 형식으로 변환
            }); //for부터 여기까지 수정함
        }
        setDates(dateList);
        setSelectedDate(4); // Today is in the middle of the list
    }, []);
    /*
        useEffect(() => {
            const loadEvents = () => {
                const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
                const today = new Date();
                today.setDate(today.getDate() + (selectedDate - 4)); // Adjust date based on selectedDate

                const eventsForSelectedDate = storedEvents.filter(event => {
                    const eventDate = new Date(event.fixedStartDay);
                    return eventDate.toDateString() === today.toDateString();
                });

                const timeTableEvents = eventsForSelectedDate.map(event => ({
                    startTime: event.fixedStartTime,
                    endTime: event.fixedEndTime,
                    event: event.fixedTitle,
                    category: event.categoryCode // Ensure categoryCode is included
                }));
                setTimeTable(timeTableEvents);
            };
            loadEvents();
        }, [selectedDate]);*/
    /*
    useEffect(() => {
        const loadEvents = async () => {
            if (dates.length > 0) {
                const selectedFullDate = dates[selectedDate].fullDate;
                try {
                    const response = await axios.get(`http://localhost:8080/api/fixed/date/${selectedFullDate}`);
                    const eventsForSelectedDate = response.data.map(event => ({
                        startTime: event.fixedStartTime,
                        endTime: event.fixedEndTime,
                        event: event.fixedTitle,
                        category: event.categoryCode // Ensure categoryCode is included
                    }));
                    setTimeTable(eventsForSelectedDate);
                } catch (error) {
                    console.error("일정을 가져오는 중 오류 발생:", error);
                    setTimeTable([]); // 오류가 발생하면 빈 배열로 설정
                }
            }
        };

        loadEvents();
    }, [selectedDate, dates]);*/

    useEffect(() => {
        const predefinedEvents = [
            {
                startTime: '09:30',
                endTime: '12:30',
                event: '인공지능 과제',
                category: 1
            },
            {
                startTime: '15:00',
                endTime: '16:00',
                event: '올리브영',
                category: 3
            },
            {
                startTime: '19:00',
                endTime: '20:00',
                event: '헬스장',
                category: 2
            },
            {
                startTime: '20:30',
                endTime: '21:30',
                event: '과외 준비',
                category: 2
            }
        ];

        const loadEvents = async () => {
            if (dates.length > 0) {
                const selectedFullDate = dates[selectedDate].fullDate;
                try {
                    const response = await axios.get(`http://localhost:8080/api/fixed/date/${selectedFullDate}`);
                    const fetchedEvents = response.data.map(event => ({
                        startTime: event.fixedStartTime,
                        endTime: event.fixedEndTime,
                        event: event.fixedTitle,
                        category: event.categoryCode // Ensure categoryCode is included
                    }));
                    const combinedEvents = [...fetchedEvents, ...predefinedEvents];
                    setTimeTable(combinedEvents);
                } catch (error) {
                    console.error("일정을 가져오는 중 오류 발생:", error);
                    setTimeTable(predefinedEvents); // 오류가 발생하면 미리 정의된 이벤트만 설정
                }
            }
        };

        loadEvents();
    }, [selectedDate, dates]);

    const goToTimeLine = () => {
        navigate('/timeLine');
    };

    const goToCalendarMake = () => {
        navigate('/MainMake');
    };

    const goToToDoList = () => {
        navigate('/ToDolist');
    };

    const goToReco=()=>{
        navigate('/Recommendation');
    }

    const goToSetting=()=>{
        navigate('/Setting');
    }

    const goToWalkingMap=()=>{
        navigate('/walkingMap')
    }

    const toggleReminder = (id) => {
        setReminders(reminders.map(reminder =>
            reminder.id === id ? { ...reminder, checked: !reminder.checked } : reminder
        ));
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - dateScrollRef.current.offsetLeft);
        setScrollLeft(dateScrollRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - dateScrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // scroll-fast
        dateScrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleTouchStart = (e) => {
        setIsDragging(true);
        setStartX(e.touches[0].pageX - dateScrollRef.current.offsetLeft);
        setScrollLeft(dateScrollRef.current.scrollLeft);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - dateScrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // scroll-fast
        dateScrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    const formatTime = (time) => {
        const [hour, minute] = time.split(':');
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minute} ${ampm}`;
    };

    const calculateTimeDifference = (startTime, endTime) => {
        const start = new Date(`1970-01-01T${startTime}Z`);
        const end = new Date(`1970-01-01T${endTime}Z`);
        return (end - start) / (1000 * 60); // minutes
    };

    const getCategoryColor = (categoryCode) => {
        return categoryColors[categoryCode] || '#DBE9CD'; // 기본 색상: 졸프
    };

    const getCategoryName = (categoryCode) => {
        return categoryNames[categoryCode] || '졸프';
    };

    // 새벽 1시부터 7시까지의 이벤트 필터링
    const filteredTimeTable = timeTable.filter(item => {
        const [hour] = item.startTime.split(':');
        return parseInt(hour) >= 7 || parseInt(hour) === 0;
    });

    return (
        <div className="timeline-gray-box">
            {/* 일정 헤더 */}
            <div className="timeline-header">
                <p className="timeline-title">타임라인</p>

                {/* 우측 상단 이미지 */}
                <div className="timeline-top-right-images">
                    <img id="connection-map" src={mapImage} alt="map" onClick={goToWalkingMap}/>
                    <img id="connection-recommendation" src={recommendationImage} alt="recommendation" onClick={goToReco}/>
                </div>
            </div>

            {/* 날짜 선택 */}
            <div
                className="timeline-date-selector"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div className="date-scroll" ref={dateScrollRef}>
                    {dates.map((date, index) => (
                        <div
                            key={index}
                            className={`timeline-date-item ${index === selectedDate ? 'selected' : ''}`}
                            onClick={() => setSelectedDate(index)}
                        >
                            <p>{date.day}</p>
                            <p>{date.date}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 리마인더 체크리스트 */}
            <div className="timeline-reminder-box">
                <div className="timeline-task-list">
                    {reminders.map(reminder => (
                        <div className="timeline-task" key={reminder.id}>
                            <input
                                type="checkbox"
                                checked={reminder.checked}
                                onChange={() => toggleReminder(reminder.id)}
                            />
                            <span>{reminder.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 타임 테이블 */}
            <div className="timeline-timetable-container">
                <div className="timeline-timetable">
                    {[...Array(17)].map((_, hour) => (
                        <div className="timeline-hour" key={hour}>
                            <div className="timeline-half-hour">
                                <div className="timeline-time-label">{formatTime(`${hour + 7}:00`)}</div>
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
                                                    height: `${duration * 1.4}px`, // Each minute is 2 pixels
                                                    backgroundColor: getCategoryColor(item.category)
                                                }}
                                            >
                                                <div className="event-title">{item.event}</div>
                                                <div className="event-time">
                                                    {formatTime(item.startTime)} - {formatTime(item.endTime)}
                                                </div>
                                                <div className="event-category-container">
                                                    <div className="event-category">{getCategoryName(item.category)}</div>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                            <div className="timeline-half-hour">
                                <div className="timeline-time-label">{formatTime(`${hour + 7}:30`)}</div>
                                {filteredTimeTable.map((item, index) => {
                                    const [startHour, startMinute] = item.startTime.split(':').map(Number);
                                    if (startHour === hour + 7 && startMinute > 30) {
                                        const duration = calculateTimeDifference(item.startTime, item.endTime);
                                        return (
                                            <div
                                                className="timeline-event"
                                                key={index}
                                                style={{
                                                    top: `${startMinute}px`,
                                                    height: `${duration * 2}px`, // Each minute is 2 pixels
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

            {/* 하단 메뉴 바 */}
            <div className="menu">
                <div className="menu-details">
                    <img className="TimeTableImage" src={TimeTableImage} alt="Time Table" onClick={goToTimeLine} />
                    <p>Time table</p>
                </div>
                <div className="menu-details">
                    <img className="CalendarImage" src={CalendarImage} alt="Calendar" onClick={goToCalendarMake} />
                    <p>Calendar</p>
                </div>
                <div className="menu-details">
                    <img className="TodoListImage" src={TodoListImage} alt="To Do List" onClick={goToToDoList} />
                    <p>To Do list</p>
                </div>
                <div className="menu-details">
                    <img className="SettingImage" src={SettingImage} alt="Setting" onClick={goToSetting}/>
                    <p>Setting</p>
                </div>
            </div>
        </div>
    );
};

export default TimelineMake;
