// Theme clock: every [data-theme-clock] button cycles through THEMES on click.
// It sets <html data-theme> and remembers it (theme_boot.js reads it back on the next load).
// The spin animation is pure CSS, we only add/remove the --spin class.
const STORAGE_KEY = 'l0r3z--theme';
const SPIN_CLASS = 'theme_clock--spin';
// Cycle order; the value is what the hover hint calls that theme.
// Adding a theme = one entry here + its SCSS block.
const THEMES = { sky: 'day', night: 'night' };
const root = document.documentElement;
const clocks = document.querySelectorAll('[data-theme-clock]');
const names = Object.keys(THEMES);

function nextTheme() {
    return names[(names.indexOf(root.dataset.theme) + 1) % names.length];
}

function updateHint() {
    const hint = `switch to ${THEMES[nextTheme()]}`;
    clocks.forEach((clock) => {
        clock.title = hint;
        clock.setAttribute('aria-label', hint);
    });
}

clocks.forEach((clock) => {
    clock.addEventListener('click', () => {
        const theme = nextTheme();
        root.dataset.theme = theme;
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch {
            // storage blocked: the theme still changes, it just won't be remembered
        }
        // restart the spin even if the previous one is still running
        clock.classList.remove(SPIN_CLASS);
        void clock.offsetWidth;
        clock.classList.add(SPIN_CLASS);
        updateHint();
    });
    clock.addEventListener('animationend', () => clock.classList.remove(SPIN_CLASS));
});

updateHint();
