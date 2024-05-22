import React, { useState } from 'react';
import './css/signup.css';
import axios from 'axios';

function SignupPage() {
    const [formData, setFormData] = useState({
        account: '',
        password: '',
        password2: '',
        nickname: '',
        agree: false
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formData.password !== formData.password2) {
            setErrorMessage('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (!formData.agree) {
            setErrorMessage('이용약관과 개인정보 수집 방침에 동의해야 합니다.');
            return;
        }

        try {
            const response = await axios.post('/api/user/signup/json', {
                userid: formData.account,
                usernickname: formData.nickname,
                userpassword1: formData.password,
                userpassword2: formData.password2
            });
            alert(response.data); // 회원가입 성공 메시지 출력
            // 회원가입 성공 후 필요한 작업 수행 (StartPage 페이지 이동)
        } catch (error) {
            if (error.response && error.response.data) {
                const errorMsg = error.response.data.error || '회원가입에 실패했습니다.';
                setErrorMessage(errorMsg);
            } else {
                setErrorMessage('서버 오류'); // 요청 실패 시 기본 에러 메시지
            }
        }
    };

    return (
        <div className="signup-container">
            <button onClick={() => window.history.back()} className="back-button" id="back-button">
                &lt;
            </button>
            <h1 className="signup-h1">Sign up</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="signup-input-container">
                    <label htmlFor="id-account"></label>
                    <input
                        className="signup-account"
                        type="text"
                        id="id-account"
                        name="account"
                        placeholder="이메일"
                        value={formData.account}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="signup-input-container">
                    <label htmlFor="password-account"></label>
                    <input
                        className="signup-password"
                        type="password"
                        id="password-account"
                        name="password"
                        placeholder="비밀번호"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="signup-input-container">
                    <label htmlFor="password2-account"></label>
                    <input
                        className="signup-password2"
                        type="password"
                        id="password2-account"
                        name="password2"
                        placeholder="비밀번호 확인"
                        value={formData.password2}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="signup-input-container">
                    <label htmlFor="nickname-account"></label>
                    <input
                        type="text"
                        className="signup-nickname"
                        id="nickname-account"
                        name="nickname"
                        placeholder="닉네임"
                        value={formData.nickname}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="signup-agree">
                    <input
                        className="signup-agreecheck"
                        type="checkbox"
                        id="id-agree"
                        name="agree"
                        checked={formData.agree}
                        onChange={() => setFormData({ ...formData, agree: !formData.agree })}
                        required
                    />
                    <label htmlFor="id-agree">
                        사이트 이용약관과 개인정보 수집 방침에 동의합니다.
                    </label>
                </div>
                <button className="signup-button" type="submit">완료</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    );
}

export default SignupPage;
