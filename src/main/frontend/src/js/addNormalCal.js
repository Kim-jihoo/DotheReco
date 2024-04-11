// flatpickr 설정
const config1 = {
    dateFormat: "Y년 m월 d일",
};
flatpickr("input[type=date-local]", config1);

const config2 = {
    enableTime: true,
    dateFormat: "Y년 m월 d일 H시 i분",
};
flatpickr("input[type=datetime-local]", config2);

const timeToggle = document.getElementById('time-toggle');
const datePicker = document.getElementById('date-picker');
const hideInputContainer = document.getElementById('datetime-picker');

timeToggle.addEventListener('change', function() {
    if (timeToggle.checked) {
        datePicker.classList.add('hidden');
        hideInputContainer.classList.remove('hidden');
    } else {
        datePicker.classList.remove('hidden');
        hideInputContainer.classList.add('hidden');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // 페이지가 로드된 후 실행되는 코드

    // datetime-picker 숨기기
    const hideInputContainer = document.getElementById('datetime-picker');
    hideInputContainer.classList.add('hidden'); // 숨김 클래스 추가
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // 기본 동작(폼 제출)을 막음

        // 완료 버튼 클릭 시 메인 페이지로 이동
        window.location.href = 'main.html';
    });
});

