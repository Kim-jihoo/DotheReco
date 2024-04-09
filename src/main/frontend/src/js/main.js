let date = new Date();

const renderCalender = () => {
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    document.querySelector('.year-month').textContent = `${months[viewMonth]} ${viewYear}`;


    const prevLast = new Date(viewYear, viewMonth, 0);
    const thisLast = new Date(viewYear, viewMonth + 1, 0);

    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();

    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();

    const prevDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    const nextDates = [];

    if (PLDay !== 6) {
        for (let i = 0; i < PLDay + 1; i++) {
            prevDates.unshift(PLDate - i);
        }
    }

    for (let i = 1; i < 7 - TLDay; i++) {
        nextDates.push(i);
    }

    const dates = prevDates.concat(thisDates, nextDates);
    const firstDateIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(TLDate);

    dates.forEach((date, i) => {
        const condition =
            i >= firstDateIndex && i < lastDateIndex + 1 ? 'this' : 'other';
        dates[
            i
            ] = `<div class="date"><span class=${condition}>${date}</span></div>`;
    });

    document.querySelector('.dates').innerHTML = dates.join('');

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

renderCalender();

const prevMonth = () => {
    date.setDate(1);
    date.setMonth(date.getMonth() - 1);
    renderCalender();
};

const nextMonth = () => {
    date.setDate(1);
    date.setMonth(date.getMonth() + 1);
    renderCalender();
};

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
            // 클릭된 메뉴 아이템에 'active' 클래스를 추가하고 나머지 아이템에서는 'active' 클래스를 제거합니다.
            bottomMenuItems.forEach(function(el) {
                el.classList.remove('active');
            });
            this.classList.add('active');

            if (item.querySelector('p').textContent === 'Calendar') {
                window.location.href = 'main.html'; // 이동할 페이지 URL을 여기에 입력합니다.
            }
        });
    });

    //일반스케줄 추가 버튼에 클릭 이벤트 리스너 추가
    normalSceduleBtn.addEventListener('click', function(){
        //addNormalCal.html로 이동
        window.location.href = 'addNormalCal.html';
    });
});


window.onload=function(){

    function onClick(){
        document.querySelector('.popup_wrap').style.display='block';
        document.querySelector('.back_bg').style.display='block';
    }

    function offClick(event){
        if(event.target.classList.contains('back_bg')) {
            document.querySelector('.popup_wrap').style.display='none';
            document.querySelector('.back_bg').style.display='none';
        }
    }

    // 팝업을 띄우는 이벤트 리스너 등록
    document.getElementById('popup_addSchedule').addEventListener('click', onClick);

    // 팝업 외부를 클릭했을 때 팝업 닫기
    document.querySelector('.back_bg').addEventListener('click', offClick);
};

