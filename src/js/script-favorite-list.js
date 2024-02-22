
// Show the list of favorites pictures
const favoriteListImages = document.querySelector(".favorite-list-image");
const favoriteListVideos = document.querySelector(".favorite-list-video");
const dataArr = JSON.parse(localStorage.getItem("data"));
const modal = document.querySelector(".modal");

// Display the favorites picture
const imageHTML = data => `
    <div class="favorite-pannels" id="${dataArr.indexOf(data)}">
        <img src="${data.url}" alt="${data.title}" class="favorite-pic">
        <h2>${data.title}</h2>
        <p>${data.date}</p>
        <div class="delete"><i class="fa-solid fa-trash"></i></div>
    </div>
`

const videoHTML = data => `
    <div class="favorite-pannels" id="${dataArr.indexOf(data)}">
        <iframe src="${data.url}" alt="${data.title}" class="favorite-video" width="275" height="154.69"></iframe>
        <h2>${data.title}</h2>
        <p>${data.date}</p>
        <div class="delete"><i class="fa-solid fa-trash"></i></div>
    </div>
`

dataArr.forEach((data) => {
    if (data.media_type == "image") {
        favoriteListImages.innerHTML += imageHTML(data);
    } else if (data.media_type == "video") {
        favoriteListVideos.innerHTML += videoHTML(data);
    };
});

// Delte items from Local Storage in Image Tab
function deleteItems(item, type) {
    // Remove item from array
    const index = item.id;
    dataArr.splice(index, 1);

    const dataString = JSON.stringify(dataArr);
    localStorage.setItem("data", dataString);
    
    // Reset the HTML 
    type.innerHTML = "";
}

favoriteListImages.addEventListener("click", (e) => {
    if(e.target.parentElement.classList.contains("delete")) {
        deleteItems(e.target.parentElement.parentElement, favoriteListImages)

        // Update the HTML
        for (let data of dataArr) {
            // Show images in the image tab
            if (data.media_type === "image") {
                favoriteListImages.innerHTML += imageHTML(data);
            };
        };
    } else if (e.target.classList.contains("favorite-pic")) {
        // Show Favorite Picture in Modal  
        modal.innerHTML = `<img src="${e.target.src}" alt="${e.target.alt}">`;
        modal.classList.add("show");
    };
});

//  Delte items from Local Storage in Video Tab
favoriteListVideos.addEventListener("click", e => {
    if(e.target.parentElement.classList.contains("delete")) {
        deleteItems(e.target.parentElement.parentElement, favoriteListVideos)

        // Update the HTML
        for (let data of dataArr) {
            // Show videos in the video tab
            if (newData.media_type === "video") {
                favoriteListVideos.innerHTML += videoHTML(data);
            };
        };
    };
});


// Show the APOD Picture in modal
modal.addEventListener("click", () => {
    modal.classList.remove("show");
});

// Change the list by selecting the image or video tag
const imageTab = document.querySelector(".image-tab");
const videoTab = document.querySelector(".video-tab");

function collapseTab(activeTab, collapsedTab, activeList, collapsedList) {
    activeTab.classList.add("active");
    collapsedTab.classList.remove("active");
    collapsedList.classList.add("collapse");
    activeList.classList.remove("collapse");
}

imageTab.addEventListener("click", e => {
    // Prevent refreshing the page in the same page
    if (imageTab.classList.contains("active")) {
        e.preventDefault();
    } else {
        collapseTab(imageTab, videoTab, favoriteListImages, favoriteListVideos)
    };
});

videoTab.addEventListener("click", (e) => {
    // Prevent refreshing the page in the same page
    if (videoTab.classList.contains("active")) {
        e.preventDefault();
    } else {
        collapseTab(videoTab, imageTab, favoriteListVideos, favoriteListImages)
    };
});