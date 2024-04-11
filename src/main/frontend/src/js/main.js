let date = new Date();

// 캘린더를 렌더링하는 함수
const renderCalender = () => {
    const viewYear = date.getFullYear(); // 현재 년도
    const viewMonth = date.getMonth(); // 현재 월
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; // 월 이름 배열

    document.querySelector('.year-month').textContent = `${months[viewMonth]} ${viewYear}`; // 년도와 월 표시

    // 이전 달의 마지막 날과 현재 달의 마지막 날 설정
    const prevLast = new Date(viewYear, viewMonth, 0);
    const thisLast = new Date(viewYear, viewMonth + 1, 0);

    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();

    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();

    const prevDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    const nextDates = [];

    // 이전 달의 날짜 구하기
    if (PLDay !== 6) {
        for (let i = 0; i < PLDay + 1; i++) {
            prevDates.unshift(PLDate - i);
        }
    }

    // 다음 달의 날짜 구하기
    for (let i = 1; i < 7 - TLDay; i++) {
        nextDates.push(i);
    }

    const dates = prevDates.concat(thisDates, nextDates); // 모든 날짜 합치기
    const firstDateIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(TLDate);

    // 각 날짜에 대한 HTML 생성
    dates.forEach((date, i) => {
        const condition = i >= firstDateIndex && i < lastDateIndex + 1 ? 'this' : 'other';
        dates[i] = `<div class="date"><span class=${condition}>${date}</span></div>`;
    });

    document.querySelector('.dates').innerHTML = dates.join(''); // 달력에 날짜 추가

    // 오늘 날짜를 강조 표시
    const today = new Date();
    if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
        for (let date of document.querySelectorAll('.this')) {
            if (+date.innerText === today.getDate()) {
                date.classList.add('today');
                break;
            }
        }
    }
};

renderCalender(); // 캘린더 초기 렌더링

// 이전 달로 이동하는 함수
const prevMonth = () => {
    date.setDate(1);
    date.setMonth(date.getMonth() - 1);
    renderCalender();
};

// 다음 달로 이동하는 함수
const nextMonth = () => {
    date.setDate(1);
    date.setMonth(date.getMonth() + 1);
    renderCalender();
};

// 오늘 날짜로 이동하는 함수
const goToday = () => {
    date = new Date();
    renderCalender();
};

document.addEventListener('DOMContentLoaded', function() {
    // 하단 탭의 각 메뉴 아이템
    const bottomMenuItems = document.querySelectorAll('.bottom_menu > div');

    // 일반 스케줄 추가 버튼 요소
    const normalSceduleBtn = document.querySelector('.button_container button:first-child');

    // 각 메뉴 아이템에 클릭 이벤트 추가
    bottomMenuItems.forEach(function(item) {
        item.addEventListener('click', function() {
            // 클릭된 메뉴 아이템에 'active' 클래스 추가 및 다른 아이템에서는 'active' 클래스 제거
            bottomMenuItems.forEach(function(el) {
                el.classList.remove('active');
            });
            this.classList.add('active');

            // 메뉴 아이템이 'Calendar'인 경우 main.html 페이지로 이동
            if (item.querySelector('p').textContent === 'Calendar') {
                window.location.href = 'main.html'; // 이동할 페이지 URL 설정
            }
        });
    });

    // 일반 스케줄 추가 버튼에 클릭 이벤트 리스너 추가
    normalSceduleBtn.addEventListener('click', function() {
        // addNormalCal.html 페이지로 이동
        window.location.href = 'addNormalCal.html';
    });
});

window.onload = function() {
    // 팝업 외부 클릭 시 닫기 함수 정의
    function offClick(event) {
        if (event.target.classList.contains('back_bg')) {
            document.querySelector('.popup_wrap').style.display = 'none';
            document.querySelector('.popup_wrap2').style.display = 'none';
            document.querySelector('.back_bg').style.display = 'none';
        }
    }

    // 일반 스케줄 추가 버튼 클릭 시 처리
    function onAddScheduleClick() {
        document.querySelector('.popup_wrap').style.display = 'block';
        document.querySelector('.back_bg').style.display = 'block';
    }

    // 검색 팝업 열기 함수
    function onSearchClick() {
        document.querySelector('.popup_wrap2').style.display = 'block';
        document.querySelector('.back_bg').style.display = 'block';
    }

    // 일반 스케줄 추가 버튼에 클릭 이벤트 리스너 추가
    document.getElementById('popup_addSchedule').addEventListener('click', onAddScheduleClick);

    // 검색 버튼에 클릭 이벤트 리스너 추가
    document.getElementById('popup_search').addEventListener('click', onSearchClick);

    // 팝업 외부 영역 클릭 이벤트 리스너 추가 (공통)
    document.querySelector('.back_bg').addEventListener('click', offClick);
};

//시간대 추천 달력
let mini_date = new Date();

// 캘린더를 렌더링하는 함수
const mini_renderCalender = () => {
    const mini_viewYear = mini_date.getFullYear(); // 현재 년도
    const mini_viewMonth = mini_date.getMonth(); // 현재 월
    const mini_months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; // 월 이름 배열

    document.querySelector('.mini_year-month').textContent = `${mini_months[mini_viewMonth]} ${mini_viewYear}`; // 년도와 월 표시

    // 이전 달의 마지막 날과 현재 달의 마지막 날 설정
    const mini_prevLast = new Date(mini_viewYear, mini_viewMonth, 0);
    const mini_thisLast = new Date(mini_viewYear, mini_viewMonth + 1, 0);

    const mini_PLDate = mini_prevLast.getDate();
    const mini_PLDay = mini_prevLast.getDay();

    const mini_TLDate = mini_thisLast.getDate();
    const mini_TLDay = mini_thisLast.getDay();

    const mini_prevDates = [];
    const mini_thisDates = [...Array(mini_TLDate + 1).keys()].slice(1);
    const mini_nextDates = [];

    // 이전 달의 날짜 구하기
    if (mini_PLDay !== 6) {
        for (let i = 0; i < mini_PLDay + 1; i++) {
            mini_prevDates.unshift(mini_PLDate - i);
        }
    }

    // 다음 달의 날짜 구하기
    for (let i = 1; i < 7 - mini_TLDay; i++) {
        mini_nextDates.push(i);
    }

    const mini_dates = mini_prevDates.concat(mini_thisDates, mini_nextDates); // 모든 날짜 합치기
    const mini_firstDateIndex = mini_dates.indexOf(1);
    const mini_lastDateIndex = mini_dates.lastIndexOf(mini_TLDate);

    // 각 날짜에 대한 HTML 생성
    mini_dates.forEach((mini_date, i) => {
        const mini_condition = i >= mini_firstDateIndex && i < mini_lastDateIndex + 1 ? 'mini_this' : 'mini_other';
        mini_dates[i] = `<div class="date"><span class=${mini_condition}>${mini_date}</span></div>`;
    });

    document.querySelector('.mini_dates').innerHTML = mini_dates.join(''); // 달력에 날짜 추가
};

mini_renderCalender(); // 캘린더 초기 렌더링

// 이전 달로 이동하는 함수
const mini_prevMonth = () => {
    mini_date.setDate(1);
    mini_date.setMonth(mini_date.getMonth() - 1);
    mini_renderCalender();
};

// 다음 달로 이동하는 함수
const mini_nextMonth = () => {
    mini_date.setDate(1);
    mini_date.setMonth(mini_date.getMonth() + 1);
    mini_renderCalender();
};

document.addEventListener('DOMContentLoaded', function() {
    const dateElements = document.querySelectorAll('.mini_dates .date span');

    // 선택된 날짜를 저장할 배열
    let selectedDates = [];

    // 날짜를 클릭했을 때 선택 상태를 토글하는 함수
    const toggleDateSelection = (element, day) => {
        const index = selectedDates.indexOf(day);

        if (index === -1) {
            selectedDates.push(day);
            element.classList.add('selected');
        } else {
            selectedDates.splice(index, 1);
            element.classList.remove('selected');
        }

        console.log('Selected Dates:', selectedDates);
    };

    // 각 날짜 요소에 클릭 이벤트 추가
    dateElements.forEach((element) => {
        element.addEventListener('click', () => {
            const day = parseInt(element.innerText);
            toggleDateSelection(element, day);
        });
    });
});

// 직접 입력 버튼 클릭 시 예상 소요시간 입력칸 활성화
function enableManualInput() {
    const timeDisplay = document.getElementById('estimatedTimeDisplay');
    const inputField = document.getElementById('estimatedTimeInput');

    timeDisplay.style.display = 'none'; // 텍스트 숨기기
    inputField.disabled = false; // 입력 필드 활성화
    inputField.value = ''; // 입력값 초기화
    inputField.focus(); // 입력 필드에 포커스

    // 입력 필드에서 포커스를 잃었을 때 이벤트 처리
    inputField.addEventListener('blur', () => {
        if (inputField.value.trim() === '') {
            // 입력값이 없으면 다시 숨김 상태로 변경
            timeDisplay.style.display = 'inline'; // 텍스트 다시 표시
            inputField.disabled = true; // 입력 필드 비활성화
        }
    });
}

function enableManualInput() {
    // 입력 필드 활성화
    const input = document.getElementById('estimatedTimeInput');
    input.disabled = false;
    input.value = ''; // 입력 초기화
    input.focus(); // 입력 필드에 포커스

    // 입력 필드에서 숫자만 입력되도록 제어
    input.addEventListener('input', function(event) {
        const value = event.target.value;
        const formattedValue = value.replace(/[^\d]/g, ''); // 숫자 이외의 문자 제거
        event.target.value = formattedValue; // 숫자만 입력된 값으로 설정
    });

    // 입력 완료 후 "시간" 추가
    input.addEventListener('blur', function(event) {
        const value = event.target.value.trim(); // 앞뒤 공백 제거
        if (value !== '') {
            event.target.value += '시간'; // 입력된 값 뒤에 "시간" 추가
        }
    });
}

// 예상 소요 시간 설정 함수
function setEstimatedTime(time) {
    const input = document.getElementById('estimatedTimeInput');
    input.value = time;
}

// 추천 버튼 클릭 시 콘솔에 입력된 예상 소요 시간 출력
const submitButton = document.querySelector('.estimated-submit');
submitButton.addEventListener('click', function() {
    const estimatedTime = document.getElementById('estimatedTimeInput').value;
    console.log('입력된 예상 소요 시간:', estimatedTime);
});

// 추천(submit) 버튼 클릭 시 이벤트 처리
const reco_submitButton = document.querySelector('.estimated-submit');
reco_submitButton.addEventListener('click', function() {
    // popup_wrap2 요소 숨기기
    const popup2 = document.querySelector('.popup_wrap2');
    popup2.style.display = 'none';

    // popup_wrap3 요소 보이기
    const popup3 = document.querySelector('.popup_wrap3');
    popup3.style.display = 'block';
});

// 추천(submit) 버튼 클릭 시 이벤트 처리
const recoBackButton = document.querySelector('.back-button');
recoBackButton.addEventListener('click', function() {
    // popup_wrap3 요소 보이기
    const popup3 = document.querySelector('.popup_wrap3');
    popup3.style.display = 'none';
    // popup_wrap2 요소 숨기기
    const popup2 = document.querySelector('.popup_wrap2');
    popup2.style.display = 'block';

});