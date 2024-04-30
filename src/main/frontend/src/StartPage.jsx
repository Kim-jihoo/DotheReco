import React from 'react';
import { Link } from 'react-router-dom';
import './css/start.css'
import DotheRecoImage from './images/DotheReco_d.jpg';

function StartPage() {
    return (
        <div className="start-gray-box">
            <div>
                <img className="start-img" src={DotheRecoImage} alt="두더리코 이미지"/>
                <h1 className="start-h1">DotheReco</h1>
            </div>
            <div>
                <Link to="/login" className="start-button">
                    Login
                </Link>
                <Link to="/signup" className="start-button">
                    Sign up
                </Link>
            </div>
        </div>
    );
}

export default StartPage;
