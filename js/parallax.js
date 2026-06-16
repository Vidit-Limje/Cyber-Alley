const bg =
document.getElementById("bg");

const alley =
document.getElementById("alley");

const neon =
document.getElementById("neon");

const glow =
document.getElementById("neonGlow");

const fg =
document.getElementById("fg");

let mouseX = 0;
let mouseY = 0;

document.addEventListener(
"mousemove",
(e)=>{

    mouseX =
    (e.clientX/window.innerWidth)-0.5;

    mouseY =
    (e.clientY/window.innerHeight)-0.5;
});

function animate(){

    const t =
    Date.now()*0.0003;

    const breatheX =
    Math.sin(t)*3;

    const breatheY =
    Math.cos(t)*2;

    bg.style.transform =
    `translate(
    ${mouseX*4+breatheX}px,
    ${mouseY*2+breatheY}px
    )`;

    alley.style.transform =
    `translate(
    ${mouseX*12+breatheX}px,
    ${mouseY*6+breatheY}px
    )`;

    neon.style.transform =
    `translate(
    ${mouseX*18+breatheX}px,
    ${mouseY*8+breatheY}px
    )`;

    glow.style.transform =
    `translate(
    ${mouseX*18+breatheX}px,
    ${mouseY*8+breatheY}px
    )`;

    fg.style.transform =
    `translate(
    ${mouseX*30+breatheX}px,
    ${mouseY*15+breatheY}px
    )`;

    requestAnimationFrame(
    animate);
}

animate();