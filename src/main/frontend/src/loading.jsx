import React from 'react';
import './css/loading.css'; // Create this CSS file to style your loading component

const Loading = () => {
    return (
        <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <div className="loading-text">Loading...</div>
        </div>
    );
};

export default Loading;
