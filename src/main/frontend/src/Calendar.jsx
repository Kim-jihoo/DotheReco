import React, { useState } from 'react';
import './css/calendar.css';
import Footer from './Footer';
import TopRightImages from './TopRightImages';

const Calendar = () => {
    const [date, setDate] = useState(new Date());

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
            const today = new Date();
            const isToday = today.getFullYear() === viewYear && today.getMonth() === viewMonth && day === today.getDate();
            const className = day === '' ? 'other' : 'this';
            return (
                <div key={index} className="date">
                    <span className={`${className} ${isToday ? 'today' : ''}`}>{day === '' ? ' ' : day}</span>
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

    return (
        <div className="main-gray-box">
            <TopRightImages /> {/* 우측 상단 이미지 컴포넌트 추가 */}
            <div className="calendar">
                <div className="header">
                    <div className="nav prev">
                        <button className="nav-btn go-prev" onClick={prevMonth}>&lt;</button>
                    </div>
                    <div className="year-month">{`${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`}</div>
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
            {/* Footer 컴포넌트 추가 */}
            <Footer />
        </div>
    );
};

export default Calendar;
