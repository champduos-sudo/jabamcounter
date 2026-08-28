(() => {
    let total = 0;
    const maxInput = document.getElementById('maxCount');
    const countDisplay = document.getElementById('count');
    const jabamButton = document.getElementById('jabam');
    const resetButton = document.getElementById('reset');
    const progressBar = document.getElementById('progressBar');
    const progressPercent = document.getElementById('progressPercent');
    const progressTrack = document.querySelector('.progress-track');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');
    const modalReset = document.getElementById('modalReset');
    const themeToggle = document.getElementById('themeToggle');

    function setTheme(theme) {
        document.documentElement.dataset.theme = theme;
        const darkMode = theme === 'dark';
        themeToggle.textContent = darkMode ? 'Light mode' : 'Dark mode';
        themeToggle.setAttribute('aria-label', darkMode ? 'Switch to light mode' : 'Switch to dark mode');
        localStorage.setItem('jabam-theme', theme);
    }

    function updateDisplay() {
        const max = getMaxCount();
        const percentage = Math.min(100, Math.round((total / max) * 100));
        countDisplay.innerHTML = `${total} <span>/ ${max}</span>`;
        progressBar.style.width = `${percentage}%`;
        progressPercent.textContent = `${percentage}%`;
        progressTrack.setAttribute('aria-valuemax', max);
        progressTrack.setAttribute('aria-valuenow', total);
        jabamButton.disabled = total >= max;
    }

    function getMaxCount() {
        const max = Number.parseInt(maxInput.value, 10);
        return Number.isInteger(max) && max > 0 ? max : 1;
    }

    function increment() {
        const max = getMaxCount();
        if (total >= max) return;

        total++;
        updateDisplay();

        if (total === max) {
            document.getElementById('successMessage').textContent = `You reached all ${max} counts. Amazing work!`;
            successModal.hidden = false;
            closeModal.focus();
        }
    }

    function reset() {
        total = 0;
        successModal.hidden = true;
        updateDisplay();
        jabamButton.focus();
    }

    function hideModal() {
        successModal.hidden = true;
        jabamButton.focus();
    }

    jabamButton.addEventListener('click', increment);
    resetButton.addEventListener('click', reset);
    modalReset.addEventListener('click', reset);
    themeToggle.addEventListener('click', () => {
        setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
    });
    closeModal.addEventListener('click', hideModal);
    maxInput.addEventListener('input', updateDisplay);
    successModal.addEventListener('click', (event) => {
        if (event.target === successModal) hideModal();
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !successModal.hidden) {
            hideModal();
            return;
        }
        if (event.code === 'Space' && document.activeElement !== maxInput) {
            event.preventDefault();
            increment();
        }
    });

    setTheme(localStorage.getItem('jabam-theme') || 'light');
    updateDisplay();
})();
