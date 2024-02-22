
// Collapse the sidebar
const sidebar = document.querySelector("aside");
const collapseBtn = document.querySelector(".collapse-btn");
const btnArrow = document.querySelector(".collapse-btn i");
const sidebarItems = document.querySelectorAll(".side-nav li a span");
const appHeader = document.querySelector(".app-header");
const appBtns = document.querySelectorAll(".download-btn");
const appItems = document.querySelectorAll(".download-btn span");

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