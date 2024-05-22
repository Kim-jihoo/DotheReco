import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import './css/addNormalCal.css'; // CSS 파일 import
import axios from 'axios'; // axios import
const AddNormalSchedulePage = () => {
    const location = useLocation();
    const [selectedPlace, setSelectedPlace] = useState('');
    const [scheduleData, setScheduleData] = useState({
        fixedTitle: '',
        fixedStartDay: '',
        fixedEndDay: '',
        fixedStartTime: '',
        fixedEndTime: '',
        fixedMemo: '',
        categoryCode: '',
        placeName: selectedPlace,
    });
    const [message, setMessage] = useState('');
    const [isTimeToggleOn, setIsTimeToggleOn] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {

        if (location.state && location.state.place) {
            setSelectedPlace(location.state.place);
            setScheduleData(prevData => ({
                ...prevData,
                placeName: location.state.place
            }));
        }
    }, [location.state]);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setScheduleData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
/*
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formattedData = {
                ...scheduleData,
                fixedStartDay: scheduleData.fixedStartDay,
                fixedEndDay: scheduleData.fixedEndDay,
                fixedStartTime: scheduleData.fixedStartTime ? scheduleData.fixedStartTime + ":00" : "00:00:00",
                fixedEndTime: scheduleData.fixedEndTime ? scheduleData.fixedEndTime + ":00" : "00:00:00",
                categoryCode: scheduleData.categoryCode ? parseInt(scheduleData.categoryCode, 10) : null,
                placeCode: scheduleData.placeCode ? parseInt(scheduleData.placeCode, 10) : null,
            };

            const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
            storedEvents.push(formattedData);
            localStorage.setItem('events', JSON.stringify(storedEvents));

            navigate('/Main', { state: { newEvent: formattedData } });
        } catch (error) {
            console.error('Error response:', error.response);
            setMessage('일정 추가에 실패했습니다. 서버 오류가 발생했습니다.');
        }
    };*/
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formattedData = {
                ...scheduleData,
                fixedStartDay: scheduleData.fixedStartDay,
                fixedEndDay: scheduleData.fixedEndDay,
                fixedStartTime: scheduleData.fixedStartTime ? scheduleData.fixedStartTime + ":00" : "00:00:00",
                fixedEndTime: scheduleData.fixedEndTime ? scheduleData.fixedEndTime + ":00" : "00:00:00",
                categoryCode: scheduleData.categoryCode ? parseInt(scheduleData.categoryCode, 10) : null,
                placeCode: scheduleData.placeCode ? parseInt(scheduleData.placeCode, 10) : null,
            };

            await axios.post('http://localhost:8080/api/fixed', formattedData); // 백엔드 서버로 데이터 전송
            navigate('/Main', { state: { newEvent: formattedData } });
        } catch (error) {
            console.error('Error response:', error.response);
            setMessage('일정 추가에 실패했습니다. 서버 오류가 발생했습니다.');
        }
    };


    const handleToggleChange = () => {
        setIsTimeToggleOn(!isTimeToggleOn);
    };

    useEffect(() => {
        const startDateConfig = {
            dateFormat: "Y-m-d",
            onChange: (selectedDates, dateStr) => {
                setScheduleData(prevData => ({
                    ...prevData,
                    fixedStartDay: dateStr,
                }));
            },
        };
        flatpickr("input.startdate-picker", startDateConfig);

        const endDateConfig = {
            dateFormat: "Y-m-d",
            onChange: (selectedDates, dateStr) => {
                setScheduleData(prevData => ({
                    ...prevData,
                    fixedEndDay: dateStr,
                }));
            },
        };
        flatpickr("input.enddate-picker", endDateConfig);

        if (isTimeToggleOn) {
            const startTimeConfig = {
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i",
                time_24hr: true,
                onChange: (selectedDates, dateStr) => {
                    setScheduleData(prevData => ({
                        ...prevData,
                        fixedStartTime: dateStr,
                    }));
                },
            };
            flatpickr("input.starttime-picker", startTimeConfig);

            const endTimeConfig = {
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i",
                time_24hr: true,
                onChange: (selectedDates, dateStr) => {
                    setScheduleData(prevData => ({
                        ...prevData,
                        fixedEndTime: dateStr,
                    }));
                },
            };
            flatpickr("input.endtime-picker", endTimeConfig);
        }
    }, [isTimeToggleOn]);

    const handleSearchClick = () => {
        navigate('/Map');
    };

    return (
        <div className="addNor-gray-box">
            <button type="button" className="addNor-back-button" onClick={() => window.history.back()}>
                &lt;
            </button>
            <button type="submit" className="addNor-submit" form="addNor-form">완료</button>
            <h1 className="addNor-h1">일반스케줄 추가</h1>
            <form className="addNor-form" id="addNor-form" onSubmit={handleSubmit}>
                <div className="addNor-container">
                    <div className="addNor-input-container">
                        <label htmlFor="fixedTitle">제목</label>
                        <input type="text" className="fixedTitle" name="fixedTitle" id="fixedTitle" placeholder="제목"
                               value={scheduleData.fixedTitle} onChange={handleInputChange} required/>
                    </div>
                    <div className="addNor-input-container">
                        <label>날짜 및 시간</label>
                        <div className="addNor-time-toggle">
                            <span>시간 설정</span>
                            <input className="addNor-time-toggle" role="switch" type="checkbox" id="addNor-time-toggle"
                                   checked={isTimeToggleOn} onChange={handleToggleChange}/>
                        </div>
                        <div className={`addNor-date-picker ${isTimeToggleOn ? 'hidden' : ''}`} id="addNor-date-picker">
                            <input className="startdate-picker" name="fixedStartDay" id="fixedStartDay" type="text"
                                   placeholder="시작 날짜" value={scheduleData.fixedStartDay} onChange={handleInputChange}/>
                            <span className="date-range-divider">~</span>
                            <input className="enddate-picker" name="fixedEndDay" id="fixedEndDay" type="text"
                                   placeholder="종료 날짜" value={scheduleData.fixedEndDay} onChange={handleInputChange}/>
                        </div>
                        <div className={`addNor-datetime-picker ${isTimeToggleOn ? '' : 'hidden'}`}
                             id="addNor-datetime-picker">
                            <input className="startdate-picker" name="fixedStartDay" id="fixedStartDay" type="text"
                                   placeholder="시작 날짜" value={scheduleData.fixedStartDay} onChange={handleInputChange}/>
                            <input className="starttime-picker" name="fixedStartTime" id="fixedStartTime" type="text"
                                   placeholder="시작 시간" value={scheduleData.fixedStartTime}
                                   onChange={handleInputChange}/>
                            <span className="date-range-divider">~</span>
                            <input className="enddate-picker" name="fixedEndDay" id="fixedEndDay" type="text"
                                   placeholder="종료 날짜" value={scheduleData.fixedEndDay} onChange={handleInputChange}/>
                            <input className="endtime-picker" name="fixedEndTime" id="fixedEndTime" type="text"
                                   placeholder="종료 시간" value={scheduleData.fixedEndTime} onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className="addFlex-input-container">
                        <label htmlFor="placeName">장소</label>
                        <input type="text" name="placeName" value={scheduleData.placeName}
                               onChange={handleInputChange}/>
                        <button type="button" onClick={handleSearchClick}>검색</button>
                    </div>
                    <div className="addNor-input-container">
                        <label>카테고리</label>
                        <input type="number" className="categoryCode" name="categoryCode" id="categoryCode"
                               placeholder="기타" value={scheduleData.categoryCode} onChange={handleInputChange}/>
                    </div>
                    <div className="addNor-input-container">
                        <label>메모</label>
                        <textarea className="fixedMemo" name="fixedMemo" id="memo" rows="4" placeholder="메모"
                                  value={scheduleData.fixedMemo} onChange={handleInputChange}></textarea>
                    </div>
                </div>
            </form>
            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default AddNormalSchedulePage;
