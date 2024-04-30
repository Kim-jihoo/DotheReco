import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import './css/addNormalCals.css'; // CSS 파일 import

const AddNormalSchedulePages = () => {
    const [scheduleData, setScheduleData] = useState({
        fixedTitle: '',
        fixedStartDay: '',
        fixedEndDay: '',
        fixedStartTime: '',
        fixedEndTime: '',
        fixedMemo: '',
        categoryCode: '', // 백엔드와 일치하도록 수정
        placeCode: '',
    });
    const [message, setMessage] = useState('');
    const navigate=useNavigate();
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setScheduleData({
            ...scheduleData,
            [name]: value,
        });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // 백엔드가 예상하는 날짜 및 시간 형식을 확실히 맞추기
            const formattedData = {
                ...scheduleData,
                fixedStartDay: scheduleData.fixedStartDay, // YYYY-MM-DD 형식은 괜찮음
                fixedEndDay: scheduleData.fixedEndDay,
                fixedStartTime: scheduleData.fixedStartTime ? scheduleData.fixedStartTime + ":00" : "00:00:00",
                fixedEndTime: scheduleData.fixedEndTime ? scheduleData.fixedEndTime + ":00" : "00:00:00",
                categoryCode: scheduleData.categoryCode ? parseInt(scheduleData.categoryCode, 10) : null,
                placeCode: scheduleData.placeCode ? parseInt(scheduleData.placeCode, 10) : null,
            };
            await axios.post('/api/fixed', formattedData);
            setMessage('일정 추가가 완료되었습니다.');
        } catch (error) {
            console.log(error);
            setMessage('일정 추가에 실패했습니다. 서버 오류가 발생했습니다.');
        }
    };

    useEffect(() => {
        const config1 = {
            dateFormat: "Y년 m월 d일",
        };
        flatpickr("input.startdate-picker", config1);
        flatpickr("input.enddate-picker", config1);

        const config2 = {
            enableTime: true,
            dateFormat: "Y년 m월 d일 H시 i분",
        };
        flatpickr("input.startdatetime-pickers", config2);
        flatpickr("input.enddatetime-pickers", config2);

        const timeToggle = document.getElementById('time-toggle');
        const datePicker = document.getElementById('date-picker');
        const hideInputContainer = document.getElementById('datetime-picker');

        timeToggle.addEventListener('change', () => {
            if (timeToggle.checked) {
                datePicker.classList.add('hidden');
                hideInputContainer.classList.remove('hidden');
            } else {
                datePicker.classList.remove('hidden');
                hideInputContainer.classList.add('hidden');
            }
        });

        // 페이지가 로드된 후 실행되는 코드
        hideInputContainer.classList.add('hidden'); // datetime-picker 숨김
    }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

    const goToMainCalendars = () => {
        navigate('/MainCalendars');
    };

    return (
        <form className="addNor-gray-box" onSubmit={handleSubmit}>
            <button type="button" className="addNor-back-button" onClick={() => window.history.back()}>
                &lt;
            </button>
            <h1 className="addNor-h1">일반스케줄 추가</h1>
            <button type="submit" className="addNor-submit" onClick={goToMainCalendars}>완료</button>
            <div className="addNor-container">
                <div className="addNor-input-container">
                    <div className="addNor-repeat-toggle">

                        <span>반복 설정</span>
                        <input className="addNor-repeat-toggle" role="switch" type="checkbox" id="repeat-toggle"/>
                    </div>
                </div>

                <div className="addNor-input-container">
                    <input type="text" className="fixedTitle" id="title" placeholder="제목"
                           required/>
                </div>
                <div className="addNor-input-container">
                    <label>날짜 및 시간</label>
                    <div className="addNor-time-toggle">
                        <span>시간 설정</span>
                        <input className="addNor-time-toggle" role="switch" type="checkbox" id="time-toggle"/>
                    </div>
                    <br/>
                    <div className="addNor-date-picker" id="date-picker">
                        <input className="startdate-picker" type="date" placeholder="시작 날짜"
                               value={scheduleData.fixedStartDay} onChange={handleInputChange}/>
                        <span className="date-range-divider">~</span>
                        <input className="enddate-picker" type="date" placeholder="종료 날짜"
                               value={scheduleData.fixedEndDay} onChange={handleInputChange}/>
                    </div>
                    <div className="addNor-datetime-picker" id="datetime-picker">
                        <input className="startdatetime-pickers" type="datetime-local" placeholder="2024년 04월 17일 11시 00분"
                               value={scheduleData.fixedStartTime} onChange={handleInputChange}/>
                        <span className="datetime-range-divider">~</span>
                        <input className="enddatetime-pickers" type="datetime-local" placeholder="2024년 04월 17일 14시 00분"
                               value={scheduleData.fixedEndTime} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="addNor-input-container">
                    <label>장소                 </label>
                    <input type="number" className="placeCode" id="placeCode" placeholder="장소"
                           value={scheduleData.placeCode} onChange={handleInputChange}/>
                </div>
                <div className="addNor-input-container">
                    <label>카테고리              </label>
                    <input type="number" className="categoryCode" id="categoryCode" placeholder="기타"
                           value={scheduleData.categoryCode} onChange={handleInputChange}/>
                </div>
                <div className="addNor-input-container">
                    <label>메모</label>
                </div>
                <div className="addNor-input-container">
                    <textarea className="fixedMemo" id="memo" rows="4" placeholder="메모" value={scheduleData.fixedMemo}
                              onChange={handleInputChange}></textarea>
                </div>
            </div>
        </form>
    );
};
export default AddNormalSchedulePages;

