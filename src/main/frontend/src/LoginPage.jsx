import React from 'react';
import './css/login.css'
function LoginPage() {
    const handleSubmit = (event) => {
        event.preventDefault();
        // 폼 데이터를 처리하는 로직을 추가할 수 있습니다.
        console.log('Form submitted!');
    };

    return (
        <div className="login-container">
            <button onClick={() => window.history.back()} className="back-button" id="back-button">
                &lt;
            </button>
            <h1 className="login-h1">Login</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="login-input-container">
                    <label htmlFor="id-account"></label>
                    <input type="text" className="login-account" id="id-account" placeholder="이메일" required />
                </div>
                <div className="login-input-container">
                    <label htmlFor="password-account"></label>
                    <input type="password" className="login-password" id="password-account" placeholder="비밀번호" required />
                </div>
                <button className="login-button" type="submit">확인</button>
            </form>
        </div>
    );
}

export default LoginPage;
