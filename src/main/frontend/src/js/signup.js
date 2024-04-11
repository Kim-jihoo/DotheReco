document.addEventListener('DOMContentLoaded', function() {
    //const form = document.querySelector('form');
    //form.addEventListener('submit', function(event) {
      //  event.preventDefault(); // Prevent the default form submission behavior

        // 로그인 로직

        // Redirect to the main page after login
       // window.location.href = 'start.html';
  //  });
   // const submitBtn = document.getElementById('submitBtn');
    const form = document.getElementById('signupForm');
    form.addEventListener('submit', submitForm);
/*
    submitBtn.addEventListener('click', function(event) {
        event.preventDefault();
        submitForm();
    });*/
});
/*
window.addEventListener('load',function(){
    clearMessages();

    var formElem = document.querySelector('form');
    formElem.onsubmit = submitForm;
});*/

function clearMessages(){
    var messages= document.getElementsByClassName('alert-message');
    for(var i = 0;i<messages.length;i++){
        messages[i].style.display='none';
    }
}

function showMessage(inputElement, message){
    var messageElem = inputElement.parentNode.querySelector('span');
    messageElem.style.display = 'inline';
    messageElem.innerText = message;

    inputElement.focus();
}

//function submitForm(){
async function submitForm(event) {
    event.preventDefault();
    // account info
    var accountInput=document.querySelector('input[name="account"]');
    var passwordInput=document.querySelector('input[name="password"]');
    var passwordConfirmInput=document.querySelector('input[name="password2"]');

    //checkbox
    var checkboxInput=document.querySelector('input[name="agree"]');

    console.log(accountInput.value);
    console.log(passwordInput.value);
    console.log(passwordConfirmInput.value);

    console.log(checkboxInput.value);

    var success = true;

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(accountInput.value)){
        showMessage(accountInput, '올바른 이메일 주소를 입력해주세요.');
        success = false;
    }

    if(passwordInput.value.length < 10){
        showMessage(passwordInput, '비밀번호는 10자리 이상이어야 합니다.');
        success = false;
    }

    if(passwordConfirmInput.value !== passwordInput.value){
        showMessage(passwordConfirmInput, '비밀번호를 동일하게 입력해주세요.');
        success = false;
    }
    // 백엔드와의 통신 부분 추가
    if (success) {
        var formData = {
            userid: accountInput.value,
            userpassword1: passwordInput.value,
            userpassword2: passwordConfirmInput.value,
            usernickname: document.querySelector('input[name="nickname"]').value // 닉네임 입력 필드 추가 처리
        };

        try {
            const response = await fetch('/api/user/signup/json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Signup failed');
            }
            const data = await response.json();
            alert(data); // 성공 메시지 표시
            window.location.href = '/start.html'; // 성공 시 리다이렉션
        } catch (error) {
            alert(error.message); // 에러 메시지 표시
        }
    }
    return success;
}
// Form 제출 이벤트에 submitForm 함수 직접 연결
//const form = document.getElementById('signupForm');
//form.addEventListener('submit', submitForm);