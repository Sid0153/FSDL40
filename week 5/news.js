// Replace with your actual API key
const apiKey = 'YOUR_NEWSAPI_KEY';
const newsEndpoint = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=' + apiKey;

// Fetch the live news
async function fetchNews() {
    const response = await fetch(newsEndpoint);
    const data = await response.json();

    if (data.status === 'ok') {
        const headlines = data.articles;
        displayHeadlines(headlines);
        displayBreakingNews(headlines);
    }
}

// Display breaking news ticker
function displayBreakingNews(headlines) {
    const tickerContent = document.getElementById('ticker-content');
    let breakingNewsText = "Breaking News: ";
    
    // Get top 5 breaking news titles
    headlines.slice(0, 5).forEach(news => {
        breakingNewsText += news.title + " | ";
    });

    tickerContent.textContent = breakingNewsText;
}

// Display main headlines
function displayHeadlines(headlines) {
    const headlineList = document.getElementById('headline-list');
    headlineList.innerHTML = ''; // Clear previous content

    headlines.forEach(news => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');

        const title = document.createElement('h3');
        title.textContent = news.title;

        const description = document.createElement('p');
        description.textContent = news.description;

        const link = document.createElement('a');
        link.href = news.url;
        link.target = '_blank';
        link.textContent = 'Read more...';

        newsItem.appendChild(title);
        newsItem.appendChild(description);
        newsItem.appendChild(link);

        headlineList.appendChild(newsItem);
    });
}

// Display news categories
function displayCategories() {
    const categories = ['Politics', 'Sports', 'Entertainment', 'Technology', 'Business'];
    const categoryContainer = document.getElementById('categories');

    categories.forEach(category => {
        const categoryButton = document.createElement('div');
        categoryButton.classList.add('category');
        categoryButton.textContent = category;
        categoryButton.addEventListener('click', () => fetchCategoryNews(category));
        categoryContainer.appendChild(categoryButton);
    });
}

// Fetch category-wise news (example for 'Sports')
async function fetchCategoryNews(category) {
    const categoryEndpoint = `https://newsapi.org/v2/top-headlines?country=in&category=${category.toLowerCase()}&apiKey=${apiKey}`;
    const response = await fetch(categoryEndpoint);
    const data = await response.json();

    if (data.status === 'ok') {
        const headlines = data.articles;
        displayHeadlines(headlines);
    }
}

// Initialize the app
function init() {
    fetchNews();
    displayCategories();
}

// Call the init function when the page loads
window.onload = init;
