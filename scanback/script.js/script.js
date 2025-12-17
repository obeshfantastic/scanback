// Main JavaScript File for SCAN BACK System

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else if (document.querySelector(targetId)) {
                const targetElement = document.querySelector(targetId);
                const offset = 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            alert('Thank you for your message! We will contact you soon.');
            this.reset();
            
            // In production, you would send this to your backend
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                alert('Thank you for your message!');
                contactForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error sending your message.');
            });
            */
        });
    }
    
    // Initialize dashboard if on dashboard page
    if (document.querySelector('.dashboard')) {
        initDashboard();
    }
    
    // Initialize login forms
    initLoginForms();
});

// Dashboard Functions
function initDashboard() {
    // Set active menu item
    const currentPage = window.location.pathname.split('/').pop();
    const menuLinks = document.querySelectorAll('.dashboard-menu a');
    
    menuLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
        
        link.addEventListener('click', function(e) {
            menuLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Load dashboard data
    loadDashboardData();
}

function loadDashboardData() {
    // Simulate loading data
    setTimeout(() => {
        // Update counters
        const counters = document.querySelectorAll('.card-value');
        if (counters.length > 0) {
            counters[0].textContent = '1,247'; // Total Customers
            counters[1].textContent = '3,891'; // Active Items
            counters[2].textContent = '89%'; // Recovery Rate
            counters[3].textContent = 'KSh 156,780'; // Revenue
        }
        
        // Load recent customers table
        loadRecentCustomers();
        
        // Load recent scans table
        loadRecentScans();
    }, 1000);
}

function loadRecentCustomers() {
    const customers = [
        { id: 'C001', name: 'John Kamau', email: 'john@example.com', phone: '+254712345678', items: 5, status: 'active' },
        { id: 'C002', name: 'Sarah Wangari', email: 'sarah@example.com', phone: '+254723456789', items: 3, status: 'active' },
        { id: 'C003', name: 'Mike Omondi', email: 'mike@example.com', phone: '+254734567890', items: 8, status: 'active' },
        { id: 'C004', name: 'Grace Akinyi', email: 'grace@example.com', phone: '+254745678901', items: 2, status: 'inactive' },
        { id: 'C005', name: 'David Mutua', email: 'david@example.com', phone: '+254756789012', items: 6, status: 'active' }
    ];
    
    const tableBody = document.querySelector('#customersTable tbody');
    if (tableBody) {
        tableBody.innerHTML = '';
        
        customers.forEach(customer => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.email}</td>
                <td>${customer.phone}</td>
                <td>${customer.items}</td>
                <td><span class="status-${customer.status}">${customer.status}</span></td>
                <td>
                    <button class="btn-action btn-view" onclick="viewCustomer('${customer.id}')">View</button>
                    <button class="btn-action btn-edit" onclick="editCustomer('${customer.id}')">Edit</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
}

function loadRecentScans() {
    const scans = [
        { id: 'S001', item: 'Keys - John Kamau', location: 'Nairobi CBD', time: '10:30 AM', status: 'recovered' },
        { id: 'S002', item: 'Wallet - Sarah Wangari', location: 'Westlands', time: '11:45 AM', status: 'pending' },
        { id: 'S003', item: 'Phone - Mike Omondi', location: 'Karen', time: '2:15 PM', status: 'recovered' },
        { id: 'S004', item: 'Laptop Bag - Grace Akinyi', location: 'Thika Road', time: '3:30 PM', status: 'pending' },
        { id: 'S005', item: 'Dog Collar - David Mutua', location: 'Runda', time: '5:00 PM', status: 'recovered' }
    ];
    
    const tableBody = document.querySelector('#scansTable tbody');
    if (tableBody) {
        tableBody.innerHTML = '';
        
        scans.forEach(scan => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${scan.id}</td>
                <td>${scan.item}</td>
                <td>${scan.location}</td>
                <td>${scan.time}</td>
                <td><span class="status-${scan.status}">${scan.status}</span></td>
                <td>
                    <button class="btn-action btn-view" onclick="viewScan('${scan.id}')">Details</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
}

function viewCustomer(id) {
    alert(Viewing customer ${id}\n\nIn production, this would open a detailed view with:\n- Personal information\n- Registered items\n- Scan history\n- Contact details\n- Payment history);
}

function editCustomer(id) {
    alert(Editing customer ${id}\n\nIn production, this would open an edit form.);
}

function viewScan(id) {
    alert(Viewing scan details ${id}\n\nIn production, this would show:\n- Exact location\n- Finder contact\n- Item photos\n- Recovery status\n- Communication log);
}

// QR Code Generator
function generateQRCode() {
    const qrData = document.getElementById('qrData').value.trim();
    const qrType = document.getElementById('qrType').value;
    
    if (!qrData) {
        alert('Please enter data for the QR code');
        return;
    }
    
    // Generate unique ID
    const uniqueId = SCAN-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substr(2, 4).toUpperCase()};
    
    // Create QR code URL
    const qrUrl = https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`SCANBACK:${uniqueId}:${qrData})}&format=png&color=2d3436&bgcolor=f8f9fa`;
    
    // Display QR code
    const qrPreview = document.getElementById('qrPreview');
    if (qrPreview) {
        qrPreview.innerHTML = `
            <img src="${qrUrl}" alt="Generated QR Code">
            <p>ID: ${uniqueId}</p>
            <p>Type: ${qrType}</p>
            <p>Data: ${qrData}</p>
        `;
    }
    
    // Add to recent QR codes
    addToRecentQRCodes(uniqueId, qrData, qrType);
    
    alert(QR Code generated!\nID: ${uniqueId}\n\nIn production, this would be saved to database.);
}

function addToRecentQRCodes(id, data, type) {
    const tableBody = document.querySelector('#recentQRCodes tbody');
    if (tableBody) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${id}</td>
            <td>${data}</td>
            <td>${type}</td>
            <td>${new Date().toLocaleDateString()}</td>
            <td>
                <button class="btn-action btn-view" onclick="downloadQRCode('${id}')">Download</button>
                <button class="btn-action btn-delete" onclick="deleteQRCode('${id}')">Delete</button>
            </td>
        `;
        tableBody.prepend(row);
    }
}

function downloadQRCode(id) {
    alert(Downloading QR Code ${id}\n\nIn production, this would download a PNG file.);
}

function deleteQRCode(id) {
    if (confirm(Are you sure you want to delete QR Code ${id}?)) {
        alert(QR Code ${id} deleted.\n\nIn production, this would remove from database.);
    }
}

// Login Functions
function initLoginForms() {
    // Customer Login
    const customerLoginForm = document.getElementById('customerLoginForm');
    if (customerLoginForm) {
        customerLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            // Demo credentials
            if (email === 'customer@example.com' && password === 'Password123') {
                alert('Login successful! Redirecting to customer dashboard...');
                window.location.href = 'customer-dashboard.html';
            } else {
                alert('Invalid email or password. Try:\nEmail: customer@example.com\nPassword: Password123');
            }
        });
    }
    
    // Admin Login
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            // Your credentials
            if (email === 'scanback24@gmail.com' && password === 'Tot@205610') {
                alert('Admin login successful! Redirecting to admin dashboard...');
                window.location.href = 'admin-dashboard.html';
            } else {
                alert('Invalid admin credentials. Try:\nEmail: scanback24@gmail.com\nPassword: Tot@205610');
            }
        });
    }
    
    // Customer Registration
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            
            alert(Thank you for registering, ${name}!\nAn account has been created with email: ${email}\n\nIn production, this would create a real account.);
            window.location.href = 'customer-dashboard.html';
        });
    }
}

// Export data functions
function exportCustomers() {
    alert('Exporting customer data to CSV...\n\nIn production, this would download a CSV file with all customer data.');
}

function exportQRcodes() {
    alert('Exporting QR code data...\n\nIn production, this would download a ZIP file with all QR codes.');
}

function exportReports() {
    alert('Generating system report...\n\nIn production, this would generate a PDF report with system analytics.');
}

// Search functions
function searchCustomers() {
    const searchTerm = document.getElementById('customerSearch').value;
    alert(Searching for customers: ${searchTerm}\n\nIn production, this would filter the customer table.);
}

function searchScans() {
    const searchTerm = document.getElementById('scanSearch').value;
    alert(Searching for scans: ${searchTerm}\n\nIn production, this would filter the scan table.);
}

// Add new customer
function addNewCustomer() {
    const name = prompt('Enter customer name:');
    const email = prompt('Enter customer email:');
    const phone = prompt('Enter customer phone:');
    
    if (name && email && phone) {
        alert(Customer added:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nIn production, this would save to database.);
        
        // Refresh customer table
        loadRecentCustomers();
    }
}

// Send SMS notification
function sendSMSNotification(customerId) {
    const message = prompt('Enter SMS message to send:');
    if (message) {
        alert(SMS sent to customer ${customerId}:\n\n"${message}"\n\nIn production, this would use Twilio API to send real SMS.);
    }
}

// Print QR codes
function printQRCodes() {
    alert('Opening print preview for QR codes...\n\nIn production, this would generate a printable sheet of QR codes.');
}

// Bulk generate QR codes
function bulkGenerateQR() {
    const count = parseInt(prompt('How many QR codes to generate?', '10'));
    if (count && count > 0 && count <= 100) {
        alert(Generating ${count} QR codes...\n\nIn production, this would create ${count} unique QR codes and add to database.);
        
        // Simulate generation
        for (let i = 0; i < count; i++) {
            const uniqueId = SCAN-BULK-${Date.now().toString().slice(-6)}-${i.toString().padStart(3, '0')};
            addToRecentQRCodes(uniqueId, Bulk Generated Item ${i + 1}, 'bulk');
        }
    }
}