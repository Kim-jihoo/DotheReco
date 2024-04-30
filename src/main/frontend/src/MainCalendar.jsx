import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import './css/main.css';
import searchImage from './images/search.png';
import addScheduleImage from './images/addSchedule.png';
import SettingImage from './images/Setting.png';
import TimeTableImage from './images/Time table.png';
import CalendarImage from './images/Calendar.png';
import TodoListImage from './images/할 일 list.png';
import before from './images/before.png'

const Main = () => {
    const [date, setDate] = useState(new Date());
    const [mini_date, mini_setDate]=useState(new Date());
    const [estimatedTime, setEstimatedTime] = useState('');
    const [selectedMiniDates, setSelectedMiniDates] = useState([]); // 여러 날짜 선택을 위한 배열
    const navigate=useNavigate();
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const renderCalendar = () => {
        const viewYear = date.getFullYear();
        const viewMonth = date.getMonth();
        const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
        const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

        const days = [];
        for (let i = firstDayOfWeek; i > 0; i--) {
            days.push('');
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }

        return days.map((day, index) => {
            const main_today = new Date();
            const isToday = main_today.getFullYear() === viewYear && main_today.getMonth() === viewMonth && day === main_today.getDate();
            const className = day === '' ? 'other' : 'this';
            return (
                <div key={index} className="date">
                    <span className={`${className} ${isToday ? 'main_today' : ''}`}>{day === '' ? ' ' : day}</span>
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

        const handleMiniDateClick = (day) => {
            const index = selectedMiniDates.indexOf(day);
            if (index === -1) {
                setSelectedMiniDates([...selectedMiniDates, day]);
            } else {
                const updatedDates = [...selectedMiniDates];
                updatedDates.splice(index, 1);
                setSelectedMiniDates(updatedDates);
            }
        };

        return mini_days.map((mini_day, mini_index) => {
            const mini_className = mini_day === '' ? 'mini_other' : 'mini_this';
            const isSelected = selectedMiniDates.includes(mini_day);

            return (
                <div
                    key={mini_index}
                    className={`mini_date ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleMiniDateClick(mini_day)}
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
        // 팝업 창을 열기 위해 상태 변경
        document.querySelector('.addSche-popup-wrap').style.display = 'block';
        document.querySelector('.back-bg').style.display = 'block';
    };

    const onSearchClick=()=>{
        document.querySelector('.search-popup-wrap').style.display='block';
        document.querySelector('.back-bg').style.display = 'block';
    }

    const togglePopupVisibility = () => {
        setIsPopupVisible(!isPopupVisible);

        // 팝업이 열리면 뒷 배경 표시
        const backBg = document.querySelector('.back-bg');
        backBg.style.display = isPopupVisible ? 'none' : 'block';
    };

    const onBackClick=()=>{
        document.querySelector('.addSche-popup-wrap').style.display = 'none';
        document.querySelector('.search-popup-wrap').style.display='none';
        document.querySelector('.searchList-popup-wrap').style.display='none';
        document.querySelector('.back-bg').style.display = 'none';
    }

    const onRecommendClick=()=>{
        document.querySelector('.search-popup-wrap').style.display='none';
        document.querySelector('.searchList-popup-wrap').style.display='block';
        document.querySelector('.back-bg').style.display = 'block';
    }
    const goToAddNormalSchedule = () => {
        // 버튼 클릭 시 '/addNormalSchedule' 경로로 이동
        navigate('/addNormalSchedule');
    };

    const goToCalendar = () => {
        navigate('/main');
    };

    const goBack=()=>{
        document.querySelector('.search-popup-wrap').style.display='block';
        document.querySelector('.searchList-popup-wrap').style.display='none';
        document.querySelector('.back-bg').style.display = 'block';
    }

    const enableManualInput = () => {
        const inputField = document.getElementById('estimatedTimeInput');
        inputField.disabled = false;
        inputField.value = ''; // 입력 초기화
        inputField.focus(); // 입력 필드에 포커스

        // 'input' 이벤트 발생 시 호출될 이벤트 핸들러
        const handleInput = (event) => {
            const value = event.target.value;
            const formattedValue = value.replace(/[^\d]/g, ''); // 숫자 이외의 문자 제거
            event.target.value = formattedValue; // 숫자만 입력된 값으로 설정
        };

        /*
        // 'blur' 이벤트 발생 시 호출될 이벤트 핸들러
        const handleBlur = (event) => {
            const value = event.target.value.trim(); // 앞뒤 공백 제거
            if (value !== '') {
                event.target.value = value + '시간'; // 입력된 값 뒤에 "시간" 추가
            }
            inputField.removeEventListener('blur', handleBlur);
        };*/

        // 'input' 이벤트 리스너 등록
        inputField.addEventListener('input', handleInput);

        // 'blur' 이벤트 리스너 등록
        inputField.addEventListener('blur', handleBlurOnce); // 수정된 부분
    };

// blur 이벤트 핸들러를 한 번만 실행하고 제거하는 함수
    const handleBlurOnce = (event) => {
        const inputField = event.target;
        inputField.removeEventListener('blur', handleBlurOnce); // blur 이벤트 리스너 제거

        const value = inputField.value.trim(); // 앞뒤 공백 제거
        if (value !== '') {
            inputField.value = value + '시간'; // 입력된 값 뒤에 "시간" 추가
        }
    };


    const handleSetEstimatedTime = (time) => {
        setEstimatedTime(time); // 예상 소요 시간 설정
    };

    return (
        <div className="main-gray-box">
            {/*우측 상단 이미지*/}
            <div className="top-right-images">
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
                <div className="time-picker" id="time-picker">
                    <div className="estimatedTime-inputField">
                        <label>예상소요시간</label>
                        <input
                            type="text"
                            id="estimatedTimeInput"
                            className="estimatedTime"
                            value={estimatedTime}
                            disabled // 초기에는 비활성화 상태
                        />
                    </div>
                    <div id="estimatedTimeWrapper">
                        <span id="estimatedTimeDisplay"></span>
                    </div>
                    <div className="time-buttons">
                        <button onClick={() => handleSetEstimatedTime('1시간')}>1시간</button>
                        <button onClick={() => handleSetEstimatedTime('1시간 30분')}>1시간 30분</button>
                        <button onClick={() => handleSetEstimatedTime('2시간')}>2시간</button>
                        <button onClick={() => handleSetEstimatedTime('2시간 30분')}>2시간 30분</button>
                        <button onClick={() => handleSetEstimatedTime('3시간')}>3시간</button>
                        <button onClick={() => handleSetEstimatedTime('3시간 30분')}>3시간 30분</button>
                        <button onClick={() => handleSetEstimatedTime('4시간')}>4시간</button>
                        <button onClick={() => handleSetEstimatedTime('4시간 30분')}>4시간 30분</button>
                        <button onClick={enableManualInput}>직접 입력</button>
                    </div>
                    <button className="estimated-submit" type="submit" onClick={onRecommendClick}>추천</button>
                </div>
            </div>

            {/*시간대 추천 리스트 팝업 창*/}
            <div className="searchList-popup-wrap">
                <h2 className="search-h2">시간대 추천</h2>
                <button className="search-back-button" id="back-button" onClick={goBack}>
                    &lt;
                </button>
                <div className="recoLists">
                    <div className="recoList">
                        <p className="dateText">날짜: 2024년 04월 15일 월요일</p>
                        <p className="timeText">시간: 8:00 AM - 11:00 AM</p>
                    </div>
                    <div className="recoList">
                        <p className="dateText">날짜: 2024년 04월 15일 월요일</p>
                        <p className="timeText">시간: 8:00 PM - 11:00 PM</p>
                    </div>
                    <div className="recoList">
                        <p className="dateText">날짜: 2024년 04월 17일 수요일</p>
                        <p className="timeText">시간: 11:00 AM - 2:00 PM</p>
                    </div>
                    <div className="recoList">
                        <p className="dateText">날짜: 2024년 04월 17일 수요일</p>
                        <p className="timeText">시간: 8:00 PM - 12:00 AM</p>
                    </div>
                    <div className="recoList">
                        <p className="dateText">날짜: 2024년 04월 19일 금요일</p>
                        <p className="timeText">시간: 8:00 AM - 2:00 PM</p>
                    </div>
                    <div className="recoList">
                        <p className="dateText">날짜: 2024년 04월 19일 금요일</p>
                        <p className="timeText">시간: 3:00 PM - 11:00 PM</p>
                    </div>
                </div>
            </div>

            {/*addSchedule 눌렀을 때 뜨는 팝업 창*/}
            <div className="addSche-popup-wrap">
                <div className="addSche-button-container">
                    <button className="addNormalSchedule-Button" onClick={goToAddNormalSchedule}>일반 스케줄 추가</button>
                    <button>유동 스케줄 추가</button>
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
<div className="Img-wrap">
    <img className="beforeImage" src={before}/>
</div>
                </div>

            </div>

            {/*하단 메뉴 바*/}
            <div className="footer">
                <div className="bottom-menu">
                <img className="TimeTableImage" src={TimeTableImage} alt="Time Table"/>
                    <p>Time table</p>
                </div>
                <div className="bottom-menu">
                    <img className="CalendarImage" src={CalendarImage} alt="Calendar" onClick={goToCalendar}/>
                    <p>Calendar</p>
                </div>
                <div className="bottom-menu">
                    <img className="TodoListImage" src={TodoListImage} alt="To Do List"/>
                    <p>To Do list</p>
                </div>
                <div className="bottom-menu">
                    <img className="SettingImage" src={SettingImage} alt="Setting"/>
                    <p>Setting</p>
                </div>
            </div>
            {isPopupVisible && <div className="back-bg" onClick={togglePopupVisibility}></div>}
        </div>
    );
};

export default Main;