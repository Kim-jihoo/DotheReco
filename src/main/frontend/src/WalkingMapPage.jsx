import React, { useEffect, useState, useRef } from 'react';
import markerImage from "./images/marker.png";
import markerforStopoverImage from "./images/stopoverMarker.png";
import { useNavigate, useLocation } from 'react-router-dom';
import './css/WalkingMap.css';
import TimeTableImage from "./images/Time table.png";
import CalendarImage from "./images/Calendar.png";
import TodoListImage from "./images/할 일 list.png";
import SettingImage from "./images/Setting.png";
import axios from 'axios';
// 카테고리별 색상 정의
const categoryColors = {
    1: '#F0CAB9', // 약속
    2: '#FAE4A8', // 예약
    3: '#B9DEF0', // 수업
    // 추가 카테고리와 색상을 여기에 정의
};

const categoryNames = {
    0: '졸프',
    1: '약속',
    2: '예약',
    3: '수업'
};

const WalkingMapPage = () => {
    const [mapInitialized, setMapInitialized] = useState(false);
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [userLocation, setUserLocation] = useState({lat: 37.56170342835584, lon: 126.94238994640058}); // 기본값은 이화여자대학교
    const [coordinate1, setCoordinate1] = useState({lat: 37.56680149281015, lon: 126.9487473277085}); // 신공학관 좌표
    const [coordinate2, setCoordinate2] = useState({lat: 37.558798426576146, lon: 126.93931655974903}); // 올리브영 좌표
    const [coordinate3, setCoordinate3] = useState({lat: 37.556049830250984, lon: 126.93824646263005}); // 헬스보이짐 좌표
    const mapRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [timeTable, setTimeTable] = useState([]);
    const [routeInfo, setRouteInfo] = useState({ distance: '', time: '' });
    const [resultdrawArr, setResultdrawArr] = useState([]);

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
                    const {latitude, longitude} = position.coords;
                    setUserLocation({lat: latitude, lon: longitude});
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
                zoom: 14
            });
            setMap(mapInstance);

            // Create markers for the three coordinates
            const marker1 = new window.Tmapv3.Marker({
                position: new window.Tmapv3.LatLng(coordinate1.lat, coordinate1.lon),
                icon: markerImage,
                iconSize: new window.Tmapv3.Size(24, 38),
                map: mapInstance
            });

            const marker2 = new window.Tmapv3.Marker({
                position: new window.Tmapv3.LatLng(coordinate2.lat, coordinate2.lon),
                icon: markerforStopoverImage,
                iconSize: new window.Tmapv3.Size(24, 38),
                map: mapInstance
            });

            const marker3 = new window.Tmapv3.Marker({
                position: new window.Tmapv3.LatLng(coordinate3.lat, coordinate3.lon),
                icon: markerImage,
                iconSize: new window.Tmapv3.Size(24, 38),
                map: mapInstance
            });

            setMarkers([marker1, marker2, marker3]);
            calculateRoute(mapInstance, marker1, marker2, marker3);
        }
    }, [mapInitialized, userLocation]);

    const calculateRoute = (mapInstance, marker1, marker2, marker3) => {
        const headers = {
            "appKey": "0ZSTJ6jGf15NagHDb0wOT5Q06tnZG7Yw2vKYVzqo",
            "Content-Type": "application/json"
        };

        const data1 = {
            "startX": marker1.getPosition().lng(),
            "startY": marker1.getPosition().lat(),
            "endX": marker2.getPosition().lng(),
            "endY": marker2.getPosition().lat(),
            "reqCoordType": "WGS84GEO",
            "resCoordType": "EPSG3857",
            "startName": "출발지",
            "endName": "경유지"
        };

        const data2 = {
            "startX": marker2.getPosition().lng(),
            "startY": marker2.getPosition().lat(),
            "endX": marker3.getPosition().lng(),
            "endY": marker3.getPosition().lat(),
            "reqCoordType": "WGS84GEO",
            "resCoordType": "EPSG3857",
            "startName": "경유지",
            "endName": "도착지"
        };

        fetch("https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data1)
        })
            .then(response => response.json())
            .then(response1 => {
                if (response1.features) {
                    fetch("https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json", {
                        method: "POST",
                        headers: headers,
                        body: JSON.stringify(data2)
                    })
                        .then(response => response.json())
                        .then(response2 => {
                            if (response2.features) {
                                const resultData1 = response1.features;
                                const resultData2 = response2.features;

                                if (resultdrawArr.length > 0) {
                                    resultdrawArr.forEach(line => line.setMap(null));
                                    setResultdrawArr([]);
                                }

                                let drawInfoArr1 = [];
                                resultData1.forEach(item => {
                                    const { geometry } = item;
                                    if (geometry.type === "LineString") {
                                        geometry.coordinates.forEach(coord => {
                                            const latlng = new window.Tmapv3.Point(coord[0], coord[1]);
                                            const convertPoint = new window.Tmapv3.Projection.convertEPSG3857ToWGS84GEO(latlng);
                                            drawInfoArr1.push(new window.Tmapv3.LatLng(convertPoint._lat, convertPoint._lng));
                                        });
                                    }
                                });

                                let drawInfoArr2 = [];
                                resultData2.forEach(item => {
                                    const { geometry } = item;
                                    if (geometry.type === "LineString") {
                                        geometry.coordinates.forEach(coord => {
                                            const latlng = new window.Tmapv3.Point(coord[0], coord[1]);
                                            const convertPoint = new window.Tmapv3.Projection.convertEPSG3857ToWGS84GEO(latlng);
                                            drawInfoArr2.push(new window.Tmapv3.LatLng(convertPoint._lat, convertPoint._lng));
                                        });
                                    }
                                });

                                drawLine(drawInfoArr1, mapInstance);
                                drawLine(drawInfoArr2, mapInstance);

                                const distance1 = resultData1[0].properties.totalDistance;
                                const time1 = resultData1[0].properties.totalTime;

                                const distance2 = resultData2[0].properties.totalDistance;
                                const time2 = resultData2[0].properties.totalTime;

                                const totalDistance = ((distance1 + distance2) / 1000).toFixed(1);
                                const totalTime = ((time1 + time2) / 60).toFixed(0);

                                setRouteInfo({ distance: totalDistance, time: totalTime });
                            }
                        })
                        .catch(error => console.error('Error:', error));
                }
            })
            .catch(error => console.error('Error:', error));
    };

    const drawLine = (arrPoint, mapInstance) => {
        const polyline = new window.Tmapv3.Polyline({
            path: arrPoint,
            strokeColor: "#e11f1f",
            strokeWeight: 6,
            map: mapInstance
        });
        setResultdrawArr(prevState => [...prevState, polyline]);
    };

    const formatTime = (time) => {
        const [hour, minute] = time.split(':');
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minute} ${ampm}`;
    };

    const calculateTimeDifference = (startTime, endTime) => {
        const start = new Date(`1970-01-01T${startTime}Z`);
        const end = new Date(`1970-01-01T${endTime}Z`);
        return (end - start) / (1000 * 60); // minutes
    };

    const getCategoryColor = (categoryCode) => {
        return categoryColors[categoryCode] || '#DBE9CD'; // 기본 색상: 졸프
    };

    const getCategoryName = (categoryCode) => {
        return categoryNames[categoryCode] || '졸프';
    };

    // 새벽 1시부터 7시까지의 이벤트 필터링
    const filteredTimeTable = timeTable.filter(item => {
        const [hour] = item.startTime.split(':');
        return parseInt(hour) >= 7 || parseInt(hour) === 0;
    });

    useEffect(() => {
        const fetchTodaySchedules = async () => {
            const today = new Date().toISOString().split('T')[0];
            try {
                const response = await axios.get(`http://localhost:8080/api/fixed/date/${today}`);
                const eventsForToday = response.data.map(event => ({
                    startTime: event.fixedStartTime,
                    endTime: event.fixedEndTime,
                    event: event.fixedTitle,
                    category: event.categoryCode,
                    place: event.placeName // 장소 정보 추가
                }));
                setTimeTable(eventsForToday);
            } catch (error) {
                console.error('일정을 가져오는 중 오류 발생:', error);
            }
        };

        fetchTodaySchedules();
    }, []);

    const goToTimeLine = () => {
        navigate('/timeLine');
    };

    const goToCalendar = () => {
        navigate('/Main');
    };

    const goToToDoList = () => {
        navigate('/ToDolist');
    };

    const goToSetting = () => {
        navigate('/Setting');
    }

    return (
        <div className="Tmapplace-gray-box">
            <button type="button" className="Tmapplace-back-button" onClick={() => window.history.back()}>
                &lt;
            </button>
            <div className="Tmapplace-content">
                <div id="map_div" className="Tmap_wrap" ref={mapRef}></div>
            </div>

            {/* 경로 정보 */}
            <div className="route-info">
                <p>총 거리: {routeInfo.distance} km 예상이동시간: {routeInfo.time} 분 </p>
            </div>

            {/* 타임 테이블 */}
            <div className="Tmapplace-timetable-container">
                <div className="Tmapplace-timetable">
                    {[...Array(17)].map((_, hour) => (
                        <div className="Tmapplace-hour" key={hour}>
                            <div className="Tmapplace-half-hour">
                                <div className="Tmapplace-time-label">{formatTime(`${hour + 7}:00`)}</div>
                                {filteredTimeTable.map((item, index) => {
                                    const [startHour, startMinute] = item.startTime.split(':').map(Number);
                                    const [endHour, endMinute] = item.endTime.split(':').map(Number);
                                    if (startHour === hour + 7 && startMinute <= 30) {
                                        const duration = calculateTimeDifference(item.startTime, item.endTime);
                                        return (
                                            <div
                                                className="timeline-event"
                                                key={index}
                                                style={{
                                                    top: `${startMinute}px`,
                                                    height: `${duration * 1.4}px`, // Each minute is 2 pixels
                                                    backgroundColor: getCategoryColor(item.category)
                                                }}
                                            >
                                                <div className="event-title">{item.event}</div>
                                                <div className="event-time">
                                                    {formatTime(item.startTime)} - {formatTime(item.endTime)}
                                                </div>
                                                <div className="event-category-container">
                                                    <div className="event-category">{getCategoryName(item.category)}</div>
                                                    <div className="event-place">{item.place}</div> {/* 장소 표시 */}
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                            <div className="Tmapplace-half-hour">
                                <div className="Tmapplace-time-label">{formatTime(`${hour + 7}:30`)}</div>
                                {filteredTimeTable.map((item, index) => {
                                    const [startHour, startMinute] = item.startTime.split(':').map(Number);
                                    if (startHour === hour + 7 && startMinute > 30) {
                                        const duration = calculateTimeDifference(item.startTime, item.endTime);
                                        return (
                                            <div
                                                className="timeline-event"
                                                key={index}
                                                style={{
                                                    top: `${startMinute}px`,
                                                    height: `${duration * 2}px`, // Each minute is 2 pixels
                                                    backgroundColor: getCategoryColor(item.category)
                                                }}
                                            >
                                                <div className="event-title">{item.event}</div>
                                                <div className="event-time">
                                                    {formatTime(item.startTime)} - {formatTime(item.endTime)}
                                                </div>
                                                <div className="event-place">{item.place}</div> {/* 장소 표시 */}
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 하단 메뉴 바 */}
            <div className="menu">
                <div className="menu-details">
                    <img className="TimeTableImage" src={TimeTableImage} alt="Time Table" onClick={goToTimeLine}/>
                    <p>Time table</p>
                </div>
                <div className="menu-details">
                    <img className="CalendarImage" src={CalendarImage} alt="Calendar" onClick={goToCalendar}/>
                    <p>Calendar</p>
                </div>
                <div className="menu-details">
                    <img className="TodoListImage" src={TodoListImage} alt="To Do List" onClick={goToToDoList}/>
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

export default WalkingMapPage;
