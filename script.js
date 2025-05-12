import { signUp, signIn, signOut, isAuthenticated } from './auth.js';

// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const closeBtns = document.querySelectorAll('.close');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Sample featured businesses data
const featuredBusinesses = [
    {
        id: 1,
        name: "Cafe Delights",
        category: "Restaurants",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
        description: "A cozy cafe serving delicious coffee and pastries",
        address: "123 Coffee Lane, Downtown",
        phone: "(555) 234-5678",
        hours: "Mon-Sun: 7:00 AM - 8:00 PM",
        website: "www.cafedelights.com",
        reviews: [
            { user: "John D.", rating: 5, comment: "Best coffee in town!" },
            { user: "Sarah M.", rating: 4, comment: "Love their pastries" }
        ]
    },
    {
        id: 2,
        name: "Tech Haven",
        category: "Retail",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
        description: "Your one-stop shop for all things technology",
        address: "456 Tech Boulevard",
        phone: "(555) 876-5432",
        hours: "Mon-Sat: 10:00 AM - 9:00 PM",
        website: "www.techhaven.com",
        reviews: [
            { user: "Mike R.", rating: 5, comment: "Great selection of gadgets" },
            { user: "Lisa P.", rating: 4.5, comment: "Knowledgeable staff" }
        ]
    },
    {
        id: 3,
        name: "Wellness Spa",
        category: "Health & Wellness",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
        description: "Luxurious spa treatments and wellness services",
        address: "789 Relaxation Road",
        phone: "(555) 345-6789",
        hours: "Tue-Sun: 9:00 AM - 7:00 PM",
        website: "www.wellnessspa.com",
        reviews: [
            { user: "Emma S.", rating: 5, comment: "Amazing massage therapy!" },
            { user: "David L.", rating: 4.5, comment: "Very relaxing atmosphere" }
        ]
    },
    {
        id: 4,
        name: "Fresh Market",
        category: "Retail",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
        description: "Local organic produce and specialty foods",
        address: "321 Market Street",
        phone: "(555) 987-6543",
        hours: "Mon-Sun: 8:00 AM - 9:00 PM",
        website: "www.freshmarket.com",
        reviews: [
            { user: "Alice B.", rating: 5, comment: "Best fresh produce!" },
            { user: "Tom H.", rating: 4, comment: "Great organic selection" }
        ]
    },
    {
        id: 5,
        name: "Fitness Zone",
        category: "Health & Wellness",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
        description: "Modern gym with personal training services",
        address: "567 Fitness Avenue",
        phone: "(555) 234-9876",
        hours: "Mon-Sun: 5:00 AM - 11:00 PM",
        website: "www.fitnesszone.com",
        reviews: [
            { user: "Chris M.", rating: 5, comment: "Amazing trainers!" },
            { user: "Jenny K.", rating: 5, comment: "Great equipment" }
        ]
    },
    {
        id: 6,
        name: "The Book Nook",
        category: "Retail",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
        description: "Cozy bookstore with rare finds",
        address: "890 Reader's Lane",
        phone: "(555) 345-1234",
        hours: "Mon-Sat: 10:00 AM - 8:00 PM",
        website: "www.booknook.com",
        reviews: [
            { user: "Rachel G.", rating: 5, comment: "Hidden gem for book lovers!" },
            { user: "Paul S.", rating: 4.5, comment: "Great atmosphere" }
        ]
    }
];

// Modal functionality
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

registerBtn.addEventListener('click', () => {
    registerModal.style.display = 'block';
});

closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        loginModal.style.display = 'none';
        registerModal.style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal || e.target === registerModal) {
        loginModal.style.display = 'none';
        registerModal.style.display = 'none';
    }
});

// Form handling
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Show loading state
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Signing in...';
    submitBtn.disabled = true;

    try {
        const { data, error } = await signIn(email, password);
        
        if (error) {
            throw new Error(error);
        }

        // Success
        showNotification('Successfully signed in!', 'success');
        loginModal.style.display = 'none';
        updateAuthState(true, data.user);
    } catch (error) {
        showNotification(error.message, 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    
    // Show loading state
    const submitBtn = registerForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creating account...';
    submitBtn.disabled = true;

    try {
        const { data, error } = await signUp(email, password, name);
        
        if (error) {
            throw new Error(error);
        }

        // Success
        showNotification('Registration successful! Please check your email to confirm your account.', 'success');
        registerModal.style.display = 'none';
    } catch (error) {
        showNotification(error.message, 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Update auth state
async function updateAuthState(isLoggedIn, user = null) {
    const authButtons = document.querySelector('.auth-buttons');
    
    if (isLoggedIn) {
        authButtons.innerHTML = `
            <span class="user-info">Welcome, ${user.user_metadata.full_name || user.email}</span>
            <button id="signOutBtn" class="btn btn-primary">Sign Out</button>
        `;
        
        // Add sign out functionality
        document.getElementById('signOutBtn').addEventListener('click', async () => {
            try {
                const { error } = await signOut();
                if (error) throw error;
                
                showNotification('Successfully signed out!', 'success');
                updateAuthState(false);
            } catch (error) {
                showNotification(error.message, 'error');
            }
        });
    } else {
        authButtons.innerHTML = `
            <button id="loginBtn" class="btn">Sign In</button>
            <button id="registerBtn" class="btn btn-primary">Sign Up</button>
        `;
        
        // Reattach event listeners
        document.getElementById('loginBtn').addEventListener('click', () => {
            loginModal.style.display = 'block';
        });
        
        document.getElementById('registerBtn').addEventListener('click', () => {
            registerModal.style.display = 'block';
        });
    }
}

// Add notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Populate featured businesses
function populateFeaturedBusinesses(categoryFilter = '') {
    const businessGrid = document.querySelector('.business-grid');
    businessGrid.innerHTML = '';
    
    const filteredBusinesses = categoryFilter
        ? featuredBusinesses.filter(business => business.category === categoryFilter)
        : featuredBusinesses;
    
    if (filteredBusinesses.length === 0) {
        businessGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No businesses found in this category</h3>
                <button class="btn btn-primary" onclick="populateFeaturedBusinesses()">Show All Businesses</button>
            </div>
        `;
        return;
    }

    filteredBusinesses.forEach(business => {
        const businessCard = document.createElement('div');
        businessCard.className = 'business-card';
        businessCard.innerHTML = `
            <img src="${business.image}" alt="${business.name}">
            <h3>${business.name}</h3>
            <p class="category">${business.category}</p>
            <div class="rating">
                ${getStarRating(business.rating)}
                <span>${business.rating}</span>
            </div>
            <p>${business.description}</p>
            <button class="btn btn-primary" onclick="window.showBusinessDetails(${business.id})">View Details</button>
        `;
        businessGrid.appendChild(businessCard);
    });
}

// Generate star rating HTML
function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Search functionality
const searchInput = document.querySelector('.search-container input');
const categorySelect = document.querySelector('.search-container select');
const searchBtn = document.querySelector('.search-btn');

// Update the search functionality
searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categorySelect.value;
    
    const filteredBusinesses = featuredBusinesses.filter(business => {
        // Check all relevant fields for the search term
        const searchableText = [
            business.name,
            business.category,
            business.description,
            business.address,
            business.website
        ].map(text => text.toLowerCase()).join(' ');

        const matchesSearch = searchTerm === '' || searchableText.includes(searchTerm);
        const matchesCategory = !selectedCategory || 
            business.category.toLowerCase() === selectedCategory.toLowerCase();

        return matchesSearch && matchesCategory;
    });

    displaySearchResults(filteredBusinesses, searchTerm, selectedCategory);
}

function displaySearchResults(filteredBusinesses, searchTerm, selectedCategory) {
    const businessGrid = document.querySelector('.business-grid');
    businessGrid.innerHTML = '';

    if (filteredBusinesses.length === 0) {
        businessGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No businesses found matching "${searchTerm}"${selectedCategory ? ` in category "${selectedCategory}"` : ''}</h3>
                <p>Try different keywords or remove some filters</p>
                <button class="btn btn-primary" onclick="resetSearch()">Reset Search</button>
            </div>
        `;
    } else {
        // Update the section title to show search results
        const featuredSection = document.querySelector('#featured h2');
        featuredSection.textContent = `Search Results${selectedCategory ? ` in ${selectedCategory}` : ''}`;
        
        filteredBusinesses.forEach(business => {
            const businessCard = document.createElement('div');
            businessCard.className = 'business-card';
            businessCard.innerHTML = `
                <img src="${business.image}" alt="${business.name}">
                <h3>${business.name}</h3>
                <p class="category">${business.category}</p>
                <div class="rating">
                    ${getStarRating(business.rating)}
                    <span>${business.rating}</span>
                </div>
                <p>${business.description}</p>
                <button class="btn btn-primary" onclick="window.showBusinessDetails(${business.id})">View Details</button>
            `;
            businessGrid.appendChild(businessCard);
        });
    }

    // Scroll to results
    document.querySelector('#featured').scrollIntoView({ behavior: 'smooth' });
}

function resetSearch() {
    // Clear search input and category selection
    searchInput.value = '';
    categorySelect.value = '';
    
    // Reset section title
    const featuredSection = document.querySelector('#featured h2');
    featuredSection.textContent = 'Featured Businesses';
    
    // Show all businesses
    populateFeaturedBusinesses();
}

// Add clear search button
function addClearSearchButton() {
    const searchContainer = document.querySelector('.search-container');
    const clearBtn = document.createElement('button');
    clearBtn.className = 'clear-search-btn';
    clearBtn.innerHTML = '<i class="fas fa-times"></i>';
    clearBtn.style.display = 'none';
    
    searchInput.parentNode.insertBefore(clearBtn, searchInput.nextSibling);
    
    // Show/hide clear button based on search input
    searchInput.addEventListener('input', () => {
        clearBtn.style.display = searchInput.value ? 'block' : 'none';
    });
    
    // Clear search when button is clicked
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.style.display = 'none';
        performSearch();
    });
}

// Add category card click handlers
function initializeCategoryFilters() {
    const categoryCards = document.querySelectorAll('.category-card');
    let activeCategory = null;

    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.querySelector('h3').textContent;
            
            // Toggle active state
            categoryCards.forEach(c => c.classList.remove('active'));
            
            if (activeCategory === category) {
                // If clicking the same category again, show all businesses
                activeCategory = null;
                populateFeaturedBusinesses();
            } else {
                // Apply new category filter
                activeCategory = category;
                card.classList.add('active');
                populateFeaturedBusinesses(category);
            }

            // Scroll to featured section
            document.querySelector('#featured').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', async () => {
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem;
            border-radius: 0.5rem;
            color: white;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification.success {
            background-color: #10B981;
        }
        
        .notification.error {
            background-color: #EF4444;
        }
        
        .notification.info {
            background-color: #3B82F6;
        }
        
        .user-info {
            margin-right: 1rem;
            color: var(--text-color);
            font-weight: 500;
        }
    `;
    document.head.appendChild(style);

    // Check if user is already logged in
    const { isAuthenticated: isLoggedIn, user } = await isAuthenticated();
    updateAuthState(isLoggedIn, user);

    // Initialize other features
    populateFeaturedBusinesses();
    initializeCategoryFilters();
    addClearSearchButton();
    
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Add some CSS for the business cards
const style = document.createElement('style');
style.textContent = `
    .business-card {
        background-color: var(--white);
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: var(--shadow);
        transition: all 0.3s ease;
    }
    
    .business-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 12px -1px rgba(0, 0, 0, 0.2);
    }
    
    .business-card img {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }
    
    .business-card h3 {
        padding: 1rem;
        margin: 0;
    }
    
    .business-card .category {
        color: var(--primary-color);
        padding: 0 1rem;
        margin: 0;
        font-weight: 600;
    }
    
    .business-card .rating {
        padding: 0.5rem 1rem;
        color: #fbbf24;
    }
    
    .business-card .rating span {
        color: var(--text-color);
        margin-left: 0.5rem;
    }
    
    .business-card p {
        padding: 0 1rem 1rem;
        margin: 0;
    }
    
    .business-card .btn {
        margin: 0 1rem 1rem;
        width: calc(100% - 2rem);
    }
`;

document.head.appendChild(style);

// Make functions globally accessible
window.closeBusinessDetails = function() {
    const modal = document.getElementById('businessDetailsModal');
    if (modal) {
        modal.remove();
    }
};

window.showBusinessDetails = async function(businessId) {
    const business = featuredBusinesses.find(b => b.id === businessId);
    if (!business) return;

    // Check if user is authenticated
    const { isAuthenticated: isLoggedIn, user } = await isAuthenticated();

    // Remove existing modal if any
    const existingModal = document.getElementById('businessDetailsModal');
    if (existingModal) {
        existingModal.remove();
    }

    const detailsHTML = `
        <div id="businessDetailsModal" class="modal">
            <div class="modal-content business-details">
                <span class="close" onclick="closeBusinessDetails()">&times;</span>
                <div class="business-details-content">
                    <img src="${business.image}" alt="${business.name}" class="details-image">
                    <h2>${business.name}</h2>
                    <p class="category">${business.category}</p>
                    <div class="rating">
                        ${getStarRating(business.rating)}
                        <span>${business.rating}</span>
                    </div>
                    <div class="details-info">
                        <p><i class="fas fa-map-marker-alt"></i> <strong>Address:</strong> ${business.address}</p>
                        <p><i class="fas fa-phone"></i> <strong>Phone:</strong> ${business.phone}</p>
                        <p><i class="fas fa-clock"></i> <strong>Hours:</strong> ${business.hours}</p>
                        <p><i class="fas fa-globe"></i> <strong>Website:</strong> <a href="https://${business.website}" target="_blank">${business.website}</a></p>
                    </div>
                    <div class="reviews-section">
                        <div class="reviews-header">
                            <h3>Customer Reviews</h3>
                            ${isLoggedIn ? `
                                <button class="btn btn-primary" onclick="showAddReviewForm(${businessId})">
                                    <i class="fas fa-star"></i> Write a Review
                                </button>
                            ` : `
                                <button class="btn" onclick="showLoginPrompt()">
                                    Sign in to Review
                                </button>
                            `}
                        </div>
                        <div id="reviewsList">
                            ${business.reviews.map(review => `
                                <div class="review">
                                    <div class="review-header">
                                        <span class="review-user">${review.user}</span>
                                        <div class="review-rating">
                                            ${getStarRating(review.rating)}
                                        </div>
                                    </div>
                                    <p class="review-comment">${review.comment}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal to the page
    document.body.insertAdjacentHTML('beforeend', detailsHTML);

    // Show the modal
    const modal = document.getElementById('businessDetailsModal');
    modal.style.display = 'block';

    // Add event listener for clicking outside modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBusinessDetails();
        }
    });

    // Initialize review functionality if user is logged in
    if (isLoggedIn) {
        initializeReviewFunctionality(businessId, user);
    }
};

function initializeReviewFunctionality(businessId, user) {
    window.showAddReviewForm = function(businessId) {
        const reviewModal = document.createElement('div');
        reviewModal.id = 'addReviewModal';
        reviewModal.className = 'modal';
        reviewModal.innerHTML = `
            <div class="modal-content">
                <span class="close" onclick="closeAddReviewModal()">&times;</span>
                <h2>Write a Review</h2>
                <form id="reviewForm" onsubmit="submitReview(event, ${businessId})">
                    <div class="form-group">
                        <label>Rating</label>
                        <div class="star-rating">
                            ${[1, 2, 3, 4, 5].map(num => `
                                <i class="far fa-star" data-rating="${num}" onclick="setRating(${num})"></i>
                            `).join('')}
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="reviewComment">Your Review</label>
                        <textarea id="reviewComment" required minlength="10" rows="4" 
                                placeholder="Share your experience with this business..."></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit Review</button>
                </form>
            </div>
        `;
        document.body.appendChild(reviewModal);
        reviewModal.style.display = 'block';
    };

    window.closeAddReviewModal = function() {
        const modal = document.getElementById('addReviewModal');
        if (modal) {
            modal.remove();
        }
    };

    window.setRating = function(rating) {
        const stars = document.querySelectorAll('.star-rating i');
        stars.forEach((star, index) => {
            star.className = index < rating ? 'fas fa-star' : 'far fa-star';
        });
        window.selectedRating = rating;
    };

    window.submitReview = async function(event, businessId) {
        event.preventDefault();
        const rating = window.selectedRating;
        const comment = document.getElementById('reviewComment').value;

        if (!rating) {
            showNotification('Please select a rating', 'error');
            return;
        }

        try {
            // Add review to the business
            const business = featuredBusinesses.find(b => b.id === businessId);
            business.reviews.unshift({
                user: user.email,
                rating,
                comment
            });

            // Update the reviews display
            const reviewsList = document.getElementById('reviewsList');
            const newReview = document.createElement('div');
            newReview.className = 'review';
            newReview.innerHTML = `
                <div class="review-header">
                    <span class="review-user">${user.email}</span>
                    <div class="review-rating">
                        ${getStarRating(rating)}
                    </div>
                </div>
                <p class="review-comment">${comment}</p>
            `;
            reviewsList.insertBefore(newReview, reviewsList.firstChild);

            // Close the review modal and show success message
            closeAddReviewModal();
            showNotification('Review submitted successfully!', 'success');
        } catch (error) {
            showNotification('Error submitting review. Please try again.', 'error');
        }
    };
}

window.showLoginPrompt = function() {
    closeBusinessDetails();
    loginModal.style.display = 'block';
}; 