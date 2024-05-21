import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import './css/addFlexCal.css';
import { FaStar } from 'react-icons/fa';

const AddFlexSchedulePage = () => {
    const { id } = useParams(); // Get the ID from the URL
    const [scheduleData, setScheduleData] = useState({
        flexTitle: '',
        flexDuration: '',
        flexDeadline: '',
        flexMemo: '',
        categoryCode: '',
        placeCode: '',
        importance: 3,
        repeatDays: []
    });
    const [message, setMessage] = useState('');
    const [showDurationPicker, setShowDurationPicker] = useState(false);
    const [categoryColor, setCategoryColor] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
            const eventToEdit = storedEvents[id];
            if (eventToEdit) {
                setScheduleData(eventToEdit);
            }
        }
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setScheduleData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDayToggle = (day) => {
        setScheduleData((prevData) => ({
            ...prevData,
            repeatDays: prevData.repeatDays.includes(day)
                ? prevData.repeatDays.filter(d => d !== day)
                : [...prevData.repeatDays, day]
        }));
    };

    const handleDurationClick = () => {
        setShowDurationPicker(true);
    };

    const handleDurationChange = () => {
        const hours = document.getElementById('duration-hours').value || '00';
        const minutes = document.getElementById('duration-minutes').value || '00';
        setScheduleData((prevData) => ({
            ...prevData,
            flexDuration: `${hours}:${minutes}`
        }));
        setShowDurationPicker(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formattedData = {
                ...scheduleData,
                flexDeadline: scheduleData.flexDeadline + ":00",
                categoryCode: scheduleData.categoryCode ? parseInt(scheduleData.categoryCode, 10) : null,
                placeCode: scheduleData.placeCode ? parseInt(scheduleData.placeCode, 10) : null,
            };

            const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
            if (id) {
                storedEvents[id] = formattedData;
            } else {
                storedEvents.push(formattedData);
            }
            localStorage.setItem('events', JSON.stringify(storedEvents));

            console.log('Navigating with new event:', formattedData);
            navigate('/Main', { state: { newEvent: formattedData } });
        } catch (error) {
            console.error('Error response:', error.response);
            setMessage('일정 추가에 실패했습니다. 서버 오류가 발생했습니다.');
        }
    };

    useEffect(() => {
        const colors = {};
        setCategoryColor(colors);
    }, []);

    useEffect(() => {
        const datetimeConfig = {
            enableTime: true,
            dateFormat: "Y-m-d H:i",
            onChange: (selectedDates, dateStr) => {
                setScheduleData(prevData => ({
                    ...prevData,
                    flexDeadline: dateStr,
                }));
            },
        };
        flatpickr("input.deadline-picker", datetimeConfig);
    }, []);

    const setPriority = (level) => {
        setScheduleData((prevData) => ({ ...prevData, importance: level }));
    };

    return (
        <div className="addFlex-gray-box">
            <button type="button" className="addFlex-back-button" onClick={() => window.history.back()}>
                &lt;
            </button>
            <button type="submit" className="addFlex-submit" form="addFlex-form">완료</button>
            <h1 className="addFlex-h1">{id ? '유동스케줄 수정' : '유동스케줄 추가'}</h1>
            <form className="addFlex-form" id="addFlex-form" onSubmit={handleSubmit}>
                <div className="addFlex-container">
                    <div className="addFlex-input-container">
                        <label htmlFor="flexTitle">제목</label>
                        <input type="text" className="flexTitle" name="flexTitle" id="flexTitle" placeholder="제목"
                               value={scheduleData.flexTitle} onChange={handleInputChange} required/>
                    </div>
                    <div className="addFlex-input-container">
                        <label>예상 소요시간</label>
                        <input type="text" className="flexDuration" name="flexDuration" id="flexDuration"
                               placeholder="시간 선택" value={scheduleData.flexDuration}
                               onClick={handleDurationClick} readOnly/>
                    </div>
                    <div className="addFlex-input-container">
                        <label htmlFor="flexDeadline">마감기한</label>
                        <input type="datetime-local" className="deadline-picker" name="flexDeadline" id="flexDeadline"
                               placeholder="마감 기한" value={scheduleData.flexDeadline} onChange={handleInputChange}/>
                    </div>
                    <div className="addFlex-input-container">
                        <label>요일 반복</label>
                        <div className="day-selector">
                            {['월', '화', '수', '목', '금', '토', '일'].map(day => (
                                <div
                                    key={day}
                                    className={`day-circle ${scheduleData.repeatDays.includes(day) ? 'selected' : ''}`}
                                    onClick={() => handleDayToggle(day)}
                                >
                                    {day}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="addFlex-input-container">
                        <label>중요도</label>
                        <div className="priority-selector">
                            {[1, 2, 3, 4, 5].map(level => (
                                <FaStar key={level}
                                        className={`star-icon ${scheduleData.importance >= level ? 'selected' : ''}`}
                                        onClick={() => setPriority(level)}
                                        style={{
                                            color: scheduleData.importance >= level ? '#80A160' : '#ccc',
                                            cursor: 'pointer',
                                            marginRight: '5px' // Adjusting the margin between stars
                                        }}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="addFlex-input-container">
                        <label htmlFor="placeCode">장소 (선택)</label>
                        <input type="number" className="placeCode" name="placeCode" id="placeCode" placeholder="장소"
                               value={scheduleData.placeCode} onChange={handleInputChange}/>
                    </div>
                    <div className="addFlex-input-container">
                        <label htmlFor="categoryCode">카테고리</label>
                        <input type="number" className="categoryCode" name="categoryCode" id="categoryCode"
                               placeholder="기타" value={scheduleData.categoryCode} onChange={handleInputChange}/>
                    </div>
                    <div className="addFlex-input-container">
                        <label htmlFor="flexMemo">메모</label>
                        <textarea className="flexMemo" name="flexMemo" id="flexMemo" rows="4" placeholder="메모"
                                  value={scheduleData.flexMemo} onChange={handleInputChange}></textarea>
                    </div>
                </div>
            </form>
            {message && <div className="message">{message}</div>}
            {showDurationPicker && (
                <div className="addFlex-duration-picker-overlay" onClick={() => setShowDurationPicker(false)}>
                    <div className="addFlex-duration-picker" onClick={e => e.stopPropagation()}>
                        <label>시간 선택</label>
                        <div>
                            <select id="duration-hours">
                                {[...Array(12).keys()].map(i => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select> :
                            <select id="duration-minutes">
                                {[...Array(12).keys()].map(i => (
                                    <option key={i * 5} value={(i * 5).toString().padStart(2, '0')}>{(i * 5).toString().padStart(2, '0')}</option>
                                ))}
                            </select>
                        </div>
                        <button onClick={handleDurationChange}>확인</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddFlexSchedulePage;
