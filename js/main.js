let tabletWidth = "799px",
    mainTransition = 700,
    big,
    transition1 = mainTransition,
    i,
    lastKey;
let parents = document.querySelectorAll(".parent");
let urls = document.querySelectorAll(".navigation li a");
let ScrollingSpeed = 750 / 1000; //750px per second
let scrollAnimation;
let onScrolling;
let page;
const theme = localStorage.getItem("themeSC21");

let faders = document.querySelectorAll(".fade-in");
let sliders = document.querySelectorAll(".slide-in");

let icon = document.getElementById("icon");
let shortcuts = document.getElementById("shortcuts");
let loading = document.getElementById("loading");
let box = document.getElementById("box");
let course = document.getElementById("course");
let menu = document.getElementById("menu");
let shortcutsA = document.getElementById("shortcutsA");
let switchTheme = document.getElementById("switchTheme");
let shortcutsH3 = document.getElementById("shortcutsH3");
let learnMoreBtn = document.getElementById("learnMoreBtn");
let headerImg = document.getElementById("headerImg");

//if the browser dont support backfrop-filter
//then he will use a background color
if (
    window.getComputedStyle(filter, null).getPropertyValue("backdrop-filter") !=
    "blur(10px)"
) {
    icon.classList.toggle("mozilla");
    shortcuts.classList.toggle("mozilla");
}
// responsive header
window.onload = function () {
    //loading animation
    loading.classList.add("fade-in");
    setTimeout(() => {
        loading.classList.add("hide");
    }, mainTransition);
    ////
    if (window.matchMedia(`(max-width: ${tabletWidth})`).matches) {
        big = false;
    } else {
        big = true;
    }
    MQ_799px();
    //test if the IntersectionObserver is working
    if (icon.classList.contains("appear")) {
        return;
    } else {
        for (let i = 0; i < faders.length; i++) {
            faders[i].classList.add("appear");
        }
        for (let i = 0; i < sliders.length; i++) {
            sliders[i].classList.add("appear");
        }
    }
};
function MQ_799px() {
    // if screen >= tabletwidth
    if (window.matchMedia("(max-width: " + tabletWidth + ")").matches && !big) {
        box.appendChild(headerImg);
        big = true;
    } else if (window.matchMedia("(min-width: " + tabletWidth + ")").matches && big) {
        course.appendChild(headerImg);
        big = false;
    }
}
window.onresize = MQ_799px;

// function to show/hide the menu
function menuDisplay() {
    icon.classList.toggle("change");
    setTimeout(function () {
        if (transition1 === 700) {
            transition1 = 0;
        } else if (transition1 === 0) {
            transition1 = 700;
        }
        menu.classList.toggle("display");
    }, transition1);
}
for (i = 0; i < urls.length; i++) {
    urls[i].onclick = function () {
        menuDisplay();
        if (this !== shortcutsA) {
            shortcuts.classList.remove("display");
            goLocationByDataId(this);
        } else {
            shortcutsDisplay();
        }
    };
}
function goLocationByDataId(e) {
    let id = e.getAttribute("data-id");
    if (id) {
        let link = document.getElementById(id);
        goLocation(link);
    }
}
// show/hide shortcuts page
function shortcutsDisplay() {
    shortcuts.classList.toggle("display");
}
//change between themes and creating a local storage
function changeTheme() {
    if (document.body.classList.value == "whiteTheme") {
        document.body.classList.value = "blackTheme";
    } else {
        document.body.classList.value = "whiteTheme";
    }
    localStorage.setItem("themeSC21", document.body.classList.value);
}
if (theme) {
    document.body.classList.value = theme;
}
switchTheme.onclick = changeTheme;
//create keyboard shortcuts
window.addEventListener(
    "keydown",
    function (e) {
        if (!e.target.form) {
            if (e.code.includes("Arrow")) {
                e.preventDefault();
                page = setPage();
                if ((e.code === "ArrowUp" || e.code === "ArrowLeft") && page !== 0) {
                    goLocation(parents[--page]);
                } else if (
                    (e.code === "ArrowDown" || e.code === "ArrowRight") &&
                    page !== parents.length - 1
                ) {
                    goLocation(parents[++page]);
                }
            } else if (e.code === "Space") {
                if (onScrolling) {
                    e.preventDefault();
                    cancelAnimationFrame(scrollAnimation);
                    onScrolling = false;
                }
            } else if (e.code == "KeyT") {
                e.preventDefault();
                changeTheme();
            } else if (e.code == "Tab") {
                e.preventDefault();
                menuDisplay();
            }
        }

        if (lastKey == "Alt") {
            for (i = 1; i <= parents.length; i++) {
                if (parseInt(e.key) === i) {
                    e.preventDefault();
                    let go = i - 1;
                    goLocation(parents[go]);
                }
            }
        }
        lastKey = e.key;
    },
    false
);
icon.onclick = menuDisplay;
shortcutsH3.onclick = shortcutsDisplay;

//set page index
page = 0;
function setPage() {
    // set the first positive number the min num
    for (let i = 0; i < parents.length; i++) {
        if (parents[i].getBoundingClientRect().top >= 0) {
            page = i;
            break;
        }
    }
    return page;
}
//go to a location minus the top padding
function goLocation(target, duration = null) {
    cancelAnimationFrame(scrollAnimation);
    onScrolling = true;
    let targetPos = target.offsetTop;
    let startPos = window.pageYOffset;
    let distance = targetPos - startPos;
    let startTime = null;
    if (duration === null) {
        duration = Math.abs(distance) / ScrollingSpeed;
        if (duration < 100) {
            duration = 500;
        }
    }
    function animation(currentTime) {
        if (startTime === null) {
            startTime = currentTime;
        }
        let timeElapsed = currentTime - startTime;
        let run = linear(timeElapsed, startPos, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
            scrollAnimation = requestAnimationFrame(animation);
        }
    }
    function easeInOut(t, b, c, d) {
        //the problem was the division by zero when the duration is 0
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    }
    function linear(t, b, c, d) {
        return (c * t) / d + b;
    }
    scrollAnimation = requestAnimationFrame(animation);
}
//create fade-in animation
const appearOptions = {
    threshold: 0.5,
};
const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add("appear");
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);
faders.forEach((fader) => {
    appearOnScroll.observe(fader);
});
sliders.forEach((slider) => {
    appearOnScroll.observe(slider);
});
//test if IntersectionObserver is working
appearOnScroll.observe(icon);
//go to learnMore page
learnMoreBtn.onclick = function () {
    goLocationByDataId(this);
};
