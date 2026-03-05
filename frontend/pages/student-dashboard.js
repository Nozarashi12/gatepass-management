// ─── Language strings ─────────────────────────────────────────────────────────
const LANGS = {
    en: {
        // Sidebar nav
        home: 'Home', request: 'Request Pass', history: 'Pass History',
        notifications: 'Notifications', profile: 'My Profile', help: 'Help',
        // Topbar
        welcome: 'Welcome,', logout: 'Logout',
        // Campus status
        campusStatus: 'CAMPUS STATUS', inside: '🟢 Inside', outside: '🔴 Outside',
        checkIn: 'Check In', checkOut: 'Check Out',
        // Home page
        welcomeBanner: 'Submit and manage your gate passes from here.',
        newRequest: '+ New Pass Request',
        totalRequests: 'Total Requests', pending: 'Pending', approved: 'Approved', rejected: 'Rejected',
        recentRequests: 'Recent Requests',
        colPassId: 'Pass ID', colReason: 'Reason', colDest: 'Destination', colDate: 'Date', colStatus: 'Status', colAction: 'Action',
        view: 'View', noRequests: 'No requests yet',
        // Request form
        newPassRequest: '📝 New Gate Pass Request',
        reasonLabel: 'Reason for Pass', selectReason: 'Select reason',
        medEmergency: 'Medical Emergency', familyFunc: 'Family Function',
        personalWork: 'Personal Work', interview: 'Interview', other: 'Other',
        destLabel: 'Destination', destPlaceholder: 'Where are you going?',
        descLabel: 'Description', descPlaceholder: 'Provide more details...',
        dateLabel: 'Date', exitTimeLabel: 'Exit Time', returnTimeLabel: 'Expected Return Time',
        submitBtn: 'Submit Request',
        // Pass history
        passHistory: '📋 Pass History', noHistory: 'No pass history yet',
        // Pass view
        backBtn: '← Back', printBtn: '🖨️ Print',
        passTitle: '🎫 Gate Pass', passId: 'Pass ID:', studentName: 'Student Name',
        rollNo: 'Roll Number', reason: 'Reason', destination: 'Destination',
        exitTime: 'Exit Time', returnTime: 'Return Time',
        statusApproved: '✅ APPROVED', statusRejected: '❌ REJECTED', statusPending: '⏳ PENDING APPROVAL',
        scanQr: 'Scan to verify this pass',
        // Notifications
        notifTitle: '🔔 Notifications', markRead: 'Mark all read', noNotif: 'No notifications yet',
        // Profile
        profileTitle: 'My Profile',
        rollNumber: 'Roll Number', passIdLabel: 'Pass ID', dept: 'Department', year: 'Year',
        email: 'Email', phone: 'Phone', role: 'Role', registered: 'Registered',
        // Help
        helpTitle: '❓ Help & Guide',
        // Alerts
        geoAlert: '📍 Warning: You appear to be outside the campus boundary!',
        logoutConfirm: 'Are you sure you want to logout?',
    },
    hi: {
        home: 'होम', request: 'पास अनुरोध', history: 'पास इतिहास',
        notifications: 'सूचनाएं', profile: 'मेरी प्रोफ़ाइल', help: 'सहायता',
        welcome: 'स्वागत,', logout: 'लॉगआउट',
        campusStatus: 'कैंपस स्थिति', inside: '🟢 अंदर', outside: '🔴 बाहर',
        checkIn: 'चेक इन', checkOut: 'चेक आउट',
        welcomeBanner: 'यहाँ से अपने गेट पास सबमिट और प्रबंधित करें।',
        newRequest: '+ नया पास अनुरोध',
        totalRequests: 'कुल अनुरोध', pending: 'लंबित', approved: 'स्वीकृत', rejected: 'अस्वीकृत',
        recentRequests: 'हाल के अनुरोध',
        colPassId: 'पास आईडी', colReason: 'कारण', colDest: 'गंतव्य', colDate: 'तारीख', colStatus: 'स्थिति', colAction: 'कार्रवाई',
        view: 'देखें', noRequests: 'अभी कोई अनुरोध नहीं',
        newPassRequest: '📝 नया गेट पास अनुरोध',
        reasonLabel: 'पास का कारण', selectReason: 'कारण चुनें',
        medEmergency: 'चिकित्सा आपातकाल', familyFunc: 'पारिवारिक कार्यक्रम',
        personalWork: 'व्यक्तिगत काम', interview: 'साक्षात्कार', other: 'अन्य',
        destLabel: 'गंतव्य', destPlaceholder: 'आप कहाँ जा रहे हैं?',
        descLabel: 'विवरण', descPlaceholder: 'अधिक जानकारी दें...',
        dateLabel: 'तारीख', exitTimeLabel: 'निकास समय', returnTimeLabel: 'अपेक्षित वापसी समय',
        submitBtn: 'अनुरोध सबमिट करें',
        passHistory: '📋 पास इतिहास', noHistory: 'अभी कोई पास इतिहास नहीं',
        backBtn: '← वापस', printBtn: '🖨️ प्रिंट',
        passTitle: '🎫 गेट पास', passId: 'पास आईडी:', studentName: 'छात्र का नाम',
        rollNo: 'रोल नंबर', reason: 'कारण', destination: 'गंतव्य',
        exitTime: 'निकास समय', returnTime: 'वापसी समय',
        statusApproved: '✅ स्वीकृत', statusRejected: '❌ अस्वीकृत', statusPending: '⏳ अनुमोदन लंबित',
        scanQr: 'इस पास को सत्यापित करने के लिए स्कैन करें',
        notifTitle: '🔔 सूचनाएं', markRead: 'सभी पढ़े हुए चिह्नित करें', noNotif: 'अभी कोई सूचना नहीं',
        profileTitle: 'मेरी प्रोफ़ाइल',
        rollNumber: 'रोल नंबर', passIdLabel: 'पास आईडी', dept: 'विभाग', year: 'वर्ष',
        email: 'ईमेल', phone: 'फ़ोन', role: 'भूमिका', registered: 'पंजीकृत',
        helpTitle: '❓ सहायता और मार्गदर्शिका',
        geoAlert: '📍 चेतावनी: आप कैंपस सीमा के बाहर प्रतीत होते हैं!',
        logoutConfirm: 'क्या आप लॉगआउट करना चाहते हैं?',
    },
    kn: {
        home: 'ಮನೆ', request: 'ಪಾಸ್ ವಿನಂತಿ', history: 'ಪಾಸ್ ಇತಿಹಾಸ',
        notifications: 'ಅಧಿಸೂಚನೆಗಳು', profile: 'ನನ್ನ ಪ್ರೊಫೈಲ್', help: 'ಸಹಾಯ',
        welcome: 'ಸ್ವಾಗತ,', logout: 'ಲಾಗ್ಔಟ್',
        campusStatus: 'ಕ್ಯಾಂಪಸ್ ಸ್ಥಿತಿ', inside: '🟢 ಒಳಗೆ', outside: '🔴 ಹೊರಗೆ',
        checkIn: 'ಚೆಕ್ ಇನ್', checkOut: 'ಚೆಕ್ ಔಟ್',
        welcomeBanner: 'ನಿಮ್ಮ ಗೇಟ್ ಪಾಸ್‌ಗಳನ್ನು ಇಲ್ಲಿ ಸಲ್ಲಿಸಿ ಮತ್ತು ನಿರ್ವಹಿಸಿ.',
        newRequest: '+ ಹೊಸ ಪಾಸ್ ವಿನಂತಿ',
        totalRequests: 'ಒಟ್ಟು ವಿನಂತಿಗಳು', pending: 'ಬಾಕಿ', approved: 'ಅನುಮೋದಿತ', rejected: 'ತಿರಸ್ಕೃತ',
        recentRequests: 'ಇತ್ತೀಚಿನ ವಿನಂತಿಗಳು',
        colPassId: 'ಪಾಸ್ ಐಡಿ', colReason: 'ಕಾರಣ', colDest: 'ಗಮ್ಯಸ್ಥಾನ', colDate: 'ದಿನಾಂಕ', colStatus: 'ಸ್ಥಿತಿ', colAction: 'ಕ್ರಿಯೆ',
        view: 'ವೀಕ್ಷಿಸಿ', noRequests: 'ಇನ್ನೂ ವಿನಂತಿಗಳಿಲ್ಲ',
        newPassRequest: '📝 ಹೊಸ ಗೇಟ್ ಪಾಸ್ ವಿನಂತಿ',
        reasonLabel: 'ಪಾಸ್‌ಗೆ ಕಾರಣ', selectReason: 'ಕಾರಣ ಆಯ್ಕೆಮಾಡಿ',
        medEmergency: 'ವೈದ್ಯಕೀಯ ತುರ್ತು', familyFunc: 'ಕೌಟುಂಬಿಕ ಕಾರ್ಯಕ್ರಮ',
        personalWork: 'ವೈಯಕ್ತಿಕ ಕೆಲಸ', interview: 'ಸಂದರ್ಶನ', other: 'ಇತರೆ',
        destLabel: 'ಗಮ್ಯಸ್ಥಾನ', destPlaceholder: 'ನೀವು ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತಿದ್ದೀರಿ?',
        descLabel: 'ವಿವರಣೆ', descPlaceholder: 'ಹೆಚ್ಚಿನ ವಿವರಗಳನ್ನು ನೀಡಿ...',
        dateLabel: 'ದಿನಾಂಕ', exitTimeLabel: 'ನಿರ್ಗಮನ ಸಮಯ', returnTimeLabel: 'ನಿರೀಕ್ಷಿತ ವಾಪಸಾತಿ ಸಮಯ',
        submitBtn: 'ವಿನಂತಿ ಸಲ್ಲಿಸಿ',
        passHistory: '📋 ಪಾಸ್ ಇತಿಹಾಸ', noHistory: 'ಇನ್ನೂ ಪಾಸ್ ಇತಿಹಾಸವಿಲ್ಲ',
        backBtn: '← ಹಿಂದೆ', printBtn: '🖨️ ಮುದ್ರಿಸಿ',
        passTitle: '🎫 ಗೇಟ್ ಪಾಸ್', passId: 'ಪಾಸ್ ಐಡಿ:', studentName: 'ವಿದ್ಯಾರ್ಥಿಯ ಹೆಸರು',
        rollNo: 'ರೋಲ್ ನಂಬರ್', reason: 'ಕಾರಣ', destination: 'ಗಮ್ಯಸ್ಥಾನ',
        exitTime: 'ನಿರ್ಗಮನ ಸಮಯ', returnTime: 'ವಾಪಸಾತಿ ಸಮಯ',
        statusApproved: '✅ ಅನುಮೋದಿತ', statusRejected: '❌ ತಿರಸ್ಕೃತ', statusPending: '⏳ ಅನುಮೋದನೆ ಬಾಕಿ',
        scanQr: 'ಈ ಪಾಸ್ ಅನ್ನು ಪರಿಶೀಲಿಸಲು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',
        notifTitle: '🔔 ಅಧಿಸೂಚನೆಗಳು', markRead: 'ಎಲ್ಲವನ್ನು ಓದಿದಂತೆ ಗುರುತಿಸಿ', noNotif: 'ಇನ್ನೂ ಅಧಿಸೂಚನೆಗಳಿಲ್ಲ',
        profileTitle: 'ನನ್ನ ಪ್ರೊಫೈಲ್',
        rollNumber: 'ರೋಲ್ ನಂಬರ್', passIdLabel: 'ಪಾಸ್ ಐಡಿ', dept: 'ವಿಭಾಗ', year: 'ವರ್ಷ',
        email: 'ಇಮೇಲ್', phone: 'ಫೋನ್', role: 'ಪಾತ್ರ', registered: 'ನೋಂದಾಯಿಸಲಾಗಿದೆ',
        helpTitle: '❓ ಸಹಾಯ ಮತ್ತು ಮಾರ್ಗದರ್ಶಿ',
        geoAlert: '📍 ಎಚ್ಚರಿಕೆ: ನೀವು ಕ್ಯಾಂಪಸ್ ಗಡಿಯ ಹೊರಗೆ ತೋರುತ್ತಿದ್ದೀರಿ!',
        logoutConfirm: 'ನೀವು ಲಾಗ್ಔಟ್ ಮಾಡಲು ಬಯಸುವಿರಾ?',
    }
};

// ─── State ────────────────────────────────────────────────────────────────────
let currentUser = null;
let currentLang = 'en';
let idleTimer = null;
let idleSeconds = 300;
let geoWatchId = null;
let previousPage = 'home';
let isCheckedIn = false;
let geofenceWatchId = null;
let notifPollInterval = null;

const IDLE_LIMIT  = 300;
const IDLE_WARN_AT = 60;

// ── Campus coordinates — replace with your college's actual GPS location ──────
// To find: open Google Maps → right-click your college → copy the coordinates
const CAMPUS = {
    lat: 12.2958,    // 👈 Replace with your college latitude
    lng: 76.6394,    // 👈 Replace with your college longitude
    radiusMeters: 500
};
const COLLEGE_START = 8;   // 8 AM
const COLLEGE_END   = 17;  // 5 PM

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    const stored = localStorage.getItem('currentUser');
    if (!stored) { window.location.href = '/index.html'; return; }

    currentUser = JSON.parse(stored);
    if (currentUser.role !== 'student') {
        window.location.href = '/pages/admin-dashboard.html'; return;
    }

    setupSidebar();
    setupProfile();
    loadStats();
    loadRecentTable();
    loadHistory();
    loadNotifications();
    setupRequestForm();
    startIdleTimer();
    startGeoWatch();

    // ── Check-in / Check-out ──
    loadCheckInStatus();
    document.getElementById('btnCheckIn').addEventListener('click', handleCheckIn);
    document.getElementById('btnCheckOut').addEventListener('click', function () { handleCheckOut('manual'); });

    // Poll DB for notification updates every 30s
    notifPollInterval = setInterval(pollDBNotifications, 10000);

    // Auto-checkout at end of college day
    scheduleAutoCheckout();

    // Language
    document.getElementById('langSelect').addEventListener('change', function () {
        currentLang = this.value;
        applyLanguage();
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', function () {
        if (confirm(LANGS[currentLang].logoutConfirm)) logout();
    });

    // Mobile menu
    document.getElementById('menuToggle').addEventListener('click', function () {
        document.getElementById('sidebar').classList.add('open');
        document.getElementById('sidebarOverlay').classList.add('visible');
    });
    document.getElementById('sidebarOverlay').addEventListener('click', function () {
        document.getElementById('sidebar').classList.remove('open');
        document.getElementById('sidebarOverlay').classList.remove('visible');
    });

    document.getElementById('newRequestHomeBtn').addEventListener('click', function () { showPage('request'); });
    document.getElementById('printPassBtn').addEventListener('click', function () { window.print(); });
    document.getElementById('backFromPassBtn').addEventListener('click', function () { showPage(previousPage); });
    document.getElementById('markAllReadBtn').addEventListener('click', markAllNotificationsRead);

    // ['mousemove', 'keydown', 'click', 'touchstart'].forEach(function (evt) {
    //     document.addEventListener(evt, resetIdle, { passive: true });
    // });

    applyLanguage();
});

// ═══════════════════════════════════════════════════════════════════════════════
//  CHECK-IN / CHECK-OUT
// ═══════════════════════════════════════════════════════════════════════════════
async function loadCheckInStatus() {
    try {
        const res  = await apiFetch('/api/passes/checkin/status');
        if (!res.ok) return;
        const data = await res.json();
        isCheckedIn = data.isCheckedIn;
        updateCheckInUI();
        if (data.record && data.record.checkInTime) {
            document.getElementById('checkInTimeDisplay').textContent =
                'Since ' + formatTime(data.record.checkInTime);
        }
    } catch(e) { /* server may not be running yet */ }
}

function updateCheckInUI() {
    const btnIn  = document.getElementById('btnCheckIn');
    const btnOut = document.getElementById('btnCheckOut');
    const badge  = document.getElementById('campusStatusBadge');
    const tci = LANGS[currentLang] || LANGS['en'];
    btnIn.disabled  = isCheckedIn;
    btnOut.disabled = !isCheckedIn;
    badge.textContent = isCheckedIn ? tci.inside : tci.outside;
    badge.className   = 'campus-status-badge ' + (isCheckedIn ? 'in' : 'out');
    if (btnIn)  btnIn.textContent  = tci.checkIn;
    if (btnOut) btnOut.textContent = tci.checkOut;
}

// ── Camera-first check-in flow ────────────────────────────────────────────────
let _cameraStream   = null;
let _capturedPhoto  = null;
let _pendingLocation = { lat: null, lng: null };

async function handleCheckIn() {
    document.getElementById('btnCheckIn').disabled = true;

    // Step 1: get GPS in background while camera opens
    navigator.geolocation.getCurrentPosition(
        function(pos) { _pendingLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude }; },
        function()    { _pendingLocation = { lat: null, lng: null }; }
    );

    // Step 2: open camera modal
    await openCameraModal();
}

async function openCameraModal() {
    const modal    = document.getElementById('cameraModal');
    const video    = document.getElementById('cameraFeed');
    const canvas   = document.getElementById('captureCanvas');
    const errEl    = document.getElementById('cameraError');
    const camAct   = document.getElementById('cameraActions');
    const confAct  = document.getElementById('confirmActions');

    // Reset state
    _capturedPhoto = null;
    canvas.style.display = 'none';
    video.style.display  = 'block';
    camAct.style.display  = 'flex';
    confAct.style.display = 'none';
    errEl.style.display   = 'none';
    modal.style.display   = 'flex';

    try {
        _cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        video.srcObject = _cameraStream;
    } catch(e) {
        // Camera denied or unavailable — check in without photo
        errEl.textContent = '⚠️ Camera unavailable. Checking in without photo.';
        errEl.style.display = 'block';
        camAct.style.display = 'none';
        confAct.style.display = 'none';
        setTimeout(async function() {
            closeCameraModal();
            await doCheckIn(_pendingLocation.lat, _pendingLocation.lng, null);
        }, 1800);
        return;
    }

    // Capture button
    document.getElementById('btnCapture').onclick = function() {
        canvas.width  = video.videoWidth  || 640;
        canvas.height = video.videoHeight || 480;
        canvas.getContext('2d').drawImage(video, 0, 0);
        _capturedPhoto = canvas.toDataURL('image/jpeg', 0.75);

        // Stop live feed, show preview
        stopCameraStream();
        video.style.display  = 'none';
        canvas.style.display = 'block';
        camAct.style.display  = 'none';
        confAct.style.display = 'flex';
    };

    // Retake button
    document.getElementById('btnRetake').onclick = async function() {
        _capturedPhoto = null;
        canvas.style.display = 'none';
        video.style.display  = 'block';
        camAct.style.display  = 'flex';
        confAct.style.display = 'none';
        // Restart stream
        try {
            _cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
            video.srcObject = _cameraStream;
        } catch(e) { /* ignore */ }
    };

    // Confirm check-in
    document.getElementById('btnConfirmCheckin').onclick = async function() {
        closeCameraModal();
        await doCheckIn(_pendingLocation.lat, _pendingLocation.lng, _capturedPhoto);
    };

    // Cancel
    document.getElementById('btnCancelCamera').onclick = function() {
        closeCameraModal();
        updateCheckInUI(); // re-enable check-in button
    };
}

function stopCameraStream() {
    if (_cameraStream) {
        _cameraStream.getTracks().forEach(function(t) { t.stop(); });
        _cameraStream = null;
    }
}

function closeCameraModal() {
    stopCameraStream();
    document.getElementById('cameraModal').style.display = 'none';
}

async function doCheckIn(lat, lng, photo) {
    try {
        const body = {
            studentName: currentUser.name,
            rollNumber:  currentUser.roll,
            department:  currentUser.dept
        };
        if (lat && lng)  { body.latitude = lat; body.longitude = lng; }
        if (photo)       { body.checkInPhoto = photo; }

        const res  = await apiFetch('/api/passes/checkin', 'POST', body);
        const data = await res.json();
        if (!res.ok) { showToast(data.error || 'Check-in failed', 'error'); updateCheckInUI(); return; }
        isCheckedIn = true;
        updateCheckInUI();
        document.getElementById('checkInTimeDisplay').textContent = 'Since ' + formatTime(new Date());
        showToast('✅ Checked in successfully!', 'success');
    } catch(e) { showToast('Check-in failed — server unreachable', 'error'); updateCheckInUI(); }
}

async function handleCheckOut(reason) {
    reason = reason || 'manual';
    document.getElementById('btnCheckOut').disabled = true;
    navigator.geolocation.getCurrentPosition(
        async function(pos) { await doCheckOut(reason, pos.coords.latitude, pos.coords.longitude); },
        async function()    { await doCheckOut(reason, null, null); }
    );
}

async function doCheckOut(reason, lat, lng) {
    try {
        const body = { reason };
        if (lat && lng) { body.latitude = lat; body.longitude = lng; }
        const res  = await apiFetch('/api/passes/checkout', 'POST', body);
        const data = await res.json();
        if (!res.ok) { showToast(data.error || 'Check-out failed', 'error'); updateCheckInUI(); return; }
        isCheckedIn = false;
        updateCheckInUI();
        document.getElementById('checkInTimeDisplay').textContent = '';
        const msg = reason === 'geofence'         ? '📍 Auto checked out — left campus boundary'
                  : reason === 'auto-end-of-day'  ? '🕔 Auto checked out — end of college hours'
                  : '✅ Checked out successfully!';
        showToast(msg, reason === 'manual' ? 'success' : 'warning');
    } catch(e) { showToast('Check-out failed — server unreachable', 'error'); updateCheckInUI(); }
}

// ── Geofence auto-checkout ────────────────────────────────────────────────────
function startGeofenceWatch() {
    if (!navigator.geolocation) return;
    geofenceWatchId = navigator.geolocation.watchPosition(function(pos) {
        const dist = getDistance(pos.coords.latitude, pos.coords.longitude, CAMPUS.lat, CAMPUS.lng);
        const hour = new Date().getHours();
        if (isCheckedIn && dist > CAMPUS.radiusMeters && hour >= COLLEGE_START && hour < COLLEGE_END) {
            showToast('📍 You have left campus. Auto checking out...', 'warning');
            handleCheckOut('geofence');
        }
    }, null, { enableHighAccuracy: true, maximumAge: 30000, timeout: 10000 });
}

function scheduleAutoCheckout() {
    const end = new Date(); end.setHours(COLLEGE_END, 0, 0, 0);
    const ms  = end - new Date();
    if (ms > 0) {
        setTimeout(function() {
            if (isCheckedIn) {
                showToast('🕔 College hours ended. Auto checking out...', 'warning');
                handleCheckOut('auto-end-of-day');
            }
        }, ms);
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
//  SIDEBAR NAV
// ═══════════════════════════════════════════════════════════════════════════════
function setupSidebar() {
    document.querySelectorAll('.nav-item[data-page]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            showPage(this.dataset.page);
            document.getElementById('sidebar').classList.remove('open');
            document.getElementById('sidebarOverlay').classList.remove('visible');
        });
    });
}

function showPage(pageId) {
    if (pageId !== 'passview') previousPage = pageId;
    document.querySelectorAll('.page').forEach(function (p) { p.classList.remove('active'); });
    document.querySelectorAll('.nav-item[data-page]').forEach(function (n) { n.classList.remove('active'); });
    const page = document.getElementById('page-' + pageId);
    if (page) page.classList.add('active');
    const navBtn = document.querySelector('.nav-item[data-page="' + pageId + '"]');
    if (navBtn) navBtn.classList.add('active');
    const titles = {
        home: 'Home', request: 'Request Pass', history: 'Pass History',
        passview: 'View Pass', notifications: 'Notifications', profile: 'My Profile', help: 'Help'
    };
    document.getElementById('topbarTitle').textContent = titles[pageId] || pageId;
}

// ═══════════════════════════════════════════════════════════════════════════════
//  PROFILE
// ═══════════════════════════════════════════════════════════════════════════════
function setupProfile() {
    document.getElementById('topbarWelcomeName').textContent = currentUser.name;
    document.getElementById('welcomeBannerText').textContent = 'Welcome back, ' + currentUser.name + '! 👋';
    document.getElementById('sidebarName').textContent = currentUser.name;
    document.getElementById('sidebarRoll').textContent = 'Roll: ' + currentUser.roll;

    if (currentUser.profilePic) {
        document.getElementById('sidebarAvatar').innerHTML =
            '<img src="' + currentUser.profilePic + '" alt="avatar">';
        document.getElementById('profilePicLarge').innerHTML =
            '<img src="' + currentUser.profilePic + '" alt="avatar">';
    }

    document.getElementById('profileDetails').innerHTML =
        '<h2 style="font-size:20px;color:#1a1a2e;margin-bottom:4px;">' + currentUser.name + '</h2>' +
        '<p style="color:#888;font-size:13px;margin-bottom:20px;">' +
        (currentUser.dept || '') + ' • ' + (currentUser.year || '') + '</p>' +
        detail('Roll Number', currentUser.roll) +
        detail('Pass ID', currentUser.passId || '—') +
        detail('Department', currentUser.dept || '—') +
        detail('Year', currentUser.year || '—') +
        detail('Email', currentUser.email || '—') +
        detail('Phone', currentUser.phone || '—') +
        detail('Role', currentUser.role || '—') +
        detail('Registered', formatDate(currentUser.createdAt));
}

function detail(label, value) {
    return '<div class="profile-detail">' +
        '<label>' + label + '</label>' +
        '<p>' + value + '</p>' +
        '</div>';
}

// ═══════════════════════════════════════════════════════════════════════════════
//  STATS
// ═══════════════════════════════════════════════════════════════════════════════
function loadStats() {
    const requests = getUserRequests();
    document.getElementById('statTotal').textContent    = requests.length;
    document.getElementById('statPending').textContent  = requests.filter(function (r) { return r.status === 'pending'; }).length;
    document.getElementById('statApproved').textContent = requests.filter(function (r) { return r.status === 'approved'; }).length;
    document.getElementById('statRejected').textContent = requests.filter(function (r) { return r.status === 'rejected'; }).length;
}

// ═══════════════════════════════════════════════════════════════════════════════
//  RECENT TABLE
// ═══════════════════════════════════════════════════════════════════════════════
function loadRecentTable() {
    const requests = getUserRequests().slice(0, 6);
    const tbody = document.getElementById('recentTableBody');
    const t = LANGS[currentLang];
    if (!requests.length) {
        tbody.innerHTML = '<tr><td colspan="6"><div class="empty-state"><div class="empty-icon">📭</div><p>' + t.noRequests + '</p></div></td></tr>';
        return;
    }
    tbody.innerHTML = requests.map(function (r) {
        return '<tr>' +
            '<td><strong>' + r.passId + '</strong></td>' +
            '<td>' + r.reason + '</td>' +
            '<td>' + (r.destination || '—') + '</td>' +
            '<td>' + r.date + '</td>' +
            '<td><span class="status-badge status-' + r.status + '">' + r.status + '</span></td>' +
            '<td><button class="btn btn-secondary btn-sm" data-passid="' + r.id + '">' + t.view + '</button></td>' +
            '</tr>';
    }).join('');
    tbody.querySelectorAll('[data-passid]').forEach(function (btn) {
        btn.addEventListener('click', function () { viewPass(+this.dataset.passid, 'home'); });
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
//  HISTORY TABLE
// ═══════════════════════════════════════════════════════════════════════════════
function loadHistory() {
    const requests = getUserRequests();
    const tbody = document.getElementById('historyTableBody');
    const th = LANGS[currentLang];
    if (!requests.length) {
        tbody.innerHTML = '<tr><td colspan="6"><div class="empty-state"><div class="empty-icon">📭</div><p>' + th.noHistory + '</p></div></td></tr>';
        return;
    }
    tbody.innerHTML = requests.map(function (r) {
        return '<tr>' +
            '<td><strong>' + r.passId + '</strong></td>' +
            '<td>' + r.reason + '</td>' +
            '<td>' + (r.destination || '—') + '</td>' +
            '<td>' + r.date + '</td>' +
            '<td><span class="status-badge status-' + r.status + '">' + r.status + '</span></td>' +
            '<td><button class="btn btn-secondary btn-sm" data-passid="' + r.id + '">' + th.view + '</button></td>' +
            '</tr>';
    }).join('');
    tbody.querySelectorAll('[data-passid]').forEach(function (btn) {
        btn.addEventListener('click', function () { viewPass(+this.dataset.passid, 'history'); });
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
//  VIEW PASS
// ═══════════════════════════════════════════════════════════════════════════════
function viewPass(id, fromPage) {
    const requests = JSON.parse(localStorage.getItem('gatePassRequests') || '[]');
    const r = requests.find(function (req) { return req.id === id; });
    if (!r) return;
    if (fromPage) previousPage = fromPage;

    const passCard = document.getElementById('passCardView');
    passCard.innerHTML =
        '<div class="pass-card-header">' +
            '<div><h3>🎫 Gate Pass</h3><div class="pass-id">Pass ID: ' + r.passId + '</div></div>' +
            '<div style="text-align:right;font-size:12px;opacity:0.8;">' + (currentUser.dept || '') + '<br>' + (currentUser.year || '') + '</div>' +
        '</div>' +
        '<div class="pass-card-body">' +
            '<div class="pass-field"><label>Student Name</label><p>' + r.name + '</p></div>' +
            '<div class="pass-field"><label>Roll Number</label><p>' + currentUser.roll + '</p></div>' +
            '<div class="pass-field"><label>Reason</label><p>' + r.reason + '</p></div>' +
            '<div class="pass-field"><label>Destination</label><p>' + (r.destination || '—') + '</p></div>' +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">' +
                '<div class="pass-field"><label>Exit Time</label><p>' + r.date + ' ' + r.time + '</p></div>' +
                '<div class="pass-field"><label>Return Time</label><p>' + r.date + ' ' + r.exitTime + '</p></div>' +
            '</div>' +
        '</div>' +
        '<div class="pass-status-bar ' + r.status + '">' +
            (r.status === 'approved' ? '✅ APPROVED' : r.status === 'rejected' ? '❌ REJECTED' : '⏳ PENDING APPROVAL') +
        '</div>' +
        (r.status === 'approved' ?
            '<div class="pass-qr"><div id="qrcode"></div><p>Scan to verify this pass</p></div>' : '');

    if (r.status === 'approved') {
        setTimeout(function () {
            const qrEl = document.getElementById('qrcode');
            if (!qrEl) return;
            new QRCode(qrEl, {
                text: JSON.stringify({ passId: r.passId, name: r.name, roll: currentUser.roll, reason: r.reason, date: r.date, time: r.time, exitTime: r.exitTime }),
                width: 150, height: 150, colorDark: '#1a1a2e', colorLight: '#ffffff'
            });
        }, 100);
    }
    showPage('passview');
}

// ═══════════════════════════════════════════════════════════════════════════════
//  REQUEST FORM — saves to both localStorage AND MongoDB
// ═══════════════════════════════════════════════════════════════════════════════
function setupRequestForm() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('reqDate').min   = today;
    document.getElementById('reqDate').value = today;

    document.getElementById('reqDate').addEventListener('change', function () {
        if (new Date(this.value) < new Date('2026-01-01')) {
            this.value = today;
            showMsg('requestMsg', 'warning', 'Date must be 2026 or later');
        }
    });

    document.getElementById('submitRequestBtn').addEventListener('click', async function () {
        const reason      = document.getElementById('reqReason').value;
        const destination = document.getElementById('reqDestination').value.trim();
        const description = document.getElementById('reqDescription').value.trim();
        const date        = document.getElementById('reqDate').value;
        const time        = document.getElementById('reqTime').value;
        const returnTime  = document.getElementById('reqReturn').value;

        if (!reason || !destination || !description || !date || !time || !returnTime) {
            showMsg('requestMsg', 'error', 'Please fill in all fields'); return;
        }
        if (time >= returnTime) {
            showMsg('requestMsg', 'error', 'Return time must be after exit time'); return;
        }

        const btn = document.getElementById('submitRequestBtn');
        btn.disabled = true; btn.textContent = '⏳ Submitting...';

        try {
            // ── Save to MongoDB ──
            const res  = await apiFetch('/api/passes/request', 'POST', {
                reason:      reason + (destination ? ' — ' + destination : ''),
                returnTime:  returnTime,
                studentName: currentUser.name,
                rollNumber:  currentUser.roll,
                department:  currentUser.dept
            });
            const data = await res.json();

            if (!res.ok) {
                showMsg('requestMsg', 'error', data.error || 'Submission failed');
                return;
            }

            // ── Also save to localStorage (for QR / history view) ──
            const passId = data.pass ? data.pass._id.toString().slice(-6).toUpperCase() : ('GP' + Date.now().toString().slice(-6));
            const newRequest = {
                id: Date.now(),
                passId: 'GP' + passId,
                dbId: data.pass ? data.pass._id : null,
                userId: currentUser.id,
                username: currentUser.roll,
                name: currentUser.name,
                roll: currentUser.roll,
                dept: currentUser.dept,
                year: currentUser.year,
                reason, destination, description, date, time,
                exitTime: returnTime,
                status: 'pending',
                requestedAt: new Date().toISOString(),
                approvedBy: null, approvedAt: null
            };
            const requests = JSON.parse(localStorage.getItem('gatePassRequests') || '[]');
            requests.push(newRequest);
            localStorage.setItem('gatePassRequests', JSON.stringify(requests));

            addNotification('Pass request submitted', 'Your request (' + newRequest.passId + ') for ' + reason + ' has been submitted.', 'info');
            showMsg('requestMsg', 'success', '✅ Request submitted! Pass ID: ' + newRequest.passId);

            // Reset form
            document.getElementById('reqReason').value = '';
            document.getElementById('reqDestination').value = '';
            document.getElementById('reqDescription').value = '';
            document.getElementById('reqDate').value = today;
            document.getElementById('reqTime').value = '';
            document.getElementById('reqReturn').value = '';

            loadStats(); loadRecentTable(); loadHistory(); updateNotifBadge();

        } catch(e) {
            showMsg('requestMsg', 'error', '⚠️ Cannot reach server. Make sure you are using http://localhost:5000');
        } finally {
            btn.disabled = false; btn.textContent = 'Submit Request';
        }
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
//  NOTIFICATIONS — localStorage + DB polling
// ═══════════════════════════════════════════════════════════════════════════════
function addNotification(title, message, type) {
    const key = 'userNotifications_' + currentUser.id;
    const notifs = JSON.parse(localStorage.getItem(key) || '[]');
    notifs.unshift({ id: Date.now(), title, message, type: type || 'info', read: false, timestamp: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(notifs));
    updateNotifBadge();
}

// Poll DB — fetch ALL student passes fresh, sync status to localStorage, re-render
async function pollDBNotifications() {
    try {
        // Fetch all this student's passes fresh from MongoDB
        const res = await apiFetch('/api/passes/my');
        if (!res.ok) return;
        const data = await res.json();
        const dbPasses = data.passes || [];

        if (dbPasses.length === 0) return;

        const allReqs  = JSON.parse(localStorage.getItem('gatePassRequests') || '[]');
        const notifKey = 'notifiedPasses_' + currentUser.id;
        const notified = JSON.parse(localStorage.getItem(notifKey) || '[]');
        let changed = false;

        dbPasses.forEach(function(p) {
            const pid = p._id.toString();

            // Sync status into localStorage record
            const idx = allReqs.findIndex(function(r) {
                return r.dbId === pid || r.dbId === p._id;
            });
            if (idx !== -1 && allReqs[idx].status !== p.status) {
                allReqs[idx].status    = p.status;
                allReqs[idx].adminNote = p.adminNote || '';
                changed = true;
            }

            // Fire notification + toast once per reviewed pass
            if ((p.status === 'approved' || p.status === 'rejected') && !notified.includes(pid)) {
                addNotification(
                    'Pass ' + p.status,
                    'Your gate pass was ' + p.status + (p.adminNote ? ' — "' + p.adminNote + '"' : '') + '.',
                    p.status === 'approved' ? 'success' : 'error'
                );
                showToast(
                    p.status === 'approved' ? '✅ Your gate pass was approved!' : '❌ Your gate pass was rejected.',
                    p.status === 'approved' ? 'success' : 'error'
                );
                notified.push(pid);
                changed = true;
            }
        });

        localStorage.setItem('gatePassRequests', JSON.stringify(allReqs));
        localStorage.setItem(notifKey, JSON.stringify(notified));

        // Always re-render so stats + table stay current
        loadStats();
        loadRecentTable();
        loadHistory();

    } catch(e) { /* silent — server may be temporarily unreachable */ }
}

function loadNotifications() {
    const key = 'userNotifications_' + currentUser.id;
    const notifs = JSON.parse(localStorage.getItem(key) || '[]');
    const container = document.getElementById('notifList');
    updateNotifBadge();

    // Check localStorage for status changes too
    const requests = getUserRequests();
    requests.forEach(function (r) {
        if ((r.status === 'approved' || r.status === 'rejected') && !r.notified) {
            const allRequests = JSON.parse(localStorage.getItem('gatePassRequests') || '[]');
            const idx = allRequests.findIndex(function (req) { return req.id === r.id; });
            if (idx !== -1) {
                allRequests[idx].notified = true;
                localStorage.setItem('gatePassRequests', JSON.stringify(allRequests));
                addNotification('Pass ' + r.status, 'Your pass (' + r.passId + ') has been ' + r.status + '.', r.status === 'approved' ? 'success' : 'error');
            }
        }
    });

    if (!notifs.length) {
        container.innerHTML = '<div class="empty-state"><div class="empty-icon">🔔</div><p>No notifications yet</p></div>';
        return;
    }

    const icons = { info: 'ℹ️', success: '✅', warning: '⚠️', error: '❌' };
    container.innerHTML = notifs.map(function (n) {
        return '<div style="padding:14px 0;border-bottom:1px solid #f5f5f5;' +
            (!n.read ? 'background:#f8f9ff;padding-left:10px;border-radius:8px;' : '') + '">' +
            '<div style="display:flex;gap:12px;align-items:flex-start;">' +
            '<span style="font-size:20px;">' + (icons[n.type] || 'ℹ️') + '</span>' +
            '<div style="flex:1;">' +
            '<p style="font-weight:600;font-size:14px;color:#1a1a2e;">' + n.title + (!n.read ? ' <span class="notif-dot"></span>' : '') + '</p>' +
            '<p style="font-size:13px;color:#666;margin-top:3px;">' + n.message + '</p>' +
            '<p style="font-size:11px;color:#aaa;margin-top:4px;">' + formatDate(n.timestamp) + '</p>' +
            '</div></div></div>';
    }).join('');
}

function updateNotifBadge() {
    const key = 'userNotifications_' + currentUser.id;
    const notifs = JSON.parse(localStorage.getItem(key) || '[]');
    const unread = notifs.filter(function (n) { return !n.read; }).length;
    const badge = document.getElementById('notifBadge');
    if (unread > 0) { badge.style.display = 'inline'; badge.textContent = unread; }
    else { badge.style.display = 'none'; }
}

function markAllNotificationsRead() {
    const key = 'userNotifications_' + currentUser.id;
    const notifs = JSON.parse(localStorage.getItem(key) || '[]');
    notifs.forEach(function (n) { n.read = true; });
    localStorage.setItem(key, JSON.stringify(notifs));
    loadNotifications();
}

// ═══════════════════════════════════════════════════════════════════════════════
//  AUTO LOGOUT (5 min idle)
// ═══════════════════════════════════════════════════════════════════════════════
function startIdleTimer() {
    idleSeconds = IDLE_LIMIT;
    updateIdleDisplay();
    idleTimer = setInterval(function () {
        idleSeconds--;
        updateIdleDisplay();
        if (idleSeconds <= IDLE_WARN_AT) {
            document.getElementById('idleWarning').style.display = 'block';
            document.getElementById('idleCountdown').textContent = idleSeconds;
        }
        if (idleSeconds <= 0) { logout(true); }
    }, 1000);
}

function resetIdle() {
    idleSeconds = IDLE_LIMIT;
    document.getElementById('idleWarning').style.display = 'none';
    updateIdleDisplay();
}

function updateIdleDisplay() {
    const m = Math.floor(idleSeconds / 60);
    const s = idleSeconds % 60;
    document.getElementById('idleTimerDisplay').textContent =
        '⏱ ' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

// ═══════════════════════════════════════════════════════════════════════════════
//  GEOLOCATION (campus boundary alert — existing)
// ═══════════════════════════════════════════════════════════════════════════════
function startGeoWatch() {
    if (!navigator.geolocation) return;
    const boundary = JSON.parse(localStorage.getItem('campusBoundary') || 'null');
    if (!boundary) return;
    geoWatchId = navigator.geolocation.watchPosition(function (pos) {
        const dist = getDistance(pos.coords.latitude, pos.coords.longitude, boundary.lat, boundary.lng);
        const alertEl = document.getElementById('geoAlert');
        if (dist > boundary.radius) {
            alertEl.textContent = LANGS[currentLang].geoAlert;
            alertEl.style.display = 'block';
        } else {
            alertEl.style.display = 'none';
        }
    }, null, { enableHighAccuracy: true, maximumAge: 30000 });
}

// ═══════════════════════════════════════════════════════════════════════════════
//  LOGOUT
// ═══════════════════════════════════════════════════════════════════════════════
function logout(auto) {
    clearInterval(idleTimer);
    clearInterval(notifPollInterval);
    if (geoWatchId) navigator.geolocation.clearWatch(geoWatchId);
    if (geofenceWatchId) navigator.geolocation.clearWatch(geofenceWatchId);

    logActivity(currentUser.name, currentUser.roll, 'Logout', auto ? 'Auto logout due to inactivity' : 'Manual logout');
    if (auto) alert('You have been logged out due to 5 minutes of inactivity.');

    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    window.location.href = '/index.html';
}

// ═══════════════════════════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════════════════════════
function getUserRequests() {
    const all = JSON.parse(localStorage.getItem('gatePassRequests') || '[]');
    return all
        .filter(function (r) { return r.userId === currentUser.id; })
        .sort(function (a, b) { return new Date(b.requestedAt) - new Date(a.requestedAt); });
}

function apiFetch(url, method, body) {
    method = method || 'GET';
    const opts = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + (localStorage.getItem('authToken') || '')
        }
    };
    if (body) opts.body = JSON.stringify(body);
    return fetch(url, opts);
}

function showToast(msg, type) {
    let t = document.getElementById('toastMsg');
    if (!t) { t = document.createElement('div'); t.id = 'toastMsg'; document.body.appendChild(t); }
    t.textContent = msg;
    t.className = 'toast toast-' + (type || 'info') + ' show';
    clearTimeout(t._timer);
    t._timer = setTimeout(function() { t.className = 'toast'; }, 3500);
}

function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function formatDate(ts) {
    if (!ts) return '—';
    return new Date(ts).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function formatTime(d) {
    if (!d) return '';
    return new Date(d).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function showMsg(id, type, text) {
    const el = document.getElementById(id);
    if (!el) return;
    el.className = 'msg ' + type;
    el.textContent = text;
    el.style.display = 'block';
    setTimeout(function () { el.style.display = 'none'; }, 4000);
}

function logActivity(name, roll, activity, details) {
    const logs = JSON.parse(localStorage.getItem('studentLogs') || '[]');
    logs.push({ id: Date.now(), studentName: name, username: roll, activity, details, timestamp: new Date().toISOString() });
    localStorage.setItem('studentLogs', JSON.stringify(logs));
}

function applyLanguage() {
    const t = LANGS[currentLang];

    // ── Geo alert ──
    document.getElementById('geoAlert').textContent = t.geoAlert;

    // ── Topbar ──
    const welcomeEl = document.getElementById('topbarWelcomeName');
    if (welcomeEl && welcomeEl.parentElement)
        welcomeEl.parentElement.childNodes[0].textContent = t.welcome + ' ';
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.innerHTML = '🚪 ' + t.logout;

    // ── Campus status panel ──
    const campusTitle = document.querySelector('.checkin-panel-title');
    if (campusTitle) campusTitle.textContent = t.campusStatus;
    updateCheckInUI(); // re-renders badge text using t.inside / t.outside via updateCheckInUIText()
    const btnCI = document.getElementById('btnCheckIn');
    const btnCO = document.getElementById('btnCheckOut');
    if (btnCI) btnCI.textContent = t.checkIn;
    if (btnCO) btnCO.textContent = t.checkOut;

    // ── Sidebar nav ──
    const navMap = {
        home: t.home, request: t.request, history: t.history,
        notifications: t.notifications, profile: t.profile, help: t.help
    };
    Object.keys(navMap).forEach(function(page) {
        const btn = document.querySelector('.nav-item[data-page="' + page + '"]');
        if (!btn) return;
        const icon = btn.querySelector('.nav-icon');
        const iconHTML = icon ? icon.outerHTML : '';
        btn.innerHTML = iconHTML + ' ' + navMap[page];
        if (page === 'notifications') {
            btn.innerHTML += ' <span class="nav-badge" id="notifBadge" style="display:none">0</span>';
            updateNotifBadge();
        }
    });

    // ── Home page ──
    const bannerSub = document.querySelector('.welcome-banner p');
    if (bannerSub) bannerSub.textContent = t.welcomeBanner;
    const newReqBtn = document.getElementById('newRequestHomeBtn');
    if (newReqBtn) newReqBtn.textContent = t.newRequest;

    // Stat labels
    setText('statTotal',    null, t.totalRequests,  '.stat-info p', '#statTotal');
    setText('statPending',  null, t.pending,         '.stat-info p', '#statPending');
    setText('statApproved', null, t.approved,        '.stat-info p', '#statApproved');
    setText('statRejected', null, t.rejected,        '.stat-info p', '#statRejected');
    // Simpler approach — find each stat card's label paragraph
    document.querySelectorAll('.stat-card').forEach(function(card) {
        const h3 = card.querySelector('h3');
        const p  = card.querySelector('p');
        if (!h3 || !p) return;
        const id = h3.id;
        if (id === 'statTotal')    p.textContent = t.totalRequests;
        if (id === 'statPending')  p.textContent = t.pending;
        if (id === 'statApproved') p.textContent = t.approved;
        if (id === 'statRejected') p.textContent = t.rejected;
    });

    const recentTitle = document.querySelector('#page-home .card-header h3');
    if (recentTitle) recentTitle.textContent = t.recentRequests;

    // Recent table headers
    const recentThs = document.querySelectorAll('#page-home thead th');
    const recentCols = [t.colPassId, t.colReason, t.colDest, t.colDate, t.colStatus, t.colAction];
    recentThs.forEach(function(th, i) { if (recentCols[i]) th.textContent = recentCols[i]; });

    // ── Request Pass page ──
    const reqCardHeader = document.querySelector('#page-request .card-header h3');
    if (reqCardHeader) reqCardHeader.textContent = t.newPassRequest;

    setLabel('reqReason',      t.reasonLabel);
    setLabel('reqDestination', t.destLabel);
    setLabel('reqDescription', t.descLabel);
    setLabel('reqDate',        t.dateLabel);
    setLabel('reqTime',        t.exitTimeLabel);
    setLabel('reqReturn',      t.returnTimeLabel);

    const reasonSel = document.getElementById('reqReason');
    if (reasonSel) {
        reasonSel.options[0].text = t.selectReason;
        reasonSel.options[1].text = t.medEmergency;
        reasonSel.options[2].text = t.familyFunc;
        reasonSel.options[3].text = t.personalWork;
        reasonSel.options[4].text = t.interview;
        reasonSel.options[5].text = t.other;
    }
    const destInput = document.getElementById('reqDestination');
    if (destInput) destInput.placeholder = t.destPlaceholder;
    const descInput = document.getElementById('reqDescription');
    if (descInput) descInput.placeholder = t.descPlaceholder;
    const submitBtn = document.getElementById('submitRequestBtn');
    if (submitBtn) submitBtn.textContent = t.submitBtn;

    // ── Pass History page ──
    const histTitle = document.querySelector('#page-history .card-header h3');
    if (histTitle) histTitle.textContent = t.passHistory;
    const histThs = document.querySelectorAll('#page-history thead th');
    histThs.forEach(function(th, i) { if (recentCols[i]) th.textContent = recentCols[i]; });

    // ── Pass View page ──
    const backBtn  = document.getElementById('backFromPassBtn');
    const printBtn = document.getElementById('printPassBtn');
    if (backBtn)  backBtn.textContent  = t.backBtn;
    if (printBtn) printBtn.textContent = t.printBtn;

    // ── Notifications page ──
    const notifPageTitle = document.querySelector('#page-notifications .card-header h3');
    if (notifPageTitle) notifPageTitle.textContent = t.notifTitle;
    const markReadBtn = document.getElementById('markAllReadBtn');
    if (markReadBtn) markReadBtn.textContent = t.markRead;

    // ── Topbar page title (re-apply for current active page) ──
    const activePage = document.querySelector('.nav-item.active[data-page]');
    if (activePage) {
        const titles = {
            home: t.home, request: t.request, history: t.history,
            notifications: t.notifications, profile: t.profile, help: t.help
        };
        const topbarTitle = document.getElementById('topbarTitle');
        if (topbarTitle) topbarTitle.textContent = titles[activePage.dataset.page] || '';
    }

    // Re-render tables so View buttons and empty states use translated text
    loadRecentTable();
    loadHistory();
}

// Helper: set the label above an input field
function setLabel(inputId, labelText) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const label = input.closest('.form-group') && input.closest('.form-group').querySelector('label');
    if (label) label.textContent = labelText;
}
function setText() {} // stub — not used, kept for safety