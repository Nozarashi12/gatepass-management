let notifications = [];

document.addEventListener('DOMContentLoaded', function () {
    if (!Auth.protectPage()) return;

    const user = Auth.getCurrentUser();
    if (user) {
        initializeNotifications();
        loadNotifications();
        updateStatistics();
    }

    document.getElementById('goBackBtn').addEventListener('click', goBack);
    document.getElementById('logoutBtn').addEventListener('click', function () { Auth.logout(); });
    document.getElementById('markAllReadBtn').addEventListener('click', markAllAsRead);
    document.getElementById('clearAllBtn').addEventListener('click', clearAllNotifications);
    document.getElementById('typeFilter').addEventListener('change', displayNotifications);
    document.getElementById('statusFilter').addEventListener('change', displayNotifications);
    document.getElementById('priorityFilter').addEventListener('change', displayNotifications);
    document.getElementById('resetFiltersBtn').addEventListener('click', resetFilters);

    // Auto-refresh every 30 seconds
    setInterval(function () {
        loadNotifications();
        updateStatistics();
    }, 30000);
});

function initializeNotifications() {
    if (localStorage.getItem('notifications')) return;
    const user = Auth.getCurrentUser();
    const defaults = [
        {
            id: Auth.generateId(), userId: user.id, type: 'request',
            title: 'Gate Pass Request Submitted',
            message: 'Your gate pass request for Medical Emergency has been submitted successfully.',
            timestamp: new Date().toISOString(), read: false, priority: 'medium', relatedRequestId: 1
        },
        {
            id: Auth.generateId(), userId: user.id, type: 'approval',
            title: 'Gate Pass Approved',
            message: 'Your gate pass request for Family Function has been approved by admin.',
            timestamp: new Date(Date.now() - 3600000).toISOString(), read: false, priority: 'high', relatedRequestId: 2
        },
        {
            id: Auth.generateId(), userId: user.id, type: 'security',
            title: 'Entry Recorded',
            message: 'Your entry has been recorded at the main gate.',
            timestamp: new Date(Date.now() - 7200000).toISOString(), read: true, priority: 'low'
        },
        {
            id: Auth.generateId(), userId: user.id, type: 'system',
            title: 'System Maintenance',
            message: 'The gate pass system will undergo maintenance tonight from 11 PM to 1 AM.',
            timestamp: new Date(Date.now() - 86400000).toISOString(), read: true, priority: 'medium'
        }
    ];
    localStorage.setItem('notifications', JSON.stringify(defaults));
}

function loadNotifications() {
    const user = Auth.getCurrentUser();
    const all = JSON.parse(localStorage.getItem('notifications') || '[]');
    notifications = all.filter(n => n.userId === user.id);
    notifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    displayNotifications();
}

function displayNotifications() {
    const typeFilter = document.getElementById('typeFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    const priorityFilter = document.getElementById('priorityFilter').value;

    const filtered = notifications.filter(n => {
        const matchType = typeFilter === 'all' || n.type === typeFilter;
        const matchStatus = statusFilter === 'all' ||
            (statusFilter === 'unread' && !n.read) ||
            (statusFilter === 'read' && n.read);
        const matchPriority = priorityFilter === 'all' || n.priority === priorityFilter;
        return matchType && matchStatus && matchPriority;
    });

    const container = document.getElementById('notificationsList');
    if (!filtered.length) {
        container.innerHTML = '<div class="no-notifications">No notifications found for the selected criteria</div>';
        return;
    }

    container.innerHTML = filtered.map(n => {
        const icon = { request: '📝', approval: '✅', security: '🔒', system: '⚙️' }[n.type] || '📢';
        const unreadClass = n.read ? '' : 'unread';
        const priorityClass = 'priority-' + n.priority;
        const statusClass = n.type === 'approval' ? 'approved' : n.type === 'request' ? 'pending' : '';
        return `
            <div class="notification-item ${unreadClass} ${priorityClass} ${statusClass}">
                ${!n.read ? '<div class="unread-indicator"></div>' : ''}
                <div class="notification-header">
                    <div>
                        <div class="notification-title">
                            <span class="notification-icon">${icon}</span>${n.title}
                        </div>
                        <div class="notification-time">${formatNotificationTime(n.timestamp)}</div>
                    </div>
                </div>
                <div class="notification-message">${n.message}</div>
                <div class="notification-actions">
                    ${!n.read
                        ? '<button class="mark-read-btn" data-id="' + n.id + '">Mark as Read</button>'
                        : '<span style="color:#999;font-size:12px;">✓ Read</span>'}
                    <button class="delete-btn" data-del="${n.id}">Delete</button>
                    ${n.relatedRequestId
                        ? '<button class="btn btn-primary btn-sm" data-req="' + n.relatedRequestId + '">View Request</button>'
                        : ''}
                </div>
            </div>`;
    }).join('');

    // Attach listeners to dynamically created buttons
    container.querySelectorAll('.mark-read-btn[data-id]').forEach(btn =>
        btn.addEventListener('click', () => markAsRead(+btn.dataset.id)));
    container.querySelectorAll('.delete-btn[data-del]').forEach(btn =>
        btn.addEventListener('click', () => deleteNotification(+btn.dataset.del)));
    container.querySelectorAll('[data-req]').forEach(btn =>
        btn.addEventListener('click', () => viewRequest(+btn.dataset.req)));
}

function formatNotificationTime(timestamp) {
    const date = new Date(timestamp);
    const diffMs = Date.now() - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return diffMins + ' minute' + (diffMins > 1 ? 's' : '') + ' ago';
    if (diffHours < 24) return diffHours + ' hour' + (diffHours > 1 ? 's' : '') + ' ago';
    if (diffDays < 7) return diffDays + ' day' + (diffDays > 1 ? 's' : '') + ' ago';
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function markAsRead(id) {
    const all = JSON.parse(localStorage.getItem('notifications') || '[]');
    const idx = all.findIndex(n => n.id === id);
    if (idx !== -1) { all[idx].read = true; localStorage.setItem('notifications', JSON.stringify(all)); }
    loadNotifications();
    updateStatistics();
}

function markAllAsRead() {
    const user = Auth.getCurrentUser();
    const all = JSON.parse(localStorage.getItem('notifications') || '[]');
    all.forEach(n => { if (n.userId === user.id) n.read = true; });
    localStorage.setItem('notifications', JSON.stringify(all));
    loadNotifications();
    updateStatistics();
}

function deleteNotification(id) {
    if (!confirm('Are you sure you want to delete this notification?')) return;
    const all = JSON.parse(localStorage.getItem('notifications') || '[]');
    localStorage.setItem('notifications', JSON.stringify(all.filter(n => n.id !== id)));
    loadNotifications();
    updateStatistics();
}

function clearAllNotifications() {
    if (!confirm('Are you sure you want to clear all notifications? This action cannot be undone.')) return;
    const user = Auth.getCurrentUser();
    const all = JSON.parse(localStorage.getItem('notifications') || '[]');
    localStorage.setItem('notifications', JSON.stringify(all.filter(n => n.userId !== user.id)));
    loadNotifications();
    updateStatistics();
}

function viewRequest(requestId) {
    const requests = JSON.parse(localStorage.getItem('gatePassRequests') || '[]');
    const r = requests.find(req => req.id === requestId);
    if (r) alert('Request Details:\n\nID: #' + r.id + '\nStudent: ' + r.name + '\nReason: ' + r.reason + '\nDate: ' + r.date + '\nTime: ' + r.time + '\nStatus: ' + r.status);
}

function resetFilters() {
    document.getElementById('typeFilter').value = 'all';
    document.getElementById('statusFilter').value = 'all';
    document.getElementById('priorityFilter').value = 'all';
    displayNotifications();
}

function updateStatistics() {
    const user = Auth.getCurrentUser();
    const all = JSON.parse(localStorage.getItem('notifications') || '[]');
    const userNotifs = all.filter(n => n.userId === user.id);
    const requests = JSON.parse(localStorage.getItem('gatePassRequests') || '[]');
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('totalNotifications').textContent = userNotifs.length;
    document.getElementById('unreadNotifications').textContent = userNotifs.filter(n => !n.read).length;
    document.getElementById('pendingRequests').textContent = requests.filter(r => r.userId === user.id && r.status === 'pending').length;
    document.getElementById('approvedToday').textContent = requests.filter(r => r.userId === user.id && r.status === 'approved' && r.date === today).length;
}

function goBack() {
    const user = Auth.getCurrentUser();
    if (!user) return;
    if (user.role === 'user') window.location.href = 'user-dashboard.html';
    else if (user.role === 'admin') window.location.href = 'admin-dashboard.html';
    else if (user.role === 'security') window.location.href = 'security-dashboard.html';
}