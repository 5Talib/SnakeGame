
// Variables

let direction = {x:0,y:0};
const foodSound=new Audio("assets/food.mp3");
const gameOverSound=new Audio("assets/gameover.mp3");
const moveSound=new Audio("assets/move.mp3");
const musicSound=new Audio("assets/music.mp3");
let lastPaintTime=0;
let speed=7;
let score=0;
let snakeArr=[
    {x:14,y:14}
];
food = {x:7,y:7};

// Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed) {return;}
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snake){
    // Bump into yourself
    for(let i=1;i<snake.length;i++){
        if(snake[0].x===snake[i].x && snake[0].y===snake[i].y) {
            return true;
        }
    }
    // Bump into wall
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0 ){
        return true;
    }
}

function gameEngine(){
    // Upadating Snake Array and Food

    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        score=0;
        scoreBox.innerHTML="Score: "+score;
        alert("Game Over! Press any key to play again");
        snakeArr=[{x:14,y:14}];
        musicSound.play();
    }

    // Eaten food, so update score and regenerate food
    if(snakeArr[0].x===food.x && snakeArr[0].y===food.y){
        foodSound.play();
        score+=1;
        scoreBox.innerHTML="Score: "+score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x, y:snakeArr[0].y+inputDir.y});
        food={x:Math.round(2+(16-2)*Math.random()), y:Math.round(2+(16-2)*Math.random())};
    }

    // Moving Snake
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;

    // Display Snake and Food

    // Display Snake
    board.innerHTML="";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index==0){
            snakeElement.classList.add("head");
        }
        else{
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    });

    // Display Food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

// Logic
musicSound.play();
musicSound.loop=true;
window.requestAnimationFrame(main);
window.addEventListener("keydown",function(e){
    inputDir={x:0,y:-1};
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;
    
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;
    
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
    
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;
    
        default:
            break;
    }
});