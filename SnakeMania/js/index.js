
// main constants and variables
let inputDir = {x: 0, y: 0};
let score = 0;
let lastPaintTime = 0;
let highScoreVal = 0;
let speed = 5;

// get board element
const board = document.getElementById('board');

const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');

let snakeArray = [
    {x:10, y:12}
];

let food = {x: 6, y:7};

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//game functions 
function main(ctime){
    window.requestAnimationFrame(main);

    if((ctime - lastPaintTime) / 1000 < 1 / speed){
        return;
    }

    lastPaintTime = ctime;

    gameEngine();
}

function isCollide(snakeArray){
    for (let i = 1; i < snakeArray.length; i++) {
        if(snakeArray[i].x == snakeArray[0].x && snakeArray[i].y == snakeArray[0].y){
            return true;
        }
    }
    if(snakeArray[0].x <= 0 || snakeArray[0].x >= 18 || snakeArray[0].y <= 0 || snakeArray[0].y >= 18){
        return true;
    }
    return false;
}

function gameEngine(){
    
    //Part 1: Updating the snake array & food 
    if(isCollide(snakeArray)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over. Press any key to play again!");
        snakeArray = [{x:10, y:12}];
        musicSound.play();
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
    }

    //food is eaten 
    if(snakeArray[0].x == food.x && snakeArray[0].y == food.y){
        foodSound.play();
        score += 1;
        if(score > highScoreVal){
            highScoreVal = score;
            localStorage.setItem("highscore", JSON.stringify(highScoreVal));
            highScoreBox.innerHTML = "High Score: " + highScoreVal;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArray.unshift({x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y});

        food.x = randomInt(2,16);
        food.y = randomInt(2,16);

    }

    //moving the snake 
    for(let i = snakeArray.length - 2; i >= 0; i--){
        snakeArray[i+1] = {...snakeArray[i]};
    }

    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;

    //Part 2: Display the snake and food 
    //Display the snake
    board.innerHTML = "";
    snakeArray.forEach((e,idx) =>{
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(idx === 0) snakeElement.classList.add('head');
        else snakeElement.classList.add('snake');

        board.appendChild(snakeElement);
    })
    //Display the food
    let foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);

    }
    //main logic 
    let highScore = localStorage.getItem("highscore");
    if(highScore === null){
        highScoreVal = 0;
        localStorage.setItem("highscore", JSON.stringify(highScoreVal));    
    }
    else{
        highScoreVal = JSON.parse(highScore);
    }
    
    highScoreBox.innerHTML = "High Score: " + highScoreVal;



window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{

    moveSound.play();
    musicSound.play();

    switch(e.key){
        case "ArrowUp":
            inputDir = {x: 0, y: -1};
            break;

        case "ArrowDown":
            inputDir = {x: 0, y: 1};
            break;

        case "ArrowLeft":
            inputDir = {x: -1, y: 0};
            break;

        case "ArrowRight":
            inputDir = {x: 1, y: 0};
            break;

        default:
            break;
    }
});