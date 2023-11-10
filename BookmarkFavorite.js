let bookmarkFormEl = document.getElementById("bookmarkForm");
let siteNameInputEl = document.getElementById("siteNameInput");
let siteUrlInputEl = document.getElementById("siteUrlInput");
let submitBtnEl = document.getElementById("submitBtn");
let siteNameErrMsgEl = document.getElementById("siteNameErrMsg");
let siteUrlErrMsgEl = document.getElementById("siteUrlErrMsg");
let bookmarksListEl = document.getElementById("bookmarksList");

document.addEventListener("DOMContentLoaded", function () {
    loadBookmarks();
});

siteNameInputEl.addEventListener("change", function (event) {
    if (event.target.value === "") {
        siteNameErrMsgEl.textContent = "Required*";
        siteNameErrMsgEl.style.color = "#dc3545";
    } else {
        siteNameErrMsgEl.textContent = "";
    }
});

siteUrlInputEl.addEventListener("change", function (event) {
    if (event.target.value === "") {
        siteUrlErrMsgEl.textContent = "Required*";
        siteUrlErrMsgEl.style.color = "#dc3545";
    } else {
        siteUrlErrMsgEl.textContent = "";
    }
});

submitBtnEl.addEventListener("click", function () {
    if (siteNameInputEl.value === "" && siteUrlInputEl.value === "") {
        siteNameErrMsgEl.textContent = "Required*";
        siteUrlErrMsgEl.textContent = "Required*";
        siteNameErrMsgEl.style.color = "#dc3545";
        siteUrlErrMsgEl.style.color = "#dc3545";
    } else if (siteUrlInputEl.value === "") {
        siteNameErrMsgEl.textContent = "Required*";
        siteNameErrMsgEl.style.color = "#dc3545";
    } else if (siteNameInputEl.value === "") {
        siteUrlErrMsgEl.textContent = "Required*";
        siteUrlErrMsgEl.style.color = "#dc3545";
    } else {
        saveBookmark(siteNameInputEl.value, siteUrlInputEl.value);
        renderBookmarks();
        siteNameErrMsgEl.textContent = "";
        siteUrlErrMsgEl.textContent = "";
    }
});

function saveBookmark(name, url) {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    bookmarks.push({ name: name, url: url });
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function loadBookmarks() {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    bookmarks.forEach(function (bookmark) {
        renderBookmark(bookmark);
    });
}

function renderBookmark(bookmark) {
    let spanEl = document.createElement("span");
    spanEl.classList.add("item-container", "d-flex", "flex-cloumn");
    spanEl.textContent = bookmark.name;
    bookmarksListEl.appendChild(spanEl);

    let anchorEl = document.createElement("a");
    anchorEl.href = bookmark.url;
    anchorEl.textContent = bookmark.url;
    anchorEl.style.textAlign = "center";
    anchorEl.target = "_blank";
    spanEl.appendChild(anchorEl);
}

function renderBookmarks() {
    bookmarksListEl.innerHTML = ""; 
    loadBookmarks(); 
}

bookmarkFormEl.addEventListener("submit", function (event) {
    event.preventDefault();
});
