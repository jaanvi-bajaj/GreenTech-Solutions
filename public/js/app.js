// GreenTech Solutions - Main JavaScript File

// API base URL
const API_URL = '/api';

// Store all products for filtering
let allProducts = [];

// Load products dynamically
async function loadProducts() {
  try {
    const response = await fetch(`${API_URL}/products`);
    const products = await response.json();
    allProducts = products;
    
    const container = document.getElementById('products-container');
    if (!container) return;
    
    displayProducts(products);
    setupProductFilters();
  } catch (error) {
    console.error('Error loading products:', error);
  }
}

// Display products (for products page with full details)
function displayProducts(products) {
  const container = document.getElementById('products-container');
  if (!container) return;
  
  // Check if this is the products page or home page
  const isProductsPage = window.location.pathname.includes('products');
  
  if (isProductsPage) {
    // Detailed product cards for products page
    container.innerHTML = products.map(product => `
      <div class="product-detail-card" data-category="${product.category}">
        <div class="product-category">${product.category}</div>
        <div class="product-header">
          <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">${product.name}</h3>
          <div class="product-price">AED ${parseFloat(product.price).toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 1rem; font-size: 0.875rem;">${product.description}</p>
        
        <div class="product-spec">
          <svg viewBox="0 0 24 24">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
          </svg>
          <div>
            <strong>Installation:</strong> ${product.installation_time || 'Contact for details'}
          </div>
        </div>
        
        <div class="product-spec">
          <svg viewBox="0 0 24 24">
            <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
          </svg>
          <div>
            <strong>Efficiency:</strong> ${product.efficiency || 'N/A'}
          </div>
        </div>
        
        <div class="product-spec">
          <svg viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
          </svg>
          <div>
            <strong>Warranty:</strong> ${product.warranty || 'Standard warranty'}
          </div>
        </div>
        
        ${product.installation_details ? `
          <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
            <p style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.5;">
              <strong>Installation Details:</strong> ${product.installation_details}
            </p>
          </div>
        ` : ''}
        
        <div style="margin-top: 1.5rem; display: flex; gap: 0.75rem;">
          <a href="contact.html" class="btn btn-primary" style="flex: 1; text-align: center; text-decoration: none;">
            Get Quote
          </a>
        </div>
      </div>
    `).join('');
  } else {
    // Simple product cards for home page
    container.innerHTML = products.slice(0, 3).map(product => `
      <div class="card">
        <img src="${product.image_url}" alt="${product.name}" class="card-img">
        <div class="card-header">
          <h3 class="card-title">${product.name}</h3>
        </div>
        <div class="card-body">
          <p class="card-text">${product.description}</p>
        </div>
        <div class="card-footer">
          <a href="products.html" class="btn btn-outline">View All Products →</a>
        </div>
      </div>
    `).join('');
  }
}

// Setup product filters
function setupProductFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (!filterButtons.length) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter products
      const filter = button.getAttribute('data-filter');
      const filtered = filter === 'all' 
        ? allProducts 
        : allProducts.filter(p => p.category === filter || (filter === 'Other' && !['Solar Panels', 'Wind Energy', 'Energy Storage'].includes(p.category)));
      
      displayProducts(filtered);
    });
  });
}

// Load team members dynamically
async function loadTeam() {
  try {
    const response = await fetch(`${API_URL}/team`);
    const members = await response.json();
    
    const container = document.getElementById('team-container');
    if (!container) return;
    
    container.innerHTML = members.map(member => `
      <div class="card team-card">
        <img src="${member.photo_url}" alt="${member.name}" class="avatar">
        <div class="card-header">
          <h3 class="team-name">${member.name}</h3>
          <p class="team-role">${member.role}</p>
        </div>
        <div class="card-body">
          <p class="team-bio">${member.bio}</p>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading team:', error);
  }
}

// Load timeline dynamically
async function loadTimeline() {
  try {
    const response = await fetch(`${API_URL}/timeline`);
    const events = await response.json();
    
    const tbody = document.getElementById('timeline-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = events.map(event => `
      <tr>
        <td><strong>${event.year}</strong></td>
        <td>${event.milestone}</td>
        <td style="color: var(--text-secondary)">${event.description}</td>
        <td>${event.impact}</td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error loading timeline:', error);
  }
}

// Load awards dynamically
async function loadAwards() {
  try {
    const response = await fetch(`${API_URL}/awards`);
    const awards = await response.json();
    
    const container = document.getElementById('awards-container');
    if (!container) return;
    
    container.innerHTML = awards.map(award => `
      <div class="card award-card">
        <div class="award-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
          </svg>
        </div>
        <div class="award-content">
          <h3>${award.name}</h3>
          <p class="award-year">${award.year}</p>
          <p class="award-description">${award.description}</p>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading awards:', error);
  }
}

// Load testimonials dynamically
async function loadTestimonials() {
  try {
    const response = await fetch(`${API_URL}/testimonials`);
    const testimonials = await response.json();
    
    const container = document.getElementById('testimonials-container');
    if (!container) return;
    
    container.innerHTML = testimonials.map(testimonial => `
      <div class="card">
        <div class="card-header">
          <p class="card-text" style="font-style: italic; margin-bottom: 1rem;">"${testimonial.message}"</p>
        </div>
        <div class="card-body">
          <p style="font-weight: 600;">${testimonial.customer_name}</p>
          <p class="card-text">${testimonial.company}</p>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading testimonials:', error);
  }
}

// Contact form validation and submission
function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    // Get form values
    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      subject: document.getElementById('subject').value.trim(),
      message: document.getElementById('message').value.trim()
    };
    
    // Validation
    let isValid = true;
    
    if (formData.name.length < 2) {
      showError('name', 'Name must be at least 2 characters');
      isValid = false;
    }
    
    if (!isValidEmail(formData.email)) {
      showError('email', 'Please enter a valid email address');
      isValid = false;
    }
    
    if (formData.subject.length < 5) {
      showError('subject', 'Subject must be at least 5 characters');
      isValid = false;
    }
    
    if (formData.message.length < 10) {
      showError('message', 'Message must be at least 10 characters');
      isValid = false;
    }
    
    if (!isValid) return;
    
    // Submit form
    try {
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert('✅ Thank you for your message! We will get back to you soon.');
        form.reset();
      } else {
        alert('❌ Failed to send message. Please try again.');
      }
      
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('❌ Failed to send message. Please try again.');
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
}

// Helper function to validate email
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Helper function to show error message
function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  field.parentElement.appendChild(errorDiv);
}

// Image map location markers
function setupImageMap() {
  const markers = document.querySelectorAll('.location-marker');
  const locationInfo = document.getElementById('location-info');
  
  if (!markers.length || !locationInfo) return;
  
  const locations = [
    {
      name: 'San Francisco HQ',
      address: '123 Green Street, San Francisco, CA 94102'
    },
    {
      name: 'New York Office',
      address: '456 Renewable Ave, New York, NY 10001'
    },
    {
      name: 'London Office',
      address: '789 Solar Road, London, UK EC1A 1BB'
    },
    {
      name: 'Singapore Office',
      address: '321 Wind Plaza, Singapore 018956'
    }
  ];
  
  markers.forEach((marker, index) => {
    marker.addEventListener('click', () => {
      const location = locations[index];
      locationInfo.innerHTML = `
        <h3>${location.name}</h3>
        <p>${location.address}</p>
      `;
      locationInfo.style.display = 'block';
    });
  });
}

// Set active nav link
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  loadProducts();
  loadTeam();
  loadTimeline();
  loadAwards();
  loadTestimonials();
  setupContactForm();
  setupImageMap();
});
