// =========================
// GLOBAL WEATHER
// =========================

let wind = 0;
let targetWind = 0;

let rainIntensity = 1;
let targetRainIntensity = 1;

// Wind variation

setInterval(() => {

    targetWind =
        (Math.random() - 0.5) * 4;

}, 4000);

// Strong gusts

setInterval(() => {

    if(Math.random() < 0.5){

        targetWind =
            Math.random() > 0.5
            ? 10
            : -10;

        setTimeout(() => {

            targetWind =
                (Math.random() - 0.5) * 2;

        }, 2000);
    }

}, 15000);

// Rain intensity variation

setInterval(() => {

    targetRainIntensity =
        0.8 + Math.random() * 0.5;

}, 8000);


// =========================
// UPDATE WEATHER
// =========================

function updateWeather(){

    wind +=
        (targetWind - wind) * 0.02;

    rainIntensity +=
        (targetRainIntensity - rainIntensity) * 0.01;

    requestAnimationFrame(
        updateWeather
    );
}

updateWeather();


// =========================
// RAIN LAYER
// =========================

function createRainLayer(
    canvasId,
    count,
    speedMin,
    speedMax,
    lengthMin,
    lengthMax,
    opacity,
    windMultiplier,
    lineWidth
){

    const canvas =
        document.getElementById(canvasId);

    const ctx =
        canvas.getContext("2d");

    function resize(){

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;
    }

    resize();

    window.addEventListener(
        "resize",
        resize
    );

    const drops = [];

    for(let i=0;i<count;i++){

        drops.push({

            x:
                Math.random() *
                canvas.width,

            y:
                Math.random() *
                canvas.height,

            length:
                lengthMin +
                Math.random() *
                (lengthMax - lengthMin),

            speed:
                speedMin +
                Math.random() *
                (speedMax - speedMin)

        });
    }

    function animate(){

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.strokeStyle =
            `rgba(
                180,
                220,
                255,
                ${opacity * rainIntensity}
            )`;

        ctx.lineWidth =
            lineWidth;

        for(const drop of drops){

            const rainAngle =
                wind * windMultiplier;

            ctx.beginPath();

            ctx.moveTo(
                drop.x,
                drop.y
            );

            ctx.lineTo(
                drop.x + rainAngle,
                drop.y + drop.length
            );

            ctx.stroke();

            drop.y +=
                drop.speed *
                rainIntensity;

            drop.x +=
                rainAngle * 0.25;

            if(
                drop.y >
                canvas.height + 100
            ){

                drop.y = -100;

                drop.x =
                    Math.random() *
                    canvas.width;
            }

            if(
                drop.x < -150
            ){

                drop.x =
                    canvas.width + 150;
            }

            if(
                drop.x >
                canvas.width + 150
            ){

                drop.x =
                    -150;
            }
        }

        requestAnimationFrame(
            animate
        );
    }

    animate();
}


// =========================
// FAR RAIN
// =========================

createRainLayer(
    "rain-far",
    1400,
    2,
    4,
    2,
    5,
    0.35,
    0.4,
    0.5
);


// =========================
// MID RAIN
// =========================

createRainLayer(
    "rain-mid",
    600,
    6,
    10,
    10,
    18,
    0.40,
    1.0,
    1
);


// =========================
// NEAR RAIN
// =========================

createRainLayer(
    "rain-near",
    300,
    12,
    18,
    18,
    30,
    0.75,
    2.5,
    2
);