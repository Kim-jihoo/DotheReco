import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/TmapComponent.css';

const TmapComponent = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearch = () => {

        fetch(`https://apis.openapi.sk.com/tmap/pois?version=1&format=json&searchKeyword=${encodeURIComponent(searchKeyword)}&resCoordType=WGS84GEO&reqCoordType=WGS84GEO&count=20`, {

            method: 'GET',
            headers: {
                "appKey": "0ZSTJ6jGf15NagHDb0wOT5Q06tnZG7Yw2vKYVzqo"
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.searchPoiInfo && data.searchPoiInfo.pois && data.searchPoiInfo.pois.poi) {

                    setSearchResult(data.searchPoiInfo.pois.poi);

                } else {
                    alert("검색 결과가 없습니다.");
                }
            })
            .catch(error => console.error('Error:', error));
    };

    const handleMarkerClick = (poi) => {
        setSearchKeyword(poi.name);
        setSelectedPlace(poi.name);
    };

    const handleConfirm = () => {
        const place = selectedPlace || searchKeyword;

        const previousPath = location.state?.from || '/';

        navigate(previousPath, { state: { place } });

    };

    return (
        <div className="Tmapplace-gray-box">
            <button type="button" className="Tmapplace-back-button" onClick={() => window.history.back()}>
                &lt;
            </button>
            <button type="submit" className="Tmapplace-submit" onClick={handleConfirm}>완료</button>
            <h1 className="Tmapplace-h1">장소 검색</h1>
            <div className="Tmapplace-search-bar">
                <input
                    type="text"
                    className="Tmapplace-text_custom"
                    value={searchKeyword}
                    onChange={e => setSearchKeyword(e.target.value)}
                />
                <button className="Tmapplace-search-button" onClick={handleSearch}>검색</button>
            </div>
            <div className="Tmapplace-search-results">
                <div className="Tmapplace-rst_wrap">
                    <div className="Tmapplace-rst mCustomScrollbar">
                        <ul id="searchResult" name="Tmapplace-searchResult">
                            {searchResult.map((poi, index) => (
                                <li key={index} onClick={() => handleMarkerClick(poi)}>
                                    <span>{poi.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TmapComponent;
