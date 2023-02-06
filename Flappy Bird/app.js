console.log("hello");

document.addEventListener("DOMContentLoaded", () => {
    const game = document.querySelector(".game");
    const bird = document.querySelector(".bird");
    const ground = document.querySelector(".ground");

    let birdLeft = 100;
    let birdBottom = 220;
    const gravity = 2;

    let games=false;
    let gap=430;

    function startGame() {
        birdBottom -= gravity;
        bird.style.left = birdLeft + "px";
        bird.style.bottom = birdBottom + "px";
    }

    let birdTimerId = setInterval(startGame, 30);

    function control(e) {
        if (e.keyCode === 32) {
            birdMove();
        }
    }

    function birdMove() {
        if (birdBottom < 500) birdBottom += 50;
        bird.style.bottom = birdBottom + "px";
        console.log(birdBottom)
    }
    document.addEventListener("keyup", control);

    function createPiller() {
        let pillerLeft = 500;
        let pillerBottom = Math.random()*60;

        const rods = document.createElement("div");
        const rods1 = document.createElement("div");
        if (!games) {
            rods.classList.add("piller");
            rods1.classList.add("piller-1");     
        }
        rods.style.left = pillerLeft + "px";
        rods1.style.left = pillerLeft + "px";
        rods.style.bottom = pillerBottom + "px";
        rods1.style.bottom = pillerBottom + gap + "px";
        game.appendChild(rods);
        game.appendChild(rods1);

        
        function pillerMove() {
            pillerLeft -= 2;
            rods.style.left = pillerLeft + "px";
            rods1.style.left = pillerLeft + "px";

            if (pillerLeft === -60) {
                clearInterval(pillerTimerId);
                game.removeChild(rods);
                game.removeChild(rods1);
            }

           if ((pillerLeft > 100 && pillerLeft < 160 && birdLeft === 100) && (birdBottom < pillerBottom + 153 || birdBottom > pillerBottom + gap -200) || birdBottom===0) {
               gameover();
               clearInterval(birdTimerId)
               clearInterval(pillerTimerId)
           }

        }

        let pillerTimerId = setInterval(pillerMove, 30);
        if(!games) setTimeout(createPiller, 3000);
    }
    createPiller();

    function gameover() {
        clearInterval(birdTimerId);
        console.log("gameover");
        document.removeEventListener("keyup", control);
        games=true;
        overButton()  
    }

    function overButton() {
        const button=document.createElement("div");
        const header=document.createElement("h1");
        button.classList.add("game-over");
        header.classList.add("header");
        button.innerHTML="RESTART";
        header.innerHTML="GAME-OVER";
        button.style.backgroundColor="red";
        game.appendChild(button);
        game.appendChild(header);
        button.addEventListener("click",()=>{
            window.location.reload();
        },1000);
    }

});

