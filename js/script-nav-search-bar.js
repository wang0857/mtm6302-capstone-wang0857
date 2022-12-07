
// Search bar send value to search page
let searchBtn = document.querySelector("nav .search .search-btn");
let searchInput = document.querySelector("nav .search .search-bar");

// Click button to send value
searchBtn.addEventListener("click", (e) => {
    // Prevent page from refreshing;
    e.preventDefault();

    // Store value in local storage
    let seachBarValue = searchInput.value;
    localStorage.clear();
    localStorage.setItem("search", seachBarValue);

    // Go to Search page
    window.location.href="./search.html"; 
});

// Press 'Enter' to send Value
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();

        // Store value in local storage
        let seachBarValue = searchInput.value;
        localStorage.clear();
        localStorage.setItem("search", seachBarValue);
        
        // Trigger the function of search button
        searchBtn.click();
    };
});