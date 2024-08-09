let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let Started = false;
level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function (){
    if ( Started == false) {
        console.log("Game is Started");
        Started = true;

        levelUp();
    }
});

function gameFlash (btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random()*4);
    let randomColor = btns[randomIdx];
    let randBtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randBtn);

}

function checkAns (idx) {
   
    if (  userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    }
    else {
        h2.innerHTML = `Game over! your srore was <b>${level}</b> <br> Press any key to start game.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout( function (){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function bntPress () {
    let btn = this;
    userFlash(btn); 

    userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}
let allBtn = document.querySelectorAll(".btn");
for (btn of allBtn)
{
    btn.addEventListener("click", bntPress); 
}

function reset ()
{
    Started = 0;
    gameSeq = [];
    userSeq = [];
    level = 0;

}