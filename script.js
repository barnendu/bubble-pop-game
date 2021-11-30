let bubbles = ['one', 'two', 'three', 'four', 'five'];
let windowWidth = window.innerWidth;
let body = document.body;
let windowHeight = window.innerHeight;
let score = document.querySelectorAll('.score');
let noPop = 0;
let total = 50;
let currentBubble = 0;
let gameOver =false;
let shadow = document.querySelector('.shadow');
let startBtn = document.querySelector('.start-btn');
const virusArray = ["Alpha", "Beta", "Gamma", "Delta", "Omicron"]
function createBubbles() {
    let div = document.createElement('div');
    let rand = Math.floor(Math.random() * bubbles.length);
    div.className = 'bubble bubble-' + bubbles[rand];
    rand = Math.floor(Math.random() * (windowWidth - 150));
   
    div.style.left = rand + 'px';
    div.dataset.number = currentBubble;
    currentBubble ++;
    div.textContent = virusArray[Math. floor(Math. random()*virusArray. length)]
    document.body.appendChild(div);
    annimateBubbles(div)
}

function annimateBubbles(elem) {
    let position =0;
    let random = Math.floor(Math.random() * 6 -3);
    let interval = setInterval(frame , 12 - Math.floor(noPop / 10) + random);
    function frame(){
        if( position >= (windowHeight + 200) && (currentBubble - noPop) > 10 && document.querySelector
        ('[data-number = "' + elem.dataset.number +'"]') !== null){
          clearInterval(interval);
          gameOver = true;
        }
        else{
            position ++;
            elem.style.top = windowHeight - position + 'px';
        }
    }
}

function deleteBubbles(elem){
    elem.remove();
    noPop++;
    scoreUpdate();
}

function scoreUpdate(){
    for(let i =0; i< score.length ; i++){
        score[i].textContent = noPop;
    }
}

function startGame(){
    restartGame();
    let timeout =0;
    let loop = setInterval(function(){
        timeout = Math.floor(Math.random() * 600 -100);
        if(!gameOver && noPop !==total){
            createBubbles();
        }
        else if(noPop !== total){
            clearInterval(loop);
            shadow.style.display = 'flex';
            shadow.querySelector('.loser').style.display = 'block';
        }
        else{
            clearInterval(loop);
            shadow.style.display = 'flex';
            shadow.querySelector('.winner').style.display = 'block';
        }
    }, 800 + timeout);
}

function restartGame(){
    let forRemoving = document.querySelectorAll('.bubble');
    for( let i = 0; i < forRemoving.length ; i++){
        forRemoving[i].remove();
    }
    gameOver = false;
    noPop = 0;
    scoreUpdate();
}
document.addEventListener('click', function(event){
    if(event.target.classList.contains('bubble')){
        deleteBubbles(event.target);
    }
})

document.querySelector('.restart').addEventListener('click', function(){
    shadow.style.display = 'none';
    shadow.querySelector('.winner').style.display = 'none'; 
    shadow.querySelector('.loser').style.display  = 'none';
    currentBubble =0;
    startGame();
});

document.querySelector('.cancel').addEventListener('click', function(){
    shadow.style.display = 'none';
});

startBtn.addEventListener('click', function(){
    startGame();
    document.querySelector('.main-game').style.display = 'none';
})





