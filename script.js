// Quote database
const quotes = [
    {
        quote: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        quote: "In the middle of every difficulty lies opportunity.",
        author: "Albert Einstein"
    },
    {
        quote: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
    },
    {
        quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        author: "Winston Churchill"
    },
    {
        quote: "The only limit to our realization of tomorrow will be our doubts of today.",
        author: "Franklin D. Roosevelt"
    },
    {
        quote: "Do not watch the clock. Do what it does. Keep going.",
        author: "Sam Levenson"
    },
    {
        quote: "The best way to predict the future is to create it.",
        author: "Peter Drucker"
    },
    {
        quote: "The only person you are destined to become is the person you decide to be.",
        author: "Ralph Waldo Emerson"
    },
    {
        quote: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },
    {
        quote: "Everything you've ever wanted is on the other side of fear.",
        author: "George Addair"
    }
];

// DOM Elements
const quoteText = document.querySelector('.quote');
const authorText = document.querySelector('.author');
const newQuoteBtn = document.getElementById('newQuote');
const saveQuoteBtn = document.getElementById('saveQuote');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Set initial theme from localStorage or prefer-color-scheme
const currentTheme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', currentTheme);

// Time-based background
function setTimeBasedBackground() {
    const hour = new Date().getHours();
    const body = document.body;
    
    // Remove all time-based classes first
    body.classList.remove('morning', 'afternoon', 'evening', 'night');
    
    // Add appropriate class based on time of day
    if (hour >= 5 && hour < 12) {
        body.classList.add('morning');
    } else if (hour >= 12 && hour < 17) {
        body.classList.add('afternoon');
    } else if (hour >= 17 && hour < 21) {
        body.classList.add('evening');
    } else {
        body.classList.add('night');
    }
}

// Get a random quote
function getRandomQuote() {
    // Get today's date as a seed
    const today = new Date().toDateString();
    const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Use the seed to get a consistent quote for the day
    const randomIndex = seed % quotes.length;
    return quotes[randomIndex];
}

// Display new quote with animation
function displayNewQuote() {
    // Fade out
    quoteText.classList.add('fade');
    
    // After fade out, change quote and fade in
    setTimeout(() => {
        const { quote, author } = getRandomQuote();
        quoteText.textContent = `"${quote}"`;
        authorText.textContent = `— ${author}`;
        
        // Fade in
        setTimeout(() => {
            quoteText.classList.remove('fade');
        }, 50);
    }, 300);
}

// Save quote as image
async function saveQuoteAsImage() {
    try {
        const quoteContainer = document.querySelector('.quote-container');
        
        // Use html2canvas to take a screenshot of the quote
        const html2canvas = await import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js');
        
        const canvas = await html2canvas.default(quoteContainer, {
            backgroundColor: null,
            scale: 2, // For better quality on high-DPI displays
            logging: false
        });
        
        // Create download link
        const link = document.createElement('a');
        link.download = 'quote.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    } catch (error) {
        console.error('Error saving quote as image:', error);
        alert('Failed to save quote as image. Please try again.');
    }
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    setTimeBasedBackground();
    displayNewQuote();
    
    // Update background every hour
    setInterval(setTimeBasedBackground, 60 * 60 * 1000);
});

newQuoteBtn.addEventListener('click', displayNewQuote);
saveQuoteBtn.addEventListener('click', saveQuoteAsImage);
themeToggle.addEventListener('click', toggleTheme);

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        displayNewQuote();
    } else if (e.code === 'KeyD' && e.ctrlKey) {
        e.preventDefault();
        toggleTheme();
    }
});
