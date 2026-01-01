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


