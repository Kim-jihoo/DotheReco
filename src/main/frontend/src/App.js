import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './StartPage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import AddNormalSchedulePage from "./AddNormalSchedulePage";
import Calendar from "./Calendar";
import Footer from "./Footer";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/addNormalschedule" element={<AddNormalSchedulePage/>} />
                <Route path="/calendar" element={<Calendar/>}/>
                <Route path="/footer" element={<Footer/>}/>
            </Routes>
        </Router>
    );
}

export default App;
