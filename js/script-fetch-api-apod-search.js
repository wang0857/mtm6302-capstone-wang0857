
// Remind user of the processing time of fetching the API of NASA APOD
window.onload = () => alert("Please allow few seconds to load the API results.");

// Prevent page from refreshing
let searchBtn = document.querySelector(".searching-for form button");
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
});

let showResultBtn = document.querySelector(".filter-container button:nth-child(5)");
showResultBtn.addEventListener("click", (e) => {
    e.preventDefault();
});

// Search for results with search Bar
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

    let titles = document.querySelectorAll(".results .filter-panels h2");

    titles.forEach((title) => {
        let innerText = title.innerText;
        
        if (innerText.toUpperCase().indexOf(search.value.toUpperCase()) == -1) {   
            title.parentElement.style.display = "none";
        };
    });
};

displayApi();

// Get the search keywords from localStorage if applicable
let localSearchValue = localStorage.getItem("search");
if (localSearchValue) {
    search.value = localSearchValue;
};

// Search for local keywords after loading the data
// fetch("https://api.nasa.gov/planetary/apod?api_key=rhXTaNLNRvwde9HnT7xhhXBDzkVa4liNifR57gtk&start_date=2022-11-01")
// .then(() => {
//     let titles = document.querySelectorAll(".results .filter-panels h2");

//     titles.forEach((title) => {
//         let innerText = title.innerText;
        
//         if (innerText.toUpperCase().indexOf(search.value.toUpperCase()) == -1) {   
//             title.parentElement.style.display = "none";
//         };
//     });
// })
// .catch(err => console.log("You got an error: " + err));


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
// Categories filter
let selection = document.querySelector(".category-selections form select");

selection.addEventListener("change", (e) => {
    let option = e.target.value
    let descriptions = document.querySelectorAll(".results .filter-panels p:nth-child(3)");

    // Display the results after selection
    descriptions.forEach((description) => {
        let paragraph = description.innerText;
        console.log(paragraph.toUpperCase().indexOf(option.toUpperCase()));
        
        if (paragraph.toUpperCase().indexOf(option.toUpperCase()) == -1) {   
            description.parentElement.classList.toggle("collapse");
        };
    });

    // When back to default option, reload all results again.
    if (option == "Select the category") {
        results.innerHTML = "";
        displayApi();
    };
});

// Years filter
let years = document.querySelector(".years");

years.addEventListener("click", (e) => {
    // Ensure the filter function only triggered when user click checkbox
    if (e.target.classList.contains("form-check-input")) {
        if (e.target.checked) {
            let dateText = document.querySelectorAll(".results .filter-panels p:nth-child(2)");
                    
            // Display the filtered results
            dateText.forEach((date) => {
                let newDate = new Date(date.innerText);
                let year = newDate.getFullYear();

                // Show multiple results when checked multiple choices
                let checkedYears = document.querySelectorAll(".years input:checked");
                let yearArr = [];
                
                checkedYears.forEach((checkedYear) => {
                    // Store checked values in an Array
                    yearArr.push(Number(checkedYear.value));
                    
                    // If matching all the ckecked choices, show the results
                    for (let i = 0; i < yearArr.length; i++) {
                        // Hide all results first
                        date.parentElement.classList.add("collapse");

                        // Show the filtered results
                        if (yearArr.includes(year)) {    
                            date.parentElement.classList.remove("collapse");
                        };    
                    };
                });
            });
        } else {
            // Show all results if there is no checked checkbox
            let checkedYears = document.querySelectorAll(".years input:checked");
    
            if (checkedYears.length == 0 ) {
                let resultPanels = document.querySelectorAll(".results .filter-panels");
            
                resultPanels.forEach((resultPanel) => {
                    resultPanel.classList.remove("collapse");
                });
            } else {
                // Remove the results for unchecked choices
                let dateText = document.querySelectorAll(".results .filter-panels p:nth-child(2)");
                
                dateText.forEach((date) => {
                    let newDate = new Date(date.innerText);
                    let year = newDate.getFullYear();
                    let yearArr = [];
                    
                    checkedYears.forEach((checkedYear) => {
                        yearArr.push(Number(checkedYear.value));
                        
                        // If matching all the ckecked choices, show the results
                        for (let i = 0; i < yearArr.length; i++) {
                            // Hide all results first
                            date.parentElement.classList.add("collapse");

                            // Show the filtered results
                            if (yearArr.includes(year)) {    
                                date.parentElement.classList.remove("collapse");
                            };    
                        };
                    });
                });
            };
        };
    };   
});

// Months filter
let months = document.querySelector(".months");

months.addEventListener("click", (e) => {
    // Ensure the filter function only triggered when user click checkbox
    if (e.target.classList.contains("form-check-input")) {
        if (e.target.checked) {
            let dateText = document.querySelectorAll(".results .filter-panels p:nth-child(2)");
                    
            // Display the filtered results
            dateText.forEach((date) => {
                let newDate = new Date(date.innerText);
                let month = newDate.getMonth() + 1;

                // Show multiple results when checked multiple choices
                let checkedMonths = document.querySelectorAll(".months input:checked");
                let monthArr = [];
                console.log(monthArr)
                
                checkedMonths.forEach((checkedMonth) => {
                    // Store checked values in an Array
                    monthArr.push(Number(checkedMonth.value));
                    
                    // If matching all the ckecked choices, show the results
                    for (let i = 0; i < monthArr.length; i++) {
                        // Hide all results first
                        date.parentElement.classList.add("collapse");

                        // Show the filtered results
                        if (monthArr.includes(month)) {    
                            date.parentElement.classList.remove("collapse");
                        };    
                    };
                });
            });
        } else {
            // Show all results if there is no checked checkbox
            let checkedMonths = document.querySelectorAll(".months input:checked");
    
            if (checkedMonths.length == 0 ) {
                let resultPanels = document.querySelectorAll(".results .filter-panels");
            
                resultPanels.forEach((resultPanel) => {
                    resultPanel.classList.remove("collapse");
                });
            } else {
                // Remove the results for unchecked choices
                let dateText = document.querySelectorAll(".results .filter-panels p:nth-child(2)");
                
                dateText.forEach((date) => {
                    let newDate = new Date(date.innerText);
                    let month = newDate.getMonth() + 1;
                    let monthArr = [];
                    
                    checkedMonths.forEach((checkedMonth) => {
                        monthArr.push(Number(checkedMonth.value));
                        
                        // If matching all the ckecked choices, show the results
                        for (let i = 0; i < monthArr.length; i++) {
                            // Hide all results first
                            date.parentElement.classList.add("collapse");

                            // Show the filtered results
                            if (monthArr.includes(month)) {    
                                date.parentElement.classList.remove("collapse");
                            };    
                        };
                    });
                });
            };
        };
    };   
});

// Scope filter
let scopes = document.querySelector(".scopes");

scopes.addEventListener("click", (e) => {
    // Ensure the filter function only triggered when user click checkbox
    if (e.target.classList.contains("form-check-input")) {
        if (e.target.checked) {
            let titles = document.querySelectorAll(".results .filter-panels h2");

            // Display the filtered results
            titles.forEach((title) => {
                let innerText = title.innerText;

                // Show multiple results when checked multiple choices
                let checkedScopes = document.querySelectorAll(".scopes input:checked");
                let scopeArr = [];

                checkedScopes.forEach((checkedScope) => {
                    // Store checked values in an Array
                    scopeArr.push(checkedScope.value.toUpperCase());
                    
                    // If any value of an array matches all the ckecked choices, show the results
                    scopeArr.some(() => {
                        // Hide all results first
                        title.parentElement.classList.add("collapse");

                        // Show multiple ressults when checking checkboxes 
                        for (let i = 0; i < scopeArr.length; i++) {
                            // Show the filtered results
                            if (innerText.toUpperCase().match(scopeArr[i])) {  
                                title.parentElement.classList.remove("collapse");
                            };    
                        };
                    });
                });
            });
        } else {
            // Show all results if there is no checked checkbox
            let checkedScopes = document.querySelectorAll(".scopes input:checked");
    
            if (checkedScopes.length == 0 ) {
                let resultPanels = document.querySelectorAll(".results .filter-panels");
            
                resultPanels.forEach((resultPanel) => {
                    resultPanel.classList.remove("collapse");
                });
            } else {
                // Remove the results for unchecked choices
                let titles = document.querySelectorAll(".results .filter-panels h2");

                // Display the filtered results
                titles.forEach((title) => {
                    let innerText = title.innerText;
                    let scopeArr = [];

                    // Show multiple results when checked multiple choices
                    checkedScopes.forEach((checkedScope) => {
                        // Store checked values in an Array
                        scopeArr.push(checkedScope.value.toUpperCase());
                        
                        // If any value of an array matches all the ckecked choices, show the results
                        scopeArr.some(() => {
                            // Hide all results first
                            title.parentElement.classList.add("collapse");
    
                            // Show the rest of matched ressults when unchecking checkboxes 
                            for (let i = 0; i < scopeArr.length; i++) {
                                // Show the filtered results
                                if (innerText.toUpperCase().match(scopeArr[i])) { 
                                    title.parentElement.classList.remove("collapse");
                                };    
                            };
                        });
                    });
                });
            };
        };
    };   
});

// Reset Form
let resetBtn = document.querySelector(".filter-container button:nth-child(4)");
let filters = document.querySelector(".filter-container");

resetBtn.addEventListener("click", () => {
    filters.reset();
});