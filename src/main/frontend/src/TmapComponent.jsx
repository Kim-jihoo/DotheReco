import React, { useEffect, useState, useRef } from 'react';
import markerImage from "./images/marker.png";
import { useNavigate } from 'react-router-dom';

const TmapComponent = () => {
    const [mapInitialized, setMapInitialized] = useState(false);
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [userLocation, setUserLocation] = useState({ lat: 37.561451, lon: 126.946778 }); // 기본값은 이화여자대학교
    const mapRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const scriptId = 'tmap-script';
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.src = "https://apis.openapi.sk.com/tmap/jsv3?version=1&appKey=0ZSTJ6jGf15NagHDb0wOT5Q06tnZG7Yw2vKYVzqo";
            script.async = true;
            script.id = scriptId;
            script.onload = () => {
                console.log("Script loaded");
                setMapInitialized(true);
            };
            script.onerror = () => {
                console.error("Failed to load the Tmap script");
            };
            document.head.appendChild(script);
        } else {
            setMapInitialized(true);
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lon: longitude });
                },
                error => {
                    console.error("Error getting user's location:", error);
                }
            );
        }
    }, []);

    useEffect(() => {
        if (mapInitialized && window.Tmapv3 && !map) {
            const mapInstance = new window.Tmapv3.Map("map_div", {
                center: new window.Tmapv3.LatLng(userLocation.lat, userLocation.lon),
                width: "100%",
                height: "800px",
                zoom: 16
            });
            setMap(mapInstance);
        }
    }, [mapInitialized, userLocation]);

    const handleSearch = () => {
        if (!map) return;

        const center = map.getCenter();
        const centerLat = center._lat;
        const centerLon = center._lng;

        fetch(`https://apis.openapi.sk.com/tmap/pois?version=1&format=json&searchKeyword=${encodeURIComponent(searchKeyword)}&centerLat=${centerLat}&centerLon=${centerLon}&radius=5&resCoordType=WGS84GEO&reqCoordType=WGS84GEO&count=20`, {
            method: 'GET',
            headers: {
                "appKey": "0ZSTJ6jGf15NagHDb0wOT5Q06tnZG7Yw2vKYVzqo"
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.searchPoiInfo && data.searchPoiInfo.pois && data.searchPoiInfo.pois.poi) {
                    const resultpoisData = data.searchPoiInfo.pois.poi;

                markers.forEach(marker => marker.setMap(null));
                setMarkers([]);

                let bounds = new window.Tmapv3.LatLngBounds();

                const newMarkers = resultpoisData.map((poi, index) => {
                    const lat = parseFloat(poi.frontLat);
                    const lon = parseFloat(poi.frontLon);
                    const name = poi.name;

                    const markerPosition = new window.Tmapv3.LatLng(lat, lon);

                    const marker = new window.Tmapv3.Marker({
                        position: markerPosition,
                        icon: markerImage,
                        iconSize: new window.Tmapv3.Size(24, 38),
                        title: name,
                        map: map
                    });

                    bounds.extend(markerPosition);
                    return marker;
                });

                setMarkers(newMarkers);
                setSearchResult(resultpoisData);
                map.fitBounds(bounds);
                } else {
                    alert("검색 결과가 없습니다.");
                }
            })
            .catch(error => console.error('Error:', error));
    };

    const handleMarkerClick = (poi) => {
        const lat = parseFloat(poi.frontLat);
        const lon = parseFloat(poi.frontLon);
        const name = poi.name;

        const markerPosition = new window.Tmapv3.LatLng(lat, lon);

        const marker = new window.Tmapv3.Marker({
            position: markerPosition,
            icon: markerImage,
            iconSize: new window.Tmapv3.Size(24, 38),
            title: name,
            map: map
        });

        markers.forEach(marker => marker.setMap(null));
        setMarkers([marker]);
        setSelectedPlace(name);
    };

    const handleConfirm = () => {
        const place = selectedPlace || searchKeyword;
        navigate('/AddFlexSchedule', { state: { place } });
        navigate('/addNormalschedule', { state: { place } });
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    className="text_custom"
                    value={searchKeyword}
                    onChange={e => setSearchKeyword(e.target.value)}
                />
                <button onClick={handleSearch}>검색</button>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '30%' }}>
                    <div className="title"><strong>Search</strong> Results</div>
                    <div className="rst_wrap">
                        <div className="rst mCustomScrollbar">
                            <ul id="searchResult" name="searchResult">
                                {searchResult.map((poi, index) => (
                                    <li key={index} onClick={() => handleMarkerClick(poi)}>
                                        <span>{poi.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="map_div" className="map_wrap" style={{ width: '70%' }} ref={mapRef}></div>
            </div>
            <button onClick={handleConfirm}>입력</button>
        </div>
    );
};

export default TmapComponent;
