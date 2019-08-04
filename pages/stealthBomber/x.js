

let size = 0;
let messages = ["x", "direct hit Sir!", "target eleminated!", "hit 'em again!", "they're hungry for more!", "totally annihilated!"];

let c = document.getElementsByClassName("bombDrop");

let getCoords = (event) => {

    if (size > 0) {
        let sound = new Audio("./bigBoom.wav");
        sound.play();
        let x = event.clientX;
        let y = event.clientY;
        let p = document.getElementById("p");
        p.innerHTML = `x:${x} y:${y}`;
        let m = document.getElementById("message");
        m.innerHTML = messages[(Math.floor(Math.random() * 5) + 1)];

        let bomb = document.createElement('div');
        bomb.id = "bomb";
        bomb.style.position = "absolute";
        let yOffset = y - (size/2);
        let xOffset = x - (size/2);
        bomb.style.top = `${yOffset}px`;
        bomb.style.left = `${xOffset}px`;
        bomb.style.height = `${size}px`;
        bomb.style.width = `${size}px`;
        bomb.style.borderRadius = "100%";
        document.body.appendChild(bomb);
    }
}



let arm = (bombNumber) => {
    let b = document.getElementById("bombSelected");
    if (bombNumber === 1) {
        size = 15;
        b.innerHTML = "bomb: city smasher";
    } else if (bombNumber === 2) {
        size = 40;
        b.innerHTML = " bomb: country crusher";
    } else if (bombNumber === 3) {
        size = 99;
        b.innerHTML = "bomb: continent destroyer";
    } else if (bombNumber === 4) {
        size = 200;
        b.innerHTML = "bomb: planet paralyzer";
    }
}
