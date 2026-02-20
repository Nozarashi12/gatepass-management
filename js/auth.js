// Gate Pass Management System - Authentication Module
// Handles user login, session management, and role-based access

// Initialize dummy users data in localStorage if not exists
function initializeDummyUsers() {
    if (!localStorage.getItem('users')) {
        const dummyUsers = [
            {
                id: 1,
                username: 'admin',
                password: 'admin123',
                role: 'admin',
                name: 'Administrator',
                email: 'admin@college.edu',
                phone: '9876543213',
                department: 'Administration'
            }
        ];
        localStorage.setItem('users', JSON.stringify(dummyUsers));
    }
}

// Initialize student activity logs
function initializeStudentLogs() {
    if (!localStorage.getItem('studentLogs')) {
        const dummyLogs = [
            {
                id: 1,
                studentName: 'John Doe',
                username: 'john',
                activity: 'Login',
                timestamp: '2024-02-19T09:15:00',
                details: 'Student logged into the system'
            },
            {
                id: 2,
                studentName: 'Jane Smith',
                username: 'jane',
                activity: 'Gate Pass Request',
                timestamp: '2024-02-19T10:30:00',
                details: 'Requested gate pass for Medical Emergency'
            },
            {
                id: 3,
                studentName: 'Mike Johnson',
                username: 'mike',
                activity: 'Logout',
                timestamp: '2024-02-19T11:45:00',
                details: 'Student logged out of the system'
            }
        ];
        localStorage.setItem('studentLogs', JSON.stringify(dummyLogs));
    }
}

// Initialize gate pass requests storage
function initializeGatePassRequests() {
    if (!localStorage.getItem('gatePassRequests')) {
        const dummyRequests = [
            {
                id: 1,
                userId: 1,
                username: 'student123',
                name: 'John Doe',
                reason: 'Medical Emergency',
                date: '2024-02-18',
                time: '10:30 AM',
                exitTime: '12:30 PM',
                status: 'pending',
                requestedAt: '2024-02-18T09:00:00',
                approvedBy: null,
                approvedAt: null,
                securityVerified: false
            },
            {
                id: 2,
                userId: 1,
                username: 'student123',
                name: 'John Doe',
                reason: 'Family Function',
                date: '2024-02-19',
                time: '02:00 PM',
                exitTime: '06:00 PM',
                status: 'approved',
                requestedAt: '2024-02-17T15:30:00',
                approvedBy: 'admin123',
                approvedAt: '2024-02-17T16:00:00',
                securityVerified: true
            }
        ];
        localStorage.setItem('gatePassRequests', JSON.stringify(dummyRequests));
    }
}

// Initialize entry/exit history
function initializeEntryExitHistory() {
    if (!localStorage.getItem('entryExitHistory')) {
        const dummyHistory = [
            {
                id: 1,
                requestId: 2,
                username: 'student123',
                name: 'John Doe',
                type: 'exit',
                timestamp: '2024-02-17T14:00:00',
                verifiedBy: 'security123',
                biometricType: 'fingerprint'
            },
            {
                id: 2,
                requestId: 2,
                username: 'student123',
                name: 'John Doe',
                type: 'entry',
                timestamp: '2024-02-17T18:30:00',
                verifiedBy: 'security123',
                biometricType: 'face'
            }
        ];
        localStorage.setItem('entryExitHistory', JSON.stringify(dummyHistory));
    }
}

// Initialize all data when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeDummyUsers();
    initializeStudentLogs();
    initializeGatePassRequests();
    initializeEntryExitHistory();
    
    // Only check if user is already logged in if we're on login page
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            redirectToDashboard(JSON.parse(currentUser));
        }
    }
});

// Log student activity
function logStudentActivity(studentName, username, activity, details) {
    const logs = JSON.parse(localStorage.getItem('studentLogs') || '[]');
    const newLog = {
        id: Date.now(),
        studentName: studentName,
        username: username,
        activity: activity,
        timestamp: new Date().toISOString(),
        details: details
    };
    logs.unshift(newLog); // Add to beginning of array
    localStorage.setItem('studentLogs', JSON.stringify(logs));
}

// Login form submission handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const role = document.getElementById('role').value;
    const errorMessage = document.getElementById('errorMessage');
    
    // Hide error message initially
    errorMessage.style.display = 'none';
    
    // Validate inputs
    if (!username || !password || !role) {
        showError('Please fill in all fields');
        return;
    }
    
    // Authenticate user
    const user = authenticateUser(username, password, role);
    
    if (user) {
        // Log student activity
        if (user.role === 'user') {
            logStudentActivity(user.name, user.username, 'Login', 'Student logged into the system');
        }
        
        // Store current user session
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Show success message
        showSuccess('Login successful! Redirecting...');
        
        // Redirect to appropriate dashboard
        setTimeout(() => {
            redirectToDashboard(user);
        }, 1500);
    } else {
        showError('Invalid username, password, or role');
    }
});

// Authenticate user credentials
function authenticateUser(username, password, role) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // For student role, check if password matches username + "123"
    if (role === 'user') {
        const expectedPassword = username + '123';
        
        // Check if student exists
        let user = users.find(user => 
            user.username === username && 
            user.role === 'user'
        );
        
        // If student doesn't exist, create new student
        if (!user && password === expectedPassword) {
            user = createNewStudent(username);
        }
        
        // Return user if password matches
        if (user && password === expectedPassword) {
            return user;
        }
        return null;
    }
    
    // For admin, use exact password match
    return users.find(user => 
        user.username === username && 
        user.password === password && 
        user.role === role
    );
}

// Create new student dynamically
function createNewStudent(username) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const newStudent = {
        id: Date.now(),
        username: username,
        role: 'user',
        name: username.charAt(0).toUpperCase() + username.slice(1), // Capitalize first letter
        email: `${username}@college.edu`,
        phone: '9876543' + Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
        department: 'General Studies'
    };
    
    users.push(newStudent);
    localStorage.setItem('users', JSON.stringify(users));
    
    return newStudent;
}

// Redirect to appropriate dashboard based on user role
function redirectToDashboard(user) {
    switch(user.role) {
        case 'user':
            window.location.href = 'pages/biometric-verification.html';
            break;
        case 'admin':
            window.location.href = 'pages/admin-dashboard.html';
            break;
        default:
            showError('Invalid user role');
    }
}

// Show error message
function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 5000);
}

// Show success message (temporary implementation)
function showSuccess(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = message;
    errorElement.style.background = '#00b894';
    errorElement.style.display = 'block';
    
    // Reset back to error styling after 3 seconds
    setTimeout(() => {
        errorElement.style.background = '#ff4757';
        errorElement.style.display = 'none';
    }, 3000);
}

// Logout function (to be used in dashboard pages)
function logout() {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.role === 'user') {
        logStudentActivity(currentUser.name, currentUser.username, 'Logout', 'Student logged out of the system');
    }
    
    localStorage.removeItem('currentUser');
    window.location.href = '../index.html';
}

// Check if user is authenticated (for dashboard pages)
function isAuthenticated() {
    return localStorage.getItem('currentUser') !== null;
}

// Get current user
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Check user role
function hasRole(requiredRole) {
    const user = getCurrentUser();
    return user && user.role === requiredRole;
}

// Protect dashboard pages - redirect to login if not authenticated
function protectPage() {
    if (!isAuthenticated()) {
        window.location.href = '../index.html';
        return false;
    }
    return true;
}

// Utility function to format date/time
function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Utility function to generate unique ID
function generateId() {
    return Date.now() + Math.floor(Math.random() * 1000);
}

// Demo biometric authentication function
function demoBiometric() {
    alert('🎯 Biometric Authentication Demo\n\nThis demonstrates our advanced security features:\n\n1. 🔐 Fingerprint Scanning\n   - Simulates fingerprint verification with 80% success rate\n   - Visual feedback with scanning animation\n\n2. 📸 Face Recognition\n   - Real camera access (with fallback simulation)\n   - Live video feed with face frame guide\n   - Captured image display after successful scan\n   - 85% success rate with proper error handling\n\n3. 🔒 Multi-Factor Authentication\n   - Requires both biometrics for access\n   - Professional UI with status indicators\n\n4. 📱 Device Compatibility\n   - Works on all modern browsers\n   - Graceful fallback for unsupported devices\n\nTry the full security dashboard to experience all features!');
}

// Export functions for use in other scripts
window.Auth = {
    logout,
    isAuthenticated,
    getCurrentUser,
    hasRole,
    protectPage,
    formatDateTime,
    generateId,
    logStudentActivity
};
