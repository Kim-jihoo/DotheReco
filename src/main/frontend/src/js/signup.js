document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // 로그인 로직

        // Redirect to the main page after login
        window.location.href = 'start.html';
    });
});

window.addEventListener('load',function(){
    clearMessages();

    var formElem = document.querySelector('form');
    formElem.onsubmit = submitForm;
});

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

function submitForm(){
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

    return success;
}
