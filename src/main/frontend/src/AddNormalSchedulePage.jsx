import React, { useState, useEffect } from 'react';
import axios from 'axios';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import './css/addNormalCal.css'; // CSS 파일 import

const AddNormalSchedulePage = () => {
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
       /* flatpickr("input[type='date']", {
            dateFormat: "Y년 m월 d일",
        });

        flatpickr("input[type='datetime-local']", {
            enableTime: true,
            dateFormat: "Y년 m월 d일 H시 i분",
        });*/
    /*    flatpickr("input[type='date']", { dateFormat: "Y-m-d" });
        flatpickr("input[type='datetime-local']", { enableTime: true, dateFormat: "Y-m-d H:i" });
        // 초기 설정에서 'datetime-picker' 숨김 처리

        document.getElementById('datetime-picker').classList.add('hidden');
    }, []);*/
/*
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setScheduleData({ ...scheduleData, [name]: value });
    };


    const initializeFlatpickr = () => {
        flatpickr("input[type='date']", { dateFormat: "Y-m-d" });
        flatpickr("input[type='datetime-local']", { enableTime: true, dateFormat: "Y-m-d H:i" });
        document.getElementById('datetime-picker').classList.add('hidden');
    };*/
        /*
        const initializeFlatpickr = () => {
            const datetimePicker = document.getElementById('datetime-picker');
            if (datetimePicker) {
                flatpickr("input[type='date']", { dateFormat: "Y-m-d" });
                flatpickr("input[type='datetime-local']", { enableTime: true, dateFormat: "Y-m-d H:i" });
                datetimePicker.classList.add('hidden');
            }
        };*/
        flatpickr("input[type='date']", { dateFormat: "Y-m-d" });
        flatpickr("input[type='datetime-local']", { enableTime: true, dateFormat: "Y-m-d H:i" });
    }, []);

    // useEffect 사용 대신 초기화 함수를 직접 호출

  /*  useEffect(() => {
        const config1 = {
            dateFormat: "Y년 m월 d일",
        };
        //flatpickr("input[type='date-local']", config1);
        flatpickr("input[type='date']", config1);

        const config2 = {
            enableTime: true,
            dateFormat: "Y년 m월 d일 H시 i분",
        };
       // flatpickr("input[type='datetime-local']", config2);
        flatpickr("input[type='datetime-local']", config2);

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

        // 페이지 로드 시 실행
        const hideInputContainerOnLoad = document.getElementById('datetime-picker');
        hideInputContainerOnLoad.classList.add('hidden');
    }, []);
*/
    return (
        //<div className="addNor-gray-box">
        //<form className="addNor-gray-box">
        <form className="addNor-gray-box" onSubmit={handleSubmit}>
            <button type="button" className="addNor-back-button" onClick={() => window.history.back()}>
                &lt;
            </button>
            <h1 className="addNor-h1">일반스케줄 추가</h1>
            {/* <button type="submit" className="addNor-submit">완료</button>*/}
            <div className="addNor-container">
                <div className="addNor-repeat-toggle">
                    <span>반복 설정</span>
                    <input role="switch" type="checkbox" id="repeat-toggle" />
                </div>
                <div className="addNor-input-container">
                    <label htmlFor="title-input">제목</label>
                    <input type="text" name="fixedTitle" id="title" placeholder="제목" value={scheduleData.fixedTitle} onChange={handleInputChange} required />

                </div>
                <div className="addNor-input-container">
                    <label htmlFor="date-picker">날짜 및 시간</label>
                    <div className="addNor-time-toggle">
                        <span>시간 설정</span>
                        <input role="switch" type="checkbox" id="time-toggle" />
                    </div>
                    <br />
                    <div className="addNor-date-picker" id="date-picker">
                        <input className="startdate-picker" type="date" placeholder="시작 날짜" value={scheduleData.fixedStartDay} onChange={handleInputChange} />
                        <span className="date-range-divider">~</span>
                        <input className="enddate-picker" type="date" placeholder="종료 날짜" value={scheduleData.fixedEndDay} onChange={handleInputChange} />
                    </div>
                    <div className="addNor-datetime-picker" id="datetime-picker">
                        <input className="startdatetime-picker" type="datetime-local" placeholder="시작 날짜 및 시간" value={scheduleData.fixedStartTime} onChange={handleInputChange} />
                        <span className="datetime-range-divider">~</span>
                        <input className="enddatetime-picker" type="datetime-local" placeholder="종료 날짜 및 시간" value={scheduleData.fixedEndTime} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="addNor-input-container">
                    <label htmlFor="placeCode">장소</label>
                    <input type="number" name="placeCode" id="placeCode" placeholder="장소" value={scheduleData.placeCode} onChange={handleInputChange} />
                </div>
                <div className="addNor-input-container">
                    <label htmlFor="category-input">카테고리</label>
                    <input type="number" name="categoryCode" id="categoryCode" placeholder="카테고리" value={scheduleData.categoryCode} onChange={handleInputChange} />
                </div>
                <div className="addNor-input-container">
                    <label htmlFor="memo">메모</label>
                    <textarea name="fixedMemo" id="memo" rows="4" placeholder="메모" value={scheduleData.fixedMemo} onChange={handleInputChange}></textarea>
                </div>
                <button type="submit" className="addNor-submit">완료</button>
                {message && <p>{message}</p>}
            </div>
        </form>
    );
};
export default AddNormalSchedulePage;
