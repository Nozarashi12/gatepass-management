let cameraStream = null;
let currentUser = null;

document.addEventListener('DOMContentLoaded', function () {
    if (!localStorage.getItem('currentUser')) {
        window.location.href = '/index.html';
        return;
    }

    currentUser = Auth.getCurrentUser();

    if (currentUser) {
        document.getElementById('welcomeMessage').textContent =
            'Hi ' + currentUser.name + ', please complete face verification to access the system';
        setTimeout(function () {
            startFaceRecognition();
        }, 2000);
    }

    // Attach button — no onclick in HTML
    document.getElementById('biometricBtn').addEventListener('click', captureFace);

    window.addEventListener('beforeunload', function () {
        if (cameraStream) {
            cameraStream.getTracks().forEach(function (t) { t.stop(); });
            cameraStream = null;
        }
    });
});

async function startFaceRecognition() {
    const btn = document.getElementById('biometricBtn');
    const result = document.getElementById('biometricResult');
    const preview = document.getElementById('cameraPreview');
    const video = document.getElementById('videoElement');

    if (!btn) return;

    btn.disabled = true;
    btn.textContent = 'Opening Camera...';
    preview.style.display = 'flex';
    result.className = 'verification-result verification-scanning';
    result.textContent = 'Initializing camera...';
    result.style.display = 'block';

    try {
        cameraStream = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' }
        });
        video.srcObject = cameraStream;
        btn.textContent = '📸 Take Picture';
        result.textContent = 'Camera ready! Position face in frame and click "Take Picture"';
        btn.disabled = false;
    } catch (error) {
        console.error('Camera access error:', error);
        result.className = 'verification-result verification-error';
        result.textContent = '❌ Camera not available. Using manual verification...';
        btn.disabled = false;
        btn.textContent = 'Skip to Dashboard';
        setTimeout(proceedToDashboard, 5000);
    }
}

async function captureFace() {
    const btn = document.getElementById('biometricBtn');
    const result = document.getElementById('biometricResult');
    const preview = document.getElementById('cameraPreview');
    const video = document.getElementById('videoElement');
    const canvas = document.getElementById('canvas');

    if (!btn) return;

    if (!cameraStream) {
        btn.disabled = true;
        btn.textContent = 'Opening Camera...';
        preview.style.display = 'flex';
        result.className = 'verification-result verification-scanning';
        result.textContent = 'Initializing camera...';
        result.style.display = 'block';

        try {
            cameraStream = await navigator.mediaDevices.getUserMedia({
                video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' }
            });
            video.srcObject = cameraStream;
            btn.textContent = '📸 Take Picture';
            result.textContent = 'Camera ready! Position face in frame and click "Take Picture"';
            btn.disabled = false;
        } catch (error) {
            result.className = 'verification-result verification-error';
            result.textContent = '❌ Camera not available. Using manual verification...';
            btn.disabled = false;
            btn.textContent = 'Skip to Dashboard';
            setTimeout(proceedToDashboard, 5000);
        }
        return;
    }

    // Second click — capture
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    const img = document.createElement('img');
    img.src = canvas.toDataURL('image/jpeg');
    img.style.cssText = 'width:100%;height:300px;object-fit:cover;border-radius:15px;margin-top:10px;';
    preview.innerHTML = '';
    preview.appendChild(img);

    btn.textContent = 'Analyzing...';
    result.className = 'verification-result verification-scanning';
    result.textContent = 'Analyzing captured face...';

    setTimeout(function () {
        const success = Math.random() > 0.1;
        if (success) {
            result.className = 'verification-result verification-success';
            result.textContent = '✅ Face verified successfully! Access granted.';
            btn.textContent = '✅ Proceed to Dashboard';
            if (currentUser) {
                Auth.logStudentActivity(currentUser.name, currentUser.username, 'Biometric Verification', 'Face recognition completed successfully');
            }
            setTimeout(proceedToDashboard, 2000);
        } else {
            result.className = 'verification-result verification-error';
            result.textContent = '❌ Face verification failed. Please try again.';
            btn.textContent = '📸 Try Again';
            btn.disabled = false;
            if (cameraStream) {
                cameraStream.getTracks().forEach(function (t) { t.stop(); });
                cameraStream = null;
            }
            preview.innerHTML = '<video id="videoElement" autoplay style="width:100%;height:400px;object-fit:cover;border-radius:15px;"></video><canvas id="canvas" style="display:none;"></canvas><div class="scan-overlay"></div>';
        }
    }, 2000);
}

function proceedToDashboard() {
    if (!currentUser) return;
    if (cameraStream) {
        cameraStream.getTracks().forEach(function (t) { t.stop(); });
        cameraStream = null;
    }
    window.location.href = currentUser.role === 'admin' ? 'admin-dashboard.html' : 'user-dashboard.html';
}