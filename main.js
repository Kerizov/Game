const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div');
    
car.classList.add('car');


start.addEventListener('click', startGame)
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

const setting = {
    start: false,
    score: 0,
    speed: 10,
    traffic: 3
};

function getQuantityElements(heightElement){
    return document.documentElement.clientHeight / heightElement + 1;
}

function randomInteger(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function startGame(){
    start.classList.add('hide');
    gameArea.innerHTML = '';
    
    for(let i = 0; i < getQuantityElements(100); i++){
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) +'px';
        line.y = i * 100;
        gameArea.appendChild(line);
    }
    for(let i = 0; i < getQuantityElements(100); i++){
        const line2 = document.createElement('div');
        line2.classList.add('line2');
        line2.style.top = (i * 100) +'px';
        line2.y = i * 100;
        gameArea.appendChild(line2);
    }
    for(let i = 0; i < getQuantityElements(100); i++){
        const line3 = document.createElement('div');
        line3.classList.add('line3');
        line3.style.top = (i * 100) +'px';
        line3.y = i * 100;
        gameArea.appendChild(line3);
    }
    for(let i = 0; i < getQuantityElements(100 * setting.traffic); i++){
        const enemy = document.createElement('div');
        let array = [50, 200, 350, 500],
            len_arr = array.length,
            rand_num = [Math.floor(Math.random()*len_arr)];
            
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i + 1);
        enemy.style.left = array[rand_num] + 'px';
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = 'transparent url(./image/enemy2.png) center / cover no-repeat';
        gameArea.appendChild(enemy);

    }
    setting.score = 0;
    setting.start = true;
    gameArea.appendChild(car);
    car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2;
    car.style.top = 'auto';
    car.style.bottom = '10px';
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
}

function playGame(){

    if (setting.start){
        setting.score += setting.speed;
        score.innerHTML = 'SCORE:<br> ' + setting.score;
        moveRoad();
        moveEnemy();
        if(keys.ArrowLeft && setting.x > 0){
            setting.x -= (setting.speed / 2);
        }
        if(keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)){
            setting.x += (setting.speed / 2);
        }
        if(keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)){
            setting.y += (setting.speed / 2);
        }
        if(keys.ArrowUp  && setting.y > 0){
            setting.y -= (setting.speed / 2);
        }

        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';
    requestAnimationFrame(playGame);
    }
}

function startRun(event){
    if (keys.hasOwnProperty(event.key)){
        event.preventDefault();
        keys[event.key] = true;
    }
    
}

function stopRun(event){
    if (keys.hasOwnProperty(event.key)){
        event.preventDefault();
        keys[event.key] = false;
    }
}

function moveRoad(){
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line){
        line.y += setting.speed;
        line.style.top = line.y + 'px';

        if(line.y > document.documentElement.clientHeight){
            line.y = -100;
        }
    })
    let lines2 = document.querySelectorAll('.line2');
    lines2.forEach(function(line2){
        line2.y += setting.speed;
        line2.style.top = line2.y + 'px';

        if(line2.y > document.documentElement.clientHeight){
            line2.y = -100;
        }
    })
    let lines3 = document.querySelectorAll('.line3');
    lines3.forEach(function(line3){
        line3.y += setting.speed;
        line3.style.top = line3.y + 'px';

        if(line3.y > document.documentElement.clientHeight){
            line3.y = -100;
        }
    })
}
function moveEnemy(){
    let enemy = document.querySelectorAll('.enemy'),
        array = [50, 200, 350, 500],
        len_arr = array.length,
        rand_num = [Math.floor(Math.random()*len_arr)];

    enemy.forEach(function(item){
        let carRect = car.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect();

        if(carRect.top <= enemyRect.bottom &&
            carRect.right >= enemyRect.left &&
            carRect.left <= enemyRect.right &&
            carRect.bottom >= enemyRect.top){
                setting.start = false;
                start.classList.remove('hide');
                start.style.top = score.offsetHeight;
        }

        item.y += setting.speed / 2;
        item.style.top = item.y + 'px';

        if(item.y > document.documentElement.clientHeight){
        item.y = -100 * setting.traffic;
        item.style.left = array[rand_num] + 'px';
        }
    });

    
}

