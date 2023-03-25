document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const passcodeInput = document.getElementById('passcode');
    const appContainer = document.getElementById('app-container');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const passcode = passcodeInput.value;
        const correctPasscode = 'pickle'; // Replace this with your desired passcode

        if (passcode === correctPasscode) {
            appContainer.style.display = 'block';
            loginForm.style.display = 'none';
        } else {
            alert('Incorrect passcode. Please try again.');
            passcodeInput.value = '';
        }
    });
});
