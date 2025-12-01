document.addEventListener("DOMContentLoaded", () => {

  
});

/*=============== SEARCH ===============*/
const searchButton = document.getElementById("search-button"),
      searchClose = document.getElementById("search-close"),
      searchContent = document.getElementById("search-content");

searchButton?.addEventListener("click", () => searchContent.classList.add("show-search"));
searchClose?.addEventListener("click", () => searchContent.classList.remove("show-search"));


const searchInput = document.getElementById("search-input");

// Mic speech recognition
const recognition = new webkitSpeechRecognition();
recognition.lang = "en-us";
recognition.interimResults = true;
recognition.continuous = true;
const output = document.getElementById("search-input");
document.getElementById("start-btn").onclick = () => recognition.start();
recognition.onresult = (event) => { if (searchInput) searchInput.value = event.results[event.results.length-1][0].transcript;
};
navigator.mediaDevices.getUserMedia({ audio: true });

/*=============== LOGIN ===============*/
const loginButton = document.getElementById("login-icon"),
      loginClose = document.getElementById("login-close"),
      loginContent = document.getElementById("login-content");

loginButton?.addEventListener("click", () => loginContent.classList.add("show-login"));
loginClose?.addEventListener("click", () => loginContent.classList.remove("show-login"));

/*=============== HEADER SHADOW ===============*/
const shadowHeader = () => {
    const header = document.getElementById("header");
    window.scrollY >= 30 ? header.classList.add("shadow-header") : header.classList.remove("shadow-header");
};
window.addEventListener("scroll", shadowHeader);

/*=============== EXPLORE BUTTON ===============*/
document.getElementById("explore-btn")?.addEventListener("click", () => {
    document.getElementById("featured").scrollIntoView({ behavior: "smooth" });
});

/*=============== DROPDOWNS ===============*/
const authorBtn = document.getElementById("author-btn");
const authorList = document.getElementById("author-list");
const genreBtn = document.getElementById("genre-btn");
const genreList = document.getElementById("genre-list");

authorBtn.addEventListener("click", () => authorList.style.display = authorList.style.display === "block" ? "none" : "block");
authorList.querySelectorAll("li").forEach(li => li.addEventListener("click", () => {
    authorBtn.dataset.value = li.innerText;
    authorBtn.innerHTML = `${li.innerText} <i class="ri-arrow-down-s-line"></i>`;
    authorList.style.display = "none";
    fetchAndDisplayBooks();
}));

genreBtn.addEventListener("click", () => genreList.style.display = genreList.style.display === "block" ? "none" : "block");
genreList.querySelectorAll("li").forEach(li => li.addEventListener("click", () => {
    genreBtn.dataset.value = li.innerText;
    genreBtn.innerHTML = `${li.innerText} <i class="ri-arrow-down-s-line"></i>`;
    genreList.style.display = "none";
    fetchAndDisplayBooks();
}));
document.addEventListener("click", (e) => {
    if (!authorBtn.contains(e.target) && !authorList.contains(e.target)) {
        authorList.style.display = "none";
    }
    if (!genreBtn.contains(e.target) && !genreList.contains(e.target)) {
        genreList.style.display = "none";
    }
});








/*=============== FETCH & DISPLAY BOOKS ===============*/

function fetchAndDisplayBooks() {
    const author = authorBtn.dataset.value?.toLowerCase() || "";
    const genre = genreBtn.dataset.value?.toLowerCase() || "";
    

    const filteredBooks = books.filter(book => {
        const matchAuthor = author ? book.author.toLowerCase().includes(author) : true;
        const matchGenre = genre ? book.genre.toLowerCase().includes(genre) : true;
       

        return matchAuthor && matchGenre;
    });

    displayDropdownFilteredBooks(filteredBooks);
}

function displayDropdownFilteredBooks(booksArray) {
    const container = document.getElementById("dropdown-books-container");
    if (!container) return;

    container.innerHTML = "";

    if (booksArray.length === 0) {
        container.innerHTML = `<p style="text-align:center; font-style:italic;">No books found</p>`;
        return;
    }

    booksArray.forEach(book => {
        const card = document.createElement("div");
        card.className = "filter-book-card";

        card.innerHTML = `
        <img src="${book.image}" alt="${book.title}" class="featured__img">
        <h3 class="filter-book-title">${book.title}</h3>
        <p class="filter-book-author">${book.author}</p>
        <button class="view-btn" data-id="${book.id}">View Details</button>
        <button class="heart-btn" data-id="${book.id}">
            <i class="ri-heart-3-line"></i>
        </button>
    `;

        container.appendChild(card);

        
    });

    // AFTER RENDER — update heart icons
    updateHeartIcons();

    // Scroll reveal (optional)
    ScrollReveal().reveal(".scroll-reveal", {
        origin: "bottom",
        distance: "20px",
        duration: 800,
        delay: 100,
        opacity: 0,
        interval: 1000
    });
}



/*=============== THEME TOGGLE ===============*/
const themeButton = document.getElementById("theme-button"),
      darkTheme = "dark-theme",
      iconTheme = "ri-sun-line";

const selectedTheme = localStorage.getItem("selected-theme"),
      selectedIcon = localStorage.getItem("selected-icon");

if(selectedTheme){
    document.body.classList[selectedTheme === "dark" ? "add":"remove"](darkTheme);
    themeButton.classList[selectedIcon === "ri-moon-line" ? "add":"remove"](iconTheme);
}

themeButton.addEventListener("click", () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem("selected-theme", document.body.classList.contains(darkTheme) ? "dark":"light");
    localStorage.setItem("selected-icon", themeButton.classList.contains(iconTheme) ? "ri-sun-line":"ri-moon-line");
});

/*=============== SCROLL UP ===============*/
const scrollUp = () => {
    const scroll = document.getElementById("scroll-up");
    window.scrollY >= 350 ? scroll.classList.add("show-scroll") : scroll.classList.remove("show-scroll");
};
window.addEventListener("scroll", scrollUp);

/*=============== SWIPERS ===============*/
new Swiper(".home__swiper", { loop:true, spaceBetween:-5, grabCursor:true, slidesPerView:"auto", centeredSlides:"auto", autoplay:{delay:3000}, breakpoints:{1220:{spaceBetween:-32}} });

new Swiper(".featured__swiper", { loop:true, spaceBetween:16, grabCursor:true, slidesPerView:"auto", navigation:{prevEl:".swiper-button-prev",nextEl:".swiper-button-next"} });

new Swiper(".new__swiper", { loop:true, spaceBetween:16, slidesPerView:4, autoplay:{delay:3000} });

new Swiper(".testimonial__swiper", { loop:true, spaceBetween:16, slidesPerView:"auto", navigation:{prevEl:".swiper-button-prev",nextEl:".swiper-button-next"} });

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute("id"),
              link = document.querySelector(".nav__menu a[href*=" + sectionId + "]");
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) link.classList.add("active-link");
        else link.classList.remove("active-link");
    });
});

/*=============== SCROLL REVEAL ===============*/
ScrollReveal().reveal(".home__data, .home__images, .featured__container, .new__container, .testimonial__container, footer", {
    origin:"top", distance:"60px", duration:1000, delay:400, reset:true
});
new Swiper(".featured__container", {
    slidesPerView: "auto",
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    navigation: {
        nextEl: ".custom-swiper-button-next",
        prevEl: ".custom-swiper-button-prev"
    }
    
});

// ---------- FAVOURITES SYSTEM ----------

// Step 1: Book Database
const books = [
    { 
        id: 1, 
        title: "Classroom of the Elite", 
        image: "img/home1.png", 
        author: "Syogo Kinugasa", 
        genre: "Drama", 
        summary: "In a prestigious high school where students are ranked strictly by merit, Kiyotaka Ayanokoji is a quiet, unassuming student who hides extraordinary talents. As he navigates the ruthless social hierarchy, he uses his intelligence and strategic thinking to manipulate outcomes behind the scenes. Amid competitions, alliances, and betrayals, Kiyotaka’s true abilities remain hidden from both friends and foes. Can you unravel the layers of his mysterious persona before the other students do?" 
    },
    { 
        id: 2, 
        title: "Bunny Girl Senpai❤️", 
        image: "img/featured.png", 
        author: "Hajime Kamoshida", 
        genre: "Romance", 
        summary: "Sakuta Ayuzawa, a high school student, notices a girl in a bunny costume in the library who seems invisible to everyone else. As he helps her navigate the struggles of being overlooked, he discovers the hidden pains and joys of adolescence, the vulnerability of first love, and the importance of being truly seen. Will Sakuta and the mysterious girl manage to break the barriers of invisibility and connect in a world that refuses to notice them?" 
    },
    { 
        id: 3, 
        title: "Eminence in Shadow", 
        image: "img/featured1.png", 
        author: "Dustin Thao", 
        genre: "Fantasy", 
        summary: "A young boy dreams of becoming a master strategist working from the shadows. He creates a secret organization to battle imagined evils, only to find himself drawn into real conspiracies that exceed his wildest expectations. Between scheming in secret and facing true threats, he must balance illusion and reality. Can he maintain his identity as the mastermind in the shadows while confronting dangers he never imagined?" 
    },
    { 
        id: 4, 
        title: "Solo Leveling vol.3", 
        image: "img/featured3.png", 
        author: "Chugong", 
        genre: "Fantasy", 
        summary: "Sung Jin-Woo, the weakest of all hunters, survives a deadly dungeon that awakens his unique ability to level up independently. As he gains incredible strength, he battles monsters, navigates guild politics, and uncovers mysteries about the world of hunters. How far can Sung Jin-Woo push his limits, and what hidden secrets lie in the dungeons waiting to test him?" 
    },
    { 
        id: 5, 
        title: "It Ends With Us", 
        image: "img/home3.png", 
        author: "Colleen Hoover", 
        genre: "Romance", 
        summary: "Lily finds herself torn between love and painful memories of abuse as she falls for Ryle, a charming neurosurgeon. While confronting her past and lessons from her first love, she must make difficult decisions about her future and her heart. Will Lily find the strength to break free from patterns of the past and embrace the love she deserves?" 
    },
    { 
        id: 6, 
        title: "Atomic Habit", 
        image: "img/featured4.jpg", 
        author: "James Clear", 
        genre: "Motivation", 
        summary: "This book explores the power of small, consistent habits and how they compound over time to produce remarkable results. Through practical strategies and real-life examples, readers learn how to build effective routines, break bad habits, and achieve lasting personal growth. Which tiny habit could you change today that might completely transform your life over time?" 
    },
    { 
        id: 7, 
        title: "Power - The 48 Laws of Power", 
        image: "img/home4.png", 
        author: "Robert Greene", 
        genre: "Motivation", 
        summary: "A guide to understanding, gaining, and defending against power, this book draws lessons from historical figures to reveal strategies for social influence. It teaches how to navigate complex social dynamics, anticipate others’ moves, and act strategically. Which law of power could you apply today to subtly change the way people perceive you?" 
    },
    { 
        id: 8, 
        title: "Oshi No Ko Vol.3", 
        image: "img/featured6.png", 
        author: "Aka Akasaka", 
        genre: "Drama", 
        summary: "Following the hidden struggles of idols behind their glamorous appearances, this volume uncovers ambition, betrayal, and personal challenges in the entertainment world. Secrets and rivalries threaten to surface, changing the lives of the characters forever. Who will survive the harsh realities behind the glittering facade, and what secrets are still waiting to be revealed?" 
    },
    { 
        id: 9, 
        title: "Classroom of the Elite vol.11.5", 
        image: "img/featured7.png", 
        author: "Syogo Kinugasa", 
        genre: "Drama", 
        summary: "This special side story explores personal interactions and hidden motives among Kiyotaka and his classmates that were not fully revealed in the main series. It delves deeper into the psychology, strategies, and conflicts of the students. Which hidden motives will come to light, and how will they change the balance of power among the elite students?" 
    },
    { 
        id: 10, 
        title: "You've Reached Sam", 
        image: "img/featured5.png", 
        author: "Dustin Thao", 
        genre: "Romance", 
        summary: "Grieving the loss of a loved one, Sam discovers love and healing through heartfelt messages and connections that open his heart again. The story emphasizes the power of communication and emotional understanding. Can Sam overcome his grief and truly open himself to love once more?" 
    },
    { 
        id: 11, 
        title: "It Starts With Us", 
        image: "img/home2.png", 
        author: "Colleen Hoover", 
        genre: "Romance", 
        summary: "A continuation of 'It Ends With Us,' this book follows Lily and Ryle as they navigate the complexities of love, forgiveness, and building a future together. Their journey is full of challenges, growth, and heartfelt moments. Will Lily and Ryle overcome past scars and create the life they both dream of?" 
    }
];




// ---------- FAVOURITES SYSTEM ----------

// Helpers
function getFavourites() {
    return JSON.parse(localStorage.getItem("favourites")) || [];
}

function saveFavourites(favs) {
    localStorage.setItem("favourites", JSON.stringify(favs));
}

function isFavourite(id) {
    return getFavourites().some(b => b.id === id);
}

// Toggle favourite (adds/removes)
function toggleFavouriteById(id, bookData, btn) {
    let favs = getFavourites();
    const index = favs.findIndex(b => b.id === id);

    if (index > -1) {
        favs.splice(index, 1); // remove
    } else {
        favs.push(bookData); // add
    }

    saveFavourites(favs);
    updateHeartIcon(btn);   // update only clicked button
    updateFavButtons();     // this can still update “Add-to-favourites” buttons if needed
    if (isFavouritesPage) renderFavouritesPage();
}


function updateHeartIcon(btn) {
    const id = Number(btn.dataset.id);
    const icon = btn.querySelector("i");
    if (!icon) return;

    if (isFavourite(id)) {
        btn.classList.add("active");
        icon.classList.remove("ri-heart-3-line");
        icon.classList.add("ri-heart-3-fill");
        icon.style.color = "red";
    } else {
        btn.classList.remove("active");
        icon.classList.remove("ri-heart-3-fill");
        icon.classList.add("ri-heart-3-line");
        icon.style.color = "";
    }
}

// Update all heart buttons on the page to reflect localStorage favourites 
function updateHeartIcons() {
    document.querySelectorAll(".heart-btn").forEach(btn => {
        if (!btn.dataset || !btn.dataset.id) return;
        updateHeartIcon(btn);
    });
}


// Update "Add to Favourites" buttons if present
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
// Updated attachFavListeners function
function attachFavListeners() {
    // Use delegation so it works even if cards are rendered later
    document.addEventListener("click", (e) => {
        const heart = e.target.closest(".heart-btn");
        const addBtn = e.target.closest(".Add-to-favourites");
        const btn = heart || addBtn;
        if (!btn) return;

        // find the card (try several possible class names)
        const card = btn.closest(".featured__card") || btn.closest(".filter-book-card") || btn.closest(".fav-card");
        if (!card) {
            console.warn("attachFavListeners: could not find card for button", btn);
            return;
        }

        const id = Number(btn.dataset.id);
        if (!id) {
            console.warn("attachFavListeners: button missing data-id", btn);
            return;
        }

        // Build bookData with safe fallbacks
        const titleEl = card.querySelector(".featured__title") || card.querySelector(".filter-book-title") || card.querySelector(".fav-title") || card.querySelector("h3") || card.querySelector("h2");
        const imgEl = card.querySelector(".featured__img") || card.querySelector("img");

        const bookData = {
            id: id,
            title: titleEl ? titleEl.innerText.trim() : ("Book " + id),
            image: imgEl ? (imgEl.src || imgEl.getAttribute("src")) : ""
        };

        // Toggle favourite
        toggleFavouriteById(bookData.id, bookData, btn);
    });
}

// Render Favourites page
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
            <img src="${book.image}" alt="${book.title}" style="width:70px; height:90px; border-radius:6px;">
            <span class="fav-title">${book.title}</span>
            <button class="remove-fav button" data-id="${book.id}">Remove</button>
            <button class="heart-btn" data-id="${book.id}">
                <i class="ri-heart-3-fill" style="color:red;"></i>
            </button>
        `;
        container.appendChild(div);
    });

    // Remove buttons
    document.querySelectorAll(".remove-fav").forEach(btn => {
        btn.onclick = () => {
            const id = Number(btn.dataset.id);
            const favs = getFavourites().filter(b => b.id !== id);
            saveFavourites(favs);
            renderFavouritesPage();
            updateHeartIcons();
            updateFavButtons();
        };
    });
}
// ---------- VIEW DETAILS (redirect to new page) ----------
document.addEventListener("click", (e) => {
    const btn = e.target.closest(".view-btn");
    if (!btn) return;

    const id = Number(btn.dataset.id);
    const book = books.find(b => b.id === id);
    if (!book) return alert("Book not found!");

    showBookPopup(book);
});


document.addEventListener("DOMContentLoaded", () => {
    fetchAndDisplayBooks(); // <-- show all books initially
    attachFavListeners();
});

// Login Button Functionality
document.getElementById("login-btn").addEventListener("click", () => {
    let email = document.getElementById("login-email").value.trim();
    let password = document.getElementById("login-password").value.trim();
    let popup = document.getElementById("login-success");

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        alert("Email cannot be empty.");
        return;
    }
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email.");
        return;
    }

    // Password validation
    if (password === "") {
        alert("Password cannot be empty.");
        return;
    }

    // Success Popup
    popup.style.display = "block";

    setTimeout(() => {
        popup.style.display = "none";
    }, 2000);
});

/* ===== AUTH (login/signup/forgot) JS ===== */

// Utility - show success message
function showSuccess(msg, time = 1800) {
  const s = document.getElementById("auth-success");
  s.textContent = msg;
  s.classList.add("show");
  setTimeout(() => s.classList.remove("show"), time);
}

// Simple email validation
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// LocalStorage helpers for "users" (array of {email, password})
function getUsers() {
  try {
    return JSON.parse(localStorage.getItem("users")) || [];
  } catch (e) { return []; }
}
function saveUsers(users) { localStorage.setItem("users", JSON.stringify(users)); }

// DOM elements
const loginIcon = document.getElementById("login-icon") || document.getElementById("login-button");
const loginOverlay = document.getElementById("login-content");
const loginCloseBtn = document.getElementById("login-close");

// Forms and buttons
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const forgotForm = document.getElementById("forgot-form");

const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginBtn = document.getElementById("login-btn");

const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");
const signupConfirm = document.getElementById("signup-confirm");
const signupBtn = document.getElementById("signup-btn");

const forgotEmail = document.getElementById("forgot-email");
const forgotPassword = document.getElementById("forgot-password");
const forgotConfirm = document.getElementById("forgot-confirm");
const forgotBtn = document.getElementById("forgot-btn");

// Links
const openSignup = document.getElementById("open-signup");
const openForgot = document.getElementById("open-forgot");
const backFromSignup = document.getElementById("back-to-login-from-signup");
const backFromForgot = document.getElementById("back-to-login-from-forgot");

// Toggle overlay visibility
function openAuthOverlay() {
  loginOverlay.classList.add("show");
  // default to login form
  showLoginForm();
}
function closeAuthOverlay() {
  loginOverlay.classList.remove("show");
}
if (loginIcon) loginIcon.addEventListener("click", (e) => { e.preventDefault(); openAuthOverlay(); });
if (loginCloseBtn) loginCloseBtn.addEventListener("click", (e) => { e.preventDefault(); closeAuthOverlay(); });

// Switchers
function showLoginForm() {
  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
  forgotForm.classList.add("hidden");
}
function showSignupForm() {
  loginForm.classList.add("hidden");
  signupForm.classList.remove("hidden");
  forgotForm.classList.add("hidden");
}
function showForgotForm() {
  loginForm.classList.add("hidden");
  signupForm.classList.add("hidden");
  forgotForm.classList.remove("hidden");
}

openSignup?.addEventListener("click", (e) => { e.preventDefault(); showSignupForm(); });
openForgot?.addEventListener("click", (e) => { e.preventDefault(); showForgotForm(); });
backFromSignup?.addEventListener("click", (e) => { e.preventDefault(); showLoginForm(); });
backFromForgot?.addEventListener("click", (e) => { e.preventDefault(); showLoginForm(); });

// Eye toggle behavior for any .toggle-eye icon around an input
function setupEyeToggle(eyeId, inputEl) {
  const eye = document.getElementById(eyeId);
  if (!eye || !inputEl) return;
  eye.addEventListener("click", () => {
    if (inputEl.type === "password") {
      inputEl.type = "text";
      eye.classList.remove("ri-eye-off-line");
      eye.classList.add("ri-eye-line");
    } else {
      inputEl.type = "password";
      eye.classList.remove("ri-eye-line");
      eye.classList.add("ri-eye-off-line");
    }
  });
}

// Setup all eye toggles
setupEyeToggle("login-toggle-eye", loginPassword);
setupEyeToggle("signup-toggle-eye", signupPassword);
setupEyeToggle("signup-confirm-eye", signupConfirm);
setupEyeToggle("forgot-toggle-eye", forgotPassword);
setupEyeToggle("forgot-confirm-eye", forgotConfirm);

// SIGNUP action
signupBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  const email = (signupEmail.value || "").trim();
  const pw = (signupPassword.value || "").trim();
  const confirm = (signupConfirm.value || "").trim();

  if (!isValidEmail(email)) { alert("Please enter a valid email."); return; }
  if (!pw) { alert("Password cannot be empty."); return; }
  if (pw !== confirm) { alert("Passwords do not match."); return; }

  // Save user
  const users = getUsers();
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    showSuccess("Email already exists. Please log in.", 2500);
    return;
}

  users.push({ email: email.toLowerCase(), password: pw });
  saveUsers(users);

  showSuccess("Signup Successful!");
  // Clear signup inputs
  signupEmail.value = signupPassword.value = signupConfirm.value = "";
  // Switch to login after short delay
  setTimeout(() => { showLoginForm(); loginEmail.value = email; loginPassword.focus(); }, 700);
});

// LOGIN action
loginBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  const email = (loginEmail.value || "").trim();
  const pw = (loginPassword.value || "").trim();

  if (!isValidEmail(email)) { alert("Please enter a valid email."); return; }
  if (!pw) { alert("Password cannot be empty."); return; }

  const users = getUsers();
  const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!found || found.password !== pw) {
    showSuccess("Invalid credentials", 2000);
    return;
}


  showSuccess("Login Successfully!");
  // Clear password field
  loginPassword.value = "";
  // Optionally close overlay after delay
  setTimeout(() => closeAuthOverlay(), 900);
});

// FORGOT / Update Password action
forgotBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  const email = (forgotEmail.value || "").trim();
  const pw = (forgotPassword.value || "").trim();
  const confirm = (forgotConfirm.value || "").trim();

  if (!isValidEmail(email)) { alert("Please enter a valid email."); return; }
  if (!pw) { alert("Password cannot be empty."); return; }
  if (pw !== confirm) { alert("Passwords do not match."); return; }

  const users = getUsers();
  const idx = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  if (idx === -1) {
    showSuccess("No account found with that email.", 2000);
    return;
}


  users[idx].password = pw;
  saveUsers(users);
  showSuccess("Password Updated Successfully!");
  // clear forgot form
  forgotEmail.value = forgotPassword.value = forgotConfirm.value = "";
  setTimeout(() => showLoginForm(), 900);
});

// On overlay click outside card close (optional)
loginOverlay.addEventListener("click", (e) => {
  if (e.target === loginOverlay) closeAuthOverlay();
});

// init: ensure correct state
showLoginForm();
updateHeartIcons?.(); // optional no-op if not defined elsewhere
loginOverlay.classList.remove("show");

const joinForm = document.querySelector('.join__form');
const joinInput = document.querySelector('.join__input');

if (joinForm) {
    joinForm.addEventListener('submit', function(e) {
        e.preventDefault(); // prevent actual form submit

        const email = joinInput.value.trim();

        // Simple validation
        if (email === "" || !email.includes("@")) {
            alert("Please enter a valid email!");
            return;
        }

        // Create popup
        const popup = document.createElement('div');
        popup.textContent = "Thanks for Subscribing!";
        popup.style.position = 'fixed';
        popup.style.top = '20px';
        popup.style.left = '50%';
        popup.style.transform = 'translateX(-50%)';
        popup.style.background = '#2ecc71';
        popup.style.color = 'white';
        popup.style.padding = '12px 20px';
        popup.style.borderRadius = '6px';
        popup.style.fontWeight = '600';
        popup.style.zIndex = '9999';
        popup.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
        document.body.appendChild(popup);

        // Remove popup after 3 seconds
        setTimeout(() => popup.remove(), 3000);

        // Clear input
        joinInput.value = "";
    });
}
// Auto-update favourites page when localStorage changes (useful if favourites.html is open in another tab)

/*=============== SEARCH FILTERING (SEPARATE SYSTEM) ===============*/
const searchResults = document.getElementById("search-results");

searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    searchResults.innerHTML = "";

    if (!query) return;

    const filtered = books.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.genre.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
        searchResults.innerHTML = `<p style="text-align:center;font-style:italic;">No books found</p>`;
        return;
    }

    filtered.forEach(book => {
        const card = document.createElement("div");
        card.className = "filter-book-card";

        card.innerHTML = `
        <img src="${book.image}" alt="${book.title}" class="featured__img">
        <h3 class="filter-book-title">${book.title}</h3>
        <p class="filter-book-author">${book.author}</p>
        <button class="view-btn" data-id="${book.id}">View Details</button>
        <button class="heart-btn" data-id="${book.id}">
            <i class="ri-heart-3-line"></i>
        </button>
    `;

        searchResults.appendChild(card);

       

        card.querySelector(".heart-btn").addEventListener("click", (e) => {
            toggleFavouriteById(book.id, book, e.currentTarget);
        });
    });

    updateHeartIcons();
});


window.addEventListener("storage", (e) => {
    if (e.key === "favourites" && isFavouritesPage ) {
       
            renderFavouritesPage();
        }
    }
);

const popup = document.getElementById("book-popup");
const popupClose = document.getElementById("popup-close");
const popupImage = document.getElementById("popup-image");
const popupTitle = document.getElementById("popup-title");
const popupAuthor = document.getElementById("popup-author");
const popupSummary = document.getElementById("popup-summary");

function showBookPopup(book) {
    popupImage.src = book.image || "";
    popupImage.alt = book.title || "Book";
    popupTitle.textContent = book.title || "no title";
    popupAuthor.textContent = book.author || "unknown author";
    popupSummary.textContent = book.summary || "No summary available";

    popup.style.display = "flex";
}

popupClose.addEventListener("click", () => {
    popup.style.display = "none";
});

popup.addEventListener("click", (e) => {
    if (e.target === popup) popup.style.display = "none";
});

document.addEventListener("click", (e) => {
    const btn = e.target.closest(".view-btn");
    if (!btn) return;

    const id = Number(btn.dataset.id);
    const card = btn.closest(".filter-book-card") || btn.closest(".featured__card") || btn.closest(".fav-card");
    if (!card) return;

    // Build book data safely from card
    const bookData = {
        id: id,
        title: card.querySelector(".filter-book-title")?.innerText ||
               card.querySelector(".featured__title")?.innerText ||
               card.querySelector(".fav-title")?.innerText || "No Title",
        author: card.querySelector(".filter-book-author")?.innerText ||
                card.querySelector(".featured__author")?.innerText || "Unknown Author",
        image: card.querySelector("img")?.src || "",
        summary: books.find(b => b.id === id)?.summary || "No summary available"
    };

    showBookPopup(bookData);
});


/*=============== THOUGHTS FORM ===============*/
const thoughtsForm = document.getElementById("thoughts-form");
const toast = document.getElementById("toast");

if (thoughtsForm) {
    thoughtsForm.addEventListener("submit", (e) => {
        e.preventDefault(); // prevent page reload

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const thoughts = document.getElementById("thoughts").value.trim();

        if (!name || !email || !thoughts) {
            alert("Please fill in all fields.");
            return;
        }

        // Show toast message
        toast.classList.add("show-toast");
        setTimeout(() => toast.classList.remove("show-toast"), 3000);

        // Clear form
        thoughtsForm.reset();
    });
}


/*=============== STAR RATING (CLICK TO TOGGLE) ===============*/
const stars = document.querySelectorAll(".star");
const ratingInput = document.getElementById("rating");

stars.forEach(star => {
    star.addEventListener("click", () => {
        const value = Number(star.getAttribute("data-value"));
        const currentRating = Number(ratingInput.value);

        // If clicking the same selected star → reset rating
        if (value === currentRating) {
            ratingInput.value = 0;

            // Remove all filled stars
            stars.forEach(s => s.classList.remove("filled"));
            return;
        }

        // Otherwise set a new rating
        ratingInput.value = value;

        stars.forEach(s => {
            if (Number(s.getAttribute("data-value")) <= value) {
                s.classList.add("filled");
            } else {
                s.classList.remove("filled");
            }
        });
    });
});
// Select modal + elements
const modal = document.getElementById("bookModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalAuthor = document.getElementById("modalAuthor");
const modalSummary = document.getElementById("modalSummary");
const closeBtn = document.querySelector(".close");

// All book cards
const cards = document.querySelectorAll(".new__card");

// When card is clicked → open modal
cards.forEach(card => {
    card.addEventListener("click", (e) => {
        e.preventDefault();

        modal.style.display = "flex";

        modalImg.src = card.dataset.img;
        modalTitle.textContent = card.dataset.title;
        modalAuthor.textContent = "Author: " + card.dataset.author;
        modalSummary.textContent = card.dataset.summary;
    });
});

// Close modal
closeBtn.onclick = () => modal.style.display = "none";
modal.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };
