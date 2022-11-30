
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

// Fetch NASA's APOD API for Today's Picture
let today = new Date();
let day = today.getDate();
let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + day;

async function getApi(d) {
    const url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=" + d;
    const response = await fetch(url);
    const data = await response.json();

    // Show the APOD Picture and articles on HTML
    let picture = document.querySelector(".picture-container");
    let article = document.querySelector("article");

    if (data.copyright == null) {
        picture.innerHTML = `
        <img src="${data.url}" alt="${data.title}">
        <div class="img-credit">
            <p>Image Credit & Copyright: NASA APOD</p>
            <button type="button"><i class="fa-sharp fa-solid fa-share-nodes"></i></button>
        </div>
        `;
    } else {
        picture.innerHTML = `
        <img src="${data.url}" alt="${data.title}">
        <div class="img-credit">
            <p>Image Credit & Copyright: ${data.copyright}</p>
            <button type="button"><i class="fa-sharp fa-solid fa-share-nodes"></i></button>
        </div>
        `;
    };

    article.innerHTML = `
    <h1>${data.title}</h1>
    <p class="pic-description">${data.explanation}</p>
    <hr>
    <p>
        Authors & editors: Robert Nemiroff&nbsp;(MTU) & Jerry Bonnell&nbsp;(UMCP)
    </p>
    <!-- Hide the button in small and medium screens -->
    <button type="button">
        <i class="fa-sharp fa-solid fa-share-nodes"></i>
        <span>Share this Picture</span>
    </button>
    `;
};

getApi(date);

// Show previous and next picture
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");

prev.addEventListener("click", () => {
    day--;
    date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + day;

    getApi(date);

    if (day < today.getDate()) {
        next.parentElement.classList.remove("btn-disable");
    }
});

next.addEventListener("click", () => {
    if (day < today.getDate()) {
        day++;
        date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + day;

        // When going back from yesterday to today, add the class of disable to next button.
        // Otherwise, user need to click again to change the class.
        if (day == today.getDate()){
            next.parentElement.classList.add("btn-disable");
        };
    } else {
        // Disable the next button after today's date
        next.disabled = true;
    };

    getApi(date);
});

// TODO: Search Function
// TODO: Submission (Need to decide whether to build a DB for it)