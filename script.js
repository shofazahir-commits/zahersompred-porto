// Script scroll reveal
const reveals = document.querySelectorAll(".reveal");

let lastScrollY = window.scrollY;
let scrollDirection = "down";

reveals.forEach(el => {
    el.classList.add("from-bottom");
});

window.addEventListener("scroll", () => {
    scrollDirection = window.scrollY > lastScrollY ? "down" : "up";
    lastScrollY = window.scrollY;
});

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove("from-top", "from-bottom");

                if (scrollDirection === "down") {
                    entry.target.classList.add("from-bottom");
                } else {
                    entry.target.classList.add("from-top");
                }

                entry.target.classList.add("active");
            } else {
                // supaya bisa muncul berulang kali
                entry.target.classList.remove("active");
            }
        });
    },
    {
        threshold: 0.15
    }
);

window.addEventListener("load", () => {
    reveals.forEach(el => observer.observe(el));
});

// Script navbar hamburger
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

hamburger.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
});

overlay.addEventListener("click", closeMenu);

sidebar.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
});

function closeMenu() {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
}
// Akhir script navbar hamburger

const pages = document.querySelectorAll(".page");
let currentPage = 0;
let isScrolling = false;

window.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (isScrolling) return;

    currentPage += e.deltaY > 0 ? 1 : -1;
    currentPage = Math.max(0, Math.min(currentPage, pages.length - 1));

    isScrolling = true;

    pages[currentPage].scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    setTimeout(() => {
        isScrolling = false;
    }, 700);
}, { passive: false });


