import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import './css/main.css';
import searchImage from './images/search.png';
import addScheduleImage from './images/addSchedule.png';
import SettingImage from './images/Setting.png';
import TimeTableImage from './images/Time table.png';
import CalendarImage from './images/Calendar.png';
import TodoListImage from './images/할 일 list.png';
import axios from 'axios';

const Main = () => {
    const [date, setDate] = useState(new Date());
    const [mini_date, mini_setDate] = useState(new Date());
    const [selectedMiniDates, setSelectedMiniDates] = useState([]);
    const navigate = useNavigate();
    const [isDragging, setIsDragging] = useState(false);
    const selectedDatesRef = useRef(new Set());
    const [events, setEvents] = useState([]);
    const location = useLocation();

    const [showEstimatedPicker, setShowEstimatedPicker] = useState(false);
    const [selectedEstimated, setSelectedEstimated] = useState('');

    //  const [recommendedSlots, setRecommendedSlots] = useState([]); /////

    const [recommendedTimes, setRecommendedTimes] = useState([]); // 추천된 시간대를 저장하는 상태


    const getCategoryColor = (categoryCode) => {
        // 카테고리 코드에 따라 다른 색상을 반환
        switch (categoryCode) {
            case '과제':
                return '#F0CAB9'; // 카테고리 코드 1에 대한 색상
            case 2:
                return '#FAE4A8'; // 카테고리 코드 2에 대한 색상
            case 3:
                return '#B9DEF0' //카테고리 코드 3에 대한 색상
            default:
                return '#DBE9CD'; // 기본 색상
        }
    };
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/fixed');
                setEvents(response.data);
            } catch (error) {
                console.error('일정을 가져오는 중 오류 발생:', error);
            }
        };

        fetchEvents();
    }, []);

    /*
// 외부 페이지에서 전달받은 데이터 처리
    useEffect(() => {
        // 기존 이벤트 목록을 가져옵니다.
        const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
        setEvents(storedEvents);

        // 새로운 이벤트가 전달되었는지 확인하고, 이벤트 목록에 추가
        if (location.state && location.state.newEvent) {
            const newEvent = location.state.newEvent;
            // 이미 같은 날짜에 해당하는 이벤트가 있는지 확인합니다.
            const existingEvent = storedEvents.find(event => {
                const eventStartDate = new Date(event.fixedStartDay);
                const newEventStartDate = new Date(newEvent.fixedStartDay);
                return eventStartDate.toDateString() === newEventStartDate.toDateString();
            });
            // 중복된 이벤트가 없는 경우에만 추가합니다.
            if (!existingEvent) {
                const updatedEvents = [...storedEvents, newEvent];
                setEvents(updatedEvents);
                localStorage.setItem('events', JSON.stringify(updatedEvents));
            }
        }
    }, [location.state]);
*/
    useEffect(() => {
        // 외부 페이지에서 전달받은 데이터 처리
        if (location.state && location.state.newEvent) {
            const newEvent = location.state.newEvent;
            setEvents(prevEvents => [...prevEvents, newEvent]);
            // 상태 초기화
            navigate(location.pathname, { replace: true });
        }
    }, [location.state?.newEvent]);
    const renderCalendar = () => {
        // 현재 날짜와 이벤트 목록을 가져옵니다.
        const viewYear = date.getFullYear();
        const viewMonth = date.getMonth();
        const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
        const startDay = new Date(viewYear, viewMonth, 1).getDay();

        const days = [];
        // 캘린더에 빈 칸을 추가합니다.
        for (let i = 0; i < startDay; i++) {
            days.push('');
        }

        // 캘린더에 해당 월의 날짜를 추가합니다.
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }

        // 캘린더에 빈 칸을 추가하여 행을 완성합니다.
        const remainingDays = 7 - (days.length % 7);
        if (remainingDays < 7) {
            for (let i = 0; i < remainingDays; i++) {
                days.push('');
            }
        }

        // 각 날짜를 렌더링합니다.
        return days.map((day, index) => {
            const currentDate = new Date(viewYear, viewMonth, day);
            const isToday = new Date().toDateString() === currentDate.toDateString();
            const flexEvents = events.filter(event => event.flexDeadline && new Date(event.flexDeadline).toDateString() === currentDate.toDateString());
            const eventList = events.filter(event => {
                const eventStartDate = new Date(event.fixedStartDay);
                return eventStartDate.toDateString() === currentDate.toDateString();
            }).sort((a, b) => {
                // 이벤트를 시작 시간 순으로 정렬합니다.
                const aStartTime = new Date(`${a.fixedStartDay}T${a.fixedStartTime}`);
                const bStartTime = new Date(`${b.fixedStartDay}T${b.fixedStartTime}`);
                return aStartTime - bStartTime;
            });

            return (
                <div key={index} className={`day ${isToday ? 'today' : ''}`}>
                    {day}
                    <div className="event-indicator-container">
                        {/* 유동 스케줄 표시 */}
                        {flexEvents.map((event, eventIndex) => (
                            <div
                                key={eventIndex}
                                className="event-indicator"
                                style={{
                                    top: `${(eventIndex + 1) * 25}px`,
                                    backgroundColor: getCategoryColor(event.categoryCode)
                                }}
                            >
                                <div className="event-title">{event.flexTitle}</div>
                            </div>
                        ))}
                        {/* 일반 스케줄 표시 */}
                        {eventList.map((event, eventIndex) => (
                            <div
                                key={eventIndex}
                                className="event-indicator"
                                style={{
                                    top: `${(eventIndex + 1) * 25}px`,
                                    backgroundColor: getCategoryColor(event.categoryCode)
                                }}
                            >
                                <div className="event-title">{event.fixedTitle}</div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        });
    };

    const prevMonth = () => {
        const prevMonthDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
        setDate(prevMonthDate);
    };

    const nextMonth = () => {
        const nextMonthDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        setDate(nextMonthDate);
    };

    const mini_renderCalendar = () => {
        const mini_viewYear = mini_date.getFullYear();
        const mini_viewMonth = mini_date.getMonth();
        const mini_daysInMonth = new Date(mini_viewYear, mini_viewMonth + 1, 0).getDate();
        const mini_firstDayOfWeek = new Date(mini_viewYear, mini_viewMonth, 1).getDay();

        const mini_days = [];
        for (let i = mini_firstDayOfWeek; i > 0; i--) {
            mini_days.push('');
        }
        for (let i = 1; i <= mini_daysInMonth; i++) {
            mini_days.push(i);
        }

        const handleMouseDown = (day) => {
            if (day !== '') {
                if (selectedDatesRef.current.has(day)) {
                    selectedDatesRef.current.delete(day);
                } else {
                    selectedDatesRef.current.add(day);
                }
                setSelectedMiniDates(Array.from(selectedDatesRef.current));
            }
            setIsDragging(true);
        };

        const handleMouseOver = (day) => {
            if (isDragging && day !== '') {
                selectedDatesRef.current.add(day);
                setSelectedMiniDates(Array.from(selectedDatesRef.current));
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        return mini_days.map((mini_day, mini_index) => {
            const mini_className = mini_day === '' ? 'mini_other' : 'mini_this';
            const isSelected = selectedMiniDates.includes(mini_day);

            return (
                <div
                    key={mini_index}
                    className={`mini_date ${isSelected ? 'selected' : ''}`}
                    onMouseDown={() => handleMouseDown(mini_day)}
                    onMouseOver={() => handleMouseOver(mini_day)}
                    onMouseUp={handleMouseUp}
                >
                    <span className={`${mini_className}`}>{mini_day === '' ? ' ' : mini_day}</span>
                </div>
            );
        });
    };

    const mini_prevMonth = () => {
        const mini_prevMonthDate = new Date(mini_date.getFullYear(), mini_date.getMonth() - 1, 1);
        mini_setDate(mini_prevMonthDate);
    };

    const mini_nextMonth = () => {
        const mini_nextMonthDate = new Date(mini_date.getFullYear(), mini_date.getMonth() + 1, 1);
        mini_setDate(mini_nextMonthDate);
    };

    const onAddScheduleClick = () => {
        document.querySelector('.addSche-popup-wrap').style.display = 'block';
        document.querySelector('.back-bg').style.display = 'block';
    };

    const onSearchClick = () => {
        document.querySelector('.search-popup-wrap').style.display = 'block';
        document.querySelector('.back-bg').style.display = 'block';
    };

    const onBackClick = () => {
        document.querySelector('.addSche-popup-wrap').style.display = 'none';
        document.querySelector('.search-popup-wrap').style.display = 'none';
        document.querySelector('.searchList-popup-wrap').style.display = 'none';
        document.querySelector('.back-bg').style.display = 'none';
    };

    /*
        const onRecommendClick = () => {
            document.querySelector('.search-popup-wrap').style.display = 'none';
            document.querySelector('.searchList-popup-wrap').style.display = 'block';
            document.querySelector('.back-bg').style.display = 'block';
        };
        const onRecommendClick = async () => {
            try {
                const dateFormatted = mini_date.toISOString().split('T')[0];
                const durationParts = selectedEstimated.split(':');
                const hours = parseInt(durationParts[0]);
                const minutes = parseInt(durationParts[1]);
                const expectedDuration = `PT${hours}H${minutes}M`;

                const response = await axios.get('http://localhost:8080/api/time/recommend', {
                    params: {
                        date: dateFormatted,
                        expectedDuration: expectedDuration,
                    },
                });

                console.log('추천된 시간대:', response.data);
                setRecommendedSlots(response.data);

                document.querySelector('.search-popup-wrap').style.display = 'none';
                document.querySelector('.searchList-popup-wrap').style.display = 'block';
                document.querySelector('.back-bg').style.display = 'block';
            } catch (error) {
                console.error('시간대 추천 오류:', error);
            }*/


    const onRecommendClick = async () => {
        document.querySelector('.search-popup-wrap').style.display = 'none';
        document.querySelector('.searchList-popup-wrap').style.display = 'block';
        document.querySelector('.back-bg').style.display = 'block';

        // 임의의 추천 시간 데이터 생성
        const mockRecommendedTimes = [
            {
                date: '2024년 5월 22일',
                starttime: '15:00' ,
                endtime: '18:00'
            },
            {
                date: '2024년 5월 23일',
                starttime: '09:00',
                endtime: '18:00'
            },
            {
                date: '2024년 5월 24일',
                starttime: '14:00',
                endtime: '18:00'
            },
            {
                date: '2024년 5월 24일',
                starttime: '14:00',
                endtime: '18:00'
            }
        ];
        setRecommendedTimes(mockRecommendedTimes);

        /*
        try {
            //임의의 데이터 생성
            const selectedDates = selectedMiniDates.map(day => new Date(mini_date.getFullYear(), mini_date.getMonth(), day).toISOString());

            // 백엔드 호출
            const response = await axios.post('/api/recommend-times', {
                dates: selectedDates,
                estimatedTime: selectedEstimated,
            });

            setRecommendedTimes(response.data.recommendedTimes);
        } catch (error) {
            console.error('Error fetching recommended times:', error);
        }
        */

    };

    const goToaddNormalSchedule = () => {
        // "일반 스케줄 추가" 버튼을 누를 때 기존의 일정들을 유지하기 위해 새로운 이벤트를 추가하지 않습니다.
        navigate('/addNormalSchedule', { state: { events: events } });
    };

    const goToAddFlexSchedule = () => {
        // "일반 스케줄 추가" 버튼을 누를 때 기존의 일정들을 유지하기 위해 새로운 이벤트를 추가하지 않습니다.
        navigate('/addFlexSchedule', { state: { events: events } });
    };

    const goToTimeLine=()=>{
        navigate('/timeLine');
    }

    const goToCalendar = () => {
        navigate('/Main');
    };

    const goToToDoList=()=>{
        navigate('/ToDoList');
    }

    const goToSetting=()=>{
        navigate('/Setting');
    }

    const goBack = () => {
        document.querySelector('.search-popup-wrap').style.display = 'block';
        document.querySelector('.searchList-popup-wrap').style.display = 'none';
        document.querySelector('.back-bg').style.display = 'block';
    };

    useEffect(() => {
        // 새로운 이벤트가 추가되면 이를 캘린더에 반영
        if (location.state && location.state.newEvent) {
            const newEvent = location.state.newEvent;
            const updatedEvents = [...events, newEvent];
            setEvents(updatedEvents);
        }
    }, [location.state]);

    useEffect(() => {
        // 페이지를 새로고침할 때마다 로컬 스토리지에서 이전에 저장된 이벤트 목록을 가져와서 캘린더에 표시합니다.
        const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
        setEvents(storedEvents);
    }, []);

    const handleEstimatedClick = () => {
        setShowEstimatedPicker(true);
    };

    const handleEstimatedChange = () => {
        const hours = document.getElementById('main-estimated-hours').value || '00';
        const minutes = document.getElementById('main-estimated-minutes').value || '00';
        setSelectedEstimated(`${hours}:${minutes}`);
        setShowEstimatedPicker(false);
    };

    return (
        <div className="main-gray-box">
            {/*우측 상단 이미지*/}
            <div className="main-top-right-images">
                <img id="popup-search" src={searchImage} alt="Search" onClick={onSearchClick}/>
                <img id="popup-addSchedule" src={addScheduleImage} alt="Add Schedule" onClick={onAddScheduleClick}/>
            </div>

            {/*search 눌렀을 때 뜨는 팝업 창*/}
            <div className="search-popup-wrap">
                <h2 className="search-h2">시간대 추천</h2>
                <div className="mini_calendar">
                    <div className="mini_header">
                        <div className="mini_nav prev">
                            <button className="mini_nav-btn go-prev" onClick={mini_prevMonth}>&lt;</button>
                        </div>
                        <div
                            className="year-month">{`${mini_date.toLocaleString('default', {month: 'long'})} ${mini_date.getFullYear()}`}</div>
                        <div className="mini_nav next">
                            <button className="mini_nav-btn go-next" onClick={mini_nextMonth}>&gt;</button>
                        </div>
                    </div>
                    <div className="mini_main">
                        <div className="mini_days">
                            <div className="mini_day">SUN</div>
                            <div className="mini_day">MON</div>
                            <div className="mini_day">TUE</div>
                            <div className="mini_day">WED</div>
                            <div className="mini_day">THU</div>
                            <div className="mini_day">FRI</div>
                            <div className="mini_day">SAT</div>
                        </div>
                        <div className="mini_dates">{mini_renderCalendar()}</div>
                    </div>
                </div>

                {/*시간대 추천 팝업 창*/}
                <div className="search-time-popup-wrap">
                    <div className="estimatedTime-inputField">
                        <label>예상소요시간</label>
                        <input type="text" className="mainTimePicker" name="mainTimePicker" id="mainTimePicker"
                               placeholder="시간 선택" value={selectedEstimated}
                               onClick={handleEstimatedClick} readOnly/>
                        <button className="estimated-submit" type="submit" onClick={onRecommendClick}>추천</button>
                    </div>
                    {showEstimatedPicker && (
                        <div className="main-estimated-picker-overlay" onClick={() => setShowEstimatedPicker(false)}>
                            <div className="main-estimated-picker" onClick={e => e.stopPropagation()}>
                                <label>시간 선택</label>
                                <div>
                                    <select id="main-estimated-hours">
                                        {[...Array(12).keys()].map(i => (
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        ))}
                                    </select> :
                                    <select id="main-estimated-minutes">
                                        {[...Array(12).keys()].map(i => (
                                            <option key={i * 5} value={(i * 5).toString().padStart(2, '0')}>{(i * 5).toString().padStart(2, '0')}</option>
                                        ))}
                                    </select>
                                </div>
                                <button onClick={handleEstimatedChange}>확인</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/*시간대 추천 리스트 팝업 창*/}
            <div className="searchList-popup-wrap">
                <button className="search-back-button" id="back-button" onClick={goBack}>
                    &lt;
                </button>
                <h2 className="search-h2">시간대 추천</h2>
                <div className="recommended-times-list-wrap">
                    <div className="recommended-times-list-container">
                        <div className="recommended-times-list">
                            {recommendedTimes.map((time, index) => (
                                <div key={index} className="recommended-time">
                                    <div className="time-box">
                                        날짜: {time.date}<br/>
                                        시간: {time.starttime} - {time.endtime}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            {/*addSchedule 눌렀을 때 뜨는 팝업 창*/}
            <div className="addSche-popup-wrap">
                <div className="addSche-button-container">
                    <button className="addNormalSchedule-Button" onClick={goToaddNormalSchedule}>일반 스케줄 추가</button>
                    <button className="addFlexSchedule-Button" onClick={goToAddFlexSchedule}>유동 스케줄 추가</button>
                    <button>리마인더 추가</button>
                </div>
            </div>

            {/*메인 캘린더*/}
            <div className="back-bg" onClick={onBackClick}></div>
            <div className="calendar">
                <div className="header">
                    <div className="nav prev">
                        <button className="nav-btn go-prev" onClick={prevMonth}>&lt;</button>
                    </div>
                    <div
                        className="year-month">{`${date.toLocaleString('default', {month: 'long'})} ${date.getFullYear()}`}</div>
                    <div className="nav next">
                        <button className="nav-btn go-next" onClick={nextMonth}>&gt;</button>
                    </div>
                </div>
                <div className="main">
                    <div className="days">
                        <div className="day">SUN</div>
                        <div className="day">MON</div>
                        <div className="day">TUE</div>
                        <div className="day">WED</div>
                        <div className="day">THU</div>
                        <div className="day">FRI</div>
                        <div className="day">SAT</div>
                    </div>
                    <div className="dates">{renderCalendar()}</div>
                </div>
            </div>

            {/*하단 메뉴 바*/}
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

export default Main;