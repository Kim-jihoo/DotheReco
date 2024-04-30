import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './StartPage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import AddNormalSchedulePage from "./AddNormalSchedulePage";
import AddNormalSchedulePages from "./AddNormalSchedulePages";
import Main from "./Main"
import MainCalendar from "./MainCalendar"
import MainCalendars from "./MainCalendars"


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/addNormalschedule" element={<AddNormalSchedulePage/>} />
                <Route path="/addNormalschedules" element={<AddNormalSchedulePages/>} />
                <Route path="/Main" element={<Main/>}/>
                <Route path="/MainCalendar" element={<MainCalendar/>}/>
                <Route path="/MainCalendars" element={<MainCalendars/>}/>

            </Routes>
        </Router>
    );
}

export default App;
