import React, { useState, useEffect } from 'react';
import './css/recommendation.css';
import { useNavigate } from "react-router-dom";
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
/*
const RecommendationPage = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(0);
    const [dates, setDates] = useState([]);
    const [recommendedSchedules, setRecommendedSchedules] = useState([]); // 유동 스케줄 데이터 상태
    const [isLoading, setLoading] = useState(false); // 로딩 상태를 저장할 상태 변수

    const [timeTable, setTimeTable] = useState([]);
    */

/*
    const goToRecoIng = async () => {
        try {

            // 백엔드로부터 유동 스케줄 데이터를 받아오는 비동기 함수 호출
            const response = await fetch('백엔드 API 주소');
            if (!response.ok) {
                throw new Error('유동 스케줄 데이터를 가져오는데 실패했습니다.');
            }
            const data = await response.json();
            // 받아온 데이터를 상태로 설정
            setRecommendedSchedules(data);
            // RecoIng 컴포넌트로 이동
            navigate('/RecoIng'); // RecoIng 컴포넌트의 경로에 맞게 수정
        } catch (error) {
            console.error('Error fetching recommended schedules:', error.message);
        }
    };
    */
/*
    useEffect(() => {
        const today = new Date();
        const dateList = [];
        for (let i = -4; i <= 4; i++) {
            const newDate = new Date(today);
            newDate.setDate(today.getDate() + i);
            dateList.push({
                date: newDate.getDate()
            });
        }
        setDates(dateList);
        setSelectedDate(4); // Today is in the middle of the list
    }, []);

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
    }, [selectedDate]);
*/
const RecommendationPage = () => {
    const navigate = useNavigate();
    const [timeTable, setTimeTable] = useState([]);
    const [isLoading, setLoading] = useState(false); // 로딩 상태를 저장할 상태 변수

    useEffect(() => {
        const fetchTodaySchedules = async () => {
            const today = new Date().toISOString().split('T')[0];
            try {
                const response = await axios.get(`http://localhost:8080/api/fixed/date/${today}`);
                const eventsForToday = response.data.map(event => ({
                    startTime: event.fixedStartTime,
                    endTime: event.fixedEndTime,
                    event: event.fixedTitle,
                    category: event.categoryCode,
                    place: event.placeName // Ensure placeName is included
                }));
                setTimeTable(eventsForToday);
            } catch (error) {
                console.error('일정을 가져오는 중 오류 발생:', error);
            }
        };

        fetchTodaySchedules();
    }, []);

    const goToRecoIng = () => {
        navigate('/RecoIng');
    };

    const goToTimeLine = () => {
        navigate('/timeLine');
    };

    const goToCalendar = () => {
        navigate('/Main');
    };

    const goToToDoList = () => {
        navigate('/ToDolist');
    };

    const goToSetting=()=>{
        navigate('/Setting');
    }

    const goToRecoIngMake = () => {
        // 페이지 이동 전에 로딩 상태를 설정합니다.
        // 이 예시에서는 setLoading 함수를 통해 로딩 상태를 변경합니다.
        setLoading(true);

        // setTimeout 함수를 사용하여 일정 시간이 지난 후에 페이지 이동을 수행합니다.
        setTimeout(() => {
            navigate('/RecoIngMake');
        }, 2000); // 2000밀리초(2초) 후에 페이지 이동

        // setTimeout 함수를 사용하여 임의로 추가한 로딩 시간이 지난 후에 로딩 상태를 해제할 수 있습니다.
        setTimeout(() => {
            setLoading(false);
        }, 2500); // 2500밀리초(2.5초) 후에 로딩 상태 해제
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
        <div className="reco-gray-box">
            <button type="button" className="reco-back-button" onClick={() => window.history.back()}>
                &lt;
            </button>
            <button type="submit" className="reco-submit" form="reco-form" onClick={goToRecoIngMake}>추천</button>
            {/* 타임 테이블 */}
            <div className="reco-timetable-container">
                <div className="reco-timetable">
                    {[...Array(17)].map((_, hour) => (
                        <div className="reco-hour" key={hour}>
                            <div className="reco-half-hour">
                                <div className="reco-time-label">{formatTime(`${hour + 7}:00`)}</div>
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
                                                    <div
                                                        className="event-category">{getCategoryName(item.category)}</div>
                                                    <div className="event-place">{item.place}</div> {/* 장소 표시 */}
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                            <div className="reco-half-hour">
                                <div className="reco-time-label">{formatTime(`${hour + 7}:30`)}</div>
                                {filteredTimeTable.map((item, index) => {
                                    const [startHour, startMinute] = item.startTime.split(':').map(Number);
                                    if (startHour === hour + 7 && startMinute > 30) {
                                        const duration = calculateTimeDifference(item.startTime, item.endTime);
                                        return (
                                            <div
                                                className="reco-event"
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
                                                <div className="event-place">{item.place}</div> {/* 장소 표시 */}
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
                    <img className="TimeTableImage" src={TimeTableImage} alt="Time Table" onClick={goToTimeLine}/>
                    <p>Time table</p>
                </div>
                <div className="menu-details">
                    <img className="CalendarImage" src={CalendarImage} alt="Calendar" onClick={goToCalendar}/>
                    <p>Calendar</p>
                </div>
                <div className="menu-details">
                    <img className="TodoListImage" src={TodoListImage} alt="To Do List" onClick={goToToDoList}/>
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

export default RecommendationPage;