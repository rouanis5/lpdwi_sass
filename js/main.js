let tabletWidth = "799px", mainTransition = 700,
    transition1 = mainTransition, page = 0, i,lastKey;
let pagesId = ["header", "learnmore", "aboutUs", "contactUs","footer"]
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
for (i = 0; i < urls.length; i++) {
    urls[i].onclick = function () {
        menuDisplay();
    }
}
let MQ_799px = function () {
    // if screen >= tabletwidth
    if (window.matchMedia("(max-width: " + tabletWidth + ")").matches && !big) {
        box.appendChild(headerImg);
        big = true;
    }else if (window.matchMedia("(min-width: " + tabletWidth + ")").matches && big) {
        course.appendChild(headerImg);
        big = false;
    };
}
window.onresize = MQ_799px;
window.addEventListener("keydown", function (e) {
    console.log(e.code);
    if (["Space"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
    else if (e.code == "ArrowUp" || e.code == "ArrowLeft") {
        e.preventDefault();
        upDown(1);
    }
    else if (e.code == "ArrowDown" || e.code == "ArrowRight") {
        e.preventDefault();
        upDown(2);
        
    }
    else if (e.code =="Tab"){
        e.preventDefault();
        menuDisplay();
    }
    else if (lastKey =="Alt"){
        for (i = 1; i <= pagesId.length; i++) {
            if (e.code == "Numpad"+i || e.code == "Digit"+i) {
                e.preventDefault();
                goHref(i-1);
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
    else if(n === 2){
        if (page >= 0 && page < (pagesId.length - 1)) ++page;
    }
    goHref(page)
}
function goHref(n){
    window.location.href = "#" + pagesId[n];
}
