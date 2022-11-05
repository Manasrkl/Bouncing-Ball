let character=document.getElementById('character');
let characterbottom=parseInt(window.getComputedStyle(character).getPropertyValue('bottom'));
let characterright=parseInt(window.getComputedStyle(character).getPropertyValue('right'));
let characterwidth=parseInt(window.getComputedStyle(character).getPropertyValue('width'));
let ground=document.getElementById('ground');
let groundbottom=parseInt(window.getComputedStyle(ground).getPropertyValue('bottom'));
let groundheight=parseInt(window.getComputedStyle(ground).getPropertyValue('height'));
 let isJumping=false;
 let upTime;
 let downTime;
 let displayscore=document.getElementById('score');
 let score=0;

 function jump(){
if(isJumping) return;
upTime=setInterval(()=> {
    if(characterbottom >= groundheight + 250){
        clearInterval(upTime);
        downTime=setInterval(()=>{
            if(characterbottom <= groundheight + 10){
                clearInterval(downTime);
                isJumping = false;
            }
            characterbottom -=10;
            character.style.bottom=characterbottom + 'px';

        },20);
    }
    characterbottom +=10;
    character.style.bottom=characterbottom + 'px';
    isJumping = true;
}, 20)
 }
 function showscore(){
    score++;
    displayscore.innerText = score;
 }
 setInterval(showscore,100);

 function generateObstacle(){
    let obstacles=document.querySelector('.obstacles');
    let obstacle = document.createElement('div');
    obstacle.setAttribute('class','obstacle');
    obstacles.appendChild(obstacle);
    let randomtimeout = Math.floor(Math.random() * 1000) + 1000;

    let obstacleright = -30;
    let obstaclebottom = 100;
    let obstaclewidth =30;
    let obstacleheight=Math.floor(Math.random() * 50) + 50;
    obstacle.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)},
    ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;

    function moveobstacle(){
        obstacleright += 5;
        obstacle.style.right = obstacleright + 'px';
        obstacle.style.bottom = obstaclebottom + 'px';
        obstacle.style.width = obstaclewidth + 'px';
        obstacle.style.height = obstacleheight + 'px';
        if(characterright >= obstacleright - characterwidth && characterright <= obstacleright + obstaclewidth && characterbottom <= 
            obstaclebottom + obstacleheight){
                alert("bando tuaj sa na ho pa a ga")
                clearInterval(obstacleInterval);
                clearTimeout(obstacleTimeout);
                location.reload();
            }
    }

    let obstacleInterval = setInterval(moveobstacle, 20);
    let obstacleTimeout = setTimeout(generateObstacle, 1000);
 }

 generateObstacle();

 function control(e){
    if (e.key == 'ArrowUp'|| e.key == ' '){
        jump();
    }
 }

 document.addEventListener('keydown',control);