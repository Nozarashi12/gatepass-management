// ─── Language strings ─────────────────────────────────────────────────────────
const LANGS = {
    en: {
        logoTitle: 'Gate Pass Management System',
        logoSub: 'Secure • Fast • Reliable',
        loginTab: 'Login', registerTab: 'Register',
        lblRollLogin: 'Roll Number / Email / Pass ID',
        lblPassword: 'Password',
        lblFullName: 'Full Name', lblRollReg: 'Roll Number',
        lblDept: 'Department', lblYear: 'Graduation Year',
        lblEmail: 'Email', lblPhone: 'Phone Number',
        lblRole: 'Register As', lblRegPassword: 'Password',
        lblConfirmPw: 'Confirm Password', lblUploadPhoto: 'Upload Photo',
        lblPhotoHint: 'JPG/PNG, max 2MB',
        loginBtn: 'Login', registerBtn: 'Create Account',
        forgotLink: 'Forgot password?',
        forgotDesc: 'Enter your registered email and we\'ll send a reset link.',
        lblForgotEmail: 'Registered Email',
        forgotBtn: 'Send Reset Link', backToLoginLink: '← Back to Login',
        lockText: 'Account temporarily locked',
        lockSubText: 'Too many failed attempts. Try again in:',
    },
    hi: {
        logoTitle: 'गेट पास प्रबंधन प्रणाली',
        logoSub: 'सुरक्षित • तेज़ • विश्वसनीय',
        loginTab: 'लॉगिन', registerTab: 'पंजीकरण',
        lblRollLogin: 'रोल नंबर / ईमेल / पास आईडी',
        lblPassword: 'पासवर्ड',
        lblFullName: 'पूरा नाम', lblRollReg: 'रोल नंबर',
        lblDept: 'विभाग', lblYear: 'वर्ष',
        lblEmail: 'ईमेल', lblPhone: 'फ़ोन नंबर',
        lblRole: 'रूप में पंजीकरण करें', lblRegPassword: 'पासवर्ड',
        lblConfirmPw: 'पासवर्ड की पुष्टि करें', lblUploadPhoto: 'फ़ोटो अपलोड करें',
        lblPhotoHint: 'JPG/PNG, अधिकतम 2MB',
        loginBtn: 'लॉगिन करें', registerBtn: 'खाता बनाएं',
        forgotLink: 'पासवर्ड भूल गए?',
        forgotDesc: 'अपना ईमेल दर्ज करें।',
        lblForgotEmail: 'पंजीकृत ईमेल',
        forgotBtn: 'रीसेट लिंक भेजें', backToLoginLink: '← लॉगिन पर वापस जाएं',
        lockText: 'खाता अस्थायी रूप से बंद है',
        lockSubText: 'बहुत अधिक विफल प्रयास। पुनः प्रयास करें:',
    },
    kn: {
        logoTitle: 'ಗೇಟ್ ಪಾಸ್ ನಿರ್ವಹಣಾ ವ್ಯವಸ್ಥೆ',
        logoSub: 'ಸುರಕ್ಷಿತ • ವೇಗ • ವಿಶ್ವಾಸಾರ್ಹ',
        loginTab: 'ಲಾಗಿನ್', registerTab: 'ನೋಂದಣಿ',
        lblRollLogin: 'ರೋಲ್ ನಂಬರ್ / ಇಮೇಲ್ / ಪಾಸ್ ಐಡಿ',
        lblPassword: 'ಪಾಸ್‌ವರ್ಡ್',
        lblFullName: 'ಪೂರ್ಣ ಹೆಸರು', lblRollReg: 'ರೋಲ್ ನಂಬರ್',
        lblDept: 'ವಿಭಾಗ', lblYear: 'ವರ್ಷ',
        lblEmail: 'ಇಮೇಲ್', lblPhone: 'ಫೋನ್ ನಂಬರ್',
        lblRole: 'ಇದರಲ್ಲಿ ನೋಂದಾಯಿಸಿ', lblRegPassword: 'ಪಾಸ್‌ವರ್ಡ್',
        lblConfirmPw: 'ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ', lblUploadPhoto: 'ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
        lblPhotoHint: 'JPG/PNG, ಗರಿಷ್ಠ 2MB',
        loginBtn: 'ಲಾಗಿನ್ ಮಾಡಿ', registerBtn: 'ಖಾತೆ ರಚಿಸಿ',
        forgotLink: 'ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿದ್ದೀರಾ?',
        forgotDesc: 'ನಿಮ್ಮ ಇಮೇಲ್ ನಮೂದಿಸಿ.',
        lblForgotEmail: 'ನೋಂದಾಯಿತ ಇಮೇಲ್',
        forgotBtn: 'ರೀಸೆಟ್ ಲಿಂಕ್ ಕಳುಹಿಸಿ', backToLoginLink: '← ಲಾಗಿನ್‌ಗೆ ಹಿಂತಿರುಗಿ',
        lockText: 'ಖಾತೆ ತಾತ್ಕಾಲಿಕವಾಗಿ ಲಾಕ್ ಆಗಿದೆ',
        lockSubText: 'ಹಲವು ವಿಫಲ ಪ್ರಯತ್ನಗಳು. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ:',
    }
};

// ─── State ────────────────────────────────────────────────────────────────────
let currentLang = 'en';
let loginAttempts = 0;
const MAX_ATTEMPTS = 3;
const LOCK_DURATION = 5 * 60;
let lockTimer = null;
let profilePicBase64 = null;

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    // Already logged in — redirect
    const stored = localStorage.getItem('currentUser');
    if (stored) {
        try {
            const u = JSON.parse(stored);
            redirectUser(u.role);
            return;
        } catch(e) {
            localStorage.removeItem('currentUser');
        }
    }

    checkLockState();

    // Language
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentLang = btn.dataset.lang;
            applyLanguage(currentLang);
        });
    });

    // Tabs
    document.getElementById('loginTab').addEventListener('click', function () { showTab('login'); });
    document.getElementById('registerTab').addEventListener('click', function () { showTab('register'); });
    document.getElementById('forgotLink').addEventListener('click', function () { showTab('forgot'); });
    document.getElementById('backToLoginLink').addEventListener('click', function () { showTab('login'); });

    // Password toggles
    setupToggle('toggleLoginPw', 'loginPassword');
    setupToggle('toggleRegPw', 'regPassword');
    setupToggle('toggleConfirmPw', 'regConfirm');

    // Profile picture
    document.getElementById('profilePicInput').addEventListener('change', function () {
        const file = this.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            showMsg('registerMsg', 'error', 'Photo must be under 2MB'); return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            profilePicBase64 = e.target.result;
            document.getElementById('avatarPreview').innerHTML =
                '<img src="' + profilePicBase64 + '" alt="avatar">';
        };
        reader.readAsDataURL(file);
    });

    // Password strength
    document.getElementById('regPassword').addEventListener('input', function () {
        checkPasswordStrength(this.value);
    });

    // ── Role switcher: show/hide student fields ──
    document.getElementById('regRole').addEventListener('change', function () {
        toggleStudentFields(this.value);
    });

    // Buttons
    document.getElementById('loginBtn').addEventListener('click', handleLogin);
    document.getElementById('registerBtn').addEventListener('click', handleRegister);
    document.getElementById('forgotBtn').addEventListener('click', handleForgot);

    // Enter key
    document.getElementById('loginPassword').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') handleLogin();
    });
    document.getElementById('loginRoll').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') handleLogin();
    });

    applyLanguage('en');
});

// ─── Toggle student-only fields ───────────────────────────────────────────────
function toggleStudentFields(role) {
    const studentFields = document.getElementById('studentFields');
    const adminNotice = document.getElementById('adminNotice');
    const isAdmin = role === 'admin';
    studentFields.style.display = isAdmin ? 'none' : 'block';
    adminNotice.style.display = isAdmin ? 'block' : 'none';
}

// ─── Language ──────────────────────────────────────────────────────────────────
function applyLanguage(lang) {
    const t = LANGS[lang];
    Object.keys(t).forEach(function (id) {
        const el = document.getElementById(id);
        if (el) el.textContent = t[id];
    });
}

// ─── Tabs ──────────────────────────────────────────────────────────────────────
function showTab(tab) {
    ['loginSection', 'registerSection', 'forgotSection'].forEach(function (id) {
        document.getElementById(id).classList.remove('active');
    });
    ['loginTab', 'registerTab'].forEach(function (id) {
        document.getElementById(id).classList.remove('active');
    });
    if (tab === 'login') {
        document.getElementById('loginSection').classList.add('active');
        document.getElementById('loginTab').classList.add('active');
    } else if (tab === 'register') {
        document.getElementById('registerSection').classList.add('active');
        document.getElementById('registerTab').classList.add('active');
    } else {
        document.getElementById('forgotSection').classList.add('active');
    }
    clearMessages();
}

// ─── Login ─────────────────────────────────────────────────────────────────────
async function handleLogin() {
    const identifier = document.getElementById('loginRoll').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!identifier || !password) {
        showMsg('loginMsg', 'error',
            currentLang === 'hi' ? 'सभी फ़ील्ड भरें' :
            currentLang === 'kn' ? 'ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳನ್ನು ತುಂಬಿ' :
            'Please fill in all fields');
        return;
    }

    if (isLocked()) return;

    const btn = document.getElementById('loginBtn');
    btn.disabled = true;
    btn.textContent = '⏳ Logging in...';

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, password })
        });

        const data = await response.json();
        console.log('🔍 Server response:', data); // debug — remove after login is confirmed working

        if (!response.ok) {
            loginAttempts++;
            const remaining = MAX_ATTEMPTS - loginAttempts;
            if (loginAttempts >= MAX_ATTEMPTS) {
                triggerLock();
            } else {
                const ind = document.getElementById('attemptsIndicator');
                ind.style.display = 'block';
                ind.textContent = remaining + ' attempt' + (remaining === 1 ? '' : 's') + ' remaining before lockout';
                showMsg('loginMsg', 'error',
                    currentLang === 'hi' ? 'रोल नंबर या पासवर्ड गलत है' :
                    currentLang === 'kn' ? 'ರೋಲ್ ನಂಬರ್ ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್ ತಪ್ಪಾಗಿದೆ' :
                    data.error || 'Incorrect credentials');
            }
            return;
        }

        // ✅ Success
        loginAttempts = 0;
        localStorage.removeItem('lockUntil');
        document.getElementById('attemptsIndicator').style.display = 'none';

        // Build session object from backend response
        const u = data.user;
        const sessionUser = {
            id: u._id || u.id,
            name: u.name,
            role: u.role,
            roll: u.rollNumber || identifier,
            dept: u.department || '',
            year: u.year || '',
            email: u.email || '',
            phone: u.phone || '',
            passId: u.passId || '',
            profilePic: u.profilePicture || u.profilePic || null,
            createdAt: u.createdAt || new Date().toISOString()
        };

        localStorage.setItem('currentUser', JSON.stringify(sessionUser));
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('lastActivity', Date.now().toString());

        logActivity(sessionUser.name, sessionUser.roll, 'Login', 'Logged in successfully');

        showMsg('loginMsg', 'success',
            currentLang === 'hi' ? 'लॉगिन सफल! रीडायरेक्ट हो रहे हैं...' :
            currentLang === 'kn' ? 'ಲಾಗಿನ್ ಯಶಸ್ವಿ! ಮರುನಿರ್ದೇಶಿಸಲಾಗುತ್ತಿದೆ...' :
            'Login successful! Redirecting...');

        setTimeout(function () { redirectUser(sessionUser.role); }, 1000);

    } catch (error) {
        console.error('Login error:', error);
        showMsg('loginMsg', 'error', '⚠️ Cannot reach server. Make sure you are using http://localhost:5000');
    } finally {
        btn.disabled = false;
        btn.textContent = LANGS[currentLang].loginBtn || 'Login';
    }
}

// ─── Register ──────────────────────────────────────────────────────────────────
async function handleRegister() {
    const name     = document.getElementById('regName').value.trim();
    const email    = document.getElementById('regEmail').value.trim();
    const phone    = document.getElementById('regPhone').value.trim();
    const role     = document.getElementById('regRole').value;
    const password = document.getElementById('regPassword').value;
    const confirm  = document.getElementById('regConfirm').value;
    const isAdmin  = role === 'admin';

    // Student-only fields
    const roll = isAdmin ? '' : document.getElementById('regRoll').value.trim();
    const dept = isAdmin ? '' : document.getElementById('regDept').value;
    const year = isAdmin ? '' : document.getElementById('regYear').value;

    // Common validations
    if (!name || !email || !phone || !password || !confirm) {
        showMsg('registerMsg', 'error', 'Please fill in all fields'); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showMsg('registerMsg', 'error', 'Please enter a valid email'); return;
    }
    if (!/^\d{10}$/.test(phone)) {
        showMsg('registerMsg', 'error', 'Phone number must be 10 digits'); return;
    }
    if (password.length < 6) {
        showMsg('registerMsg', 'error', 'Password must be at least 6 characters'); return;
    }
    if (password !== confirm) {
        showMsg('registerMsg', 'error', 'Passwords do not match'); return;
    }

    // Student-only validations
    if (!isAdmin) {
        if (!roll || !/^\d{7}$/.test(roll)) {
            showMsg('registerMsg', 'error', 'Roll number must be 7 digits'); return;
        }
        if (!dept) {
            showMsg('registerMsg', 'error', 'Please select a department'); return;
        }
        if (!year) {
            showMsg('registerMsg', 'error', 'Please select a graduation year'); return;
        }
    }

    const btn = document.getElementById('registerBtn');
    btn.disabled = true;
    btn.textContent = '⏳ Creating account...';

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                rollNumber: isAdmin ? 'ADMIN-' + Date.now() : roll,
                department: isAdmin ? 'Administration' : dept,
                year: isAdmin ? 2026 : parseInt(year),
                email,
                phone,
                role,
                password,
                profilePicture: profilePicBase64 || ''
            })
        });

        const data = await response.json();

        if (!response.ok) {
            showMsg('registerMsg', 'error', data.error || 'Registration failed');
            return;
        }

        showMsg('registerMsg', 'success',
            isAdmin
                ? '✅ Admin account created! You can now login.'
                : '✅ Account created! Pass ID: ' + (data.passId || 'assigned') + '. You can now login.');

        // Reset form
        ['regName','regRoll','regEmail','regPhone','regPassword','regConfirm']
            .forEach(function (id) { document.getElementById(id).value = ''; });
        document.getElementById('regDept').value = '';
        document.getElementById('regYear').value = '';
        document.getElementById('regRole').value = 'student';
        toggleStudentFields('student'); // reset to student view
        document.getElementById('avatarPreview').innerHTML = '👤';
        profilePicBase64 = null;
        document.getElementById('strengthFill').style.width = '0%';
        document.getElementById('strengthLabel').textContent = '';

        setTimeout(function () { showTab('login'); }, 2500);

    } catch (error) {
        console.error('Register error:', error);
        showMsg('registerMsg', 'error', '⚠️ Cannot reach server. Make sure you are using http://localhost:5000');
    } finally {
        btn.disabled = false;
        btn.textContent = LANGS[currentLang].registerBtn || 'Create Account';
    }
}

// ─── Forgot Password ───────────────────────────────────────────────────────────
async function handleForgot() {
    const email = document.getElementById('forgotEmail').value.trim();

    if (!email) {
        showMsg('forgotMsg', 'error', 'Please enter your email'); return;
    }

    const btn = document.getElementById('forgotBtn');
    btn.disabled = true;
    btn.textContent = '⏳ Sending...';

    try {
        const response = await fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (!response.ok) {
            showMsg('forgotMsg', 'error', data.error || 'Email not found');
            return;
        }

        if (data.resetToken) {
            showMsg('forgotMsg', 'warning',
                '⚠️ Email not configured. Dev reset token: ' + data.resetToken);
        } else {
            showMsg('forgotMsg', 'success',
                '✅ Reset link sent to ' + email + '. Check your inbox.');
        }

    } catch (error) {
        showMsg('forgotMsg', 'error', '⚠️ Cannot reach server. Make sure you are using http://localhost:5000');
    } finally {
        btn.disabled = false;
        btn.textContent = LANGS[currentLang].forgotBtn || 'Send Reset Link';
    }
}

// ─── Lock mechanism ────────────────────────────────────────────────────────────
function triggerLock() {
    const lockUntil = Date.now() + LOCK_DURATION * 1000;
    localStorage.setItem('lockUntil', lockUntil.toString());
    startLockCountdown(LOCK_DURATION);
}

function checkLockState() {
    const lockUntil = parseInt(localStorage.getItem('lockUntil') || '0');
    if (!lockUntil) return;
    const remaining = Math.floor((lockUntil - Date.now()) / 1000);
    if (remaining > 0) {
        startLockCountdown(remaining);
    } else {
        localStorage.removeItem('lockUntil');
        loginAttempts = 0;
    }
}

function isLocked() {
    const lockUntil = parseInt(localStorage.getItem('lockUntil') || '0');
    return lockUntil > Date.now();
}

function startLockCountdown(seconds) {
    let remaining = seconds;
    const lockMsg = document.getElementById('lockMsg');
    const lockTimerEl = document.getElementById('lockTimer');
    const loginBtn = document.getElementById('loginBtn');

    lockMsg.style.display = 'block';
    loginBtn.disabled = true;

    document.getElementById('lockText').textContent = LANGS[currentLang].lockText;
    document.getElementById('lockSubText').textContent = LANGS[currentLang].lockSubText;

    function tick() {
        const m = Math.floor(remaining / 60);
        const s = remaining % 60;
        lockTimerEl.textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
        remaining--;
        if (remaining < 0) {
            clearInterval(lockTimer);
            lockMsg.style.display = 'none';
            loginBtn.disabled = false;
            loginAttempts = 0;
            localStorage.removeItem('lockUntil');
            document.getElementById('attemptsIndicator').style.display = 'none';
        }
    }

    tick();
    lockTimer = setInterval(tick, 1000);
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
function setupToggle(btnId, inputId) {
    document.getElementById(btnId).addEventListener('click', function () {
        const input = document.getElementById(inputId);
        input.type = input.type === 'password' ? 'text' : 'password';
        this.textContent = input.type === 'password' ? '👁️' : '🙈';
    });
}

function checkPasswordStrength(pw) {
    const fill = document.getElementById('strengthFill');
    const label = document.getElementById('strengthLabel');
    let score = 0;
    if (pw.length >= 6) score++;
    if (pw.length >= 10) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    const levels = [
        { pct: '20%', color: '#e74c3c', label: 'Very weak' },
        { pct: '40%', color: '#e67e22', label: 'Weak' },
        { pct: '60%', color: '#f1c40f', label: 'Fair' },
        { pct: '80%', color: '#2ecc71', label: 'Strong' },
        { pct: '100%', color: '#27ae60', label: 'Very strong' },
    ];
    const lvl = levels[Math.max(0, score - 1)] || levels[0];
    fill.style.width = pw.length === 0 ? '0%' : lvl.pct;
    fill.style.background = lvl.color;
    label.textContent = pw.length === 0 ? '' : lvl.label;
    label.style.color = lvl.color;
}

function showMsg(id, type, text) {
    const el = document.getElementById(id);
    el.className = 'msg ' + type;
    el.textContent = text;
    el.style.display = 'block';
}

function clearMessages() {
    ['loginMsg', 'registerMsg', 'forgotMsg'].forEach(function (id) {
        const el = document.getElementById(id);
        el.style.display = 'none';
        el.textContent = '';
    });
}

function redirectUser(role) {
    if (role === 'admin') {
        window.location.href = '/pages/admin-dashboard.html';
    } else {
        window.location.href = '/pages/student-dashboard.html';
    }
}

function logActivity(name, roll, activity, details) {
    const logs = JSON.parse(localStorage.getItem('studentLogs') || '[]');
    logs.push({
        id: Date.now(), studentName: name, username: roll,
        activity: activity, details: details,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('studentLogs', JSON.stringify(logs));
}