
// Show the list of favorites pictures
let favoriteList = document.querySelector(".favorite-list");
let dataArr = JSON.parse(localStorage.getItem("data"));
let modal = document.querySelector(".modal");
console.log(dataArr);

// Display the favorites picture
dataArr.forEach(async (data) => {
    favoriteList.innerHTML += `
    <div class="favorite-pannels" id="${dataArr.indexOf(data)}">
        <img src="${data.url}" alt="${data.title}" class="favorite-pic">
        <h2>${data.title}</h2>
        <p>${data.date}</p>
        <div class="delete"><i class="fa-solid fa-trash"></i></div>
    </div>
    `;
});

// Delte items from Local Storage
favoriteList.addEventListener("click", (e) => {
    if(e.target.parentElement.classList.contains("delete")) {
        // Remove item from array
        let index = e.target.parentElement.parentElement.id;
        dataArr.splice(index, 1);

        let dataString = JSON.stringify(dataArr);
        localStorage.setItem("data", dataString);
        console.log(dataArr);
        
        // Reset the HTML 
        favoriteList.innerHTML = "";

        // Update the HTML
        for (let newData of dataArr) {
            favoriteList.innerHTML += `
            <div class="favorite-pannels" id="${dataArr.indexOf(newData)}">
                <img src="${newData.url}" alt="${newData.title}" class="favorite-pic">
                <h2>${newData.title}</h2>
                <p>${newData.date}</p>
                <div class="delete"><i class="fa-solid fa-trash"></i></div>
            </div>
            `;
        };
    } else if (e.target.classList.contains("favorite-pic")) {
        // Show Favorite Picture in Modal
        console.log(e.target)
  
        modal.innerHTML = `<img src="${e.target.src}" alt="${e.target.alt}">`;
        modal.classList.add("show");
    };
});

// Show the APOD Picture in modal

modal.addEventListener("click", () => {
    modal.classList.remove("show");
});