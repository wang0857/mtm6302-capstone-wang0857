
// Fetch NASA's APOD API for Today's Picture
let today = new Date();
let day = today.getDate();
let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + day;

// Set an empty array to store the list of favorite pictures
let dataArr = [];

async function getApi(d) {
    const url = "https://api.nasa.gov/planetary/apod?api_key=rhXTaNLNRvwde9HnT7xhhXBDzkVa4liNifR57gtk&date=" + d;
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
            <button type="button"><i class="fa-light fa-heart"></i></button>
        </div>
        `;
    } else {
        picture.innerHTML = `
        <img src="${data.url}" alt="${data.title}" class="apod-pic">
        <div class="img-credit">
            <p>Image Credit & Copyright: ${data.copyright}</p>
            <button type="button"><i class="fa-light fa-heart"></i></button>
        </div>
        `;
    };

    article.innerHTML = `
    <h1>${data.title}</h1>
    <p class="mb-3">Date: ${data.date}</p>
    <p class="pic-description">${data.explanation}</p>
    <hr>
    <p>
        Authors & editors: Robert Nemiroff&nbsp;(MTU) & Jerry Bonnell&nbsp;(UMCP)
    </p>
    <!-- Hide the button in small and medium screens -->
    <button type="button">
        <i class="fa-solid fa-heart"></i>
        <span>Add to Favorite</span>
    </button>
    `;

    // Show the APOD Picture in modal
    let apodImage = document.querySelector(".apod-pic");
    let modal = document.querySelector(".modal");

    apodImage.addEventListener("click", () => {
        modal.innerHTML = `<img src="${data.url}" alt="${data.title}">`;
        modal.classList.add("show");
    });

    modal.addEventListener("click", () => {
        modal.classList.remove("show");
    });

    // Store the favorite pictures to Local Storage
    let favoriteBtn = document.querySelector("article button");
    let favoriteIcon = document.querySelector(".img-credit button");
    
    favoriteBtn.addEventListener("click", (e) => {
        dataArr.push(data);

        let dataString = JSON.stringify(dataArr);
        localStorage.setItem("data", dataString);

        if (localStorage.getItem("data")) {
            alert('Successfully added to "Favorite Pictures"!');
        };
    });

    favoriteIcon.addEventListener("click", () => {
        dataArr.push(data);

        let dataString = JSON.stringify(dataArr);
        localStorage.setItem("data", dataString);

        if (localStorage.getItem("data")) {
            alert('Successfully added to "Favorite Pictures"!');
        };
    });
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

// Change image by selecting the date
let selectedDate = document.querySelector("#selectedDate");
selectedDate.addEventListener("change", (e) => {
    let selectedDay = new Date(e.target.value).getDate() + 1;
    let selectedMonth = new Date(e.target.value).getMonth() + 1;
    // console.log(selectedMonth);

    if (selectedMonth < today.getMonth() + 1){
        date = e.target.value;
        getApi(date);
    } else if (selectedDay < today.getDate() && selectedMonth == today.getMonth() + 1) {
        date = e.target.value;
        getApi(date);
    } else if (selectedDay > today.getDate() && selectedMonth == today.getMonth() + 1){
        e.preventDefault();
        alert("The chosen date is in the future. Please select again.");
    };
});