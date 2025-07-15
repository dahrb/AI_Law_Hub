// components/header.js

export class HeaderComponent {
    setTitle(section) {
        const pageTitle = document.getElementById('pageTitle');
        const pageSubtitle = document.getElementById('pageSubtitle');
        if (pageTitle && pageSubtitle) {
            if (section === 'history') {
                pageTitle.textContent = 'Learn';
                pageSubtitle.textContent = 'Choose a topic to start learning';
            } else if (section === 'research') {
                pageTitle.textContent = 'Research';
                pageSubtitle.textContent = 'Explore recent papers in AI & Law';
            } else if (section === 'leaderboard') {
                pageTitle.textContent = 'Leaderboard';
                pageSubtitle.textContent = 'See how you rank among learners';
            } else if (section === 'achievements') {
                pageTitle.textContent = 'Achievements';
                pageSubtitle.textContent = 'Track your progress and badges';
            } else {
                pageTitle.textContent = 'AI & Law Learning';
                pageSubtitle.textContent = '';
            }
        }
    }
} 