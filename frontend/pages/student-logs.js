let allLogs = [];
let filteredLogs = [];
let currentPage = 1;
const logsPerPage = 10;

document.addEventListener('DOMContentLoaded', function () {
    if (!Auth.protectPage()) return;

    // Attach buttons — no onclick in HTML
    document.getElementById('backBtn').addEventListener('click', function () {
        location.href = 'admin-dashboard.html';
    });
    document.getElementById('exportBtn').addEventListener('click', exportLogs);
    document.getElementById('filterBtn').addEventListener('click', filterLogs);
    document.getElementById('clearBtn').addEventListener('click', clearFilters);

    loadStudentLogs();
    updateStatistics();
});

function loadStudentLogs() {
    allLogs = JSON.parse(localStorage.getItem('studentLogs') || '[]');
    // Sort newest first
    allLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    filteredLogs = [...allLogs];
    displayLogs();
}

function displayLogs() {
    const tbody = document.getElementById('logsTableBody');
    const start = (currentPage - 1) * logsPerPage;
    const logsToDisplay = filteredLogs.slice(start, start + logsPerPage);

    if (!logsToDisplay.length) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:40px;color:#999;">No student activities found</td></tr>';
        document.getElementById('pagination').innerHTML = '';
        return;
    }

    tbody.innerHTML = logsToDisplay.map(log => `
        <tr>
            <td><strong>${log.studentName}</strong></td>
            <td>${log.username}</td>
            <td><span class="status-badge status-${log.activity.toLowerCase().replace(/\s+/g, '-')}">${log.activity}</span></td>
            <td>${formatDateTime(log.timestamp)}</td>
            <td>${log.details}</td>
        </tr>`).join('');

    updatePagination();
}

function formatDateTime(timestamp) {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleString('en-IN', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
}

function updatePagination() {
    const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    if (totalPages <= 1) return;

    // Previous
    const prevBtn = document.createElement('button');
    prevBtn.textContent = '←';
    prevBtn.className = 'pagination-btn';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', function () {
        if (currentPage > 1) { currentPage--; displayLogs(); }
    });
    pagination.appendChild(prevBtn);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = 'pagination-btn' + (i === currentPage ? ' active' : '');
        btn.addEventListener('click', function () {
            currentPage = i;
            displayLogs();
        });
        pagination.appendChild(btn);
    }

    // Next
    const nextBtn = document.createElement('button');
    nextBtn.textContent = '→';
    nextBtn.className = 'pagination-btn';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', function () {
        if (currentPage < totalPages) { currentPage++; displayLogs(); }
    });
    pagination.appendChild(nextBtn);
}

function updateStatistics() {
    const today = new Date().toDateString();
    const todayActivities = allLogs.filter(log =>
        new Date(log.timestamp).toDateString() === today
    ).length;
    const uniqueStudents = new Set(allLogs.map(log => log.studentName)).size;

    document.getElementById('totalActivities').textContent = allLogs.length;
    document.getElementById('todayActivities').textContent = todayActivities;
    document.getElementById('activeStudents').textContent = uniqueStudents;
}

function filterLogs() {
    const activityFilter = document.getElementById('activityFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;
    const studentFilter = document.getElementById('studentFilter').value.toLowerCase();

    filteredLogs = allLogs.filter(function (log) {
        const matchActivity = !activityFilter || log.activity === activityFilter;
        const matchDate = !dateFilter ||
            new Date(log.timestamp).toISOString().split('T')[0] === dateFilter;
        const matchStudent = !studentFilter ||
            log.studentName.toLowerCase().includes(studentFilter) ||
            log.username.toLowerCase().includes(studentFilter);
        return matchActivity && matchDate && matchStudent;
    });

    currentPage = 1;
    displayLogs();
}

function clearFilters() {
    document.getElementById('activityFilter').value = '';
    document.getElementById('dateFilter').value = '';
    document.getElementById('studentFilter').value = '';
    filteredLogs = [...allLogs];
    currentPage = 1;
    displayLogs();
}

function exportLogs() {
    if (!filteredLogs.length) {
        alert('No logs to export');
        return;
    }
    let csv = 'Student Name,Username,Activity,Date & Time,Details\n';
    filteredLogs.forEach(function (log) {
        csv += '"' + log.studentName + '","' + log.username + '","' +
            log.activity + '","' + formatDateTime(log.timestamp) + '","' +
            log.details + '"\n';
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = 'student-logs-' + new Date().toISOString().split('T')[0] + '.csv';
    a.click();
}