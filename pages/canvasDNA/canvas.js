
//CREDIT TO STU FREEN FOR THE INSPIRATION FOR THIS PROJECT
//https://codepen.io/stufreen/pen/KOWKBw
//https://codepen.io/stufreen

////////////////////////////////////////////////////////////////////////////////////////////////////

//SETTINGS
let orbs = 2000;            //HOW MANY ORBS DO YOU WANT
let orbSize = 1;            //SIZE OF THE AVERAGE ORB
let orbDev = .5;            //DEVIATION OF THE ORB SIZES
let speed = 250000;         //SPEED IN MILISECONDS
let waveFactor = 6;         //POINTS ON THE HELIXES

//THE HELIXES
let helix1 = [];
let helix2 = [];

//THE POSITIVE BONDS (POSITIVE X COORDINATES)
//THESE ONES ARE THE ONES THAT SHOW ON LOAD (X >= 0)
//#0 - #33 (.00, .03, .06, ..., .99)
let bond = [];
for (n = 0; n < 34; n++) {
    bond[n] = [];
}

//THE NEGATIVE BONDS (NEGATIVE X COORDINATES)
//THESE ONES ARE THE ONES THAT MOVE INTO VIEW AFTER LOAD (X < 0)
//#1 - #33 (-.03, -.06, ..., -.99)
let xbond = [];
for (n = 1; n < 34; n++) {
    xbond[n] = [];
}

////////////////////////////////////////////////////////////////////////////////////////////////////

function normalPool(obj) {
    for (let i = 1; i < 2; i++) {
        let a = Math.round(normal({ mean: obj.mean, dev: obj.dev }));
        if (a < obj.pool.length && a >= 0) {
            return obj.pool[a]; 
        }
    }
}

function randomNormal(obj) { 
    if (obj = Object.assign({ mean: 0, dev: 1, pool: [] }, obj), Array.isArray(obj.pool) && obj.pool.length > 0) {
        return normalPool(obj); 
    }
    let r, a, n, e;
    do { 
        r = (a = 2 * Math.random() - 1) * a + (n = 2 * Math.random() - 1) * n 
    } while (r >= 1); 
    
    return e = a * Math.sqrt(-2 * Math.log(r) / r), obj.dev * e + obj.mean; 
}

//RANDOMIZER FUNCTION
//USED BY SEVERAL OF THE OTHER FUNCTIONS TO PRODUCE RANDOM VARIABLES
function rand(low, high) {
    return Math.random() * (high - low) + low;
}

//CALLED BY THE FOR LOOP AT THE BOTTOM
//CREATES THE LARGER ORBS IN THE HELIXES
function createOrb(canvas) {
    return {
        x: -2,
        y: -2,
        diameter: Math.max(0, randomNormal({ mean: orbSize, dev: orbDev / 2 })),
        duration: randomNormal({ mean: speed, dev: speed * 0.1 }),
        amplitude: randomNormal({ mean: 25, dev: 2 }),
        offsetY: randomNormal({ mean: 0, dev: 10 }),
        arc: Math.PI * waveFactor,
        startTime: performance.now() - rand(0, speed),
        color: `rgba(${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 1)})`
    }
}

//CALLED BY THE 2 NESTED FOR LOOPS AT THE BOTTOM
//CREATES THE SMALLER STANDARDIZED ORBS FOR THE 2 SETS OF BONDS
function createBondOrb(canvas) {
    return {
        x: -2,
        y: -2,
        diameter: .5,
        duration: 300000,
        amplitude: randomNormal({ mean: 25, dev: 2 }),
        offsetY: randomNormal({ mean: 0, dev: 10 }),
        arc: Math.PI * waveFactor,
        startTime: performance.now(),
        color: `rgba(${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 1)})`
    }
}

//MOVEMENT FOR HELIX 1, FOLLOWS A SINE WAVE
function moveOrb(orb, canvas, time) {
    let progress = ((time - orb.startTime) % orb.duration) / orb.duration;
    return {
        ...orb,
        x: progress,
        y: (Math.sin(progress * orb.arc) * orb.amplitude)
    };
}

//MOVEMENT FOR HELIX 2, FOLLOWS A NEGATIVE SINE WAVE
function moveOrb2(orb, canvas, time) {
    let progress = ((time - orb.startTime) % orb.duration) / orb.duration;
    return {
        ...orb,
        x: progress,
        y: -(Math.sin(progress * orb.arc) * orb.amplitude)
    };
}

//MOVEMENT FOR THE ORBS IN THE BOND
//THIS MOVES ALL 40 BOND ORBS OF EACH BOND IN UNISON
function moveBond(orb, canvas, time, yOffset, xOffset) {
    let progress = ((time - orb.startTime) % orb.duration) / orb.duration;
    return {
        ...orb,
        x: progress + xOffset,
        y: (yOffset - 20) * (Math.sin((progress + xOffset) * orb.arc))
    };
}

//DRAWS EACH ORB OF THE 2 HELIXES
function drawHelixOrb(orb, canvas, ctx) {
    canvas = document.getElementById('orbCanvas');
    let vh = canvas.height / 100;
    ctx.fillStyle = orb.color;
    ctx.beginPath();
    ctx.ellipse(orb.x * canvas.width, orb.y * vh + (canvas.height / 2), orb.diameter * vh, orb.diameter * vh, 0, 0, 2 * Math.PI);
    ctx.fill();
}

//DRAWS EACH ORB OF THE 40 ORBS IN EACH OF THE 67 BONDS
function drawBondOrb(orb, canvas, ctx) {
    canvas = document.getElementById('orbCanvas');
    let vh = canvas.height / 100;
    ctx.fillStyle = orb.color;
    ctx.beginPath();
    ctx.ellipse(orb.x * canvas.width, orb.y * vh + (canvas.height / 2), orb.diameter * vh, orb.diameter * vh, 0, 0, 2 * Math.PI);
    ctx.fill();
}

//THE FUNTION THAT STARTS IT ALL
//1 - MOVE THE HELIX ORBS
//2 - MOVE THE BOND ORBS (IN UNISON AS BONDS)
//3 - CLEAR THE CANVAS
//4 - DRAW THE HELIX ORBS IN THE NEXT POSITION
//5 - DRAW THE BOND ORBS (IN UNISON AS BONDS) IN THE NEXT POSITION
//6 - INFINITE LOOP, CALL DRAW AGAIN (PERPETUALLY RUN THE ANIMATION)
function draw(time, canvas, ctx) {
    ////////////1////////////
    helix1.forEach((orb, index) => {
        helix1[index] = moveOrb(orb, canvas, time);
    })
    helix2.forEach((orb, index) => {
        helix2[index] = moveOrb2(orb, canvas, time);
    })
    ////////////2////////////
    //LOOP THROUGH EACH BOND IN THE BOND ARRAY (34 BONDS)
    //THEN LOOP THROUGH EACH ORB IN EACH OF THOSE BONDS (40 ORBS PER BOND)
    for (let n = 0; n < 34; n++) {
        bond[1].forEach((orb, index) => {
            bond[n][index] = moveBond(orb, canvas, time, index, (n * .03));
        })
    }
    //LOOP THROUGH EACH BOND IN THE XBOND ARRAY (33 BONDS)
    //THEN LOOP THROUGH EACH ORB IN EACH OF THOSE BONDS (40 ORBS PER BOND)
    for (let n = 1; n < 34; n++) {
        xbond[1].forEach((orb, index) => {
            xbond[n][index] = moveBond(orb, canvas, time, index, (n * -.03));
        })
    }
    ////////////3////////////
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ////////////4////////////
    helix1.forEach((orb) => {
        drawHelixOrb(orb, canvas, ctx);
    })
    helix2.forEach((orb) => {
        drawHelixOrb(orb, canvas, ctx);
    })
    ////////////5////////////
    //LOOP THROUGH EACH BOND IN THE BOND ARRAY (34 BONDS)
    //THEN LOOP THROUGH EACH ORB IN EACH OF THOSE BONDS (40 ORBS PER BOND)
    for (let n = 0; n < 34; n++) {
        bond[n].forEach((orb) => {
            drawBondOrb(orb, canvas, ctx);
        });
    }
    //LOOP THROUGH EACH BOND IN THE XBOND ARRAY (33 BONDS)
    //THEN LOOP THROUGH EACH ORB IN EACH OF THOSE BONDS (40 ORBS PER BOND)
    for (let n = 1; n < 34; n++) {
        xbond[n].forEach((orb) => {
            drawBondOrb(orb, canvas, ctx);
        });
    }
    ////////////6////////////
    requestAnimationFrame((time) => draw(time * 12, canvas, ctx));
}

//CALLED BELOW TO INITIATE THE CANVAS
function initCanvas() {
    let canvas = document.getElementById('orbCanvas');
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    let ctx = canvas.getContext("2d");

    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth * window.devicePixelRatio;
        canvas.height = canvas.offsetHeight * window.devicePixelRatio;
        ctx = canvas.getContext("2d");
    })
    return [canvas, ctx];
}

//INITIATE THE CANVAS
let [canvas, ctx] = initCanvas();

//CREATE THE HELIXES - HALF THE ORBS(FROM SETTINGS ABOVE) IN EACH HELIX
for (let i = 0; i < orbs/2; i++) {
    helix1.push(createOrb(canvas));
    helix2.push(createOrb(canvas));
}

//CREATE THE ZERO X COORDINATE BOND, AND ALL THE POSITIVE X COORDINATE BONDS
//THESE ARE THHE ONES THAT SHOW LOADED WHEN THE CANVAS STARTS
for (let n = 0; n < 34; n++) {
    for (let i = 0; i < 40; i++) {
        bond[n].push(createBondOrb(canvas));
    }
}

//CREATE THE NEGATIVE X COORDINATE BONDS
//THESE ARE THHE ONES THAT MOVE INTO VIEW ON THE FIRST FULL CYCLE
for (let n = 1; n < 34; n++) {
    for (let i = 0; i < 40; i++) {
        xbond[n].push(createBondOrb(canvas));
    }
}

//STARTS DRAW, WHICH IS A SELF CALLING FUNCTION (CREATES INFINITE LOOP FOR ANIMATION)
requestAnimationFrame( (time) => {
    draw(time, canvas, ctx)
});
