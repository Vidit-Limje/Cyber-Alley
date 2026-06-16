// =========================
// NEON BOARDS
// =========================

const boards =
document.getElementById(
    "neonBoards"
);

// =========================
// NORMAL STATE
// =========================

function setNormal(){

    boards.style.opacity = 1;

    boards.style.filter =
        `brightness(${0.95 + Math.random() * 0.15})`;
}

// =========================
// SMALL FLICKER
// =========================

function microFlicker(){

    boards.style.opacity =
        0.75 + Math.random() * 0.15;

    boards.style.filter =
        `brightness(${0.5 + Math.random() * 0.3})`;

    setTimeout(
        setNormal,
        80 + Math.random() * 120
    );
}

// =========================
// HARD GLITCH
// =========================

function hardFlicker(){

    let count = 0;

    const flashes =
        2 + Math.floor(Math.random() * 5);

    const glitch =
    setInterval(()=>{

        boards.style.opacity =
            boards.style.opacity === "0"
            ? "1"
            : "0";

        count++;

        if(count >= flashes){

            clearInterval(glitch);

            setNormal();
        }

    },50);
}

// =========================
// RANDOM EVENTS
// =========================

setNormal();

setInterval(()=>{

    const r = Math.random();

    // rare hard failure

    if(r < 0.01){

        hardFlicker();
    }

    // common tiny flicker

    else if(r < 0.12){

        microFlicker();
    }

    // subtle breathing

    else{

        boards.style.filter =
            `brightness(${0.9 + Math.random()*0.2})`;
    }

},300);