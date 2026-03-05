let qrExpiryTimer = null;
let qrTimeRemaining = 300; // 5 minutes
let currentUser = null;

document.addEventListener('DOMContentLoaded', function () {
    if (!localStorage.getItem('authToken')) {
        window.location.href = '../index.html';
        return;
    }

    currentUser = Auth.getCurrentUser();

    if (!currentUser) {
        window.location.href = '../index.html';
        return;
    }

    // Show student info panel
    document.getElementById('studentInfo').style.display = 'block';
    document.getElementById('studentName').textContent = currentUser.name || 'Unknown';
    document.getElementById('studentRole').textContent = 'Role: ' + (currentUser.role || 'Student');
    document.getElementById('studentEmail').textContent = 'Email: ' + (currentUser.email || '—');

    // Attach buttons — no onclick in HTML
    document.getElementById('proceedBtn').addEventListener('click', redirectToDashboard);
    document.getElementById('refreshBtn').addEventListener('click', function () {
        resetQRTimer();
        generateQR();
    });

    window.addEventListener('beforeunload', function () {
        if (qrExpiryTimer) clearInterval(qrExpiryTimer);
    });

    // Generate QR on load
    generateQR();
});

async function generateQR() {
    const qrDisplay = document.getElementById('qrDisplay');
    const controls = document.getElementById('controls');
    const timerDiv = document.getElementById('qrTimer');

    // Reset UI
    controls.style.display = 'none';
    timerDiv.style.display = 'none';
    qrDisplay.innerHTML = '<div class="qr-placeholder"><div class="qr-icon">📷</div><p>Generating QR code...</p></div>';

    showStatus('loading', 'Connecting to server...');

    try {
        const token = localStorage.getItem('authToken');
        const userId = currentUser.id || currentUser._id;

        const response = await fetch('http://localhost:5000/api/auth/generate-qr', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ userId: userId })
        });

        const data = await response.json();

        if (response.ok && data.qrCode) {
            // Show QR image
            const now = new Date().toLocaleTimeString();
            qrDisplay.innerHTML =
                '<img src="' + data.qrCode + '" alt="Your QR Code" />' +
                '<div class="qr-timestamp">Generated at ' + now + '</div>';

            showStatus('success', '✅ QR code ready! Show this to the security officer.');

            // Show timer and controls
            timerDiv.style.display = 'block';
            timerDiv.classList.remove('expired');
            controls.style.display = 'flex';

            // Start expiry countdown
            startQRTimer();

        } else {
            throw new Error(data.error || 'Failed to generate QR code');
        }

    } catch (error) {
        console.error('QR generation error:', error);
        qrDisplay.innerHTML = '<div class="qr-placeholder"><div class="qr-icon">❌</div><p>Could not generate QR</p></div>';
        showStatus('error', '❌ Failed to generate QR code. Check your connection and try again.');
        document.getElementById('controls').style.display = 'flex';
    }
}

function startQRTimer() {
    if (qrExpiryTimer) clearInterval(qrExpiryTimer);
    qrTimeRemaining = 300;

    qrExpiryTimer = setInterval(function () {
        qrTimeRemaining--;

        const minutes = Math.floor(qrTimeRemaining / 60);
        const seconds = qrTimeRemaining % 60;
        document.getElementById('timerDisplay').textContent =
            String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');

        // Warn when under 1 minute
        if (qrTimeRemaining <= 60) {
            document.getElementById('qrTimer').style.background = '#f8d7da';
            document.getElementById('qrTimer').style.borderColor = '#f5c6cb';
            document.getElementById('qrTimer').style.color = '#721c24';
        }

        if (qrTimeRemaining <= 0) {
            clearInterval(qrExpiryTimer);
            document.getElementById('timerDisplay').textContent = 'EXPIRED';
            document.getElementById('qrTimer').classList.add('expired');
            document.getElementById('qrDisplay').innerHTML =
                '<div class="qr-placeholder"><div class="qr-icon">⏰</div><p>QR code has expired.<br>Please generate a new one.</p></div>';
            showStatus('error', '⏰ QR code expired. Click "Generate New QR" to get a fresh one.');
        }
    }, 1000);
}

function resetQRTimer() {
    if (qrExpiryTimer) clearInterval(qrExpiryTimer);
    qrTimeRemaining = 300;
    const timerDiv = document.getElementById('qrTimer');
    timerDiv.classList.remove('expired');
    timerDiv.style.background = '';
    timerDiv.style.borderColor = '';
    timerDiv.style.color = '';
}

function redirectToDashboard() {
    if (qrExpiryTimer) clearInterval(qrExpiryTimer);

    // Log QR verification activity
    if (currentUser) {
        Auth.logStudentActivity(
            currentUser.name,
            currentUser.username,
            'QR Verification',
            'QR code verified and dashboard accessed'
        );
    }

    if (currentUser && currentUser.role === 'admin') {
        window.location.href = 'admin-dashboard.html';
    } else {
        window.location.href = 'user-dashboard.html';
    }
}

function showStatus(type, message) {
    const box = document.getElementById('statusBox');
    const classes = {
        loading: 'status-box status-loading',
        success: 'status-box status-success',
        error: 'status-box status-error'
    };
    const spinner = type === 'loading' ? '<div class="spinner"></div>' : '';
    box.innerHTML = '<div class="' + (classes[type] || 'status-box') + '">' + spinner + '<p>' + message + '</p></div>';
}