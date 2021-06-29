let tabletWidth = "799px", mainTransition = 700, big,
    transition1 = mainTransition, page = 0, i, lastKey;
let pagesId = ["#header", "#learnmore", "#aboutUs", "#contactUs", "#adresses", "#footer", "javascript:shortcutsDisplay()"]
let urls = document.querySelectorAll(".navigation nav ul li a");
const theme = localStorage.getItem('theme');
//if the browser dont support backfrop-filter
//then he will use a background color
if (window.getComputedStyle(filter, null).getPropertyValue("backdrop-filter") != "blur(10px)") {
    icon.classList.toggle("mozilla");
    shortcuts.classList.toggle("mozilla");
}
// responsive header
window.onload = function () {
    if (window.matchMedia(`(max-width: ${tabletWidth})`).matches) {
        big = false;
    }
    else {
        big = true;
    }
    MQ_799px();
}
function MQ_799px() {
    // if screen >= tabletwidth
    if (window.matchMedia("(max-width: " + tabletWidth + ")").matches && !big) {
        box.appendChild(headerImg);
        big = true;
    } else if (window.matchMedia("(min-width: " + tabletWidth + ")").matches && big) {
        course.appendChild(headerImg);
        big = false;
    };
}
window.onresize = MQ_799px;

// function to show/hide the menu
function menuDisplay() {
    icon.classList.toggle("change");
    setTimeout(
        function () {
            if (transition1 === 700) {
                transition1 = 0;
            }
            else if (transition1 === 0) {
                transition1 = 700;
            }
            menu.classList.toggle("display");
        }, transition1
    );
}
for (i = 0; i < urls.length; i++) {
    urls[i].onclick = function () {
        menuDisplay();
        if (i != 4) {
            shortcuts.classList.remove("display");
        }
    }
}
// show/hide shortcuts page
function shortcutsDisplay(){
    shortcuts.classList.toggle("display");
}
//change between themes and creating a local storage
function changeTheme() {
    if (document.body.classList.value == "whiteTheme") {
        blackTheme();
    }
    else {
        whiteTheme();
    }
    localStorage.setItem("theme", document.body.classList.value);
}
function whiteTheme() {
    document.body.classList.replace("blackTheme", "whiteTheme");
}
function blackTheme() {
    document.body.classList.replace("whiteTheme", "blackTheme");
}
if (theme) {
    window[theme]();
}
switchTheme.onclick = changeTheme;
//create keyboard shortcuts
window.addEventListener("keydown", function (e) {
    if (!e.target.form) {
        if (["Space"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
        else if (e.code == "KeyT") {
            console.log(e.code);
            changeTheme();
        }
        else if (e.code == "Tab") {
            e.preventDefault();
            menuDisplay();
        }
        else if (e.code == "ArrowUp" || e.code == "ArrowLeft") {
            e.preventDefault();
            upDown(1);
        }
        else if (e.code == "ArrowDown" || e.code == "ArrowRight") {
            e.preventDefault();
            upDown(2);
        }
    }
    if (lastKey == "Alt") {
        for (i = 1; i <= pagesId.length; i++) {
            if (e.code == "Numpad" + i || e.code == "Digit" + i) {
                e.preventDefault();
                goHref(i - 1);
            }
        }
    }
    lastKey = e.key;
}, false);
function setPage(n) {
    page = Number(n);
}
function upDown(n) {
    if (n === 1) {
        if (page > 0 && page <= (pagesId.length - 1)) --page;
    }
    else if (n === 2) {
        if (page >= 0 && page < (pagesId.length - 1)) ++page;
    }
    goHref(page)
}
function goHref(n) {
    window.location.href = pagesId[n];
}