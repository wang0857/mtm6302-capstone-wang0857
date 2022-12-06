
// Collapse the sidebar
let sidebar = document.querySelector("aside");
let collapseBtn = document.querySelector(".collapse-btn");
let btnArrow = document.querySelector(".collapse-btn i");
let sidebarItems = document.querySelectorAll(".side-nav li a span");
let appHeader = document.querySelector(".app-header");
let appBtns = document.querySelectorAll(".download-btn");
let appItems = document.querySelectorAll(".download-btn span");

collapseBtn.addEventListener("click", () => {
    // Sidebar width
    sidebar.classList.toggle("collapsed-sidebar")
    sidebarItems.forEach((item) => {
        item.classList.toggle("collapse");
    });

    // Buttons to download apps
    appBtns.forEach((btn) => {
        btn.classList.toggle("width-auto");
    });
    appHeader.classList.toggle("collapse");
    appItems.forEach((item) => {
        item.classList.toggle("collapse");
    });

    // Collapse button
    btnArrow.classList.toggle("flip");
});

// Please check other files for the functions for different purposes