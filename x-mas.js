/*Гирлянда*/
const colorsArray = [
    '#FF5733', 
    '#33FF57', 
    '#3357FF',
    '#FF33A1',
    '#F0E68C',
    '#BA55D3'
];

function getRandomColorFromArray(colors) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function changeButtonColor(button) {
    const newColor = getRandomColorFromArray(colorsArray);
    
    // Устанавливаем новый цвет фона
    button.style.backgroundColor = newColor;
    
    // !!! Обновляем CSS-переменную --glow-color на новый цвет !!!
    button.style.setProperty('--glow-color', newColor);
}

const buttons = document.querySelectorAll('.button');

buttons.forEach(button => {
    // Устанавливаем начальный случайный цвет и переменную свечения
    changeButtonColor(button);
    
    // Меняем базовый цвет каждые 3 секунды.
    // Сама пульсация управляется независимой CSS-анимацией.
    setInterval(() => {
        changeButtonColor(button);
    }, 2000); 
});


/*Снежинки*/
const canvas = document.getElementById("snow-canvas");
const ctx = canvas.getContext('2d');
let W = window.innerWidth;
let H = window.innerHeight;
canvas.width = W;
canvas.height = H;

const maxSnowflakes = 100; // Количество снежинок
const snowflakes = [];

// Функция для создания снежинки
function Snowflake() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.r = Math.random() * 4 + 1; // Радиус снежинки
    this.density = Math.random() * 0.5 + 0.5; // Плотность/скорость
    this.opacity = Math.random() * 0.5 + 0.3;

    // Метод для движения снежинки
    this.update = function() {
        this.y += Math.pow(this.density, 2) + 1;
        this.x += Math.sin(this.y * 0.01) * 0.5; // Небольшое горизонтальное покачивание (ветер)

        // Если снежинка ушла за пределы экрана, вернуть ее сверху
        if (this.y > H) {
            this.y = 0;
            this.x = Math.random() * W;
        }
    };
}

// Инициализация снежинок
function init() {
    for (let i = 0; i < maxSnowflakes; i++) {
        snowflakes.push(new Snowflake());
    }
}

// Функция отрисовки
function draw() {
    ctx.clearRect(0, 0, W, H); // Очищаем холст

    for (let i = 0; i < maxSnowflakes; i++) {
        const s = snowflakes[i];
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        s.update();
    }
    // Зацикливаем анимацию
    requestAnimationFrame(draw);
}

// Запуск
init();
draw();

// Обработка изменения размера окна
window.addEventListener('resize', function(){
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
});