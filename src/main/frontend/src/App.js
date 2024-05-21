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
import SettingPage from "./SettingPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/addNormalschedule" element={<AddNormalSchedulePage/>} />
                <Route path="/addFlexschedule" element={<AddFlexSchedulePage/>} />
                <Route path="/Main" element={<Main/>}/>
                <Route path="/TimeLine" element={<TimeLinePage/>} />
                <Route path="/TimePicker" element={<TimePicker/>} />
                <Route path="/ToDoList" element={<ToDoListPage />} />
                <Route path="/Recommendation" element={<RecommendationPage/>} />
                <Route path="/Setting" element={<SettingPage/>} />
            </Routes>
        </Router>
    );
}

export default App;