
// Show the list of favorites pictures
let favoriteListImages = document.querySelector(".favorite-list-image");
let favoriteListVideos = document.querySelector(".favorite-list-video");
let dataArr = JSON.parse(localStorage.getItem("data"));
let modal = document.querySelector(".modal");
console.log(dataArr);

// Display the favorites picture
dataArr.forEach((data) => {
    if (data.media_type == "image") {
        favoriteListImages.innerHTML += `
        <div class="favorite-pannels" id="${dataArr.indexOf(data)}">
            <img src="${data.url}" alt="${data.title}" class="favorite-pic">
            <h2>${data.title}</h2>
            <p>${data.date}</p>
            <div class="delete"><i class="fa-solid fa-trash"></i></div>
        </div>
        `;
    } else if (data.media_type == "video") {
        favoriteListVideos.innerHTML += `
        <div class="favorite-pannels" id="${dataArr.indexOf(data)}">
            <iframe src="${data.url}" alt="${data.title}" class="favorite-video" width="275" height="154.69"></iframe>
            <h2>${data.title}</h2>
            <p>${data.date}</p>
            <div class="delete"><i class="fa-solid fa-trash"></i></div>
        </div>
        `;
    };
});

// Delte items from Local Storage in Image Tab
favoriteListImages.addEventListener("click", (e) => {
    if(e.target.parentElement.classList.contains("delete")) {
        // Remove item from array
        let index = e.target.parentElement.parentElement.id;
        dataArr.splice(index, 1);

        let dataString = JSON.stringify(dataArr);
        localStorage.setItem("data", dataString);
        console.log(dataArr);
        
        // Reset the HTML 
        favoriteListImages.innerHTML = "";

        // Update the HTML
        for (let newData of dataArr) {
            // Show images in the image tab
            if (newData.media_type == "image") {
                favoriteListImages.innerHTML += `
                <div class="favorite-pannels" id="${dataArr.indexOf(newData)}">
                    <img src="${newData.url}" alt="${newData.title}" class="favorite-pic">
                    <h2>${newData.title}</h2>
                    <p>${newData.date}</p>
                    <div class="delete"><i class="fa-solid fa-trash"></i></div>
                </div>
                `;
            };
        };
    } else if (e.target.classList.contains("favorite-pic")) {
        // Show Favorite Picture in Modal
        console.log(e.target)
  
        modal.innerHTML = `<img src="${e.target.src}" alt="${e.target.alt}">`;
        modal.classList.add("show");
    };
});

//  Delte items from Local Storage in Video Tab
favoriteListVideos.addEventListener("click", (e) => {
    if(e.target.parentElement.classList.contains("delete")) {
        // Remove item from array
        let index = e.target.parentElement.parentElement.id;
        dataArr.splice(index, 1);

        let dataString = JSON.stringify(dataArr);
        localStorage.setItem("data", dataString);
        console.log(dataArr);
        
        // Reset the HTML 
        favoriteListVideos.innerHTML = "";

        // Update the HTML
        for (let newData of dataArr) {
            // Show videos in the video tab
            if (newData.media_type == "video") {
                favoriteListVideos.innerHTML += `
                <div class="favorite-pannels" id="${dataArr.indexOf(newData)}">
                    <iframe src="${newData.url}" alt="${newData.title}" class="favorite-video" width="275" height="154.69"></iframe>
                    <h2>${newData.title}</h2>
                    <p>${newData.date}</p>
                    <div class="delete"><i class="fa-solid fa-trash"></i></div>
                </div>
                `;
            };
        };
    };
});


// Show the APOD Picture in modal
modal.addEventListener("click", () => {
    modal.classList.remove("show");
});

// Change the list by selecting the image or video tag
let imageTab = document.querySelector(".image-tab");
let videoTab = document.querySelector(".video-tab");

imageTab.addEventListener("click", (e) => {
    // Prevent refreshing the page in the same page
    if (imageTab.classList.contains("active")) {
        e.preventDefault();
    } else {
        imageTab.classList.add("active");
        videoTab.classList.remove("active");
        favoriteListVideos.classList.add("collapse");
        favoriteListImages.classList.remove("collapse");
    };
});

videoTab.addEventListener("click", (e) => {
    // Prevent refreshing the page in the same page
    if (videoTab.classList.contains("active")) {
        e.preventDefault();
    } else {
        videoTab.classList.add("active");
        imageTab.classList.remove("active");
        favoriteListImages.classList.add("collapse");
        favoriteListVideos.classList.remove("collapse");
    };
});