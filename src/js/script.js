
// Fetch NASA's APOD API for Today's Picture
const today = new Date();
const month = today.getMonth() + 1 > 9 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1)
const date = today.getFullYear() + "-" + month + "-" + today.getDate();

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
    const picture = document.querySelector(".picture-container");
    const article = document.querySelector("article");

    const imageHTML = copyright => {
        picture.innerHTML = `
            <img src="${data.url}" alt="${data.title}" class="apod-pic">
            <div class="img-credit">
                <p>Image Credit & Copyright: ${copyright}</p>
                <button type="button"><i class="fa-light fa-heart"></i></button>
            </div>
        `
    }
    
    const videoHTML = copyright => {
        picture.innerHTML = `
        <iframe src="${data.url}" alt="${data.title}" class="apod-pic"></iframe>
        <div class="img-credit">
            <p>Image Credit & Copyright: ${copyright}</p>
            <button type="button"><i class="fa-light fa-heart"></i></button>
        </div>
        `
    }

    // Validate if the data is found
    if (data.code === 404) {
        picture.textContent = data.msg
    } else {
        showContent()
    }

    function showContent() {
        if (data.copyright == null) {
            // Check the media type
            if (data.media_type == "image") {
                imageHTML('NASA APOD')
            } else if (data.media_type == "video") {
                videoHTML('NASA APOD')
            };
            
        } else {
            if (data.media_type == "image") {
                imageHTML(data.copyright)
            } else if (data.media_type == "video") {
                videoHTML(data.copyright)
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
        const apodImage = document.querySelector(".apod-pic");
        const modal = document.querySelector(".modal");
    
        apodImage.addEventListener("click", () => {
            modal.innerHTML = `<img src="${data.url}" alt="${data.title}">`;
            modal.classList.add("show");
        });
    
        modal.addEventListener("click", () => {
            modal.classList.remove("show");
        });
    
        // Store the favorite pictures to Local Storage
        const favoriteBtn = document.querySelector("article button");
        const favoriteIcon = document.querySelector(".img-credit button");
        
        favoriteBtn.addEventListener("click", e => {
            addToFavorite()
        });
    
        favoriteIcon.addEventListener("click", () => {
            addToFavorite()
        });

        function addToFavorite() {
            dataArr.push(data);
    
            localStorage.setItem("data", JSON.stringify(dataArr));
    
            if (localStorage.getItem("data")) {
                Swal.fire({
                    title: 'Success!',
                    text: 'The picture has been added to "Favorite Pictures"!',
                    icon: 'success',
                    color: '#fff',
                    background: 'rgba(29, 35, 94, 0.4)',
                    showConfirmButton: false,
                    customClass: {
                        popup: 'alert-container',
                    }
                })
            };
        }
    }
};

getApi(date);

// Show previous and next picture
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const dateForm = document.querySelector("#dateForm");
const selectedDateInput = document.querySelector("#selectedDate");

prev.addEventListener("click", () => {
    // Controll the previous dates according to selected dates or today's date
    const currentDay = document.querySelector("[data-date]");
    const currentDate = new Date(currentDay.dataset.date);
    const seletedDate = new Date(selectedDateInput.value);

    function getPreviousPicture(appliedDate, baseDate) {
        const prevDay = new Date(appliedDate.setDate(appliedDate.getDate() - 1));
        const prevMonth = prevDay.getMonth() + 1 > 9 ? prevDay.getMonth() + 1 : '0' + (prevDay.getMonth() + 1)
        const prevDate = prevDay.getFullYear() + "-" + prevMonth + "-" + prevDay.getDate();

        getApi(prevDate);

        // When going back from yesterday to today, disable the next button.
        // Otherwise, user needs to click again to change the class.
        if (appliedDate.getDate() < baseDate.getDate()) {
            next.parentElement.classList.remove("btn-disable");
        }
    }

    if (selectedDateInput.value === "") {
        getPreviousPicture(currentDate, today)
    } else {
        getPreviousPicture(seletedDate, seletedDate)

        // Reset the date form
        dateForm.reset();
    };
});

next.addEventListener("click", () => {
    function getNextPicture(appliedDate, baseDate) {
        const nextDay = new Date(appliedDate.setDate(appliedDate.getDate() + 1));
        const nextMonth = nextDay.getMonth() + 1 > 9 ? nextDay.getMonth() + 1 : '0' + (nextDay.getMonth() + 1)
        const nextDate = nextDay.getFullYear() + "-" + nextMonth + "-" + nextDay.getDate();

        getApi(nextDate);

        // When going back from yesterday to today, disable the next button.
        if (appliedDate.getDate() === baseDate.getDate() && baseDate.getMonth() === baseDate.getMonth()){
            next.parentElement.classList.add("btn-disable");
        };
    }

    // Controll the previous dates according to selected dates or today's date
    if (selectedDateInput.value === "") {
        const currentDay = document.querySelector("[data-date]");
        const currentDate = new Date(currentDay.dataset.date);

        if (currentDay.dataset.date === date) {
            // Alert for future pictures
            Swal.fire({
                text: "Tomorrow's picture is coming soon!",
                color: '#fff',
                background: '#6e5300',
                showConfirmButton: false,
                customClass: {
                    popup: 'alert-container',
                }
            })
        } else {
            getNextPicture(currentDate, today)
        }
    } else {
        const seletedDate = new Date(selectedDateInput.value);

        if (seletedDate.getTime() > today.getTime() || selectedDateInput.value === date) {
            // Disable the next button after today's date
            Swal.fire({
                text: "Tomorrow's picture is coming soon!",
                color: '#fff',
                background: '#6e5300',
                showConfirmButton: false,
                customClass: {
                    popup: 'alert-container',
                }
            })
        } else {
            getNextPicture(seletedDate, today)
        };

        // Reset the date form
        dateForm.reset();
    };
});

// Change image by selecting the date
selectedDateInput.addEventListener("change", e => {
    const selectedDate = e.target.value

    if (selectedDate === date) {
        // Disable the next button when selecting today's date
        next.parentElement.classList.add("btn-disable");

        getApi(selectedDate)
    } else if (new Date(selectedDate).getTime() > today.getTime()) {
        e.preventDefault();
        Swal.fire({
            title: 'Oops!',
            text: 'The chosen date is in the future. Please select again.',
            icon: 'error',
            color: '#fff',
            background: '#6e5300',
            showConfirmButton: false,
            customClass: {
                popup: 'alert-container',
            }
        })
    } else{
        next.parentElement.classList.remove("btn-disable");

        getApi(selectedDate);
    }
});