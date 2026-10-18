// Tabs of the home page: each .tabs--tab button has data-tab="<id of its .tabpanel>".
const tabBar = document.querySelector('.tabs');
const tabs = tabBar.querySelectorAll('.tabs--tab');
const panels = document.querySelectorAll('.tabpanel');

function showTab(selectedTab) {
    tabs.forEach((tab) => {
        tab.classList.toggle('is-active', tab === selectedTab);
    });
    panels.forEach((panel) => {
        panel.hidden = panel.id !== selectedTab.dataset.tab;
    });
}

tabs.forEach((tab) => {
    tab.addEventListener('click', () => showTab(tab));
});

// The tab bar is hidden in the markup so that, without JS, only the default panel shows.
tabBar.hidden = false;
