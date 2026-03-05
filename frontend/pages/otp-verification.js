let otpTimer;
let timeRemaining = 300;

document.addEventListener('DOMContentLoaded', function () {
    if (!localStorage.getItem('authToken')) {
        window.location.href = '../index.html';
        return;
    }

    // Attach OTP input auto-advance — no onkeyup in HTML
    const inputs = document.querySelectorAll('.otp-input');
    inputs.forEach(function (input, index) {
        input.addEventListener('keyup', function (e) {
            if (e.key === 'Backspace' && input.value === '' && index > 0) {
                inputs[index - 1].focus();
            } else if (input.value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });
    });

    // Attach buttons — no onclick in HTML
    document.getElementById('resendBtn').addEventListener('click', resendOTP);
    document.getElementById('skipBtn').addEventListener('click', skipVerification);

    // Form submit
    document.getElementById('otpForm').addEventListener('submit', async function (e) {
        e.preventDefault();
        const otp = Array.from(document.querySelectorAll('.otp-input'))
            .map(i => i.value).join('');
        if (otp.length !== 6) {
            showStatus('error', 'Please enter all 6 digits');
            return;
        }
        try {
            showStatus('scanning', 'Verifying OTP...');
            setTimeout(function () {
                showStatus('success', 'OTP verified successfully!');
                const user = Auth.getCurrentUser();
                Auth.logStudentActivity(user.name, user.username, 'OTP Verification', 'OTP authentication successful');
                setTimeout(redirectToDashboard, 2000);
            }, 2000);
        } catch (error) {
            showStatus('error', 'Invalid OTP. Please try again.');
        }
    });

    // Cleanup on unload
    window.addEventListener('beforeunload', function () {
        if (otpTimer) clearInterval(otpTimer);
    });

    startOTPTimer();
    setTimeout(resendOTP, 1000);
});

function startOTPTimer() {
    otpTimer = setInterval(function () {
        timeRemaining--;
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        document.getElementById('otpTimer').textContent =
            'Time remaining: ' + String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
        if (timeRemaining <= 0) {
            clearInterval(otpTimer);
            document.getElementById('otpTimer').textContent = 'OTP expired';
            document.getElementById('verifyBtn').disabled = true;
        }
    }, 1000);
}

function resetOTPTimer() {
    clearInterval(otpTimer);
    timeRemaining = 300;
    startOTPTimer();
}

async function resendOTP() {
    try {
        const user = Auth.getCurrentUser();
        showStatus('info', 'Sending new OTP...');
        const response = await fetch('http://localhost:5000/api/auth/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email })
        });
        const data = await response.json();
        if (response.ok) {
            showStatus('success', 'New OTP sent successfully!');
            resetOTPTimer();
        } else {
            throw new Error(data.error || 'Failed to send OTP');
        }
    } catch (error) {
        showStatus('error', 'Failed to resend OTP. Please try again.');
    }
}

function skipVerification() {
    const user = Auth.getCurrentUser();
    Auth.logStudentActivity(user.name, user.username, 'OTP Verification', 'OTP verification skipped');
    redirectToDashboard();
}

function redirectToDashboard() {
    const user = Auth.getCurrentUser();
    if (user && user.role === 'admin') {
        window.location.href = 'admin-dashboard.html';
    } else {
        window.location.href = 'user-dashboard.html';
    }
}

function showStatus(type, message) {
    const statusDiv = document.getElementById('verificationStatus');
    const templates = {
        success: '<div class="status-success"><div class="success-icon">✅</div><p>' + message + '</p></div>',
        error: '<div class="status-error"><div class="error-icon">❌</div><p>' + message + '</p></div>',
        scanning: '<div class="status-scanning"><div class="spinner"></div><p>' + message + '</p></div>',
        info: '<div class="status-info"><div class="info-icon">ℹ️</div><p>' + message + '</p></div>'
    };
    statusDiv.innerHTML = templates[type] || '';
}