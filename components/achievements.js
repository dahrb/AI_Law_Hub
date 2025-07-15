// components/achievements.js

export class AchievementsComponent {
    constructor(apiBaseUrl) {
        this.API_BASE_URL = apiBaseUrl;
    }

    init() {
        // Bind any achievements-specific events here
    }

    show() {
        this.loadAchievements();
        // Check for any new achievements that might have been earned
        this.checkForNewAchievements();
    }

    async loadAchievements() {
        try {
            const response = await fetch(`${this.API_BASE_URL}/achievements`, { credentials: 'include' });
            if (response.ok) {
                            const data = await response.json();
            this.renderAchievements(data.all_achievements || [], data.earned_achievements || [], data.user_stats);
                this.updateAchievementStats(data.all_achievements || [], data.earned_achievements || []);
            } else {
                this.showMessage('Failed to load achievements.', 'error');
            }
        } catch (error) {
            console.error('Error loading achievements:', error);
            this.showMessage('Failed to load achievements.', 'error');
        }
    }

    renderAchievements(allAchievements, earnedAchievements, userStats) {
        const achievementsGrid = document.getElementById('achievementsGrid');
        if (!achievementsGrid) return;
        
        achievementsGrid.innerHTML = '';
        
        if (allAchievements.length === 0) {
            achievementsGrid.innerHTML = `
                <div class="empty-achievements">
                    <div class="empty-icon">🏆</div>
                    <h3>No Achievements Available</h3>
                    <p>Complete lessons to unlock achievements!</p>
                </div>
            `;
            return;
        }
        
        // Use backend user stats if available, otherwise fall back to localStorage
        const progress = userStats ? this.getProgressFromUserStats(userStats) : this.getCurrentProgress();
        
        allAchievements.forEach(achievement => {
            const isEarned = earnedAchievements.some(earned => earned.name === achievement.name);
            const earnedDate = isEarned ? earnedAchievements.find(earned => earned.name === achievement.name)?.earned_at : null;
            
            const achHTML = `
                <div class="achievement-card ${isEarned ? 'earned' : ''}">
                    <div class="achievement-header">
                        <div class="achievement-icon">
                            ${achievement.icon || '🏆'}
                        </div>
                        <div class="achievement-info">
                            <h3>${achievement.name}</h3>
                            <p class="achievement-description">${achievement.description}</p>
                        </div>
                    </div>
                    
                    <div class="achievement-progress">
                        <div class="progress-text">
                            ${this.getProgressText(achievement, isEarned, progress)}
                        </div>
                        <div class="progress-bar-achievement">
                            <div class="progress-fill-achievement" style="width: ${this.getProgressPercentage(achievement, isEarned, progress)}%"></div>
                        </div>
                        <div class="progress-percentage">
                            ${this.getProgressPercentage(achievement, isEarned, progress)}%
                        </div>
                    </div>
                    
                    ${isEarned ? `
                        <div class="achievement-date">
                            Earned: ${new Date(earnedDate).toLocaleDateString()}
                        </div>
                    ` : ''}
                    
                    <div class="achievement-stats">
                        <span class="achievement-points">+${achievement.points || 0} points</span>
                    </div>
                </div>
            `;
            achievementsGrid.innerHTML += achHTML;
        });
    }

    getProgressText(achievement, isEarned, progress) {
        if (isEarned) {
            return 'Achievement unlocked!';
        }
        
        const currentUser = this.getCurrentUser();
        if (!currentUser || currentUser === 'Guest') {
            return 'Login to track progress';
        }
        
        // Use provided progress or get current progress
        const currentProgress = progress || this.getCurrentProgress();
        
        switch (achievement.requirement_type) {
            case 'lessons_completed':
                const totalLessons = this.getTotalLessons();
                return `${currentProgress.lessonsCompleted}/${achievement.requirement_value} lessons completed`;
            case 'perfect_score':
                return `${currentProgress.perfectScores}/${achievement.requirement_value} perfect scores`;
            case 'streak':
                return `${currentProgress.currentStreak}/${achievement.requirement_value} day streak`;
            default:
                return 'Progress tracking...';
        }
    }

    getProgressPercentage(achievement, isEarned, progress) {
        if (isEarned) {
            return 100;
        }
        
        const currentUser = this.getCurrentUser();
        if (!currentUser || currentUser === 'Guest') {
            return 0;
        }
        
        // Use provided progress or get current progress
        const currentProgress = progress || this.getCurrentProgress();
        
        let percentage = 0;
        switch (achievement.requirement_type) {
            case 'lessons_completed':
                percentage = Math.min((currentProgress.lessonsCompleted / achievement.requirement_value) * 100, 100);
                break;
            case 'perfect_score':
                percentage = Math.min((currentProgress.perfectScores / achievement.requirement_value) * 100, 100);
                break;
            case 'streak':
                percentage = Math.min((currentProgress.currentStreak / achievement.requirement_value) * 100, 100);
                break;
            default:
                percentage = 0;
        }
        
        const roundedPercentage = Math.round(percentage);
        
        return roundedPercentage;
    }

    getCurrentUser() {
        const usernameElement = document.getElementById('username');
        return usernameElement ? usernameElement.textContent : null;
    }

    getProgressFromUserStats(userStats) {
        return {
            lessonsCompleted: userStats.total_lessons_completed || 0,
            perfectScores: userStats.perfect_scores || 0,
            currentStreak: userStats.current_streak || 0
        };
    }

    getCurrentProgress() {
        const progress = JSON.parse(localStorage.getItem('learnProgress') || '{}');
        let lessonsCompleted = 0;
        let perfectScores = 0;
        let currentStreak = 0;
        
        // Count completed lessons
        Object.values(progress).forEach(topicProgress => {
            if (Array.isArray(topicProgress)) {
                lessonsCompleted += topicProgress.length;
            }
        });
        
        // Get user points data for additional stats
        const currentUser = this.getCurrentUser();
        if (currentUser && currentUser !== 'Guest') {
            const userPoints = JSON.parse(localStorage.getItem(`userPoints_${currentUser}`) || '{}');
            if (userPoints.history) {
                // Count perfect scores from history
                perfectScores = userPoints.history.filter(entry => 
                    entry.reason.includes('100%') || entry.reason.includes('perfect')
                ).length;
                
                // Calculate current streak from daily activity
                currentStreak = this.calculateCurrentStreak(userPoints.history);
            }
        }
        
        return {
            lessonsCompleted,
            perfectScores,
            currentStreak
        };
    }

    calculateCurrentStreak(history) {
        if (!history || history.length === 0) return 0;
        
        // Sort history by date (most recent first)
        const sortedHistory = history.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Check if there's activity today
        const todayActivity = sortedHistory.find(entry => {
            const entryDate = new Date(entry.date);
            entryDate.setHours(0, 0, 0, 0);
            return entryDate.getTime() === today.getTime();
        });
        
        if (todayActivity) {
            streak = 1;
            
            // Count consecutive days backwards
            for (let i = 1; i <= 30; i++) { // Check up to 30 days back
                const checkDate = new Date(today);
                checkDate.setDate(checkDate.getDate() - i);
                
                const dayActivity = sortedHistory.find(entry => {
                    const entryDate = new Date(entry.date);
                    entryDate.setHours(0, 0, 0, 0);
                    return entryDate.getTime() === checkDate.getTime();
                });
                
                if (dayActivity) {
                    streak++;
                } else {
                    break; // Streak broken
                }
            }
        }
        
        return streak;
    }

    getTotalLessons() {
        // Total lessons across all topics
        return 18; // 6 topics × 3 lessons each
    }

    updateAchievementStats(allAchievements, earnedAchievements) {
        const earnedCount = earnedAchievements.length;
        const totalCount = allAchievements.length;
        
        // Calculate total points from all achievements that have been earned
        const totalPoints = earnedAchievements.reduce((sum, earnedAchievement) => {
            const achievement = allAchievements.find(a => a.name === earnedAchievement.name);
            return sum + (achievement ? (achievement.points || 0) : 0);
        }, 0);
        
        const earnedElement = document.getElementById('earnedAchievements');
        const totalElement = document.getElementById('totalAchievements');
        const pointsElement = document.getElementById('totalPointsEarned');
        
        if (earnedElement) earnedElement.textContent = earnedCount;
        if (totalElement) totalElement.textContent = totalCount;
        if (pointsElement) pointsElement.textContent = totalPoints;
    }

    checkForNewAchievements() {
        // This will be called when user completes lessons or earns points
        // Check if any new achievements should be awarded
        const currentUser = this.getCurrentUser();
        if (!currentUser || currentUser === 'Guest') return;
        
        // Get current progress
        const progress = this.getCurrentProgress();
        
        // Check each achievement type
        this.checkLessonAchievements(progress.lessonsCompleted);
        this.checkPerfectScoreAchievements(progress.perfectScores);
        this.checkStreakAchievements(progress.currentStreak);
    }

    checkLessonAchievements(lessonsCompleted) {
        const lessonAchievements = [
            { name: "Ashley's Advocate", requirement: 1, points: 15, icon: '👨‍⚖️' },
            { name: "Prakken's Proponent", requirement: 3, points: 25, icon: '🔧' },
            { name: "Bench-Capon's Believer", requirement: 5, points: 35, icon: '⚖️' },
            { name: "Sartor's Scholar", requirement: 7, points: 45, icon: '🧠' },
            { name: "HYPO Hero", requirement: 10, points: 60, icon: '🦸‍♂️' },
            { name: "CATO Connoisseur", requirement: 15, points: 75, icon: '🎭' },
            { name: "ICAIL Insider", requirement: 20, points: 100, icon: '🏛️' },
            { name: "JURIX Judge", requirement: 25, points: 125, icon: '⚖️' }
        ];
        
        lessonAchievements.forEach(achievement => {
            if (lessonsCompleted >= achievement.requirement) {
                this.awardAchievement(achievement.name, achievement.points, achievement.icon);
            }
        });
    }

    checkPerfectScoreAchievements(perfectScores) {
        if (perfectScores >= 3) {
            this.awardAchievement("Argumentation Ace", 50, '🏆');
        }
    }

    checkStreakAchievements(currentStreak) {
        if (currentStreak >= 5) {
            this.awardAchievement("Streak Seeker", 40, '🔥');
        }
    }

    awardAchievement(achievementName, points, icon) {
        const currentUser = this.getCurrentUser();
        if (!currentUser || currentUser === 'Guest') return;
        
        // Check if already earned
        const earnedAchievements = JSON.parse(localStorage.getItem(`achievements_${currentUser}`) || '[]');
        if (earnedAchievements.includes(achievementName)) return;
        
        // Award the achievement
        earnedAchievements.push(achievementName);
        localStorage.setItem(`achievements_${currentUser}`, JSON.stringify(earnedAchievements));
        
        // Award points
        if (window.app) {
            window.app.awardPoints(currentUser, points, `Achievement: ${achievementName}`);
        }
        
        // Show achievement notification
        this.showAchievementNotification(achievementName, points, icon);
        
        console.log(`Awarded achievement: ${achievementName} with ${points} points`);
    }

    showAchievementNotification(achievementName, points, icon) {
        const notification = document.getElementById('achievementNotification');
        const title = document.getElementById('achievementTitle');
        const description = document.getElementById('achievementDescription');
        const iconContainer = notification ? notification.querySelector('.achievement-icon') : null;

        if (notification && title && description && iconContainer) {
            title.textContent = achievementName;
            description.textContent = `You've earned ${points} points!`;
            // Set icon as emoji or fallback
            iconContainer.innerHTML = icon || '🏆';
            notification.classList.remove('hidden');
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                notification.classList.add('hidden');
            }, 5000);
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