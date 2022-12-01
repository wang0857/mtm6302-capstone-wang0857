
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
        <img src="${data.url}" alt="${data.title}" class="apod-pic">
        <div class="img-credit">
            <p>Image Credit & Copyright: NASA APOD</p>
            <button type="button"><i class="fa-sharp fa-solid fa-share-nodes"></i></button>
        </div>
        `;
    } else {
        picture.innerHTML = `
        <img src="${data.url}" alt="${data.title}" class="apod-pic">
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

next.addEventListener("click", (e) => {
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
        e.preventDefault();
        alert("Tomorrow's picture is coming soon!");
    };

    getApi(date);
});