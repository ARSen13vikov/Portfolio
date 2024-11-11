document.addEventListener("DOMContentLoaded", () => {
    loadTheme();
    loadArticles();
    
    const themeToggleCheckbox = document.getElementById("theme-toggle");
    themeToggleCheckbox.addEventListener("change", toggleTheme);
    
    document.getElementById("sort-select").addEventListener("change", handleSort);
});

async function loadArticles() {
    const response = await fetch("articles.json");
    const data = await response.json();
    articles = data.articles; // Global array to store articles data

    displayMostPopular(articles);
    displayArticles(articles);
}

function displayMostPopular(articles) {
    // Find the most popular article based on view counts
    const mostPopular = articles.reduce((prev, current) => (prev.views > current.views ? prev : current));

    // Update the most popular article section
    document.getElementById("most-popular").innerHTML = `
        <h5>Most Popular Article</h5>
        <h6>${mostPopular.title}</h6>
        <p>${mostPopular.date} - ${mostPopular.views} views</p>
        <p>Estimated read: ${Math.ceil(mostPopular.wordCount / 200)} min</p>
    `;
}

function displayArticles(articles) {
    const container = document.getElementById("articles-container");
    container.innerHTML = ''; // Clear the previous articles
    articles.forEach(article => {
        container.innerHTML += `
            <div class="col-12 col-md-6 mb-4">
                <div class="card p-3">
                    <h5>${article.title}</h5>
                    <p>${article.date} | ${article.views} views</p>
                    <p>Estimated read: ${Math.ceil(article.wordCount / 200)} min</p>
                    <p>${article.content.substring(0, 100)}...</p>
                    <button class="btn btn-primary" onclick="viewArticle('${article.title}')">Read More</button>
                </div>
            </div>
        `;
    });
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
}

function loadTheme() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        document.getElementById("theme-toggle").checked = true;
    }
}

function handleSort() {
    const sortBy = document.getElementById("sort-select").value;
    if (sortBy === "views") {
        articles.sort((a, b) => b.views - a.views);
    } else {
        articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // Display sorted articles and update most popular article
    displayArticles(articles);
    displayMostPopular(articles);
}

// Function to handle "Read More" click and increment view count
function viewArticle(title) {
    // Find the article that was clicked
    const article = articles.find(article => article.title === title);
    if (article) {
        article.views += 1; // Increment view count for the article
        displayArticles(articles); // Update the article list
        displayMostPopular(articles); // Update the most popular article section
    }
}
