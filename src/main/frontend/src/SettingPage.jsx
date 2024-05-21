import React from 'react';
import { useNavigate } from "react-router-dom";
import './css/setting.css';
import TimeTableImage from "./images/Time table.png";
import CalendarImage from "./images/Calendar.png";
import TodoListImage from "./images/할 일 list.png";
import SettingImage from "./images/Setting.png";
import UserImage from "./images/user.png"
import NotworkingImage from "./images/notworking.png"
import CategoryEditImage from "./images/categoryedit.png"
import AgreeImage from "./images/agree.png"
import LanguageImage from "./images/language.png"

const SettingPage = () => {
    const navigate = useNavigate();

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

    return (
        <div className="setting-gray-box">
            {/* 상단 계정 */}
            <div className="account">
                <p className="setting-name">두더리코</p>
                <p className="setting-email">steam0908@gmail.com</p>
            </div>
            {/* 설정 목록 */}
            <div className="setting-list">
                <div className="setting-item">
                    <img className="UserImage" src={UserImage} alt="User"/>
                    <p>계정 관리</p>
                </div>
                <hr className="setting-separator"/>
                <div className="setting-item">
                    <img className="NotWorkingImage" src={NotworkingImage} alt="notworking"/>
                    <p>비활동시간</p>
                </div>
                <hr className="setting-separator"/>
                <div className="setting-item">
                    <img className="CategoryEditImage" src={CategoryEditImage} alt="categoryedit"/>
                    <p>카테고리 편집</p>
                </div>
                <hr className="setting-separator"/>
                <div className="setting-item">
                    <img className="AgreeImage" src={AgreeImage} alt="agree"/>
                    <p>이용약관</p>
                </div>
                <hr className="setting-separator"/>
                <div className="setting-item">
                    <img className="LanguageImage" src={LanguageImage} alt="language"/>
                    <p>언어</p>
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
                    <img className="SettingImage" src={SettingImage} alt="Setting" onClick={goToSetting}/>
                    <p>Setting</p>
                </div>
            </div>
        </div>
    );
};

export default SettingPage;
