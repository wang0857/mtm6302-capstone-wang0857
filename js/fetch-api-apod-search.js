
// TODO: Fetch NASA's APOD API for Searching page

// Prevent page from refreshing
let searchBtn = document.querySelector(".searching-for form button");
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
});

// Search Bar Function
// Search the data with search bar
let search = document.querySelector('.searching-for form input[type="search"]');
let results = document.querySelector(".results");

// Display all results before typing keywords
async function displayApi() {
    const response = await fetch("https://api.nasa.gov/planetary/apod?api_key=rhXTaNLNRvwde9HnT7xhhXBDzkVa4liNifR57gtk&start_date=2022-11-01");
    const data = await response.json();

    for (result of data) {
        let date = new Date(result.date);
        let localeDate = date.toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric"});
        let shortText = result.explanation.slice(0, 300);

        results.innerHTML += `
        <div class="filter-panels">
            <h2>${result.title}</h2>
            <p>${localeDate}</p>
            <p>${shortText} ......</p>
        </div>
        `;
    };
};

displayApi();

// Show results after typing keywords
search.addEventListener("keyup", (e) => {
    let text = e.target.value;
    let titles = document.querySelectorAll(".results .filter-panels h2");

    // Delay the search function to avoid duplicated results
    setTimeout(() => {
        titles.forEach((title) => {
            let innerText = title.innerText;
            
            if (innerText.toUpperCase().indexOf(text.toUpperCase()) == -1) {   
                title.parentElement.style.display = "none";
            };
        });
    }, 1500);

    // When deleting the keyword, reload all results again.
    if (text == "") {
        results.innerHTML = "";
        displayApi();
    };
});

// TODO: Filter Function
// Filter the results with the selection of categories
let selection = document.querySelector(".category-selections form select");

selection.addEventListener("change", (e) => {
    let option = e.target.value
    let descriptions = document.querySelectorAll(".results .filter-panels p:nth-child(3)");

    // Delay the search function to avoid duplicated results
    setTimeout(() => {
        descriptions.forEach((description) => {
            let paragraph = description.innerText;
            console.log(paragraph.toUpperCase().indexOf(option.toUpperCase()));
            
            if (paragraph.toUpperCase().indexOf(option.toUpperCase()) == -1) {   
                description.parentElement.style.display = "none";
            };
        });
    }, 1500);

    // When deleting the keyword, reload all results again.
    if (option == "Select the category") {
        results.innerHTML = "";
        displayApi();
    };
});

// TODO: Filter the results with year
// TODO: Filter the results with month
// TODO: Filter the results with scope