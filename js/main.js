
// Collapse the sidebar
let sidebar = document.querySelector("aside");
let collapseBtn = document.querySelector(".collapse-btn");
let btnArrow = document.querySelector(".collapse-btn i");
let sidebarItems = document.querySelectorAll(".side-nav li a span");
let appHeader = document.querySelector(".app-header");
let appBtns = document.querySelectorAll(".download-btn");
let appItems = document.querySelectorAll(".download-btn span");

collapseBtn.addEventListener("click", () => {
    // Sidebar width
    sidebar.classList.toggle("collapsed-sidebar")
    sidebarItems.forEach((item) => {
        item.classList.toggle("collapse");
    });

    // Buttons to download apps
    appBtns.forEach((btn) => {
        btn.classList.toggle("width-auto");
    });
    appHeader.classList.toggle("collapse");
    appItems.forEach((item) => {
        item.classList.toggle("collapse");
    });

    // Collapse button
    btnArrow.classList.toggle("flip");
});

// Submit the files
let dropbox = document.querySelector(".file-container");
let uploadIcons = document.querySelectorAll(".file-container i");
let inputFile = document.querySelector("#fileUploader");

// Hanle files
function handleFiles(files) {
    files = [...files];
    files.forEach(uploadFile);
    files.forEach(previewFile);
};
  

// Upload files
function uploadFile(file) {
    let formData = new FormData();
    formData.append('file', file);
};

// Preview Images
function previewFile(file) {
    if (file.type.match("image.*")){
        // Get the file's data
        let reader = new FileReader();
        reader.readAsDataURL(file);

        // Preview the image after loaded
        reader.onloadend = function() {
            // Create an img object
            let img = document.createElement('img');
            img.src = reader.result;
            img.className = "uploaded-img";

            // Manipulate the image node with its properties
            dropbox.innerHTML = `<img src="${img.src}" alt="uploaded image" class="${img.className}">`;
        };
    } else {
        alert("Failed to upload image. Check your file type again.")
    };
};

// Active style when dragding files
dropbox.addEventListener("dragenter", () => {
    dropbox.classList.add("file-container-active");
});
dropbox.addEventListener("dragleave", () => {
    dropbox.classList.remove("file-container-active");
});
dropbox.addEventListener("dragover", (e) => {
    // Avoid pop-up image
    e.preventDefault();
    dropbox.classList.add("file-container-active");
});

// Show the image after dropping the image
dropbox.addEventListener("drop", (e) => {
    // Avoid pop-up image
    e.preventDefault();
    
    dropbox.classList.remove("file-container-active");
    uploadIcons.forEach((icon) => {
        icon.classList.add("collapse");
    }); 

    // Show the image
    let dt = e.dataTransfer;
    let files = dt.files;
    handleFiles(files);
});

// Upload the file by clicking the file container
dropbox.addEventListener("click", (e) => {
    if (e.target.parentElement.classList.value == "submission-container") {
        inputFile.click();

        // Show the image
        inputFile.addEventListener("change", (e) => {
            handleFiles(e.srcElement.files);
        });
    };
})

// Upload the file by clicking on the icons
uploadIcons.forEach((icon) => {
    icon.addEventListener("click", (e) => {
        if (e.target.parentElement.classList.value == "file-container") {
            inputFile.click();

            // Show the image
            inputFile.addEventListener("change", (e) => {
                handleFiles(e.srcElement.files);
            });
        };
    });
});

// Prevent page from refreshing after submitting
let submit = document.querySelector('.form-container button[type="submit"]');
submit.addEventListener("click", (e) => {
    e.preventDefault();
});