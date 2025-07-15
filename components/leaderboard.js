// components/leaderboard.js

export class LeaderboardComponent {
    constructor(apiBaseUrl) {
        this.API_BASE_URL = apiBaseUrl;
    }

    init() {
        // Bind any leaderboard-specific events here
    }

    async loadLeaderboard() {
        try {
            // Fetch all user stats from backend
            const response = await fetch('/api/leaderboard', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Failed to fetch leaderboard');
            const leaderboardData = await response.json();
            if (!Array.isArray(leaderboardData)) {
                this.showMessage('Leaderboard data is unavailable or malformed.', 'error');
                return;
            }
            const sortedUsers = this.sortUsersByPoints(leaderboardData);
            const currentUser = this.getCurrentUser();
            const userRank = this.getUserRank(sortedUsers, currentUser);
            this.renderLeaderboard(sortedUsers, userRank);
        } catch (error) {
            console.error('Error loading leaderboard:', error);
            this.showMessage('Failed to load leaderboard.', 'error');
        }
    }

    show() {
        this.loadLeaderboard();
    }

    getCompletedLessons(userId) {
        const progressData = localStorage.getItem(`userProgress_${userId}`);
        if (progressData) {
            const progress = JSON.parse(progressData);
            let totalCompleted = 0;
            Object.values(progress).forEach(topicProgress => {
                if (Array.isArray(topicProgress)) {
                    totalCompleted += topicProgress.length;
                }
            });
            return totalCompleted;
        }
        return 0;
    }

    sortUsersByPoints(users) {
        return users.sort((a, b) => {
            const aPoints = a.total_points !== undefined ? a.total_points : a.total_score || 0;
            const bPoints = b.total_points !== undefined ? b.total_points : b.total_score || 0;
            return bPoints - aPoints;
        });
    }

    getCurrentUser() {
        const usernameElement = document.getElementById('username');
        return usernameElement ? usernameElement.textContent : null;
    }

    getUserRank(sortedUsers, currentUser) {
        if (!currentUser || currentUser === 'Guest') return null;
        
        const userIndex = sortedUsers.findIndex(user => user.username === currentUser);
        return userIndex >= 0 ? userIndex + 1 : null;
    }

    renderLeaderboard(leaderboard, userRank) {
        const leaderboardList = document.getElementById('leaderboardList');
        const userRankElem = document.getElementById('userRank');
        
        if (!leaderboardList) return;
        
        leaderboardList.innerHTML = '';
        
        if (leaderboard.length === 0) {
            leaderboardList.innerHTML = `
                <div class="empty-leaderboard">
                    <div class="empty-icon">🏆</div>
                    <h3>No Rankings Yet</h3>
                    <p>Complete lessons to earn points and climb the leaderboard!</p>
                </div>
            `;
        } else {
            leaderboard.forEach((entry, idx) => {
                const isCurrentUser = entry.username === this.getCurrentUser();
                const points = entry.total_points !== undefined ? entry.total_points : entry.total_score || 0;
                const entryHTML = `
                    <div class="leaderboard-entry ${isCurrentUser ? 'current-user' : ''}">
                        <div class="rank">
                            ${idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                        </div>
                        <div class="user-info-leaderboard">
                            <div class="username-leaderboard">${entry.username}</div>
                            <div class="user-stats-leaderboard">
                                ${entry.lessons_completed || 0} lessons completed
                            </div>
                        </div>
                        <div class="points">
                            ${points.toLocaleString()} pts
                        </div>
                    </div>
                `;
                leaderboardList.innerHTML += entryHTML;
            });
        }
        
        if (userRankElem) {
            if (userRank) {
                userRankElem.textContent = userRank;
            } else {
                userRankElem.textContent = '-';
            }
        }
    }

    showMessage(message, type = 'info') {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem;
            border-radius: 8px;
            color: white;
            z-index: 1000;
            background: ${type === 'error' ? '#ef4444' : '#10b981'};
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
} 