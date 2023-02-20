
// Fetch NASA's APOD API for Today's Picture
let today = new Date();
let day = today.getDate();
let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + day;

// Set an empty array to store the list of favorite pictures
let dataArr = [];

// Prevent the orginal data from missing when going back to this page
if (localStorage.getItem("data")) {
    dataArr = JSON.parse(localStorage.getItem("data"));
};

async function getApi(d) {
    const url = "https://api.nasa.gov/planetary/apod?api_key=rhXTaNLNRvwde9HnT7xhhXBDzkVa4liNifR57gtk&date=" + d;
    const response = await fetch(url);
    const data = await response.json();

    // Show the APOD Picture and articles on HTML
    let picture = document.querySelector(".picture-container");
    let article = document.querySelector("article");

    if (data.copyright == null) {
        // Check the media type
        if (data.media_type == "image") {
            picture.innerHTML = `
            <img src="${data.url}" alt="${data.title}" class="apod-pic">
            <div class="img-credit">
                <p>Image Credit & Copyright: NASA APOD</p>
                <button type="button"><i class="fa-light fa-heart"></i></button>
            </div>
            `;
        } else if (data.media_type == "video") {
            picture.innerHTML = `
            <iframe src="${data.url}" alt="${data.title}" class="apod-pic"></iframe>
            <div class="img-credit">
                <p>Image Credit & Copyright: NASA APOD</p>
                <button type="button"><i class="fa-light fa-heart"></i></button>
            </div>
            `;
        };
        
    } else {
        if (data.media_type == "image") {
            picture.innerHTML = `
            <img src="${data.url}" alt="${data.title}" class="apod-pic">
            <div class="img-credit">
                <p>Image Credit & Copyright: ${data.copyright}</p>
                <button type="button"><i class="fa-light fa-heart"></i></button>
            </div>
            `;
        } else if (data.media_type == "video") {
            picture.innerHTML = `
            <iframe src="${data.url}" alt="${data.title}" class="apod-pic"></iframe>
            <div class="img-credit">
                <p>Image Credit & Copyright: ${data.copyright}</p>
                <button type="button"><i class="fa-light fa-heart"></i></button>
            </div>
            `;
        };
    };

    article.innerHTML = `
    <h1>${data.title}</h1>
    <p class="mb-3" data-date="${data.date}">Date: ${data.date}</p>
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

// Change image by selecting the date
let selectedDate = document.querySelector("#selectedDate");

selectedDate.addEventListener("change", (e) => {
    let selectedDay = new Date(e.target.value).getDate() + 1;
    let selectedMonth = new Date(e.target.value).getMonth() + 1;
    // console.log(selectedMonth);

    if (selectedMonth < today.getMonth() + 1){
        // Activate the next button
        next.parentElement.classList.remove("btn-disable");

        date = e.target.value;
        getApi(date);
    } else if (selectedDay < today.getDate() && selectedMonth == today.getMonth() + 1) {
        // Activate the next button
        next.parentElement.classList.remove("btn-disable");

        date = e.target.value;
        getApi(date);
    } else if (selectedDay == today.getDate() && selectedMonth == today.getMonth() + 1) {
        // Disable the next button when selecting today's date
        next.parentElement.classList.add("btn-disable");

        date = e.target.value;
        getApi(date);
    } else if (selectedDay > today.getDate() && selectedMonth == today.getMonth() + 1){
        e.preventDefault();
        alert("The chosen date is in the future. Please select again.");
    };
});

// Show previous and next picture
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let dateForm = document.querySelector("#dateFrom");

prev.addEventListener("click", () => {
    // Controll the previous dates according to selected dates or today's date
    let currentDay = document.querySelector("[data-date]");
    let currentDate = new Date(currentDay.dataset.date);

    if (selectedDate.value == "") {
        let prevDay = currentDate.setDate(currentDate.getDate());
        date = new Date(prevDay).getFullYear() + "-" + (new Date(prevDay).getMonth() + 1) + "-" + new Date(prevDay).getDate();

        getApi(date);

        if (currentDate.getDate() < today.getDate()) {
            next.parentElement.classList.remove("btn-disable");
        }
    } else {
        // Re-assign values to date
        let prevDay = new Date(selectedDate.value).setDate(new Date(selectedDate.value).getDate());
        date = new Date(prevDay).getFullYear() + "-" + (new Date(prevDay).getMonth() + 1) + "-" + new Date(prevDay).getDate();

        getApi(date);

        if (currentDate.getDate() < new Date(selectedDate.value).getDate()) {
            next.parentElement.classList.remove("btn-disable");
        }

        // Reset the date form
        dateForm.reset();
    };
});

next.addEventListener("click", (e) => {
    // Controll the previous dates according to selected dates or today's date
    if (selectedDate.value == "") {
        let currentDay = document.querySelector("[data-date]");
        let currentDate = new Date(currentDay.dataset.date);

        if (currentDate.getDate() + 1 < today.getDate()) {
            let nextDay = currentDate.setDate(currentDate.getDate() + 2);
            date = new Date(nextDay).getFullYear() + "-" + (new Date(nextDay).getMonth() + 1) + "-" + new Date(nextDay).getDate();

            getApi(date);
    
            // When going back from yesterday to today, add the class of disable to next button.
            // Otherwise, user need to click again to change the class.
            if (currentDate.getDate() + 1 == today.getDate() && currentDate.getMonth() == today.getMonth()){
                next.parentElement.classList.add("btn-disable");
            };
        } else if (currentDate.getMonth() < today.getMonth()){
            let nextDay = currentDate.setDate(currentDate.getDate() + 2);
            date = new Date(nextDay).getFullYear() + "-" + (new Date(nextDay).getMonth() + 1) + "-" + new Date(nextDay).getDate();

            getApi(date);
        } else if (currentDate.getDate() + 1 == today.getDate() && currentDate.getMonth() == today.getMonth()) {
            // Disable the next button after today's date
            e.preventDefault();
            alert("Tomorrow's picture is coming soon!");
        };
    } else {
        if (new Date(selectedDate.value).getDate() + 1 < today.getDate() && new Date(selectedDate.value).getMonth() == today.getMonth()) {
            // Re-assign values to date
            let nextDay = new Date(selectedDate.value).setDate(new Date(selectedDate.value).getDate() + 2);
            date = new Date(nextDay).getFullYear() + "-" + (new Date(nextDay).getMonth() + 1) + "-" + new Date(nextDay).getDate();
    
            getApi(date);          

            // When going back from yesterday to today, add the class of disable to next button.
            // Otherwise, user need to click again to change the class.
            if (new Date(selectedDate.value).getDate() == today.getDate() && new Date(selectedDate.value).getMonth() == today.getMonth()){
                next.parentElement.classList.add("btn-disable");
            };

            // Reset the date form
            dateForm.reset();
        } else if (new Date(selectedDate.value).getMonth() < today.getMonth()) {
            // Re-assign values to date
            let nextDay = new Date(selectedDate.value).setDate(new Date(selectedDate.value).getDate() + 2);
            date = new Date(nextDay).getFullYear() + "-" + (new Date(nextDay).getMonth() + 1) + "-" + new Date(nextDay).getDate();
    
            getApi(date);

            // Reset the date form
            dateForm.reset();
        } else if (new Date(selectedDate.value).getDate() > today.getDate() && new Date(selectedDate.value).getMonth() == today.getMonth()) {
            // Disable the next button after today's date
            e.preventDefault();
            alert("Tomorrow's picture is coming soon!");
        };
    };
});