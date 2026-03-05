// Gate Pass Management System - Advanced Authentication Module
// Backend API Integration

const API_BASE_URL = 'http://localhost:5000/api';

// Initialize dummy users data in localStorage if not exists
function initializeDummyUsers() {
    // Backend handles user data now
    console.log('Backend authentication enabled');
}

// Login with backend API
async function loginUser(username, password, role) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                identifier: username,
                password: password,
                method: 'password'
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Store token and user data
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            
            // Log activity
            logStudentActivity(data.user.name, username, 'Login', 'User logged in successfully');
            
            return data.user;
        } else {
            throw new Error(data.error || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

// Register new user
async function registerUser(userData) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.error || 'Registration failed');
        }
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}

// Get current user
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Logout user
function logout() {
    // Clear local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    
    // Log activity
    const user = getCurrentUser();
    if (user) {
        logStudentActivity(user.name, user.username, 'Logout', 'User logged out');
    }
    
    // Redirect to login
    window.location.href = '../index.html';
}

// Check if user is authenticated
function isAuthenticated() {
    return !!localStorage.getItem('authToken');
}

// Protect page - redirect to login if not authenticated
function protectPage() {
    if (!isAuthenticated()) {
        window.location.href = '../index.html';
        return false;
    }
    return true;
}

// Generate ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Initialize student activity logs
function initializeStudentLogs() {
    if (!localStorage.getItem('studentLogs')) {
        localStorage.setItem('studentLogs', JSON.stringify([]));
    }
}

// Log student activity
function logStudentActivity(name, username, activity, details) {
    const logs = JSON.parse(localStorage.getItem('studentLogs') || '[]');
    
    const newLog = {
        id: generateId(),
        name: name,
        username: username,
        activity: activity,
        details: details,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    };
    
    logs.push(newLog);
    localStorage.setItem('studentLogs', JSON.stringify(logs));
}

// Export functions
window.Auth = {
    loginUser,
    registerUser,
    getCurrentUser,
    logout,
    isAuthenticated,
    protectPage,
    generateId,
    logStudentActivity
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeDummyUsers();
    initializeStudentLogs();
});