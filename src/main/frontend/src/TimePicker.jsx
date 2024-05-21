// components/TimePicker.js
import React, { useState } from 'react';
import './css/TimePicker.css';

const TimePicker = ({ onTimeSelect }) => {
    const [showPicker, setShowPicker] = useState(false);

    const handleDurationClick = () => {
        setShowPicker(true);
    };

    const handleDurationChange = () => {
        const hours = document.getElementById('duration-hours').value || '00';
        const minutes = document.getElementById('duration-minutes').value || '00';
        onTimeSelect(`${hours}:${minutes}`);
        setShowPicker(false);
    };

    return (
        <div>
            <input
                type="text"
                className="time-picker-input"
                placeholder="시간 선택"
                onClick={handleDurationClick}
                readOnly
            />
            {showPicker && (
                <div className="time-picker-overlay" onClick={() => setShowPicker(false)}>
                    <div className="time-picker" onClick={(e) => e.stopPropagation()}>
                        <label>시간 선택</label>
                        <div>
                            <select id="duration-hours">
                                {[...Array(12).keys()].map(i => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                            :
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

export default TimePicker;
