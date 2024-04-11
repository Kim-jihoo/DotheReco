import React, { useEffect } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import './css/addNormalCal.css'; // CSS 파일 import

const AddNormalSchedulePage = () => {
    useEffect(() => {
        const config1 = {
            dateFormat: "Y년 m월 d일",
        };
        flatpickr("input[type='date-local']", config1);

        const config2 = {
            enableTime: true,
            dateFormat: "Y년 m월 d일 H시 i분",
        };
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

    return (
        <div className="addNor-gray-box">
            <button className="addNor-back-button" onClick={() => window.history.back()}>
                &lt;
            </button>
            <h1 className="addNor-h1">일반스케줄 추가</h1>
            <button type="submit" className="addNor-submit">완료</button>
            <div className="addNor-container">
                <div className="addNor-repeat-toggle">
                    <span>반복 설정</span>
                    <input role="switch" className="addNor-repeat-toggle" type="checkbox" id="repeat-toggle" />
                </div>
                <div className="addNor-input-container">
                    <label htmlFor="title-input">제목</label>
                    <input type="text" className="title-input" id="title-input" placeholder="제목" required />
                </div>
                <div className="addNor-input-container">
                    <label>날짜 및 시간</label>
                    <div className="addNor-time-toggle">
                        <span>시간 설정</span>
                        <input role="switch" className="addNor-time-toggle" type="checkbox" id="time-toggle" />
                    </div>
                    <br />
                    <div className="addNor-date-picker" id="date-picker">
                        <input className="addNor-startdate-picker" type="date-local" placeholder="시작 날짜" />
                        <span className="addNor-date-range-divider">~</span>
                        <input className="addNor-enddate-picker" type="date-local" placeholder="종료 날짜" />
                    </div>
                    <div className="addNor-datetime-picker" id="datetime-picker">
                        <input className="addNor-startdatetime-picker" type="datetime-local" placeholder="시작 날짜 및 시간" />
                        <span className="addNor-datetime-range-divider">~</span>
                        <input className="addNor-enddatetime-picker" type="datetime-local" placeholder="종료 날짜 및 시간" />
                    </div>
                </div>
                <div className="addNor-input-container">
                    <label htmlFor="location-input">장소</label>
                    <a href="location_page.html">
                        <input type="text" id="location-input" className="location-input" placeholder=">" value="기타" required />
                    </a>
                    <span className="addNor-arrow-icon">></span>
                </div>
                <div className="addNor-input-container">
                    <label htmlFor="category-input">카테고리</label>
                    <a href="category_page.html">
                        <input type="text" id="category-input" className="category-input" placeholder="카테고리" value="기본 카테고리" required />
                    </a>
                    <span className="addNor-arrow-icon">></span>
                </div>
                <div className="addNor-input-container">
                    <label htmlFor="memo-input">메모</label>
                    <textarea id="memo-input" className="addNor-memo-input" rows="4" placeholder="메모" style={{ flex: 4 }} ></textarea>
                </div>
            </div>
        </div>
    );
};

export default AddNormalSchedulePage;
