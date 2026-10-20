// Theme picker: every [data-theme-picker] holds one <button data-theme-value="<theme>"> per theme.
// Picking one sets <html data-theme> and remembers it (theme_boot.js reads it back on the next load).
const STORAGE_KEY = 'l0r3z--theme';
const ACTIVE_CLASS = 'theme_picker--option--active';
const root = document.documentElement;
const options = document.querySelectorAll('[data-theme-picker] [data-theme-value]');

function markActive() {
    options.forEach((option) => {
        const isActive = option.dataset.themeValue === root.dataset.theme;
        option.classList.toggle(ACTIVE_CLASS, isActive);
        option.setAttribute('aria-pressed', String(isActive));
    });
}

options.forEach((option) => {
    option.addEventListener('click', () => {
        root.dataset.theme = option.dataset.themeValue;
        try {
            localStorage.setItem(STORAGE_KEY, option.dataset.themeValue);
        } catch {
            // storage blocked: the theme still changes, it just won't be remembered
        }
        markActive();
    });
});

markActive();
