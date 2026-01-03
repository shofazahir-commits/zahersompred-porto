// script snimasi muncul dari atas/bawah saat scroll
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

// Script navbar hamburger/sidebar
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

// Script scroll snap per page
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
        // behavior: "smooth",
        block: "start"
    });

    setTimeout(() => {
        isScrolling = false;
    }, 700);
}, { passive: false });


// Script pop up project cards
const projectCards = document.querySelectorAll(".project-card");
const modalOverlay = document.getElementById("modalOverlay");
const closeModal = document.getElementById("closeModal");

const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalTech = document.getElementById("modalTech");

projectCards.forEach(card => {
    card.addEventListener("click", () => {
        modalTitle.innerText = card.dataset.title;
        modalDesc.innerText = card.dataset.desc;
        modalTech.innerText = card.dataset.tech;

        modalOverlay.classList.add("active");
    });
});

// Close modal
closeModal.addEventListener("click", closePopup);
modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closePopup();
});

function closePopup() {
    modalOverlay.classList.remove("active");
}


// Script pop up skill cards
const bhsCards = document.querySelectorAll(".bhs-card");
const bhsOverlay = document.getElementById("bhsOverlay");
const closeBhs = document.getElementById("closeBhs");

const bhsTitle = document.getElementById("bhsTitle");
const bhsDesc = document.getElementById("bhsDesc");

bhsCards.forEach(card => {
    card.addEventListener("click", () => {
        bhsTitle.innerText = card.dataset.title;
        bhsDesc.innerText = card.dataset.desc;
        
        bhsOverlay.classList.add("active");
    });
});

// CLOSE SKILL POP UP
closeBhs.addEventListener("click", closeBhsPopup);
bhsOverlay.addEventListener("click", (e) => {
    if (e.target === bhsOverlay) closeBhsPopup();
});

function closeBhsPopup() {
    bhsOverlay.classList.remove("active");
}