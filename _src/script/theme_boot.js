// Classic blocking script (NOT a module on purpose): it has to run in <head>, before
// the CSS, so the right theme is set before the first paint (no flash).
// Keep it tiny and only touch <html>.
const DEFAULT_THEME = 'sky';

let theme = DEFAULT_THEME;
try {
    theme = localStorage.getItem('l0r3z--theme') || DEFAULT_THEME;
} catch {
    // storage blocked (private window...): just use the default
}
document.documentElement.dataset.theme = theme;
