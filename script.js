// ---------------------------
// 1. Зберігання даних у localStorage
// ---------------------------
const systemInfo = {
    appName: navigator.appName,
    appVersion: navigator.appVersion,
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    cookieEnabled: navigator.cookieEnabled
};

localStorage.setItem("systemInfo", JSON.stringify(systemInfo));

// ---------------------------
// 2. Відображення localStorage у футері
// ---------------------------
const storageInfo = document.getElementById("storageInfo");

function showLocalStorage() {
    storageInfo.innerHTML = "";

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

        const paragraph = document.createElement("p");
        paragraph.innerHTML = `<strong>${key}:</strong> ${value}`;
        storageInfo.appendChild(paragraph);
    }
}

showLocalStorage();

// ---------------------------
// 3. Отримання коментарів із сервера
// ---------------------------
const commentsContainer = document.getElementById("comments");

// Тут ставиш свій номер у журналі
const variantNumber = 25;

fetch(`https://jsonplaceholder.typicode.com/posts/${variantNumber}/comments`)
    .then(response => response.json())
    .then(data => {
        commentsContainer.innerHTML = "";

        data.forEach(comment => {
            const commentBlock = document.createElement("div");
            commentBlock.classList.add("comment");

            commentBlock.innerHTML = `
                <h4>${comment.name}</h4>
                <p class="comment-email"><strong>Email:</strong> ${comment.email}</p>
                <p>${comment.body}</p>
            `;

            commentsContainer.appendChild(commentBlock);
        });
    })
    .catch(error => {
        commentsContainer.innerHTML = "<p>Не вдалося завантажити коментарі.</p>";
        console.error("Помилка завантаження коментарів:", error);
    });

// ---------------------------
// 4. Модальне вікно через 1 хвилину
// ---------------------------
const feedbackModal = document.getElementById("feedbackModal");
const closeModal = document.getElementById("closeModal");

// Для перевірки можеш тимчасово поставити 5000 замість 60000
setTimeout(() => {
    feedbackModal.style.display = "block";
}, 60000);

closeModal.addEventListener("click", () => {
    feedbackModal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === feedbackModal) {
        feedbackModal.style.display = "none";
    }
});

// ---------------------------
// 5. Денний / нічний режим
// ---------------------------
const themeToggle = document.getElementById("themeToggle");

function setThemeAutomatically() {
    const hour = new Date().getHours();

    if (hour >= 7 && hour < 21) {
        document.body.classList.remove("dark-theme");
        themeToggle.checked = false;
        localStorage.setItem("theme", "light");
    } else {
        document.body.classList.add("dark-theme");
        themeToggle.checked = true;
        localStorage.setItem("theme", "dark");
    }
}

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeToggle.checked = true;
} else if (savedTheme === "light") {
    document.body.classList.remove("dark-theme");
    themeToggle.checked = false;
} else {
    setThemeAutomatically();
}

themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
        document.body.classList.add("dark-theme");
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.remove("dark-theme");
        localStorage.setItem("theme", "light");
    }

    showLocalStorage();
});