/* =========================================================
   DHIVIYAN & MEENALOSHINI — ANIMATED INVITATION ENGINE
========================================================= */

const ASSET = "assets/";

const pages = [
    {
        type: "cover",
        kicker: "WEDDING INVITATION",
        title: "Dhiviyan R",
        second: "Meenaloshini S",
        subtitle: "Together with their families",
        copy: "With hearts full of love and dreams of forever,<br>we invite you to celebrate the beginning of our beautiful journey."
    },
    {
        type: "story",
        kicker: "A BEAUTIFUL BEGINNING",
        title: "Two Hearts",
        second: "One Journey",
        subtitle: "A new chapter begins",
        copy: "Two lives, two stories, and one beautiful future.<br>We would be delighted to have you with us as our forever begins."
    },
    {
        type: "ceremony",
        kicker: "THE WEDDING CEREMONY",
        title: "25 OCTOBER",
        second: "2026",
        subtitle: "4:00 AM — 6:00 AM",
        venue: "<strong>Arulmigu Thiru Dhandayudhapani Swamy Temple</strong><br>Join us as we exchange our vows and begin our married life together."
    },
    {
        type: "reception",
        kicker: "RECEPTION",
        title: "CELEBRATE",
        second: "WITH US",
        subtitle: "11:00 AM — 3:00 PM",
        venue: "<strong>NRL Marriage Hall</strong><br>Come celebrate, smile, dine and make beautiful memories with us."
    },
    {
        type: "final",
        kicker: "WITH LOVE",
        title: "Dhiviyan R",
        second: "Meenaloshini S",
        subtitle: "25 · 10 · 2026",
        copy: "Thank you for being part of our special day.<br>Our forever begins here. ♡"
    }
];

const pagesEl = document.getElementById("pages");
const indicatorEl = document.getElementById("pageIndicator");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const autoButton = document.getElementById("autoButton");
const musicButton = document.getElementById("musicButton");
const fullscreenButton = document.getElementById("fullscreenButton");
const music = document.getElementById("weddingMusic");

let current = 0;
let busy = false;
let autoPlay = true;
let autoTimer = null;
let touchStartX = 0;
let touchStartY = 0;

/* =========================================================
   PAGE CREATION
========================================================= */

function pageHTML(page, index) {
    let middle = "";

    if (page.type === "cover") {
        middle = `
            <div class="page-ornament">❧ <span>✦</span> ❧</div>
            <div class="page-kicker">${page.kicker}</div>
            <div class="page-subtitle">${page.subtitle}</div>

            <h1>
                ${page.title}
                <span class="and">&amp;</span>
                ${page.second}
            </h1>

            <div class="divider">
                <i></i><b>❦</b><i></i>
            </div>

            <div class="page-copy">${page.copy}</div>

            <div class="date-block">
                <div class="date-day">25</div>
                <div class="date-month">OCTOBER<small>2026</small></div>
            </div>

            <div class="story-heart">♡</div>
        `;
    }

    if (page.type === "story") {
        middle = `
            <div class="page-ornament">✦ ❧ ✦</div>
            <div class="page-kicker">${page.kicker}</div>
            <h1 class="info-title">
                ${page.title}
                <span class="and">&amp;</span>
                ${page.second}
            </h1>
            <div class="divider"><i></i><b>❦</b><i></i></div>
            <div class="page-subtitle">${page.subtitle}</div>
            <div class="page-copy">${page.copy}</div>
            <div class="story-heart">♡</div>
        `;
    }

    if (page.type === "ceremony") {
        middle = `
            <div class="page-ornament">❧ ✦ ❧</div>
            <div class="page-kicker">${page.kicker}</div>
            <h1 class="info-title">
                ${page.title}
                <span class="and">${page.second}</span>
            </h1>
            <div class="divider"><i></i><b>❦</b><i></i></div>
            <div class="page-subtitle">${page.subtitle}</div>
            <div class="venue">${page.venue}</div>
        `;
    }

    if (page.type === "reception") {
        middle = `
            <div class="page-ornament">✦ ❧ ✦</div>
            <div class="page-kicker">${page.kicker}</div>
            <h1 class="info-title">
                ${page.title}
                <span class="and">${page.second}</span>
            </h1>
            <div class="divider"><i></i><b>❦</b><i></i></div>
            <div class="page-subtitle">${page.subtitle}</div>
            <div class="venue">${page.venue}</div>
        `;
    }

    if (page.type === "final") {
        middle = `
            <div class="page-ornament">❧ ✦ ❧</div>
            <div class="page-kicker">${page.kicker}</div>
            <h1 class="final-title">
                ${page.title}
                <span class="and">&amp;</span>
                ${page.second}
            </h1>
            <div class="divider"><i></i><b>❦</b><i></i></div>
            <div class="page-subtitle">${page.subtitle}</div>
            <div class="page-copy">${page.copy}</div>
            <div class="story-heart">♡</div>
        `;
    }

    return `
        <article class="page ${index === 0 ? "current" : "is-hidden"}" data-page="${index}">
            <div class="page-inner">
                <div class="page-content">
                    ${middle}
                    <div class="page-number">${String(index + 1).padStart(2, "0")} / ${String(pages.length).padStart(2, "0")}</div>
                </div>
            </div>
        </article>
    `;
}

function renderPages() {
    pagesEl.innerHTML = pages.map(pageHTML).join("");

    indicatorEl.innerHTML = pages.map((_, i) =>
        `<span class="${i === 0 ? "active" : ""}"></span>`
    ).join("");
}

/* =========================================================
   PAGE TURNING
========================================================= */

function updateIndicator() {
    [...indicatorEl.children].forEach((dot, i) => {
        dot.classList.toggle("active", i === current);
    });
}

function setVisiblePage(index) {
    document.querySelectorAll(".page").forEach((page, i) => {
        page.classList.toggle("current", i === index);
        page.classList.toggle("is-hidden", i !== index);
        page.classList.remove("flipping-next", "flipping-prev", "next-page");
    });
    updateIndicator();
}

function turnTo(target, direction) {
    if (busy || target === current || target < 0 || target >= pages.length) return;

    busy = true;
    stopAutoTimer();

    const oldPage = document.querySelector(`.page[data-page="${current}"]`);
    const newPage = document.querySelector(`.page[data-page="${target}"]`);

    newPage.classList.remove("is-hidden");
    newPage.classList.add("next-page");

    // Place the new page underneath the turning page.
    oldPage.classList.add(direction === "next" ? "flipping-next" : "flipping-prev");

    setTimeout(() => {
        current = target;
        setVisiblePage(current);
        busy = false;

        if (autoPlay) startAutoTimer();
    }, 920);
}

function nextPage() {
    if (current < pages.length - 1) turnTo(current + 1, "next");
    else turnTo(0, "next");
}

function previousPage() {
    if (current > 0) turnTo(current - 1, "prev");
    else turnTo(pages.length - 1, "prev");
}

nextButton.addEventListener("click", nextPage);
prevButton.addEventListener("click", previousPage);

indicatorEl.addEventListener("click", e => {
    const dots = [...indicatorEl.children];
    const i = dots.indexOf(e.target);
    if (i >= 0) {
        turnTo(i, i > current ? "next" : "prev");
    }
});

/* =========================================================
   AUTO 5 SECOND PAGE TURN
========================================================= */

function startAutoTimer() {
    stopAutoTimer();
    if (!autoPlay) return;

    autoTimer = setTimeout(() => {
        nextPage();
    }, 5000);
}

function stopAutoTimer() {
    if (autoTimer) {
        clearTimeout(autoTimer);
        autoTimer = null;
    }
}

autoButton.addEventListener("click", () => {
    autoPlay = !autoPlay;
    autoButton.textContent = autoPlay ? "AUTO" : "PAUSE";
    autoButton.setAttribute("aria-pressed", String(autoPlay));

    if (autoPlay) startAutoTimer();
    else stopAutoTimer();
});

/* =========================================================
   TOUCH / SWIPE
========================================================= */

document.addEventListener("touchstart", e => {
    const t = e.changedTouches[0];
    touchStartX = t.clientX;
    touchStartY = t.clientY;
}, { passive: true });

document.addEventListener("touchend", e => {
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX;
    const dy = t.clientY - touchStartY;

    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) return;

    if (dx < 0) nextPage();
    else previousPage();
}, { passive: true });

document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") nextPage();
    if (e.key === "ArrowLeft") previousPage();
});

/* =========================================================
   FULLSCREEN
========================================================= */

fullscreenButton.addEventListener("click", async () => {
    try {
        if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen();
        } else {
            await document.exitFullscreen();
        }
    } catch (_) {}
});

/* =========================================================
   MUSIC
========================================================= */

musicButton.addEventListener("click", async () => {
    if (!music.src) {
        alert("Add your MP3 as assets/music/wedding.mp3 and reload the page.");
        return;
    }

    try {
        if (music.paused) {
            await music.play();
            musicButton.textContent = "❚❚";
        } else {
            music.pause();
            musicButton.textContent = "♫";
        }
    } catch (_) {}
});

/* =========================================================
   RANDOM HELPERS
========================================================= */

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function cssVar(el, name, value) {
    el.style.setProperty(name, value);
}

/* =========================================================
   BOKEH
========================================================= */

function createBokeh() {
    const bokeh = document.getElementById("bokeh");

    for (let i = 0; i < 24; i++) {
        const el = document.createElement("span");
        el.className = "bokeh-dot";

        const size = rand(5, 28);

        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.left = `${rand(2, 98)}%`;
        el.style.top = `${rand(2, 98)}%`;

        cssVar(el, "--dur", `${rand(6, 15)}s`);
        cssVar(el, "--delay", `${rand(-12, 0)}s`);

        bokeh.appendChild(el);
    }
}

/* =========================================================
   BOTANICAL ASSET LISTS
========================================================= */

const leafAssets = Array.from(
    { length: 18 },
    (_, i) => `${ASSET}leaves/individual/leaf-${String(i + 1).padStart(2, "0")}.png`
);

const butterflyAssets = Array.from(
    { length: 20 },
    (_, i) => `${ASSET}butterflies/individual/butterfly-${String(i + 1).padStart(2, "0")}.png`
);

const petalAssets = Array.from(
    { length: 50 },
    (_, i) => `${ASSET}petals/individual/petal-${String(i + 1).padStart(2, "0")}.png`
);

const stemAssets = [
    `${ASSET}stems/curved-stem.png`
];

const flowerAssets = [
    `${ASSET}flowers/large-pink-flower.png`,
    `${ASSET}flowers/small-pink-flower.png`,
    `${ASSET}flowers/lavender-flower.png`,
    `${ASSET}flowers/white-flower.png`
];

const wisteriaAssets = [
    `${ASSET}wisteria/individual/wisteria-long/wisteria-long-01.png`,
    `${ASSET}wisteria/individual/wisteria-long/wisteria-long-02.png`,
    `${ASSET}wisteria/individual/wisteria-medium/wisteria-medium-01.png`,
    `${ASSET}wisteria/individual/wisteria-medium/wisteria-medium-02.png`,
    `${ASSET}wisteria/individual/wisteria-short/wisteria-short-01.png`,
    `${ASSET}wisteria/individual/wisteria-short/wisteria-short-02.png`
];

/* =========================================================
   CREATE BOTANICAL ELEMENTS
========================================================= */

function addImage(layer, src, className, options = {}) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "";
    img.className = `botanical ${className}`;

    img.onerror = () => img.remove();

    Object.assign(img.style, {
        left: `${options.left ?? rand(-10, 100)}%`,
        top: `${options.top ?? rand(-10, 100)}%`,
        width: `${options.width ?? rand(90, 260)}px`
    });

    cssVar(img, "--dur", `${options.dur ?? rand(5, 13)}s`);
    cssVar(img, "--delay", `${options.delay ?? rand(-12, 0)}s`);
    cssVar(img, "--r", `${options.rotate ?? rand(-18, 18)}deg`);
    cssVar(img, "--s", options.scale ?? 1);

    layer.appendChild(img);
    return img;
}

function createGarden() {
    const flowerLayer = document.getElementById("flower-layer");
    const leafLayer = document.getElementById("leaf-layer");
    const stemLayer = document.getElementById("stem-layer");
    const wisteriaLayer = document.getElementById("wisteria-layer");

    // Large edge flowers
    const flowerPlacements = [
        [-5, -7, 330, -12, 9],
        [89, -6, 300, 12, 10],
        [-8, 68, 360, 14, 12],
        [90, 70, 350, -15, 11],
        [7, 40, 145, -5, 8],
        [86, 45, 150, 7, 7],
        [18, 4, 110, 9, 13],
        [74, 2, 120, -10, 14]
    ];

    flowerPlacements.forEach(([left, top, width, rotate, dur], i) => {
        addImage(
            flowerLayer,
            flowerAssets[i % flowerAssets.length],
            "flower-piece",
            { left, top, width, rotate, dur, scale: 1 }
        );
    });

    // Curved stems
    const stemPlacements = [
        [-8, 8, 330, -12, 10],
        [91, 12, 320, 14, 12],
        [-10, 58, 350, 25, 13],
        [91, 58, 350, -25, 11]
    ];

    stemPlacements.forEach(([left, top, width, rotate, dur]) => {
        addImage(
            stemLayer,
            pick(stemAssets),
            "stem-piece",
            { left, top, width, rotate, dur }
        );
    });

    // Many independent leaves
    for (let i = 0; i < 28; i++) {
        addImage(
            leafLayer,
            pick(leafAssets),
            "leaf-piece",
            {
                left: rand(-4, 104),
                top: rand(-5, 102),
                width: rand(45, 135),
                rotate: rand(-50, 50),
                dur: rand(6, 14)
            }
        );
    }

    // Wisteria hangs mainly around top and sides.
    const wisteriaPlacements = [
        [-7, -7, 270, -8, 9],
        [13, -5, 205, 4, 11],
        [76, -5, 235, -4, 12],
        [91, -8, 275, 9, 10],
        [-5, 23, 165, -14, 13],
        [94, 28, 175, 14, 14],
        [8, 3, 125, 8, 8],
        [83, 2, 140, -6, 9]
    ];

    wisteriaPlacements.forEach(([left, top, width, rotate, dur], i) => {
        addImage(
            wisteriaLayer,
            wisteriaAssets[i % wisteriaAssets.length],
            "wisteria-piece",
            { left, top, width, rotate, dur }
        );
    });
}

/* =========================================================
   BUTTERFLIES
========================================================= */

function createButterflies() {
    const layer = document.getElementById("butterfly-layer");

    const paths = [
        ["-8vw","18vh","18vw","12vh","43vw","30vh","67vw","16vh","108vw","24vh"],
        ["108vw","42vh","82vw","28vh","54vw","46vh","25vw","35vh","-10vw","20vh"],
        ["-8vw","72vh","22vw","62vh","50vw","76vh","76vw","61vh","108vw","70vh"],
        ["100vw","15vh","78vw","24vh","60vw","10vh","30vw","23vh","-10vw","16vh"],
        ["-8vw","48vh","18vw","40vh","38vw","52vh","65vw","42vh","108vw","55vh"]
    ];

    for (let i = 0; i < paths.length; i++) {
        const img = document.createElement("img");
        img.src = pick(butterflyAssets);
        img.alt = "";
        img.className = "butterfly-piece";
        img.onerror = () => img.remove();

        const p = paths[i];

        img.style.left = "0";
        img.style.top = "0";
        img.style.width = `${rand(38, 82)}px`;

        cssVar(img, "--size", `${rand(38, 82)}px`);
        cssVar(img, "--dur", `${rand(13, 25)}s`);
        cssVar(img, "--delay", `${rand(-15, 0)}s`);

        cssVar(img, "--x1", p[0]);
        cssVar(img, "--y1", p[1]);
        cssVar(img, "--x2", p[2]);
        cssVar(img, "--y2", p[3]);
        cssVar(img, "--x3", p[4]);
        cssVar(img, "--y3", p[5]);
        cssVar(img, "--x4", p[6]);
        cssVar(img, "--y4", p[7]);
        cssVar(img, "--x5", p[8]);
        cssVar(img, "--y5", p[9]);

        cssVar(img, "--r1", `${rand(-15,15)}deg`);
        cssVar(img, "--r2", `${rand(-10,10)}deg`);
        cssVar(img, "--r3", `${rand(-15,15)}deg`);
        cssVar(img, "--r4", `${rand(-10,10)}deg`);
        cssVar(img, "--r5", `${rand(-15,15)}deg`);

        layer.appendChild(img);
    }
}

/* =========================================================
   PETALS
========================================================= */

function createPetals() {
    const layer = document.getElementById("petal-layer");

    for (let i = 0; i < 28; i++) {
        const img = document.createElement("img");
        img.src = pick(petalAssets);
        img.alt = "";
        img.className = "petal-piece";
        img.onerror = () => img.remove();

        img.style.left = `${rand(0, 100)}%`;

        cssVar(img, "--size", `${rand(10, 38)}px`);
        cssVar(img, "--dur", `${rand(9, 18)}s`);
        cssVar(img, "--delay", `${rand(-18, 0)}s`);
        cssVar(img, "--drift", `${rand(-100, 100)}px`);
        cssVar(img, "--opacity", rand(.35, .85));

        layer.appendChild(img);
    }
}

/* =========================================================
   MUSIC FILE
========================================================= */

// Put your MP3 at:
// assets/music/wedding.mp3
// The browser can then play it after the user taps the music button.

music.src = `${ASSET}music/wedding.mp3`;

/* =========================================================
   START
========================================================= */

renderPages();
createBokeh();
createGarden();
createButterflies();
createPetals();
startAutoTimer();
