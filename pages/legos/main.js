

let node;
let colors = ["blue", "yellow", "green", "red"];

//to be run 15000 times
for (let i = 0; i < 35000; i++) {
    //create the child element
    node = document.createElement("div");
    //pick a random number 0-3 to be used to select from the colors array
    let random = Math.floor(Math.random() * 4);
    //set the color, and size
    node.style.backgroundColor = colors[random];
    node.style.width = "7px";
    node.style.height = "7px";
    //append the element
    document.getElementById("body").appendChild(node); 
}

let squares = document.body.children;
let j = 0;
setInterval( () => {
    let randomSparkle1 = Math.floor(Math.random() * 34999);
    squares[randomSparkle1].style.zIndex = "1";
    squares[randomSparkle1].style.backgroundColor = "white";

    setTimeout( () => {
        let randomColor1 = Math.floor(Math.random() * 4);
        squares[randomSparkle1].style.zIndex = "0";
        squares[randomSparkle1].style.backgroundColor = colors[randomColor1];
    }, 1000);
    j++;
}, 100);