import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './StartPage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import AddNormalSchedulePage from "./AddNormalSchedulePage";
import AddFlexSchedulePage from "./AddFlexSchedulePage";
import Main from "./Main"
import TimeLinePage from "./TimeLinePage";
import TimePicker from "./TimePicker";
import ToDoListPage from "./ToDoListPage";
import RecommendationPage from "./RecommendationPage";
import RecoIng from "./RecoIng";
import SettingPage from "./SettingPage";
import TmapComponent from "./TmapComponent";
import WalkingMapPage from "./WalkingMapPage";

import RecoIngMake from "./RecoIngMake";
import TimeLineMake from "./TimeLineMake";
import MainMake from "./MainMake";
import loading from "./loading";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/addNormalschedule" element={<AddNormalSchedulePage/>} />
                <Route path="/Main" element={<Main/>}/>
                <Route path="/Map" element={<TmapComponent/>} /> {/* TmapComponent 추가 */}
                <Route path="/addFlexschedule" element={<AddFlexSchedulePage/>} />
                <Route path="/TimeLine" element={<TimeLinePage/>} />
                <Route path="/TimePicker" element={<TimePicker/>} />
                <Route path="/ToDoList" element={<ToDoListPage />} />
                <Route path="/Recommendation" element={<RecommendationPage/>} />
                <Route path="/RecoIng" element={<RecoIng/>} />
                <Route path="/Setting" element={<SettingPage/>} />
                <Route path="/walkingMap" element={<WalkingMapPage/>} />

                <Route path="/RecoIngMake" element={<RecoIngMake/>} />
                <Route path="/TimeLineMake" element={<TimeLineMake/>} />
                <Route path="/MainMake" element={<MainMake/>} />
                <Route path ="/loading" element={<loading/>} />
            </Routes>
        </Router>
    );
}

export default App;