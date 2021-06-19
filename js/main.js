let tabletWidth = "799px", mainTransition = 700, transition1 = mainTransition;
let urls = document.querySelectorAll(".navigation nav ul li a");
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
for (let i = 0; i < urls.length; i++) {
    urls[i].onclick = function () {
        menuDisplay();
    }
}

let MQ_799px = function () {
    // if screen >= tabletwidth
    if (window.matchMedia("(max-width: " + tabletWidth + ")").matches && !big) {
        box.appendChild(headerImg)
        big = true;
    } if (window.matchMedia("(min-width: " + tabletWidth + ")").matches && big) {
        course.appendChild(headerImg)
        big = false;
    }
}
window.onresize = MQ_799px
pagesId = ["header", "learnmore", "aboutUs", "footer"]
var page = 0;
window.addEventListener("keydown", function (e) {
    if (["Space"].indexOf(e.code) > -1) {
        e.preventDefault();
    };
    if (e.code == "ArrowUp" || e.code == "ArrowLeft") {
        e.preventDefault();
        upDown(1);
    };
    if (e.code == "ArrowDown" || e.code == "ArrowRight") {
        e.preventDefault();
        upDown(2);
    }
}, false);
function setPage(n) {
    page = n;
}
function upDown(n) {
    if (n == 1) {
        if (page > 0 && page <= (pagesId.length - 1)) page--;
    }
    else {
        if (page >= 0 && page < (pagesId.length - 1)) page++;
    }
    window.location.href = "#" + pagesId[page];
}