// ─── admin-dashboard.js ───────────────────────────────────────────────────────
let adminUser = null;
let allPasses   = [];
let allCheckIns = [];
let passFilter  = 'all';
let ciFilter    = 'all';
let autoLogoutTimer = null;

document.addEventListener('DOMContentLoaded', async function () {
    const stored = localStorage.getItem('currentUser');
    if (!stored) { window.location.href = '/'; return; }
    try { adminUser = JSON.parse(stored); } catch { window.location.href = '/'; return; }
    if (adminUser.role !== 'admin') { window.location.href = '/pages/student-dashboard.html'; return; }

    document.getElementById('adminName').textContent   = adminUser.name || 'Admin';
    document.getElementById('welcomeName').textContent = adminUser.name || 'Admin';

    await loadAllPasses();
    await loadAllCheckIns();

    // Sidebar nav
    document.querySelectorAll('.nav-link[data-section]').forEach(function(btn) {
        btn.addEventListener('click', function() {
            showSection(this.dataset.section);
            document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const titles = { passes: 'Gate Pass Requests', checkins: 'Check-In / Out Logs' };
            document.getElementById('sectionTitle').textContent = titles[this.dataset.section] || '';
        });
    });

    // Pass filter tabs
    document.querySelectorAll('.tab-btn[data-filter]').forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.tab-btn[data-filter]').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            passFilter = this.dataset.filter;
            renderPassTable();
        });
    });

    // Check-in filter tabs
    document.querySelectorAll('.tab-btn[data-ci-filter]').forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.tab-btn[data-ci-filter]').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            ciFilter = this.dataset.ciFilter;
            renderCiTable();
        });
    });

    // Filter inputs for passes
    ['filterYear','filterDept','filterPassId','filterRoll','filterFrom','filterTo'].forEach(function(id) {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', renderPassTable);
    });

    // Filter inputs for check-ins
    ['ciFilterRoll','ciFilterName'].forEach(function(id) {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', renderCiTable);
    });

    // Reset filters
    document.getElementById('btnResetFilters').addEventListener('click', function() {
        ['filterYear','filterDept','filterPassId','filterRoll','filterFrom','filterTo'].forEach(function(id) {
            const el = document.getElementById(id);
            if (el) el.value = '';
        });
        passFilter = 'all';
        document.querySelectorAll('.tab-btn[data-filter]').forEach(b => b.classList.remove('active'));
        document.querySelector('.tab-btn[data-filter="all"]').classList.add('active');
        renderPassTable();
    });

    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    startAutoLogout();

    // ── Event delegation for approve/reject and info buttons ──────────────────
    // Handles clicks on dynamically rendered table rows without using onclick=""
    document.getElementById('passTableBody').addEventListener('click', function(e) {
        const approveBtn = e.target.closest('[data-action]');
        if (approveBtn) {
            const id     = approveBtn.dataset.id;
            const action = approveBtn.dataset.action;
            reviewPass(id, action);
            return;
        }
        const infoBtn = e.target.closest('[data-info]');
        if (infoBtn) {
            showInfo(infoBtn.dataset.info);
        }
    });
});

// ═══════════════════════════════════════════════════════════════════════════════
//  LOAD DATA
// ═══════════════════════════════════════════════════════════════════════════════
async function loadAllPasses() {
    try {
        const res  = await apiFetch('/api/passes/all');
        const data = await res.json();
        allPasses  = data.passes || [];
        renderPassTable();
        updateStats();
    } catch(e) { console.error('Failed to load passes', e); }
}

async function loadAllCheckIns() {
    try {
        const res   = await apiFetch('/api/passes/checkin/all');
        const data  = await res.json();
        allCheckIns = data.records || [];
        renderCiTable();
        updateStats();
    } catch(e) { console.error('Failed to load check-ins', e); }
}

// ═══════════════════════════════════════════════════════════════════════════════
//  PASS TABLE
// ═══════════════════════════════════════════════════════════════════════════════
function renderPassTable() {
    let list = allPasses;

    // Status filter
    if (passFilter !== 'all') list = list.filter(p => p.status === passFilter);

    // Field filters
    const year   = document.getElementById('filterYear')?.value.trim().toLowerCase();
    const dept   = document.getElementById('filterDept')?.value.trim().toLowerCase();
    const passId = document.getElementById('filterPassId')?.value.trim().toLowerCase();
    const roll   = document.getElementById('filterRoll')?.value.trim().toLowerCase();
    const from   = document.getElementById('filterFrom')?.value;
    const to     = document.getElementById('filterTo')?.value;

    if (dept)   list = list.filter(p => (p.department||'').toLowerCase().includes(dept));
    if (passId) list = list.filter(p => (p._id||'').toLowerCase().includes(passId) || (p.passId||'').toLowerCase().includes(passId));
    if (roll)   list = list.filter(p => (p.rollNumber||'').toLowerCase().includes(roll));
    if (from)   list = list.filter(p => new Date(p.createdAt) >= new Date(from));
    if (to)     list = list.filter(p => new Date(p.createdAt) <= new Date(to));

    document.getElementById('passCount').textContent = list.length + ' record' + (list.length !== 1 ? 's' : '');

    const tbody = document.getElementById('passTableBody');
    if (list.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10"><div class="empty-state"><div class="empty-icon">📭</div>No requests found.</div></td></tr>';
        return;
    }

    tbody.innerHTML = list.map(function(p) {
        const statusBadge = p.status === 'approved'
            ? '<span class="badge badge-approved">✅ Approved</span>'
            : p.status === 'rejected'
            ? '<span class="badge badge-rejected">❌ Rejected</span>'
            : '<span class="badge badge-pending">⏳ Pending</span>';

        const canReview = p.status === 'pending';
        const shortId   = p._id ? p._id.toString().slice(-6).toUpperCase() : '—';

        return `<tr id="row-${p._id}">
            <td class="photo-cell">
                <div class="td-inner">
                    <div class="student-photo">
                        ${p.profilePicture ? `<img src="${p.profilePicture}" alt="">` : '👤'}
                    </div>
                    <button class="info-btn" data-info="${p._id}">ℹ Info</button>
                </div>
            </td>
            <td><div class="td-inner"><strong>GP${shortId}</strong></div></td>
            <td><div class="td-inner">${p.rollNumber || '—'}</div></td>
            <td>
                <div class="td-inner student-name-cell">
                    <strong>${p.studentName || '—'}</strong>
                    <span>${p.department || ''}</span>
                </div>
            </td>
            <td><div class="td-inner">${p.department || '—'}</div></td>
            <td><div class="td-inner" style="max-width:160px;word-break:break-word;">${p.reason || '—'}</div></td>
            <td><div class="td-inner time-cell">${p.returnTime || '—'}</div></td>
            <td>
                <div class="td-inner time-cell">
                    ${formatTime(p.createdAt)}
                    <div class="date-part">${formatDateShort(p.createdAt)}</div>
                </div>
            </td>
            <td><div class="td-inner">${statusBadge}${p.adminNote ? `<div style="font-size:11px;color:#888;margin-top:4px;">"${p.adminNote}"</div>` : ''}</div></td>
            <td class="action-col">
                <div class="td-inner">
                    ${canReview ? `
                    <input type="text" class="note-input" id="note-${p._id}" placeholder="Optional note...">
                    <button class="btn-approve" data-id="${p._id}" data-action="approved">✅ Approve</button>
                    <button class="btn-reject"  data-id="${p._id}" data-action="rejected">❌ Reject</button>
                    ` : `<span style="font-size:12px;color:#aaa;">Reviewed</span>`}
                </div>
            </td>
        </tr>`;
    }).join('');
}

async function reviewPass(passId, status) {
    const noteEl = document.getElementById('note-' + passId);
    const note   = noteEl ? noteEl.value.trim() : '';

    // Disable buttons immediately
    const row = document.getElementById('row-' + passId);
    if (row) { row.querySelectorAll('button').forEach(b => b.disabled = true); }

    try {
        const res  = await apiFetch('/api/passes/' + passId + '/review', 'PATCH', {
            status,
            adminNote:  note,
            reviewedBy: adminUser.name || 'Admin'
        });
        const data = await res.json();
        if (!res.ok) { showToast(data.error || 'Review failed', 'error'); await loadAllPasses(); return; }
        showToast('Pass ' + status + ' ✅', status === 'approved' ? 'success' : 'warning');
        // Update local array
        const idx = allPasses.findIndex(p => p._id === passId);
        if (idx !== -1) allPasses[idx] = data.pass;
        renderPassTable();
        updateStats();
    } catch(e) { showToast('Review failed', 'error'); await loadAllPasses(); }
}

// ═══════════════════════════════════════════════════════════════════════════════
//  CHECK-IN TABLE
// ═══════════════════════════════════════════════════════════════════════════════
function renderCiTable() {
    let list = allCheckIns;

    if (ciFilter === 'in')  list = list.filter(r => r.isCheckedIn);
    if (ciFilter === 'out') list = list.filter(r => !r.isCheckedIn);

    const roll = document.getElementById('ciFilterRoll')?.value.trim().toLowerCase();
    const name = document.getElementById('ciFilterName')?.value.trim().toLowerCase();
    if (roll) list = list.filter(r => (r.rollNumber||'').toLowerCase().includes(roll));
    if (name) list = list.filter(r => (r.studentName||'').toLowerCase().includes(name));

    document.getElementById('ciCount').textContent = list.length + ' record' + (list.length !== 1 ? 's' : '');

    const tbody = document.getElementById('ciTableBody');
    if (list.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9"><div class="empty-state"><div class="empty-icon">📭</div>No check-in records found.</div></td></tr>';
        return;
    }

    tbody.innerHTML = list.map(function(r) {
        const statusBadge = r.isCheckedIn
            ? '<span class="badge badge-in">🟢 Inside</span>'
            : '<span class="badge badge-out">⚪ Left</span>';

        const reasonLabel = r.checkOutReason === 'geofence'         ? '📍 Geofence auto'
                          : r.checkOutReason === 'auto-end-of-day'  ? '🕔 End of day auto'
                          : r.checkOutReason === 'manual'           ? '👆 Manual'
                          : '—';

        // Duration
        let duration = '—';
        if (r.checkInTime && r.checkOutTime) {
            const mins = Math.round((new Date(r.checkOutTime) - new Date(r.checkInTime)) / 60000);
            duration = mins >= 60
                ? Math.floor(mins/60) + 'h ' + (mins%60) + 'm'
                : mins + ' min';
        } else if (r.checkInTime && r.isCheckedIn) {
            const mins = Math.round((Date.now() - new Date(r.checkInTime)) / 60000);
            duration = (mins >= 60 ? Math.floor(mins/60) + 'h ' + (mins%60) + 'm' : mins + ' min') + ' (ongoing)';
        }

        const photoCell = r.checkInPhoto
            ? `<img src="${r.checkInPhoto}" style="width:52px;height:52px;object-fit:cover;border-radius:8px;border:2px solid #e0e0e0;" alt="Check-in photo">`
            : `<div style="width:52px;height:52px;background:#f0f2f5;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:22px;border:2px solid #e8ecef;">📷</div>`;

        return `<tr>
            <td><div class="td-inner">${photoCell}</div></td>
            <td><div class="td-inner">${r.rollNumber || '—'}</div></td>
            <td>
                <div class="td-inner student-name-cell">
                    <strong>${r.studentName || '—'}</strong>
                </div>
            </td>
            <td><div class="td-inner">${r.department || '—'}</div></td>
            <td>
                <div class="td-inner time-cell">
                    ${r.checkInTime ? formatTime(r.checkInTime) : '—'}
                    <div class="date-part">${r.checkInTime ? formatDateShort(r.checkInTime) : ''}</div>
                </div>
            </td>
            <td>
                <div class="td-inner time-cell">
                    ${r.checkOutTime ? formatTime(r.checkOutTime) : '—'}
                    <div class="date-part">${r.checkOutTime ? formatDateShort(r.checkOutTime) : ''}</div>
                </div>
            </td>
            <td><div class="td-inner">${r.checkOutTime ? reasonLabel : '—'}</div></td>
            <td><div class="td-inner time-cell">${duration}</div></td>
            <td><div class="td-inner">${statusBadge}</div></td>
        </tr>`;
    }).join('');
}

// ═══════════════════════════════════════════════════════════════════════════════
//  INFO MODAL
// ═══════════════════════════════════════════════════════════════════════════════
function showInfo(passId) {
    const p = allPasses.find(x => x._id === passId);
    if (!p) return;
    document.getElementById('modalContent').innerHTML = [
        ['Pass ID',     'GP' + p._id.toString().slice(-6).toUpperCase()],
        ['Student',     p.studentName || '—'],
        ['Roll Number', p.rollNumber  || '—'],
        ['Department',  p.department  || '—'],
        ['Reason',      p.reason      || '—'],
        ['Return By',   p.returnTime  || '—'],
        ['Requested',   formatDateTime(p.createdAt)],
        ['Status',      p.status],
        ['Reviewed By', p.reviewedBy  || '—'],
        ['Admin Note',  p.adminNote   || '—'],
    ].map(function(row) {
        return `<div class="modal-row"><label>${row[0]}</label><span>${row[1]}</span></div>`;
    }).join('');
    document.getElementById('infoModal').classList.add('open');
}

// ═══════════════════════════════════════════════════════════════════════════════
//  STATS
// ═══════════════════════════════════════════════════════════════════════════════
function updateStats() {
    document.getElementById('statTotal').textContent    = allPasses.length;
    document.getElementById('statPending').textContent  = allPasses.filter(p => p.status === 'pending').length;
    document.getElementById('statApproved').textContent = allPasses.filter(p => p.status === 'approved').length;
    document.getElementById('statCheckedIn').textContent = allCheckIns.filter(r => r.isCheckedIn).length;
}

// ═══════════════════════════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════════════════════════
function showSection(id) {
    document.querySelectorAll('.dashboard-section').forEach(s => s.style.display = 'none');
    const t = document.getElementById('section-' + id);
    if (t) t.style.display = 'block';
}

function apiFetch(url, method, body) {
    const opts = {
        method: method || 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + (localStorage.getItem('authToken') || '') }
    };
    if (body) opts.body = JSON.stringify(body);
    return fetch(url, opts);
}

function showToast(msg, type) {
    const t = document.getElementById('toastMsg');
    t.textContent = msg;
    t.className = 'toast toast-' + (type || 'info') + ' show';
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.className = 'toast', 3500);
}

function formatTime(d) {
    if (!d) return '—';
    return new Date(d).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}
function formatDateShort(d) {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
function formatDateTime(d) {
    if (!d) return '—';
    return new Date(d).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function startAutoLogout() {
    resetAutoLogout();
    ['mousemove','keydown','click','touchstart'].forEach(e => document.addEventListener(e, resetAutoLogout));
}
function resetAutoLogout() {
    clearTimeout(autoLogoutTimer);
    autoLogoutTimer = setTimeout(function() {
        showToast('⏰ Session expired', 'warning');
        setTimeout(handleLogout, 2000);
    }, 5 * 60 * 1000);
}
function handleLogout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    window.location.href = '/';
}