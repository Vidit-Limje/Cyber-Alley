// =========================
// LIGHTNING SYSTEM
// =========================

const flash =
document.getElementById("lightning");

const scene =
document.getElementById("scene");

// =========================
// SINGLE STRIKE
// =========================

function lightningStrike(){

    const strength =
        0.12 +
        Math.random() * 0.18;

    flash.style.transition = "none";

    flash.style.opacity = "0";

    // First flash

    setTimeout(() => {

        flash.style.opacity =
            strength;

        scene.style.filter =
            `
            brightness(1.5)
            contrast(1.15)
            saturate(1.1)
            `;

        setTimeout(() => {

            flash.style.opacity = "0";

            scene.style.filter =
                `
                brightness(1)
                contrast(1)
                saturate(1)
                `;

            // Double flash

            if(Math.random() < 0.65){

                setTimeout(() => {

                    flash.style.opacity =
                        strength * 0.7;

                    scene.style.filter =
                        `
                        brightness(1.3)
                        contrast(1.1)
                        saturate(1.05)
                        `;

                    setTimeout(() => {

                        flash.style.opacity = "0";

                        scene.style.filter =
                            `
                            brightness(1)
                            contrast(1)
                            saturate(1)
                            `;

                    },60);

                },100);
            }

            // Rare third flash

            if(Math.random() < 0.20){

                setTimeout(() => {

                    flash.style.opacity =
                        strength * 0.5;

                    scene.style.filter =
                        `
                        brightness(1.2)
                        contrast(1.05)
                        `;

                    setTimeout(() => {

                        flash.style.opacity = "0";

                        scene.style.filter =
                            `
                            brightness(1)
                            contrast(1)
                            saturate(1)
                            `;

                    },40);

                },250);
            }

        },90);

    },20);
}

// =========================
// RANDOM LIGHTNING
// =========================

function scheduleLightning(){

    const delay =

        20000 +

        Math.random() * 40000;

    setTimeout(() => {

        lightningStrike();

        scheduleLightning();

    }, delay);
}

scheduleLightning();

// =========================
// DEBUG MODE
// Press L to trigger lightning
// =========================

document.addEventListener(
    "keydown",
    (e) => {

        if(
            e.key === "l" ||
            e.key === "L"
        ){

            lightningStrike();
        }
    }
);