window.addEventListener("load", function () {

    document.getElementById('banner_close').addEventListener('click', function () {
        document.getElementsByClassName('banner_banner')[0].classList.toggle('banner_hidden');
        document.documentElement.style.setProperty('--banner-height', "0px");
    });

    async function pingTimeWorker() {
        try {
            const ping_res = await fetch('https://api.easybase.io/pingResponseTime');
            const num = await ping_res.text();
            Array.from(document.getElementsByClassName("ping-time-text")).forEach(ele => ele.innerHTML = `${num}ms`);
            setTimeout(pingTimeWorker, 4500);
        } catch (error) {
            console.log("Couldn't fetch pingResponseTime");
        }
    }
    pingTimeWorker();


    document.getElementsByClassName("mobile-menu_indicator")[0].addEventListener('click', function () {
        document.getElementsByClassName("mobile-nav")[0].classList.toggle("visible");
        document.body.classList.toggle("overflow-hidden");
    }, false);

    document.getElementById("icon-close-mobile").addEventListener('click', function () {
        document.getElementsByClassName("mobile-nav")[0].classList.toggle("visible");
        document.body.classList.toggle("overflow-hidden");
    }, false);


    var getScrollY = function () { return (window.pageYOffset || window.document.documentElement.scrollTop) - (window.document.documentElement.clientTop || 0); };
    var getWindowWidth = function () { return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; };

    window.addEventListener("scroll", function () {
        const banner_height = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue("--banner-height").match(/\d+/));
        var scroll_pos = getScrollY();
        if (getWindowWidth() > 800) {
            if (scroll_pos > banner_height) {
                document.querySelector(".header_wrapper").classList.add("nav-on-scroll");
            } else {
                document.querySelector(".header_wrapper").classList.remove("nav-on-scroll");
            }
        }
    });

});
