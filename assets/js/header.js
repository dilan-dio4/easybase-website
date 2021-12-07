function toggleMobileNav() {
    document.getElementsByClassName("mobile-nav")[0].classList.toggle("visible");
    document.body.classList.toggle("overflow-hidden");
}

window.addEventListener("load", function () {

    document.getElementById('banner_close').addEventListener('click', function () {
        document.getElementsByClassName('banner_banner')[0].classList.toggle('banner_hidden');
        document.documentElement.style.setProperty('--banner-height', "0px");
    });

    async function statusWorker() {
        try {
            const status_res = await fetch('https://8x8pb0hcdvq9.statuspage.io/api/v2/status.json');
            const status_json = await status_res.json();

            if (status_json.status.indicator === "none") {
                // Already set in styles.css
                // document.querySelector(':root').style.setProperty('--flash-container-bg', "#22e2298c");
                // document.querySelector(':root').style.setProperty('--flasher-bg', "var(--mod-cyan-darker)");
                // Array.from(document.getElementsByClassName("sys-status-text")).forEach(ele => ele.innerHTML = "Operational");
            } else if (status_json.status.indicator === "minor") {
                document.querySelector(':root').style.setProperty('--flash-container-bg', "var(--mod-warning-light)");
                document.querySelector(':root').style.setProperty('--flasher-bg', "var(--mod-warning)");
                Array.from(document.getElementsByClassName("sys-status-text")).forEach(ele => ele.innerHTML = "Minor Issues");
            } else if (status_json.status.indicator === "major" || status_json.status.indicator === "critical") {
                document.querySelector(':root').style.setProperty('--flash-container-bg', "var(--mod-error)");
                document.querySelector(':root').style.setProperty('--flasher-bg', "var(--mod-error-light)");
                Array.from(document.getElementsByClassName("sys-status-text")).forEach(ele => ele.innerHTML = "System Error");
            }
        } catch (error) {
            console.log("Couldn't fetch statusWorker", error);
        }
    
    }
    statusWorker();

    document.getElementsByClassName("mobile-menu_indicator-button")[0].addEventListener('click', toggleMobileNav, false);
    document.getElementById("icon-close-mobile").addEventListener('click', toggleMobileNav, false);

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
