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
    },
    {
        quote: "Life is what happens when you're busy making other plans.",
        author: "John Lennon"
    },
    {
        quote: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney"
    },
    {
        quote: "If life were predictable it would cease to be life, and be without flavor.",
        author: "Eleanor Roosevelt"
    },
    {
        quote: "Life is really simple, but we insist on making it complicated.",
        author: "Confucius"
    },
    {
        quote: "The purpose of our lives is to be happy.",
        author: "Dalai Lama"
    },
    {
        quote: "You only live once, but if you do it right, once is enough.",
        author: "Mae West"
    },
    {
        quote: "Never let the fear of striking out keep you from playing the game.",
        author: "Babe Ruth"
    },
    {
        quote: "Money and success don't change people; they merely amplify what is already there.",
        author: "Will Smith"
    },
    {
        quote: "Your time is limited, don't waste it living someone else's life.",
        author: "Steve Jobs"
    },
    {
        quote: "The journey of a thousand miles begins with one step.",
        author: "Lao Tzu"
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
    // Get a random quote from the array
    const randomIndex = Math.floor(Math.random() * quotes.length);
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
function saveQuoteAsImage() {
    // Create a temporary button to show save options
    const quoteText = document.querySelector('.quote').textContent;
    const authorText = document.querySelector('.author').textContent;
    
    // Create a temporary textarea to hold the quote
    const textArea = document.createElement('textarea');
    textArea.value = `${quoteText}\n${authorText}`;
    document.body.appendChild(textArea);
    
    // Select the text
    textArea.select();
    
    try {
        // Copy the text to clipboard
        const successful = document.execCommand('copy');
        if (successful) {
            alert('Quote copied to clipboard! You can now paste it anywhere.');
        } else {
            // If copy fails, show the text to copy manually
            const textToCopy = `${quoteText}\n${authorText}`;
            prompt('Copy this quote:', textToCopy);
        }
    } catch (err) {
        console.error('Failed to copy: ', err);
        const textToCopy = `${quoteText}\n${authorText}`;
        prompt('Copy this quote:', textToCopy);
    }
    
    // Clean up
    document.body.removeChild(textArea);
    
    // Alternative: Simple text file download
    const data = `${quoteText}\n${authorText}`;
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quote.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
