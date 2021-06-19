let big;
if (navigator.userAgent.indexOf("Firefox") != -1) {
    document.write(`
        <style>
            .icon.change::before{
                background: #ff72b9 !important;
            }
        </style>
        `
    )
}
window.onload = function () {
    if (window.matchMedia("(max-width: " + tabletWidth + ")").matches)
        big = false;
    else
        big = true;
    MQ_799px();
}