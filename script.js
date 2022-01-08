const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const rules = document.querySelector('#rules');
const board = document.querySelector('.board');
const colors = ['pink', 'lightblue', 'orange', 'lime', 'tomato', 'violet', 'green', 'yellow', 'red', 'blue'];
let time = 0;
let score = 0;

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (e) => {
    if(e.target.classList.contains('time-btn')) {
        time = parseInt(e.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
})

board.addEventListener('click', (e) => {
    if (e.target.classList.contains('circle')) {
        score++;
        e.target.remove();
        createRandomCircle();
    }
})

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function finishGame() {
    console.log('игра окончена')
    timeEl.parentElement.classList.add('hide');
    rules.classList.add('hide');
    board.innerHTML = `<h1>Ваш счет: <span class="primary">${score}</span></h1>`;
}

function decreaseTime() {

    if (time === 0) {
        finishGame()
    } else {
        let current = --time;
        if(current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function createRandomCircle() {
    const circle = document.createElement('div');
    circle.classList.add('circle');

    const size = getRandomNumber(10, 60);
    const color = getRandomColor();
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height- size);

    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.backgroundColor = `${color}`

    board.append(circle);
}

function getRandomNumber(min, max) {
   return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    const indexColor = Math.floor(Math.random() * colors.length);
    return colors[indexColor]
}