let currentPage = 1;
const recordsPerPage = 20;
let filteredHistory = [];

document.addEventListener('DOMContentLoaded', function () {
    if (!Auth.protectPage()) return;

    const user = Auth.getCurrentUser();
    if (user) {
        document.getElementById('dateFilter').value = new Date().toISOString().split('T')[0];
        loadHistory();
    }

    document.getElementById('goBackBtn').addEventListener('click', goBack);
    document.getElementById('logoutBtn').addEventListener('click', function () { Auth.logout(); });
    document.getElementById('exportBtn').addEventListener('click', exportToCSV);
    document.getElementById('printBtn').addEventListener('click', function () { window.print(); });
    document.getElementById('dateFilter').addEventListener('change', loadHistory);
    document.getElementById('typeFilter').addEventListener('change', loadHistory);
    document.getElementById('userFilter').addEventListener('keyup', loadHistory);
    document.getElementById('biometricFilter').addEventListener('change', loadHistory);
    document.getElementById('resetFiltersBtn').addEventListener('click', resetFilters);
});

function loadHistory() {
    const history = JSON.parse(localStorage.getItem('entryExitHistory') || '[]');
    const dateFilter = document.getElementById('dateFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    const userFilter = document.getElementById('userFilter').value.toLowerCase();
    const biometricFilter = document.getElementById('biometricFilter').value;

    filteredHistory = history.filter(function (record) {
        let matchDate = !dateFilter || new Date(record.timestamp).toISOString().split('T')[0] === dateFilter;
        let matchType = typeFilter === 'all' || record.type === typeFilter;
        let matchUser = !userFilter || record.username.toLowerCase().includes(userFilter) || record.name.toLowerCase().includes(userFilter);
        let matchBiometric = biometricFilter === 'all' || record.biometricType === biometricFilter;
        return matchDate && matchType && matchUser && matchBiometric;
    });

    filteredHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    updateStatistics();
    currentPage = 1;
    displayHistory();
}

function updateStatistics() {
    const today = new Date().toISOString().split('T')[0];
    const todayRecords = filteredHistory.filter(r => new Date(r.timestamp).toISOString().split('T')[0] === today);
    document.getElementById('totalEntries').textContent = todayRecords.filter(r => r.type === 'entry').length;
    document.getElementById('totalExits').textContent = todayRecords.filter(r => r.type === 'exit').length;
    document.getElementById('totalDenied').textContent = todayRecords.filter(r => r.type === 'denied').length;
    document.getElementById('totalRecords').textContent = filteredHistory.length;
}

function displayHistory() {
    const tbody = document.getElementById('historyTableBody');
    const start = (currentPage - 1) * recordsPerPage;
    const pageRecords = filteredHistory.slice(start, start + recordsPerPage);

    if (!pageRecords.length) {
        tbody.innerHTML = '<tr><td colspan="8" class="no-data">No records found for the selected criteria</td></tr>';
        document.getElementById('pagination').innerHTML = '';
        return;
    }

    tbody.innerHTML = pageRecords.map(record => `
        <tr>
            <td>${Auth.formatDateTime(record.timestamp)}</td>
            <td>${record.name}</td>
            <td>${record.username}</td>
            <td><span class="${record.type}-badge">${record.type.toUpperCase()}</span></td>
            <td>${record.requestId ? '#' + record.requestId : 'N/A'}</td>
            <td>${record.biometricType}</td>
            <td>${record.verifiedBy}</td>
            <td><button class="btn btn-primary btn-sm" data-id="${record.id}">View Details</button></td>
        </tr>`).join('');

    tbody.querySelectorAll('[data-id]').forEach(btn =>
        btn.addEventListener('click', () => viewRecordDetails(+btn.dataset.id)));

    updatePagination();
}

function updatePagination() {
    const totalPages = Math.ceil(filteredHistory.length / recordsPerPage);
    const div = document.getElementById('pagination');
    if (totalPages <= 1) { div.innerHTML = ''; return; }

    let html = `<button data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>`;
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            html += `<button data-page="${i}" class="${i === currentPage ? 'active' : ''}">${i}</button>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += '<span>...</span>';
        }
    }
    html += `<button data-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>`;
    div.innerHTML = html;

    div.querySelectorAll('button[data-page]').forEach(btn =>
        btn.addEventListener('click', function () {
            const page = +this.dataset.page;
            const total = Math.ceil(filteredHistory.length / recordsPerPage);
            if (page < 1 || page > total) return;
            currentPage = page;
            displayHistory();
        }));
}

function viewRecordDetails(recordId) {
    const record = filteredHistory.find(r => r.id === recordId);
    if (!record) return;
    let details = 'Record Details\n\n';
    details += 'Date & Time: ' + Auth.formatDateTime(record.timestamp) + '\n';
    details += 'Student Name: ' + record.name + '\n';
    details += 'Username: ' + record.username + '\n';
    details += 'Type: ' + record.type.toUpperCase() + '\n';
    details += 'Gate Pass ID: ' + (record.requestId ? '#' + record.requestId : 'N/A') + '\n';
    details += 'Verification Method: ' + record.biometricType + '\n';
    details += 'Verified By: ' + record.verifiedBy + '\n';
    alert(details);
}

function exportToCSV() {
    if (!filteredHistory.length) { alert('No data to export'); return; }
    let csv = 'Date Time,Student Name,Username,Type,Gate Pass ID,Verification Method,Verified By\n';
    filteredHistory.forEach(r => {
        csv += `"${Auth.formatDateTime(r.timestamp)}","${r.name}","${r.username}","${r.type}","${r.requestId || 'N/A'}","${r.biometricType}","${r.verifiedBy}"\n`;
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = 'gate_pass_history_' + new Date().toISOString().split('T')[0] + '.csv';
    a.click();
}

function resetFilters() {
    document.getElementById('dateFilter').value = new Date().toISOString().split('T')[0];
    document.getElementById('typeFilter').value = 'all';
    document.getElementById('userFilter').value = '';
    document.getElementById('biometricFilter').value = 'all';
    loadHistory();
}

function goBack() {
    const user = Auth.getCurrentUser();
    if (!user) return;
    if (user.role === 'user') window.location.href = 'user-dashboard.html';
    else if (user.role === 'admin') window.location.href = 'admin-dashboard.html';
    else if (user.role === 'security') window.location.href = 'security-dashboard.html';
}