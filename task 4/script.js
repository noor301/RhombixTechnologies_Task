// Local In-Memory Database State
let books = [
    { id: 1, title: "The Hobbit", author: "J.R.R. Tolkien", category: "Fiction", status: "Available", borrower: "", borrowDate: "" },
    { id: 2, title: "Sapiens", author: "Yuval Noah Harari", category: "History", status: "Borrowed", borrower: "Alice", borrowDate: "2026-05-12" },
    { id: 3, title: "Atomic Habits", author: "James Clear", category: "Self-Help", status: "Available", borrower: "", borrowDate: "" },
];

let selectedCategory = "All";
let searchQuery = "";
let targetedBookId = null;

const categories = ["All", "Fiction", "History", "Self-Help", "Science", "Biography"];

// DOM Target References
const booksGrid = document.getElementById('books-grid');
const chipsContainer = document.getElementById('category-chips');
const searchInput = document.getElementById('search-input');
const addBookForm = document.getElementById('add-book-form');
const borrowOverlay = document.getElementById('borrow-overlay');
const borrowForm = document.getElementById('borrow-form');

// Initialize Dashboard Application
function init() {
    renderChips();
    renderBooks();
    
    // Set up tracking event listeners
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderBooks();
    });

    addBookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title-input').value;
        const author = document.getElementById('author-input').value;
        const category = document.getElementById('category-input').value;

        books.push({
            id: Date.now(),
            title,
            author,
            category,
            status: "Available",
            borrower: "",
            borrowDate: ""
        });

        addBookForm.reset();
        renderBooks();
    });

    borrowForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const borrower = document.getElementById('borrower-input').value;
        
        books = books.map(b => b.id === targetedBookId ? {
            ...b,
            status: "Borrowed",
            borrower,
            borrowDate: new Date().toISOString().split('T')[0]
        } : b);

        closeBorrowModal();
        renderBooks();
    });
}

function renderChips() {
    chipsContainer.innerHTML = categories.map(cat => `
        <button class="chip ${selectedCategory === cat ? 'active' : ''}" onclick="setCategory('${cat}')">
            ${cat}
        </button>
    `).join('');
}

function setCategory(cat) {
    selectedCategory = cat;
    renderChips();
    renderBooks();
}

function openBorrowModal(id) {
    targetedBookId = id;
    document.getElementById('borrower-input').value = "";
    borrowOverlay.classList.remove('hidden');
}

function closeBorrowModal() {
    borrowOverlay.classList.add('hidden');
    targetedBookId = null;
}

function returnBook(id) {
    books = books.map(b => b.id === id ? { ...b, status: "Available", borrower: "", borrowDate: "" } : b);
    renderBooks();
}

function renderBooks() {
    const records = books.filter(b => {
        const matchSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.author.toLowerCase().includes(searchQuery.toLowerCase());
        const matchCat = selectedCategory === "All" || b.category === selectedCategory;
        return matchSearch && matchCat;
    });

    if(records.length === 0) {
        booksGrid.innerHTML = `<p class="empty-msg">No library records match your filters.</p>`;
        return;
    }

    booksGrid.innerHTML = records.map(b => `
        <div class="book-card">
            <div class="book-info">
                <h4>${b.title}</h4>
                <p class="author">by ${b.author}</p>
                <span class="badge-category">${b.category}</span>
            </div>
            <div class="book-status-zone">
                <span class="status-tag ${b.status.toLowerCase()}">${b.status}</span>
                ${b.status === 'Available' ? `
                    <button onclick="openBorrowModal(${b.id})" class="action-link-btn">Check Out</button>
                ` : `
                    <div class="borrow-details">
                        <small>With: <strong>${b.borrower}</strong></small>
                        <small>Since: ${b.borrowDate}</small>
                        <button onclick="returnBook(${b.id})" class="action-link-btn return-btn">Mark Returned</button>
                    </div>
                `}
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', init);