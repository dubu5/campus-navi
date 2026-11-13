// 상태 관리
let state = {
    selectedEntrance: null,
    selectedDestination: null
};

// DOM 요소
const entranceScreen = document.getElementById('entranceScreen');
const destinationScreen = document.getElementById('destinationScreen');
const resultScreen = document.getElementById('resultScreen');
const restartBtn = document.getElementById('restartBtn');
const backToEntranceBtn = document.getElementById('backToEntranceBtn');
const cardsContainer = document.getElementById('cardsContainer');
const selectedEntranceEl = document.getElementById('selectedEntrance');
const selectedDestinationEl = document.getElementById('selectedDestination');

// 입구 버튼 이벤트 - 클릭 시 호수 선택 화면으로 이동
document.querySelectorAll('.entrance-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        state.selectedEntrance = this.dataset.entrance;
        showDestinationScreen();
    });
});

// 목적지 버튼 이벤트 - 클릭 시 안내 화면으로 이동
document.querySelectorAll('.destination-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        state.selectedDestination = this.dataset.destination;
        showResultScreen();
    });
});

// 처음으로 돌아가기 버튼 클릭 (경로 안내 화면에서)
restartBtn.addEventListener('click', function() {
    showEntranceScreen();
});

// 처음으로 돌아가기 버튼 클릭 (호수 선택 화면에서)
backToEntranceBtn.addEventListener('click', function() {
    showEntranceScreen();
});

// 호수 선택 화면 표시
function showDestinationScreen() {
    // 모든 화면 비활성화
    entranceScreen.classList.remove('active');
    destinationScreen.classList.add('active');
    resultScreen.classList.remove('active');
    window.scrollTo(0, 0);
}

// 결과 화면 표시
function showResultScreen() {
    // 선택 정보 표시
    selectedEntranceEl.textContent = getEntranceName(state.selectedEntrance);
    selectedDestinationEl.textContent = getDestinationName(state.selectedDestination) + '호';

    // 경로 카드 렌더링
    renderRouteCards();

    // 화면 전환
    entranceScreen.classList.remove('active');
    destinationScreen.classList.remove('active');
    resultScreen.classList.add('active');

    // 스크롤 상단으로
    window.scrollTo(0, 0);
}

// 입구 선택 화면으로 돌아가기
function showEntranceScreen() {
    // 상태 초기화
    resetState();

    // 화면 전환
    entranceScreen.classList.add('active');
    destinationScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    window.scrollTo(0, 0);
}

// 경로 카드 렌더링
function renderRouteCards() {
    const route = getRoute(state.selectedEntrance, state.selectedDestination);

    // 컨테이너 비우기
    cardsContainer.innerHTML = '';

    // 카드 생성
    route.forEach((card, index) => {
        const cardEl = createRouteCard(card, index);
        cardsContainer.appendChild(cardEl);
    });
}

// 경로 카드 HTML 생성
function createRouteCard(card, stepNumber) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'route-card';

    cardDiv.innerHTML = `
        <div class="route-card-step">${stepNumber + 1}</div>
        <div class="route-card-content">
            <div class="route-card-text">${card.text}</div>
        </div>
    `;

    return cardDiv;
}

// 상태 초기화
function resetState() {
    state = {
        selectedEntrance: null,
        selectedDestination: null
    };
}
