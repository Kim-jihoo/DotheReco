import React from 'react';
import './css/TopRightImages.css'; // 스타일 시트 임포트
import searchImage from './images/search.png'
import addScheduleImage from './images/addSchedule.png'

const TopRightImages = () => {
    return (
        <div className="top-right-images">
            <img id="popup-search" src={searchImage} alt="Search" />
            <img id="popup-addSchedule" src={addScheduleImage} alt="Add Schedule" />
        </div>
    );
};

export default TopRightImages;
