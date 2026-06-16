// =========================
// SPLASH CANVAS
// =========================

const splashCanvas =
document.getElementById("splashes");

const splashCtx =
splashCanvas.getContext("2d");

function resizeSplashes(){

    splashCanvas.width =
        window.innerWidth;

    splashCanvas.height =
        window.innerHeight;
}

resizeSplashes();

window.addEventListener(
    "resize",
    resizeSplashes
);

// =========================
// PUDDLE MASK
// =========================

const puddleMask =
new Image();

puddleMask.src =
"assets/puddleMask.png";

const maskCanvas =
document.createElement("canvas");

const maskCtx =
maskCanvas.getContext("2d");

let maskLoaded = false;

puddleMask.onload = () => {

    maskCanvas.width =
        puddleMask.width;

    maskCanvas.height =
        puddleMask.height;

    maskCtx.drawImage(
        puddleMask,
        0,
        0
    );

    maskLoaded = true;
};

// =========================
// MASK LOOKUP
// =========================

function getPuddleStrength(x,y){

    if(!maskLoaded)
        return 0;

    const mx =
        Math.floor(
            x *
            maskCanvas.width /
            splashCanvas.width
        );

    const my =
        Math.floor(
            y *
            maskCanvas.height /
            splashCanvas.height
        );

    const pixel =
        maskCtx.getImageData(
            mx,
            my,
            1,
            1
        ).data;

    return pixel[0] / 255;
}

// =========================
// SPLASH STORAGE
// =========================

const splashes = [];

// =========================
// SPLASH CLASS
// =========================

class Splash{

    constructor(){

        let found = false;

        let tries = 0;

        while(
            !found &&
            tries < 100
        ){

            this.x =
                Math.random() *
                splashCanvas.width;

            this.y =
                splashCanvas.height * 0.55 +
                Math.random() *
                splashCanvas.height * 0.40;

            const strength =
                getPuddleStrength(
                    this.x,
                    this.y
                );

            if(
                strength > 0.2
            ){

                this.puddleStrength =
                    strength;

                found = true;
            }

            tries++;
        }

        if(!found){

            this.dead = true;
            return;
        }

        this.radius = 1;

        this.life = 1;

        this.fade =
            0.015 +
            Math.random() * 0.02;

        this.maxRadius =
            4 +
            Math.random() * 8 *
            this.puddleStrength;
    }

    update(){

        this.radius +=
            0.35 *
            this.puddleStrength;

        this.life -=
            this.fade;
    }

    draw(){

        const alpha =
            this.life *
            this.puddleStrength *
            0.5;

        splashCtx.beginPath();

        splashCtx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );

        splashCtx.strokeStyle =
            `rgba(
                220,
                240,
                255,
                ${alpha}
            )`;

        splashCtx.lineWidth = 1;

        splashCtx.stroke();

        // Tiny droplets

        if(Math.random() < 0.25){

            splashCtx.fillStyle =
                `rgba(
                    220,
                    240,
                    255,
                    ${alpha * 0.8}
                )`;

            splashCtx.beginPath();

            splashCtx.arc(
                this.x +
                (Math.random()-0.5)*8,

                this.y -
                Math.random()*6,

                1,

                0,

                Math.PI*2
            );

            splashCtx.fill();
        }
    }

    isDead(){

        return (
            this.life <= 0 ||
            this.dead
        );
    }
}

// =========================
// SPAWN
// =========================

function spawnSplash(){

    if(!maskLoaded)
        return;

    splashes.push(
        new Splash()
    );
}

// =========================
// RAIN DRIVEN SPAWNING
// =========================

setInterval(() => {

    const amount =
        3 +
        Math.floor(
            Math.random() * 4
        );

    for(
        let i=0;
        i<amount;
        i++
    ){

        spawnSplash();
    }

}, 50);

// =========================
// ANIMATION
// =========================

function animateSplashes(){

    splashCtx.clearRect(
        0,
        0,
        splashCanvas.width,
        splashCanvas.height
    );

    for(
        let i =
        splashes.length - 1;

        i >= 0;

        i--
    ){

        const splash =
            splashes[i];

        splash.update();

        splash.draw();

        if(
            splash.isDead()
        ){

            splashes.splice(
                i,
                1
            );
        }
    }

    requestAnimationFrame(
        animateSplashes
    );
}

animateSplashes();