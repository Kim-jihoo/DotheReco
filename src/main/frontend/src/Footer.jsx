import React from 'react';
import './css/footer.css'
import SettingImage from './images/Setting.png'
import TimeTableImage from './images/Time table.png'
import CalendarImage from './images/Calendar.png'
import TodoListImage from './images/할 일 list.png'
const Footer = () => {
    return (
        <div className="footer">
            <div className="bottom-menu">
                <img className="TimeTableImage" src={TimeTableImage} alt="Time Table" />
                <p>Time table</p>
            </div>
            <div className="bottom-menu">
                <img src={CalendarImage} alt="Calendar" />
                <p>Calendar</p>
            </div>
            <div className="bottom-menu">
                <img src={TodoListImage} alt="To Do List" />
                <p>To Do list</p>
            </div>
            <div className="bottom-menu">
                <img src={SettingImage} alt="Setting" />
                <p>Setting</p>
            </div>
        </div>
    );
};

export default Footer;
