import { SidebarComponent } from './components/sidebar.js';
import { HeaderComponent } from './components/header.js';
import { LearnComponent } from './components/learn.js';
import { ResearchComponent } from './components/research.js';
import { LeaderboardComponent } from './components/leaderboard.js';
import { AchievementsComponent } from './components/achievements.js';
import { AcademicAdventureComponent } from './components/timeline.js';

const API_BASE_URL = 'http://localhost:5004/api';
const appState = {};

const header = new HeaderComponent();
const learn = new LearnComponent(appState);
const research = new ResearchComponent(API_BASE_URL);
const leaderboard = new LeaderboardComponent(API_BASE_URL);
const achievements = new AchievementsComponent(API_BASE_URL);
const timeline = new AcademicAdventureComponent();

const sectionMap = {
    history: learn,
    research: research,
    timeline: timeline,
    leaderboard: leaderboard,
    achievements: achievements
};

function switchSection(section) {
    // Hide all content sections
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    const sectionElem = document.getElementById(section + 'Section');
    if (sectionElem) sectionElem.classList.add('active');
    header.setTitle(section);
    if (sectionMap[section]) sectionMap[section].show();
}

function setupAuthButtonListener() {
    // Always attach the event listener to the login button
    const authButton = document.getElementById('authButton');
    if (authButton) {
        const usernameElement = document.getElementById('username');
        const currentUser = usernameElement ? usernameElement.textContent : null;
        // Update icon based on login state
        if (currentUser && currentUser !== 'Guest') {
            authButton.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
        } else {
            authButton.innerHTML = '<i class="fas fa-sign-in-alt"></i>';
        }
        // Remove all previous listeners by replacing the node
        const newButton = authButton.cloneNode(true);
        authButton.parentNode.replaceChild(newButton, authButton);
        newButton.addEventListener('click', () => {
            const usernameElement = document.getElementById('username');
            const currentUser = usernameElement ? usernameElement.textContent : null;
            if (currentUser && currentUser !== 'Guest') {
                handleLogout();
            } else {
                showAuthScreen();
            }
        });
        console.log('Auth button event listener attached');
    } else {
        console.log('Auth button not found in DOM');
    }
}

async function fetchAndApplyUserProgress() {
    const usernameElement = document.getElementById('username');
    const currentUser = usernameElement ? usernameElement.textContent : null;
    if (!currentUser || currentUser === 'Guest') return;
    try {
        // Use the correct backend endpoint for user progress
        const response = await fetch('/api/progress', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        if (!response.ok) throw new Error('Failed to fetch user progress');
        const data = await response.json();
        // data.progress is an array of { topic, lesson, completed, ... }
        const backendProgress = {};
        if (Array.isArray(data.progress)) {
            data.progress.forEach(entry => {
                if (!backendProgress[entry.topic]) backendProgress[entry.topic] = [];
                if (entry.completed) {
                    // lesson is like 'lesson-0', 'lesson-1', etc.
                    const idx = parseInt(entry.lesson.replace('lesson-', ''));
                    if (!isNaN(idx) && !backendProgress[entry.topic].includes(idx)) {
                        backendProgress[entry.topic].push(idx);
                    }
                }
            });
        }
        // Store in localStorage for compatibility with existing code
        localStorage.setItem('learnProgress', JSON.stringify(backendProgress));
        // Optionally, update the UI to mark completed lessons
        if (window.app.learn && typeof window.app.learn.markCompletedLessons === 'function') {
            window.app.learn.markCompletedLessons(backendProgress);
        }
        // --- Ensure in-memory progress and UI are updated for user progress ---
        if (window.app.learn && typeof window.app.learn.restoreGuestProgress === 'function') {
            window.app.learn.restoreGuestProgress();
        }
        if (window.app.learn && typeof window.app.learn.refreshProgress === 'function') {
            window.app.learn.refreshProgress();
        }
        // --- Ensure topics/module UI is re-rendered with correct progress ---
        if (window.app.learn && typeof window.app.learn.show === 'function') {
            window.app.learn.show();
        }
        // Refresh progress bars and points
        updateGlobalProgress();
        updatePointsDisplay();
        if (window.app.learn && typeof window.app.learn.refreshProgress === 'function') {
            window.app.learn.refreshProgress();
        }
    } catch (e) {
        console.error('Error fetching user progress from backend:', e);
    }
}

async function mergeGuestProgressToBackend(userId) {
    // Merge guest progress from localStorage into backend
    const guestProgress = JSON.parse(localStorage.getItem('learnProgress') || '{}');
    // Fetch backend progress first
    let backendProgress = {};
    try {
        const response = await fetch('/api/progress', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data.progress)) {
                data.progress.forEach(entry => {
                    if (!backendProgress[entry.topic]) backendProgress[entry.topic] = [];
                    if (entry.completed) {
                        const idx = parseInt(entry.lesson.replace('lesson-', ''));
                        if (!isNaN(idx) && !backendProgress[entry.topic].includes(idx)) {
                            backendProgress[entry.topic].push(idx);
                        }
                    }
                });
            }
        }
    } catch (e) {
        console.error('Error fetching backend progress for merge:', e);
    }
    // For each topic/lesson in guest progress, if not in backend, POST to backend
    for (const topic in guestProgress) {
        guestProgress[topic].forEach(idx => {
            if (!backendProgress[topic] || !backendProgress[topic].includes(idx)) {
                // POST completion to backend
                fetch('/api/progress', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({
                        topic: topic,
                        lesson: `lesson-${idx}`,
                        completed: true,
                        score: 5, // Assume perfect score for merge
                        total_questions: 5 // Default, adjust if needed
                    })
                }).then(() => {
                    console.log(`Merged guest progress: ${topic} lesson-${idx}`);
                }).catch(e => {
                    console.error('Error merging guest progress:', e);
                });
            }
        });
    }
    // Clear guest progress after merge
    localStorage.removeItem('learnProgress');
}

function clearAllLocalProgress() {
    Object.keys(localStorage).forEach(k => {
        if (k.startsWith('userProgress_') || k.startsWith('userPoints_') || k === 'learnProgress') {
            localStorage.removeItem(k);
        }
    });
    console.log('Cleared all local user progress, points, and achievements from localStorage');
}

// Ensure global app object
window.app = window.app || {};

// --- New Simple Global Progress Bar Implementation ---
function updateGlobalProgress() {
    const fill = document.getElementById('globalProgressFill');
    const percentText = document.getElementById('globalProgressPercent');
    if (!fill || !percentText) return;
    // Get progress from localStorage
    let progress = {};
    try {
        progress = JSON.parse(localStorage.getItem('learnProgress')) || {};
    } catch (e) { progress = {}; }
    // Count completed lessons
    let completed = 0;
    let total = 0;
    // Topics and lesson counts (should match LearnComponent)
    const topics = [
        { id: 'icail', lessonCount: 3 },
        { id: 'jurix', lessonCount: 3 },
        { id: 'journal', lessonCount: 3 },
        { id: 'history', lessonCount: 3 },
        { id: 'academics', lessonCount: 3 },
        { id: 'cbr', lessonCount: 3 }
    ];
    topics.forEach(topic => {
        total += topic.lessonCount;
        if (progress[topic.id] && Array.isArray(progress[topic.id])) {
            completed += progress[topic.id].length;
        }
    });
    completed = Math.min(completed, total);
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    fill.style.width = percent + '%';
    percentText.textContent = percent + '%';
}
window.updateGlobalProgress = updateGlobalProgress;

window.addEventListener('DOMContentLoaded', async () => {
    // Reset guest progress on every page load
    localStorage.removeItem('learnProgress');
    // Instantiate LearnComponent and attach to global app
    window.app.learn = new LearnComponent(window.app);
    if (typeof window.app.learn.restoreGuestProgress === 'function') {
        window.app.learn.restoreGuestProgress();
    }
    window.app.learn.show();
    if (typeof window.app.learn.init === 'function') {
        window.app.learn.init();
    }
    // Call updateGlobalProgressBar after LearnComponent is ready
    // updateGlobalProgressBar(); // This line is removed

    // Init other components
    if (typeof research !== 'undefined' && research && typeof research.init === 'function') research.init();
    if (typeof leaderboard !== 'undefined' && leaderboard && typeof leaderboard.init === 'function') leaderboard.init();
    if (typeof achievements !== 'undefined' && achievements && typeof achievements.init === 'function') achievements.init();
    if (typeof SidebarComponent !== 'undefined') {
        const sidebar = new SidebarComponent(switchSection);
        sidebar.init();
    }
    setupAuthHandlers();
    setupAuthButtonListener();
    updateGlobalProgress();
    updatePointsDisplay();
    setupAutoSave();
    switchSection('history');
    await fetchAndApplyUserProgress();
    const usernameElement = document.getElementById('username');
    const currentUser = usernameElement ? usernameElement.textContent : null;
    if (!currentUser || currentUser === 'Guest') {
        resetGuestProgress();
        updateGlobalProgress();
        updatePointsDisplay();
        if (window.app.learn && typeof window.app.learn.refreshProgress === 'function') {
            window.app.learn.refreshProgress();
        }
    }
});

function setupAuthHandlers() {
    // Close modal button
    const closeBtn = document.getElementById('closeAuthModal');
    if (closeBtn) {
        closeBtn.addEventListener('click', hideAuthScreen);
    }
    
    // Tab switching
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginTab && registerTab) {
        loginTab.addEventListener('click', () => {
            loginTab.classList.add('active');
            registerTab.classList.remove('active');
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
        });
        
        registerTab.addEventListener('click', () => {
            registerTab.classList.add('active');
            loginTab.classList.remove('active');
            registerForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
        });
    }
    
    // Form submissions
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
            if (username && password) {
                try {
                    const response = await fetch('/api/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                        body: JSON.stringify({ username, password })
                    });
                    if (response.ok) {
                        const data = await response.json();
                        await handleLogin(username); // Use await for handleLogin
                    } else {
                        const errorData = await response.json();
                        showMessage(errorData.error || 'Login failed', 'error');
                    }
                } catch (error) {
                    showMessage('Login failed', 'error');
                }
            } else {
                showMessage('Please enter both username and password', 'error');
            }
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('registerUsername').value;
            if (username) {
                handleLogin(username); // Use handleLogin directly
            }
        });
    }
    
    // Continue as guest
    const guestBtn = document.getElementById('continueAsGuest');
    if (guestBtn) {
        guestBtn.addEventListener('click', () => {
            hideAuthScreen();
        });
    }
    
    // Close modal when clicking outside
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideAuthScreen();
            }
        });
    }
}
// Progress management functions
// --- Robust Guest Progress Reset ---
function resetGuestProgress() {
    GuestProgress.reset();
    console.log('Reset all guest progress, points, and streaks');
}

function initializeUserProgress() {
    const usernameElement = document.getElementById('username');
    const currentUser = usernameElement ? usernameElement.textContent : null;
    
    // Only reset progress for guests
    if (!currentUser || currentUser === 'Guest') {
        resetGuestProgress();
        console.log('Starting as guest user');
    } else {
        // For logged-in users, do NOT reset or overwrite progress here
        // Progress will be loaded from backend after login
        console.log(`Logged in as ${currentUser}, not resetting progress`);
    }
}

function saveUserProgress(userId) {
    // Save current progress to user-specific storage
    const currentProgress = localStorage.getItem('learnProgress');
    if (currentProgress) {
        localStorage.setItem(`userProgress_${userId}`, currentProgress);
        console.log(`Saved progress for user ${userId}`);
    }
}

function loadUserProgress(userId) {
    // Load user-specific progress
    const userProgress = localStorage.getItem(`userProgress_${userId}`);
    if (userProgress) {
        localStorage.setItem('learnProgress', userProgress);
        console.log(`Loaded progress for user ${userId}`);
        return true;
    }
    return false;
}

function autoSaveUserProgress() {
    // Automatically save progress for logged-in users
    const usernameElement = document.getElementById('username');
    const currentUser = usernameElement ? usernameElement.textContent : null;
    
    if (currentUser && currentUser !== 'Guest') {
        const currentProgress = localStorage.getItem('learnProgress');
        if (currentProgress) {
            localStorage.setItem(`userProgress_${currentUser}`, currentProgress);
            console.log(`Auto-saved progress for user ${currentUser}`);
        }
    }
}

function setupAutoSave() {
    // Save progress when user navigates away or closes the page
    window.addEventListener('beforeunload', autoSaveUserProgress);
    
    // Save progress when user switches tabs
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            autoSaveUserProgress();
        }
    });
    
    // Save progress periodically (every 30 seconds)
    setInterval(autoSaveUserProgress, 30000);
}

function showAuthScreen() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.add('show');
        console.log('Auth modal shown');
    } else {
        console.log('Auth modal not found in DOM');
    }
}

function hideAuthScreen() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.remove('show');
        console.log('Auth modal hidden');
    } else {
        console.log('Auth modal not found in DOM');
    }
}

// --- LOGIN HANDLER: Fetch backend, update UI (NO guest progress transfer) ---
async function handleLogin(userId) {
    // 1. DO NOT merge guest progress - keep guest and user progress separate
    // await mergeGuestProgressToBackend(userId); // REMOVED: No guest progress transfer
    hideAuthScreen();
    // 2. Update UI to show logged in user
    const usernameElement = document.getElementById('username');
    const userStatusElement = document.getElementById('userStatus');
    if (usernameElement) usernameElement.textContent = userId;
    if (userStatusElement) userStatusElement.textContent = 'Signed in';
    // Update button icon and event
    setupAuthButtonListener();
    // 3. Fetch backend progress, points, achievements, and update UI
    await fetchAndApplyUserProgress();
    await updatePointsDisplay();
    if (achievements && typeof achievements.checkForNewAchievements === 'function') {
        achievements.checkForNewAchievements();
    }
    if (window.app.learn && typeof window.app.learn.refreshProgress === 'function') {
        window.app.learn.refreshProgress();
    }
    // Always update global progress bar after login
    showMessage('Login successful!', 'success');
    updateGlobalProgress();
}

function handleLogout() {
    const usernameElement = document.getElementById('username');
    const currentUser = usernameElement ? usernameElement.textContent : null;
    if (currentUser && currentUser !== 'Guest') {
        const currentProgress = localStorage.getItem('learnProgress');
        if (currentProgress) {
            localStorage.setItem(`userProgress_${currentUser}`, currentProgress);
            console.log(`Saved progress for user ${currentUser} before logout`);
        }
    }
    // Reset guest progress and clear all progress from localStorage
    resetGuestProgress();
    // Clear the LearnComponent's in-memory progress to reset module progress bars
    if (window.app.learn) {
        window.app.learn.completedLessonsMap = {};
        window.app.learn.completedLessons = 0;
        // Refresh the UI to show reset progress immediately
        if (typeof window.app.learn.refreshProgress === 'function') {
            window.app.learn.refreshProgress();
        }
        // Re-render the topics/modules UI to immediately show reset progress bars
        if (typeof window.app.learn.show === 'function') {
            window.app.learn.show();
        }
    }
    const userStatusElement = document.getElementById('userStatus');
    if (usernameElement) usernameElement.textContent = 'Guest';
    if (userStatusElement) userStatusElement.textContent = 'Not signed in';
    // Update button icon and event
    setupAuthButtonListener();
    updatePointsDisplay();
    // Always update global progress bar after logout
    console.log('User logged out, progress reset to guest state');
    updateGlobalProgress();
}

// --- Robust Guest Progress Utility ---
const GuestProgress = {
    getPoints() {
        return parseInt(localStorage.getItem('guestPoints') || '0', 10);
    },
    setPoints(points) {
        localStorage.setItem('guestPoints', String(points));
        if (typeof window.app?.updatePointsDisplay === 'function') window.app.updatePointsDisplay();
    },
    addPoints(points) {
        this.setPoints(this.getPoints() + points);
    },
    getStreak() {
        const data = localStorage.getItem('guestStreak');
        if (data) try { return JSON.parse(data); } catch { return { value: 0, lastDate: null }; }
        return { value: 0, lastDate: null };
    },
    setStreak(value, date) {
        localStorage.setItem('guestStreak', JSON.stringify({ value, lastDate: date }));
        if (typeof window.app?.updatePointsDisplay === 'function') window.app.updatePointsDisplay();
    },
    updateStreakOnLessonComplete() {
        const today = new Date().toISOString().slice(0, 10);
        const streakObj = this.getStreak();
        let streak = 0;
        if (streakObj.lastDate) {
            const diff = (new Date(today) - new Date(streakObj.lastDate)) / (1000 * 60 * 60 * 24);
            if (diff === 1) {
                streak = streakObj.value + 1;
            } else if (diff === 0) {
                streak = streakObj.value;
            } else {
                streak = 1;
            }
        } else {
            streak = 1;
        }
        this.setStreak(streak, today);
        return streak;
    },
    reset() {
        localStorage.removeItem('learnProgress');
        localStorage.removeItem('guestPoints');
        localStorage.removeItem('guestStreak');
        Object.keys(localStorage).forEach(k => { if (k.startsWith('guestLesson_')) localStorage.removeItem(k); });
        if (typeof window.app?.updatePointsDisplay === 'function') window.app.updatePointsDisplay();
    }
};

// --- LESSON COMPLETION: Always POST to backend for logged-in users ---
window.completeLesson = async function(topicId, lessonIdx, correctAnswers, totalQuestions) {
    const usernameElement = document.getElementById('username');
    const currentUser = usernameElement ? usernameElement.textContent : null;
    const isGuest = !currentUser || currentUser === 'Guest';
    let isFirstTime = false;
    let streak = 0;
    if (isGuest) {
        // Guest: update localStorage progress
        const progress = JSON.parse(localStorage.getItem('learnProgress') || '{}');
        if (!progress[topicId]) progress[topicId] = [];
        if (!progress[topicId].includes(lessonIdx)) {
            progress[topicId].push(lessonIdx);
            isFirstTime = true;
        }
        localStorage.setItem('learnProgress', JSON.stringify(progress));
        // Guest streak logic
        streak = GuestProgress.updateStreakOnLessonComplete();
        // Points for guest
        const points = calculateLessonPoints(correctAnswers, totalQuestions, isFirstTime, streak);
        GuestProgress.addPoints(points);
        if (window.app.learn && typeof window.app.learn.refreshProgress === 'function') window.app.learn.refreshProgress();
        updatePointsDisplay();
        // --- Fix: reload in-memory guest progress before updating global progress bar ---
        if (window.app.learn && typeof window.app.learn.restoreGuestProgress === 'function') window.app.learn.restoreGuestProgress();
        // if (typeof window.updateGlobalProgressBar === 'function') window.updateGlobalProgressBar(); // This line is removed
        updateGlobalProgress(); // Call the new updateGlobalProgress
        return;
    }
    // Logged-in: always POST to backend
    try {
        const response = await fetch('/api/progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                topic: topicId,
                lesson: `lesson-${lessonIdx}`,
                completed: true,
                score: correctAnswers,
                total_questions: totalQuestions
            })
        });
        if (response.ok) {
            const data = await response.json();
            // Points and achievements from backend response
            if (data.points_earned) {
                showLessonResultsExtras(data.points_earned, []); // Pass empty array for achievements
            }
            if (data.new_achievements && data.new_achievements.length > 0) {
                showLessonResultsExtras([], data.new_achievements);
            }
            // Refresh UI from backend
            await fetchAndApplyUserProgress();
            await updatePointsDisplay();
            if (achievements && typeof achievements.checkForNewAchievements === 'function') {
                achievements.checkForNewAchievements();
            }
            if (window.app.learn && typeof window.app.learn.refreshProgress === 'function') window.app.learn.refreshProgress();
            // Always update global progress bar after lesson completion
            // if (typeof window.updateGlobalProgressBar === 'function') window.updateGlobalProgressBar(); // This line is removed
            updateGlobalProgress(); // Call the new updateGlobalProgress
        } else {
            showMessage('Could not save progress to backend', 'error');
        }
    } catch (e) {
        showMessage('Error saving progress', 'error');
    }
};

// Points System
const POINTS_CONFIG = {
    correctAnswer: 10,        // Points for each correct answer
    lessonCompletion: 50,     // Bonus points for completing a lesson (80%+)
    moduleCompletion: 200,    // Bonus points for completing all lessons in a module
    perfectScore: 25,         // Bonus points for getting 100% on a lesson
    streakBonus: 5,           // Bonus points for consecutive correct answers
    firstTimeBonus: 100       // Bonus points for completing a lesson for the first time
};

// Expose functions globally
window.app = {
    ...learn,
    showAuthScreen,
    hideAuthScreen,
    handleLogin,
    handleLogout,
    resetGuestProgress,
    saveUserProgress,
    loadUserProgress,
    autoSaveUserProgress,
    initializeUserProgress,
    awardPoints,
    getUserPoints,
    saveUserPoints,
    updatePointsDisplay,
    loadUserStats,
    calculateLessonPoints,
    checkModuleCompletion,
    POINTS_CONFIG,
    achievements
};

function awardPoints(userId, points, reason) {
    const userPoints = getUserPoints(userId);
    userPoints.total += points;
    userPoints.history.push({
        points: points,
        reason: reason,
        timestamp: new Date().toISOString()
    });
    saveUserPoints(userId, userPoints);
    
    // Show points notification
    // showPointsNotification(points, reason); // Removed
    
    console.log(`Awarded ${points} points to ${userId} for: ${reason}`);
    return userPoints.total;
}

function getUserPoints(userId) {
    const pointsData = localStorage.getItem(`userPoints_${userId}`);
    if (pointsData) {
        return JSON.parse(pointsData);
    }
    return {
        total: 0,
        history: [],
        achievements: [],
        streaks: {
            correctAnswers: 0,
            lessonsCompleted: 0
        }
    };
}

function saveUserPoints(userId, pointsData) {
    localStorage.setItem(`userPoints_${userId}`, JSON.stringify(pointsData));
}

function updatePointsDisplay() {
    const usernameElement = document.getElementById('username');
    const currentUser = usernameElement ? usernameElement.textContent : null;
    const pointsElement = document.getElementById('userPoints');
    const streakElement = document.getElementById('userStreak');
    
    if (currentUser && currentUser !== 'Guest') {
        // Always fetch from backend for logged-in users
        fetch('/api/user-stats', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch user stats');
            return response.json();
        })
        .then(userStats => {
            if (pointsElement) {
                pointsElement.textContent = userStats.total_score ? userStats.total_score.toLocaleString() : '0';
                console.log('[updatePointsDisplay] User:', currentUser, 'Points:', pointsElement.textContent);
            }
            if (streakElement) {
                streakElement.textContent = userStats.current_streak || 0;
            }
        })
        .catch(() => {
            // Fallback to localStorage if backend fails
            const userPoints = getUserPoints(currentUser);
            if (pointsElement) {
                pointsElement.textContent = userPoints.total.toLocaleString();
                console.log('[updatePointsDisplay] User:', currentUser, 'Points (fallback):', pointsElement.textContent);
            }
            if (streakElement) {
                streakElement.textContent = '0';
            }
        });
    } else {
        // Guest: show points and streak from GuestProgress
        if (pointsElement) {
            pointsElement.textContent = GuestProgress.getPoints().toLocaleString();
            console.log('[updatePointsDisplay] Guest points:', pointsElement.textContent);
        }
        const guestStreak = GuestProgress.getStreak();
        if (streakElement) streakElement.textContent = guestStreak.value || 0;
    }
}

async function loadUserStats(userId) {
    try {
        const response = await fetch('/api/user-stats', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        
        if (response.ok) {
            const userStats = await response.json();
            
            // Update points display
            const pointsElement = document.getElementById('userPoints');
            if (pointsElement) {
                pointsElement.textContent = userStats.total_score ? userStats.total_score.toLocaleString() : '0';
            }
            
            // Update streak display
            const streakElement = document.getElementById('userStreak');
            if (streakElement) {
                streakElement.textContent = userStats.current_streak || 0;
            }
        } else {
            // Fallback to localStorage if backend fails
            const userPoints = getUserPoints(userId);
            const pointsElement = document.getElementById('userPoints');
            const streakElement = document.getElementById('userStreak');
            
            if (pointsElement) {
                pointsElement.textContent = userPoints.total.toLocaleString();
            }
            if (streakElement) {
                streakElement.textContent = '0';
            }
        }
    } catch (error) {
        console.error('Error loading user stats:', error);
        // Fallback to localStorage
        const userPoints = getUserPoints(userId);
        const pointsElement = document.getElementById('userPoints');
        const streakElement = document.getElementById('userStreak');
        
        if (pointsElement) {
            pointsElement.textContent = userPoints.total.toLocaleString();
        }
        if (streakElement) {
            streakElement.textContent = '0';
        }
    }
}

// --- NOTIFICATIONS: Use .show for both points and achievements ---
// Removed showPointsNotification and all calls to it
// Add function to display points and achievements on lesson results screen
function showLessonResultsExtras(points, achievements) {
    const resultsExtras = document.getElementById('resultsExtras');
    if (resultsExtras) {
        let html = '';
        if (points) {
            html += `<div class="results-points"><span class="results-points-icon">⭐</span>+${points} points</div>`;
        }
        if (achievements && achievements.length > 0) {
            html += '<div class="results-achievements">';
            achievements.forEach(ach => {
                html += `<div class="results-achievement"><span class="results-achievement-icon">${ach.icon || '🏆'}</span>${ach.name} <span class="results-achievement-points">+${ach.points} pts</span></div>`;
            });
            html += '</div>';
        }
        resultsExtras.innerHTML = html;
    }
}

function calculateLessonPoints(correctAnswers, totalQuestions, isFirstTime, streak) {
    let points = 0;
    
    // Points for correct answers
    points += correctAnswers * POINTS_CONFIG.correctAnswer;
    
    // Perfect score bonus
    if (correctAnswers === totalQuestions) {
        points += POINTS_CONFIG.perfectScore;
    }
    
    // First time completion bonus
    if (isFirstTime) {
        points += POINTS_CONFIG.firstTimeBonus;
    }
    
    // Streak bonus
    if (streak > 0) {
        points += streak * POINTS_CONFIG.streakBonus;
    }
    
    // Lesson completion bonus (if 80%+)
    const percentage = (correctAnswers / totalQuestions) * 100;
    if (percentage >= 80) {
        points += POINTS_CONFIG.lessonCompletion;
    }
    
    return points;
}

function checkModuleCompletion(userId, topicId) {
    const progress = JSON.parse(localStorage.getItem('learnProgress') || '{}');
    const topicProgress = progress[topicId] || [];
    
    // Check if all lessons in the module are completed
    const allTopics = [
        { id: 'icail', lessonCount: 3 },
        { id: 'jurix', lessonCount: 3 },
        { id: 'journal', lessonCount: 3 },
        { id: 'history', lessonCount: 3 },
        { id: 'academics', lessonCount: 3 },
        { id: 'cbr', lessonCount: 3 }
    ];
    
    const topic = allTopics.find(t => t.id === topicId);
    if (topic && topicProgress.length === topic.lessonCount) {
        // Module completed! Award bonus points
        awardPoints(userId, POINTS_CONFIG.moduleCompletion, `Completed ${topicId} module`);
        return true;
    }
    
    return false;
} 

// Add a showMessage function for displaying login errors/success
function showMessage(message, type) {
    const popup = document.getElementById('messagePopup');
    const messageText = document.getElementById('messageText');
    if (popup && messageText) {
        messageText.textContent = message;
        popup.classList.remove('hidden');
        if (type === 'error') {
            popup.classList.add('error');
        } else {
            popup.classList.remove('error');
        }
        // Auto-hide after 3 seconds
        setTimeout(() => {
            popup.classList.add('hidden');
        }, 3000);
    } else {
        alert(message); // fallback
    }
} 