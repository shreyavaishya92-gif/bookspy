// ------------------------------
// FAVOURITES.JS
// ------------------------------

// Helpers
function getFavourites() {
    try {
        return JSON.parse(localStorage.getItem("favourites")) || [];
    } catch {
        return [];
    }
}

function saveFavourites(favs) {
    localStorage.setItem("favourites", JSON.stringify(favs));
}

function isFavourite(id) {
    return getFavourites().some(item => item.id === id);
}

// ------------------------------
// HEART ICON UPDATE
// ------------------------------
function updateHeartIcon(btn) {
    const id = Number(btn.dataset.id);
    const icon = btn.querySelector("i");
    if (!icon) return;

    if (isFavourite(id)) {
        icon.classList.remove("ri-heart-3-line");
        icon.classList.add("ri-heart-3-fill");
        icon.style.color = "red";
    } else {
        icon.classList.remove("ri-heart-3-fill");
        icon.classList.add("ri-heart-3-line");
        icon.style.color = "";
    }
}

function updateHeartIcons() {
    document.querySelectorAll(".heart-btn").forEach(btn => updateHeartIcon(btn));
}

// ------------------------------
// ADD TO FAV BUTTON UPDATE
// ------------------------------
function updateFavButtons() {
    document.querySelectorAll(".Add-to-favourites").forEach(btn => {
        const id = Number(btn.dataset.id);

        if (isFavourite(id)) {
            btn.textContent = "Added ✓";
            btn.style.background = "#4CAF50";
        } else {
            btn.textContent = "Add to Favourites";
            btn.style.background = "";
        }
    });
}

// ------------------------------
// TOGGLE FAVOURITE
// ------------------------------
function toggleFavourite(id, bookData, btn) {
    let favs = getFavourites();
    const exists = favs.some(b => b.id === id);

    if (exists) {
        favs = favs.filter(b => b.id !== id);
    } else {
        favs.push(bookData);
    }

    saveFavourites(favs);

    updateHeartIcon(btn);
    updateFavButtons();

    // Update fav page if open
    if (document.getElementById("favourites-container")) {
        renderFavouritesPage();
    }
}

// ------------------------------
// ATTACH CLICK LISTENERS
// ------------------------------
document.addEventListener("click", (e) => {
    const heart = e.target.closest(".heart-btn");
    const addBtn = e.target.closest(".Add-to-favourites");
    const btn = heart || addBtn;
    if (!btn) return;

    const card = btn.closest(".featured__card") || btn.closest(".fav-card");
    if (!card) return;

    const id = Number(btn.dataset.id);
    const title = card.querySelector(".featured__title, .fav-title")?.innerText || "Book";
    const img = card.querySelector("img")?.src || "";

    const bookData = { id, title, image: img };

    toggleFavourite(id, bookData, btn);
});

// ------------------------------
// RENDER FAVOURITES PAGE
// ------------------------------
function renderFavouritesPage() {
    const container = document.getElementById("favourites-container");
    if (!container) return;

    const favs = getFavourites();
    container.innerHTML = "";

    if (favs.length === 0) {
        container.innerHTML = `<p style="text-align:center; font-style:italic;">You have no favourite books yet.</p>`;
        return;
    }

    favs.forEach(book => {
        const div = document.createElement("div");
        div.className = "fav-card";

        div.innerHTML = `
            <img src="${book.image}" style="width:70px; height:90px; border-radius:6px;">
            <span class="fav-title">${book.title}</span>

            <button class="remove-fav" data-id="${book.id}">
                Remove
            </button>

            <button class="heart-btn" data-id="${book.id}">
                <i class="ri-heart-3-fill" style="color:red;"></i>
            </button>
        `;

        container.appendChild(div);
    });

    document.querySelectorAll(".remove-fav").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = Number(btn.dataset.id);
            const newFavs = getFavourites().filter(b => b.id !== id);
            saveFavourites(newFavs);
            renderFavouritesPage();
            updateHeartIcons();
            updateFavButtons();
        });
    });
}

// ------------------------------
// INITIALIZATION
// ------------------------------
window.addEventListener("DOMContentLoaded", () => {
    updateHeartIcons();
    updateFavButtons();
    if (document.getElementById("favourites-container")) {
        renderFavouritesPage();
    }
});
