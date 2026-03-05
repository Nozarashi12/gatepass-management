function goToLogin() {
    window.location.href = 'index.html';
}

function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = '<div class="message ' + type + '">' + text + '</div>';
    if (type === 'success') {
        setTimeout(function() { messageDiv.innerHTML = ''; }, 5000);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
        showMessage('Invalid reset link. Please request a new password reset.', 'error');
        document.getElementById('resetPasswordForm').style.display = 'none';
    }

    // ✅ Attach back-to-login via JS — no inline onclick needed
    document.getElementById('backToLoginBtn').addEventListener('click', goToLogin);

    document.getElementById('newPassword').addEventListener('input', function (e) {
        const password = e.target.value;
        const strengthDiv = document.getElementById('passwordStrength');
        if (password.length === 0) {
            strengthDiv.textContent = '';
        } else if (password.length < 6) {
            strengthDiv.textContent = 'Weak — at least 6 characters required';
            strengthDiv.style.color = '#dc3545';
        } else if (password.length < 10) {
            strengthDiv.textContent = 'Medium — add more characters';
            strengthDiv.style.color = '#ffc107';
        } else {
            strengthDiv.textContent = '✓ Strong password';
            strengthDiv.style.color = '#28a745';
        }
    });

    document.getElementById('resetPasswordForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (newPassword.length < 6) {
            showMessage('Password must be at least 6 characters long', 'error');
            return;
        }
        if (newPassword !== confirmPassword) {
            showMessage('Passwords do not match', 'error');
            return;
        }

        document.getElementById('btnText').style.display = 'none';
        document.getElementById('loading').style.display = 'inline-block';
        document.getElementById('resetBtn').disabled = true;

        try {
            const response = await fetch('http://localhost:5000/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: token, newPassword: newPassword })
            });

            const data = await response.json();

            if (response.ok) {
                showMessage('✅ Password reset successful! Redirecting to login...', 'success');
                setTimeout(goToLogin, 2000);
            } else {
                showMessage(data.error || 'Password reset failed', 'error');
            }
        } catch (error) {
            showMessage('Network error. Please try again.', 'error');
        } finally {
            document.getElementById('btnText').style.display = 'inline';
            document.getElementById('loading').style.display = 'none';
            document.getElementById('resetBtn').disabled = false;
        }
    });
});