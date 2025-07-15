from flask import Flask, request, jsonify, session, render_template, send_from_directory
from flask_cors import CORS
import sqlite3
import hashlib
import os
import json
import requests
import feedparser
from datetime import datetime, timedelta
import threading
import time
from bs4 import BeautifulSoup
import re
import latexcodec  # Add this import for LaTeX decoding

app = Flask(__name__, static_folder='.', static_url_path='')
app.secret_key = 'ai_law_learning_secret_key_2024'
app.config['SESSION_COOKIE_SECURE'] = False  # Set to True in production with HTTPS
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['SESSION_COOKIE_DOMAIN'] = None  # Allow any domain for local development
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=7)

# Configure CORS to allow credentials
CORS(app, supports_credentials=True, origins=['http://localhost:5000', 'http://127.0.0.1:5000', 'http://localhost:5001', 'http://127.0.0.1:5001', 'http://localhost:5002', 'http://127.0.0.1:5002', 'http://localhost:5003', 'http://127.0.0.1:5003', 'http://localhost:5004', 'http://127.0.0.1:5004'])

# Database initialization
def init_db():
    conn = sqlite3.connect('ai_law_learning.db')
    cursor = conn.cursor()
    
    # Create users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT,
            password_hash TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Add email column if it doesn't exist (migration)
    try:
        cursor.execute('ALTER TABLE users ADD COLUMN email TEXT')
        print("Added email column to users table")
    except sqlite3.OperationalError as e:
        if "duplicate column name" in str(e):
            print("Email column already exists")
        else:
            print(f"Error adding email column: {e}")
    
    # Create progress table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS progress (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            topic TEXT NOT NULL,
            lesson TEXT NOT NULL,
            completed BOOLEAN DEFAULT FALSE,
            score INTEGER DEFAULT 0,
            total_questions INTEGER DEFAULT 0,
            completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id),
            UNIQUE(user_id, topic, lesson)
        )
    ''')
    
    # Create achievements table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS achievements (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            achievement_name TEXT NOT NULL,
            description TEXT,
            requirement_type TEXT,
            requirement_value INTEGER,
            points INTEGER DEFAULT 0,
            icon TEXT,
            earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id),
            UNIQUE(user_id, achievement_name)
        )
    ''')
    
    # Add new columns to achievements table if they don't exist
    try:
        cursor.execute('ALTER TABLE achievements ADD COLUMN description TEXT')
        print("Added description column to achievements table")
    except sqlite3.OperationalError as e:
        if "duplicate column name" in str(e):
            print("Description column already exists")
        else:
            print(f"Error adding description column: {e}")
    
    try:
        cursor.execute('ALTER TABLE achievements ADD COLUMN requirement_type TEXT')
        print("Added requirement_type column to achievements table")
    except sqlite3.OperationalError as e:
        if "duplicate column name" in str(e):
            print("Requirement_type column already exists")
        else:
            print(f"Error adding requirement_type column: {e}")
    
    try:
        cursor.execute('ALTER TABLE achievements ADD COLUMN requirement_value INTEGER')
        print("Added requirement_value column to achievements table")
    except sqlite3.OperationalError as e:
        if "duplicate column name" in str(e):
            print("Requirement_value column already exists")
        else:
            print(f"Error adding requirement_value column: {e}")
    
    try:
        cursor.execute('ALTER TABLE achievements ADD COLUMN points INTEGER DEFAULT 0')
        print("Added points column to achievements table")
    except sqlite3.OperationalError as e:
        if "duplicate column name" in str(e):
            print("Points column already exists")
        else:
            print(f"Error adding points column: {e}")
    
    try:
        cursor.execute('ALTER TABLE achievements ADD COLUMN icon TEXT')
        print("Added icon column to achievements table")
    except sqlite3.OperationalError as e:
        if "duplicate column name" in str(e):
            print("Icon column already exists")
        else:
            print(f"Error adding icon column: {e}")
    
    # Create user_stats table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS user_stats (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            total_lessons_completed INTEGER DEFAULT 0,
            total_score INTEGER DEFAULT 0,
            total_questions_answered INTEGER DEFAULT 0,
            current_streak INTEGER DEFAULT 0,
            longest_streak INTEGER DEFAULT 0,
            last_activity_date DATE DEFAULT CURRENT_DATE,
            FOREIGN KEY (user_id) REFERENCES users (id),
            UNIQUE(user_id)
        )
    ''')
    
    # Create recent_papers table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS recent_papers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            authors TEXT,
            venue TEXT,
            publication_date TEXT,
            abstract TEXT,
            url TEXT,
            source TEXT,
            citations INTEGER DEFAULT 0,
            fetched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Add citations column if it doesn't exist (migration)
    try:
        cursor.execute('ALTER TABLE recent_papers ADD COLUMN citations INTEGER DEFAULT 0')
        print("Added citations column to recent_papers table")
    except sqlite3.OperationalError as e:
        if "duplicate column name" in str(e):
            print("Citations column already exists")
        else:
            print(f"Error adding citations column: {e}")
    
    conn.commit()
    
    # Add predefined achievements if they don't exist
    predefined_achievements = [
        {
            'name': 'Ashley\'s Advocate',
            'description': 'Complete a lesson about Kevin Ashley or CATO systems',
            'requirement_type': 'lessons_completed',
            'requirement_value': 1,
            'points': 15,
            'icon': '👨‍⚖️'
        },
        {
            'name': 'Prakken\'s Proponent',
            'description': 'Master logical tools for legal argumentation',
            'requirement_type': 'lessons_completed',
            'requirement_value': 3,
            'points': 25,
            'icon': '🔧'
        },
        {
            'name': 'Bench-Capon\'s Believer',
            'description': 'Learn about value-based argumentation frameworks',
            'requirement_type': 'lessons_completed',
            'requirement_value': 5,
            'points': 35,
            'icon': '⚖️'
        },
        {
            'name': 'Sartor\'s Scholar',
            'description': 'Dive deep into legal reasoning and AI',
            'requirement_type': 'lessons_completed',
            'requirement_value': 7,
            'points': 45,
            'icon': '🧠'
        },
        {
            'name': 'HYPO Hero',
            'description': 'Master case-based reasoning fundamentals',
            'requirement_type': 'lessons_completed',
            'requirement_value': 10,
            'points': 60,
            'icon': '🦸‍♂️'
        },
        {
            'name': 'CATO Connoisseur',
            'description': 'Become an expert in factor-based legal reasoning',
            'requirement_type': 'lessons_completed',
            'requirement_value': 15,
            'points': 75,
            'icon': '🎭'
        },
        {
            'name': 'Argumentation Ace',
            'description': 'Perfect your skills in legal argumentation',
            'requirement_type': 'perfect_score',
            'requirement_value': 3,
            'points': 50,
            'icon': '🏆'
        },
        {
            'name': 'Streak Seeker',
            'description': 'Maintain a 5-day learning streak',
            'requirement_type': 'streak',
            'requirement_value': 5,
            'points': 40,
            'icon': '🔥'
        },
        {
            'name': 'ICAIL Insider',
            'description': 'Complete lessons covering ICAIL conference topics',
            'requirement_type': 'lessons_completed',
            'requirement_value': 20,
            'points': 100,
            'icon': '🏛️'
        },
        {
            'name': 'JURIX Judge',
            'description': 'Master JURIX conference research areas',
            'requirement_type': 'lessons_completed',
            'requirement_value': 25,
            'points': 125,
            'icon': '⚖️'
        }
    ]
    
    # Clear old predefined achievements and add new ones
    cursor.execute('DELETE FROM achievements WHERE user_id IS NULL')
    print("Cleared old predefined achievements...")
    
    print("Adding new predefined achievements...")
    for achievement in predefined_achievements:
        cursor.execute('''
            INSERT INTO achievements (user_id, achievement_name, description, requirement_type, requirement_value, points, icon)
            VALUES (NULL, ?, ?, ?, ?, ?, ?)
        ''', (
            achievement['name'],
            achievement['description'],
            achievement['requirement_type'],
            achievement['requirement_value'],
            achievement['points'],
            achievement['icon']
        ))
    conn.commit()
    print(f"Added {len(predefined_achievements)} new predefined achievements")
    
    conn.close()

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def get_db_connection():
    conn = sqlite3.connect('ai_law_learning.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    
    if not username or not email or not password:
        return jsonify({'error': 'All fields are required'}), 400
    
    if len(password) < 6:
        return jsonify({'error': 'Password must be at least 6 characters'}), 400
    
    password_hash = hash_password(password)
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
                      (username, email, password_hash))
        user_id = cursor.lastrowid
        
        conn.commit()
        conn.close()
        
        return jsonify({'message': 'User registered successfully', 'user_id': user_id}), 201
    
    except sqlite3.IntegrityError:
        return jsonify({'error': 'Username or email already exists'}), 409
    except Exception as e:
        return jsonify({'error': 'Registration failed'}), 500

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400
    
    password_hash = hash_password(password)
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('SELECT id, username, email FROM users WHERE username = ? AND password_hash = ?',
                      (username, password_hash))
        user = cursor.fetchone()
        
        conn.close()
        
        if user:
            session['user_id'] = user['id']
            session['username'] = user['username']
            session.permanent = True  # Make session persistent
            
            print(f"DEBUG: User {username} logged in successfully. Session created: {dict(session)}")
            print(f"DEBUG: Session cookie settings: {app.config}")
            
            response = jsonify({
                'message': 'Login successful',
                'user': {
                    'id': user['id'],
                    'username': user['username'],
                    'email': user['email'] or ''
                }
            })
            
            print(f"DEBUG: Response headers: {dict(response.headers)}")
            return response, 200
        else:
            print(f"DEBUG: Login failed for username: {username}")
            return jsonify({'error': 'Invalid username or password'}), 401
    
    except Exception as e:
        print(f"DEBUG: Login error: {str(e)}")
        return jsonify({'error': 'Login failed'}), 500

@app.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'message': 'Logout successful'}), 200

@app.route('/api/user', methods=['GET'])
def get_user():
    if 'user_id' not in session:
        return jsonify({'error': 'Not authenticated'}), 401
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('SELECT id, username, email FROM users WHERE id = ?', (session['user_id'],))
        user = cursor.fetchone()
        
        conn.close()
        
        if user:
            return jsonify({
                'user': {
                    'id': user['id'],
                    'username': user['username'],
                    'email': user['email'] or ''
                }
            }), 200
        else:
            return jsonify({'error': 'User not found'}), 404
    
    except Exception as e:
        return jsonify({'error': 'Failed to get user data'}), 500

@app.route('/api/progress', methods=['GET'])
def get_progress():
    print(f"DEBUG: Progress request received. Session contents: {dict(session)}")
    print(f"DEBUG: Request headers: {dict(request.headers)}")
    
    if 'user_id' not in session:
        print(f"DEBUG: No user_id in session. Session contents: {dict(session)}")
        return jsonify({'error': 'Not authenticated'}), 401
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT topic, lesson, completed, score, total_questions, completed_at
            FROM progress 
            WHERE user_id = ?
            ORDER BY completed_at DESC
        ''', (session['user_id'],))
        
        progress_data = []
        for row in cursor.fetchall():
            progress_data.append({
                'topic': row['topic'],
                'lesson': row['lesson'],
                'completed': bool(row['completed']),
                'score': row['score'],
                'total_questions': row['total_questions'],
                'completed_at': row['completed_at']
            })
        
        conn.close()
        print(f"DEBUG: Retrieved {len(progress_data)} progress records for user {session['user_id']}")
        
        return jsonify({'progress': progress_data}), 200
    
    except Exception as e:
        print(f"DEBUG: Error getting progress: {str(e)}")
        return jsonify({'error': 'Failed to get progress'}), 500

@app.route('/api/progress', methods=['POST'])
def save_progress():
    if 'user_id' not in session:
        print(f"DEBUG: No user_id in session for progress save. Session contents: {dict(session)}")
        return jsonify({'error': 'Not authenticated'}), 401
    
    data = request.get_json()
    topic = data.get('topic')
    lesson = data.get('lesson')
    completed = data.get('completed', False)
    score = data.get('score', 0)
    total_questions = data.get('total_questions', 0)
    
    print(f"DEBUG: Saving progress - User: {session['user_id']}, Topic: {topic}, Lesson: {lesson}, Completed: {completed}, Score: {score}/{total_questions}")
    
    if not topic or not lesson:
        return jsonify({'error': 'Topic and Lesson are required'}), 400
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Check if this progress already exists
        cursor.execute('''
            SELECT completed, score, total_questions FROM progress 
            WHERE user_id = ? AND topic = ? AND lesson = ?
        ''', (session['user_id'], topic, lesson))
        existing_progress = cursor.fetchone()
        
        if existing_progress:
            print(f"DEBUG: Existing progress found - Completed: {existing_progress['completed']}, Score: {existing_progress['score']}/{existing_progress['total_questions']}")
            # Only update if the new progress is better or different
            if (not existing_progress['completed'] and completed) or (existing_progress['score'] < score):
                print(f"DEBUG: Updating progress with better results")
            else:
                print(f"DEBUG: Skipping progress update - no improvement")
                conn.close()
                return jsonify({
                    'message': 'Progress already exists',
                    'new_achievements': [],
                    'points_earned': 0,
                    'correct_answers': existing_progress['score'],
                    'total_questions': existing_progress['total_questions'],
                    'completion_bonus': 0
                }), 200
        
        cursor.execute('''
            INSERT OR REPLACE INTO progress 
            (user_id, topic, lesson, completed, score, total_questions, completed_at)
            VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        ''', (session['user_id'], topic, lesson, completed, score, total_questions))
        
        conn.commit()
        conn.close()
        
        # Calculate points earned (5 points per correct answer + bonus for completion)
        points_per_correct = 5
        completion_bonus = 10 if completed else 0
        points_earned = (score * points_per_correct) + completion_bonus
        
        print(f"DEBUG: Points calculation - Score: {score}, Points per correct: {points_per_correct}, Completion bonus: {completion_bonus}, Total: {points_earned}")
        
        # Update user stats and check for achievements
        new_achievements = update_user_stats(
            session['user_id'], 
            lesson_completed=completed, 
            score=points_earned,  # Pass points earned instead of raw score
            questions_answered=total_questions
        )
        
        print(f"DEBUG: Progress saved successfully for user {session['user_id']}")
        print(f"DEBUG: New achievements earned: {len(new_achievements)}")
        return jsonify({
            'message': 'Progress saved successfully',
            'new_achievements': new_achievements,
            'points_earned': points_earned,
            'correct_answers': score,
            'total_questions': total_questions,
            'completion_bonus': completion_bonus
        }), 200
    
    except Exception as e:
        print(f"DEBUG: Error saving progress: {str(e)}")
        return jsonify({'error': 'Failed to save progress'}), 500

@app.route('/api/progress/<topic>', methods=['GET'])
def get_topic_progress(topic):
    if 'user_id' not in session:
        return jsonify({'error': 'Not authenticated'}), 401
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT lesson, completed, score, total_questions, completed_at
            FROM progress 
            WHERE user_id = ? AND topic = ?
            ORDER BY completed_at DESC
        ''', (session['user_id'], topic))
        
        progress_data = []
        for row in cursor.fetchall():
            progress_data.append({
                'lesson': row['lesson'],
                'completed': bool(row['completed']),
                'score': row['score'],
                'total_questions': row['total_questions'],
                'completed_at': row['completed_at']
            })
        
        conn.close()
        
        return jsonify({'progress': progress_data}), 200
    
    except Exception as e:
        return jsonify({'error': 'Failed to get topic progress'}), 500

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory('.', filename)

# New API endpoints for leaderboard and social features

@app.route('/api/leaderboard', methods=['GET'])
def get_leaderboard():
    if 'user_id' not in session:
        return jsonify({'error': 'Not authenticated'}), 401
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Get top 10 users by total score
        cursor.execute('''
            SELECT u.username, us.total_lessons_completed, us.total_score, us.current_streak, us.longest_streak
            FROM users u
            JOIN user_stats us ON u.id = us.user_id
            ORDER BY us.total_score DESC, us.total_lessons_completed DESC
            LIMIT 10
        ''')
        
        leaderboard = []
        for row in cursor.fetchall():
            leaderboard.append({
                'username': row['username'],
                'total_lessons_completed': row['total_lessons_completed'],
                'total_score': row['total_score'],
                'current_streak': row['current_streak'],
                'longest_streak': row['longest_streak']
            })
        
        # Get current user's rank
        cursor.execute('''
            SELECT COUNT(*) + 1 as rank
            FROM user_stats us1
            WHERE us1.total_score > (
                SELECT us2.total_score 
                FROM user_stats us2 
                WHERE us2.user_id = ?
            )
        ''', (session['user_id'],))
        
        user_rank = cursor.fetchone()
        user_rank = user_rank['rank'] if user_rank else 0
        
        conn.close()
        
        return jsonify({
            'leaderboard': leaderboard,
            'user_rank': user_rank
        }), 200
    
    except Exception as e:
        return jsonify({'error': 'Failed to get leaderboard'}), 500

@app.route('/api/achievements', methods=['GET'])
def get_achievements():
    if 'user_id' not in session:
        return jsonify({'error': 'Not authenticated'}), 401
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Get all predefined achievements (where user_id is NULL)
        cursor.execute('SELECT * FROM achievements WHERE user_id IS NULL ORDER BY requirement_value ASC')
        all_achievements = []
        for row in cursor.fetchall():
            all_achievements.append({
                'id': row['id'],
                'name': row['achievement_name'],
                'description': row['description'],
                'requirement_type': row['requirement_type'],
                'requirement_value': row['requirement_value'],
                'points': row['points'],
                'icon': row['icon']
            })
        
        # Get user's earned achievements
        cursor.execute('''
            SELECT a.id, a.achievement_name, a.earned_at
            FROM achievements a
            WHERE a.user_id = ?
            ORDER BY a.earned_at DESC
        ''', (session['user_id'],))
        
        earned_achievements = []
        for row in cursor.fetchall():
            earned_achievements.append({
                'id': row['id'],
                'name': row['achievement_name'],
                'earned_at': row['earned_at']
            })
        
        # Get user stats for progress calculation
        cursor.execute('SELECT * FROM user_stats WHERE user_id = ?', (session['user_id'],))
        user_stats = cursor.fetchone()
        
        conn.close()
        
        return jsonify({
            'all_achievements': all_achievements,
            'earned_achievements': earned_achievements,
            'user_stats': dict(user_stats) if user_stats else None
        }), 200
    
    except Exception as e:
        return jsonify({'error': 'Failed to get achievements'}), 500

@app.route('/api/user-stats', methods=['GET'])
def get_user_stats():
    if 'user_id' not in session:
        return jsonify({'error': 'Not authenticated'}), 401
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('SELECT * FROM user_stats WHERE user_id = ?', (session['user_id'],))
        user_stats = cursor.fetchone()
        
        if not user_stats:
            # Create user stats if they don't exist
            cursor.execute('''
                INSERT INTO user_stats (user_id, total_lessons_completed, total_score, total_questions_answered, current_streak, longest_streak, last_activity_date)
                VALUES (?, 0, 0, 0, 0, 0, CURRENT_DATE)
            ''', (session['user_id'],))
            conn.commit()
            
            cursor.execute('SELECT * FROM user_stats WHERE user_id = ?', (session['user_id'],))
            user_stats = cursor.fetchone()
        
        conn.close()
        
        return jsonify(dict(user_stats)), 200
    
    except Exception as e:
        return jsonify({'error': 'Failed to get user stats'}), 500

def update_user_stats(user_id, lesson_completed=False, score=0, questions_answered=0):
    """Helper function to update user stats and check for achievements"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Get current stats
        cursor.execute('SELECT * FROM user_stats WHERE user_id = ?', (user_id,))
        current_stats = cursor.fetchone()
        
        if not current_stats:
            # Create new stats record
            cursor.execute('''
                INSERT INTO user_stats (user_id, total_lessons_completed, total_score, total_questions_answered, current_streak, longest_streak, last_activity_date)
                VALUES (?, 0, 0, 0, 0, 0, CURRENT_DATE)
            ''', (user_id,))
            conn.commit()
            cursor.execute('SELECT * FROM user_stats WHERE user_id = ?', (user_id,))
            current_stats = cursor.fetchone()
        
        # Update stats
        new_lessons = current_stats['total_lessons_completed'] + (1 if lesson_completed else 0)
        new_score = current_stats['total_score'] + score
        new_questions = current_stats['total_questions_answered'] + questions_answered
        
        # Update streak
        today = datetime.now().date()
        last_activity = datetime.strptime(current_stats['last_activity_date'], '%Y-%m-%d').date()
        current_streak = current_stats['current_streak']
        longest_streak = current_stats['longest_streak']
        
        if (today - last_activity).days == 1:
            current_streak += 1
        elif (today - last_activity).days > 1:
            current_streak = 1
        elif (today - last_activity).days == 0 and current_streak == 0:
            current_streak = 1
        
        if current_streak > longest_streak:
            longest_streak = current_streak
        
        # Update user stats
        cursor.execute('''
            UPDATE user_stats 
            SET total_lessons_completed = ?, total_score = ?, total_questions_answered = ?, 
                current_streak = ?, longest_streak = ?, last_activity_date = ?
            WHERE user_id = ?
        ''', (new_lessons, new_score, new_questions, current_streak, longest_streak, today, user_id))
        
        # Check for new achievements
        new_achievements = check_achievements(cursor, user_id, new_lessons, new_score, current_streak)
        
        conn.commit()
        conn.close()
        
        return new_achievements
    
    except Exception as e:
        print(f"Error updating user stats: {e}")
        return []

def check_achievements(cursor, user_id, lessons_completed, total_score, current_streak):
    """Check if user has earned new achievements"""
    new_achievements = []
    
    # Get all predefined achievements (where user_id is NULL) and user's earned achievements
    cursor.execute('SELECT * FROM achievements WHERE user_id IS NULL')
    all_achievements = cursor.fetchall()
    
    cursor.execute('SELECT achievement_name FROM achievements WHERE user_id = ?', (user_id,))
    earned_achievement_names = [row['achievement_name'] for row in cursor.fetchall()]
    
    print(f"DEBUG: Checking achievements for user {user_id}")
    print(f"DEBUG: Already earned achievements: {earned_achievement_names}")
    
    for achievement in all_achievements:
        if achievement['achievement_name'] in earned_achievement_names:
            print(f"DEBUG: Achievement {achievement['achievement_name']} already earned, skipping")
            continue
        
        earned = False
        if achievement['requirement_type'] == 'lessons_completed' and lessons_completed >= achievement['requirement_value']:
            earned = True
            print(f"DEBUG: Achievement {achievement['achievement_name']} earned for lessons completed: {lessons_completed} >= {achievement['requirement_value']}")
        elif achievement['requirement_type'] == 'streak' and current_streak >= achievement['requirement_value']:
            earned = True
            print(f"DEBUG: Achievement {achievement['achievement_name']} earned for streak: {current_streak} >= {achievement['requirement_value']}")
        elif achievement['requirement_type'] == 'perfect_score':
            # Check if user has completed any lesson with 100% score
            # Only check if they haven't already earned this achievement
            cursor.execute('''
                SELECT COUNT(*) FROM progress 
                WHERE user_id = ? AND completed = 1 AND score = total_questions AND total_questions > 0
            ''', (user_id,))
            perfect_lessons = cursor.fetchone()[0]
            if perfect_lessons >= achievement['requirement_value']:
                earned = True
                print(f"DEBUG: Achievement {achievement['achievement_name']} earned for perfect score: {perfect_lessons} >= {achievement['requirement_value']}")
        
        if earned:
            print(f"DEBUG: Awarding achievement {achievement['achievement_name']} with {achievement['points']} points")
            cursor.execute('''
                INSERT INTO achievements (user_id, achievement_name)
                VALUES (?, ?)
            ''', (user_id, achievement['achievement_name']))
            
            new_achievements.append({
                'id': achievement['id'],
                'name': achievement['achievement_name'],
                'earned_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            })
    
    print(f"DEBUG: New achievements earned: {len(new_achievements)}")
    return new_achievements

def fetch_icail_papers():
    print("DEBUG: Starting ICAIL paper fetch for ALL years using RSS feed and DBLP JSON API...")
    try:
        # Use the RSS feed to get all ICAIL conference year links
        rss_url = "https://dblp.org/feed/streams/conf/icail.rss"
        feed = feedparser.parse(rss_url)
        year_links = []
        for entry in feed.entries:
            if hasattr(entry, 'link'):
                year_links.append(entry.link)
        year_links = list(set(year_links))
        year_links.sort(reverse=True)
        print(f"DEBUG: Found {len(year_links)} ICAIL year links from RSS: {year_links}")
        papers = []
        for conf_url in year_links:
            conf_title = conf_url.split('/')[-1].replace('.html', '').upper()
            print(f"DEBUG: Processing ICAIL conference: {conf_title} at {conf_url}")
            # Extract edition id (e.g., icail1999) from the URL
            import re
            match = re.search(r'/icail([0-9]{2,4})', conf_url)
            if not match:
                print(f"DEBUG: Could not extract edition id from {conf_url}")
                continue
            edition_id = f"icail{match.group(1)}"
            api_url = f"https://dblp.dagstuhl.de/search/publ/api?q=toc%3Adb/conf/icail/{edition_id}.bht%3A&h=1000&format=json"
            print(f"DEBUG: Fetching DBLP JSON API: {api_url}")
            try:
                resp = requests.get(api_url, timeout=15)
                if resp.status_code != 200:
                    print(f"DEBUG: Failed to fetch API for {edition_id}, status: {resp.status_code}")
                    continue
                data = resp.json()
                hits = data.get('result', {}).get('hits', {}).get('hit', [])
                print(f"DEBUG: Found {len(hits)} papers in API for {edition_id}")
                for hit in hits:
                    info = hit.get('info', {})
                    title = info.get('title', '').strip()
                    authors = []
                    authors_info = info.get('authors', {}).get('author', [])
                    if isinstance(authors_info, dict):
                        authors_info = [authors_info]
                    for author in authors_info:
                        if isinstance(author, dict):
                            authors.append(author.get('text', '').strip())
                        elif isinstance(author, str):
                            authors.append(author.strip())
                    venue = info.get('venue', conf_title)
                    publication_date = str(info.get('year', ''))
                    abstract = ''
                    url = info.get('url', conf_url)
                    doi = info.get('ee', '')
                    citations = 0
                    if not title or not authors:
                        print(f"DEBUG: Skipping entry due to missing title or authors: title='{title}', authors={authors}")
                        continue
                    paper = {
                        'title': title,
                        'authors': ', '.join(authors),
                        'venue': venue,
                        'publication_date': publication_date,
                        'abstract': abstract,
                        'url': doi if doi else url,
                        'source': 'ICAIL',
                        'citations': citations
                    }
                    papers.append(paper)
            except Exception as e:
                print(f"DEBUG: Error fetching/parsing API for {edition_id}: {e}")
        print(f"DEBUG: Returning {len(papers)} ICAIL papers")
        return papers
    except Exception as e:
        print(f"DEBUG: Error in fetch_icail_papers: {e}")
        return []

def fetch_jurix_papers():
    print("DEBUG: Starting JURIX paper fetch for ALL years using RSS feed and DBLP JSON API...")
    try:
        # Use the RSS feed to get all JURIX conference year links
        rss_url = "https://dblp.org/feed/streams/conf/jurix.rss"
        feed = feedparser.parse(rss_url)
        year_links = []
        for entry in feed.entries:
            if hasattr(entry, 'link'):
                year_links.append(entry.link)
        year_links = list(set(year_links))
        year_links.sort(reverse=True)
        print(f"DEBUG: Found {len(year_links)} JURIX year links from RSS: {year_links}")
        papers = []
        for conf_url in year_links:
            # Extract the edition id from the URL (e.g., jurix2023)
            # Example: https://dblp.org/db/conf/jurix/jurix2023.html -> jurix2023
            edition_id = None
            match = re.search(r'/jurix/(jurix\d+)\.html', conf_url)
            if match:
                edition_id = match.group(1)
            else:
                print(f"DEBUG: Could not extract edition id from {conf_url}")
                continue
            api_url = f"https://dblp.dagstuhl.de/search/publ/api?q=toc:db/conf/jurix/{edition_id}.bht:&h=1000&format=json"
            print(f"DEBUG: Fetching JURIX API for {edition_id}: {api_url}")
            try:
                resp = requests.get(api_url, timeout=15)
                if resp.status_code != 200:
                    print(f"DEBUG: Failed to fetch JURIX API for {edition_id}, status: {resp.status_code}")
                    continue
                data = resp.json()
                hits = data.get('result', {}).get('hits', {}).get('hit', [])
                print(f"DEBUG: Found {len(hits)} papers for {edition_id}")
                for hit in hits:
                    info = hit.get('info', {})
                    title = info.get('title', '').strip()
                    authors = info.get('authors', {}).get('author', [])
                    if isinstance(authors, dict):
                        authors = [authors.get('text', '')]
                    elif isinstance(authors, list):
                        authors = [a.get('text', '') if isinstance(a, dict) else str(a) for a in authors]
                    else:
                        authors = []
                    authors = ', '.join(authors)
                    venue = edition_id.upper()
                    publication_date = info.get('year', '')
                    url = info.get('ee', '')
                    if not title or not authors:
                        continue  # skip entries without title or authors
                    paper = {
                        'title': title,
                        'authors': authors,
                        'venue': venue,
                        'publication_date': publication_date,
                        'abstract': '',  # Add missing abstract field
                        'url': url,
                        'source': 'JURIX',  # Add missing source field
                        'citations': 0  # Add missing citations field
                    }
                    if url and 'doi.org/' in url:
                        doi = url.split('doi.org/')[-1].strip()
                        abstract = fetch_abstract_from_crossref(doi)
                        if abstract:
                            paper['abstract'] = abstract
                            print(f"DEBUG: Got abstract for DOI {doi}")
                    papers.append(paper)
            except Exception as e:
                print(f"DEBUG: Error fetching/parsing JURIX API for {edition_id}: {e}")
        print(f"DEBUG: Total JURIX papers found: {len(papers)}")
        return papers
    except Exception as e:
        print(f"DEBUG: Error in fetch_jurix_papers: {e}")
        return []

def fetch_abstract_from_crossref(doi):
    """Fetch abstract from CrossRef API given a DOI."""
    if not doi:
        return ''
    api_url = f'https://api.crossref.org/works/{doi}'
    try:
        resp = requests.get(api_url, timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            abstract = data.get('message', {}).get('abstract', '')
            if abstract:
                import re
                abstract = re.sub('<[^<]+?>', '', abstract)
                return abstract.strip()
    except Exception as e:
        print(f"DEBUG: Error fetching abstract for DOI {doi}: {e}")
    return ''

def fetch_all_papers():
    print("DEBUG: Starting fetch_all_papers...")
    try:
        # Clear existing papers
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('DELETE FROM recent_papers')
        conn.commit()
        conn.close()
        print("DEBUG: Cleared existing papers from database")
        
        # Fetch both ICAIL and JURIX papers
        icail_papers = fetch_icail_papers()
        jurix_papers = fetch_jurix_papers()
        
        all_papers = icail_papers + jurix_papers
        
        # Insert papers into database
        conn = get_db_connection()
        cursor = conn.cursor()
        
        inserted_count = 0
        for paper in all_papers:
            try:
                cursor.execute('''
                    INSERT OR IGNORE INTO recent_papers 
                    (title, authors, venue, publication_date, abstract, url, source, citations, fetched_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
                ''', (
                    paper['title'],
                    paper['authors'],
                    paper['venue'],
                    paper['publication_date'],
                    paper['abstract'],
                    paper['url'],
                    paper['source'],
                    paper['citations']
                ))
                
                if cursor.rowcount > 0:
                    inserted_count += 1
                    print(f"DEBUG: Inserted paper: {paper['title']}")
                
            except Exception as e:
                print(f"DEBUG: Error inserting paper {paper['title']}: {e}")
        
        conn.commit()
        conn.close()
        
        print(f"DEBUG: ICAIL papers fetched: {len(icail_papers)}")
        print(f"DEBUG: JURIX papers fetched: {len(jurix_papers)}")
        print(f"DEBUG: Successfully fetched and inserted {inserted_count} new papers")
        return inserted_count
        
    except Exception as e:
        print(f"DEBUG: Error in fetch_all_papers: {e}")
        return 0

def start_paper_fetching_scheduler():
    """Start the background scheduler for fetching papers every 24 hours"""
    def scheduler():
        while True:
            try:
                print("Starting scheduled paper fetch...")
                fetch_all_papers()
                print("Scheduled paper fetch completed")
            except Exception as e:
                print(f"Error in scheduled paper fetch: {e}")
            # Wait 24 hours
            time.sleep(24 * 60 * 60)
    # Start the scheduler in a separate thread
    scheduler_thread = threading.Thread(target=scheduler, daemon=True)
    scheduler_thread.start()

@app.route('/api/recent-papers')
def api_recent_papers():
    year = request.args.get('year')
    sort = request.args.get('sort', 'date')
    venue = request.args.get('venue')
    conn = get_db_connection()
    query = 'SELECT * FROM recent_papers'
    params = []
    filters = []
    if year:
        filters.append('publication_date LIKE ?')
        params.append(f'{year}%')
    if venue:
        filters.append('LOWER(venue) LIKE ?')
        params.append(f'%{venue.lower()}%')
    if filters:
        query += ' WHERE ' + ' AND '.join(filters)
    if sort == 'citations':
        query += ' ORDER BY citations DESC'
    elif sort == 'title':
        query += ' ORDER BY title ASC'
    else:
        query += ' ORDER BY publication_date DESC'
    # Removed LIMIT 20 to show all papers
    papers = conn.execute(query, params).fetchall()
    conn.close()
    papers_list = [dict(p) for p in papers]
    for p in papers_list:
        if 'citations' not in p:
            p['citations'] = None # Changed from 0 to None
    return jsonify({'papers': papers_list})

@app.route('/api/research-years')
def api_research_years():
    venue = request.args.get('venue')
    conn = get_db_connection()
    query = 'SELECT DISTINCT substr(publication_date, 1, 4) as year FROM recent_papers WHERE publication_date IS NOT NULL AND publication_date != ""'
    params = []
    if venue:
        query += ' AND LOWER(venue) LIKE ?'
        params.append(f'%{venue.lower()}%')
    query += ' ORDER BY year DESC'
    years = conn.execute(query, params).fetchall()
    conn.close()
    year_list = [y['year'] for y in years if y['year']]
    return jsonify({'years': year_list})

# Remove the /api/fetch-papers endpoint to ensure fetching is manual only

def decode_latex_chars(text):
    """Convert LaTeX-style character escaping to Unicode characters."""
    import re
    
    if not text:
        return text
    
    # Common LaTeX character mappings
    latex_chars = {
        r'\\\'{a}': 'á', r'\\\'{e}': 'é', r'\\\'{i}': 'í', r'\\\'{o}': 'ó', r'\\\'{u}': 'ú',
        r'\\\'{A}': 'Á', r'\\\'{E}': 'É', r'\\\'{I}': 'Í', r'\\\'{O}': 'Ó', r'\\\'{U}': 'Ú',
        r'\\\'{y}': 'ý', r'\\\'{Y}': 'Ý',
        r'\\`{a}': 'à', r'\\`{e}': 'è', r'\\`{i}': 'ì', r'\\`{o}': 'ò', r'\\`{u}': 'ù',
        r'\\`{A}': 'À', r'\\`{E}': 'È', r'\\`{I}': 'Ì', r'\\`{O}': 'Ò', r'\\`{U}': 'Ù',
        r'\\^{a}': 'â', r'\\^{e}': 'ê', r'\\^{i}': 'î', r'\\^{o}': 'ô', r'\\^{u}': 'û',
        r'\\^{A}': 'Â', r'\\^{E}': 'Ê', r'\\^{I}': 'Î', r'\\^{O}': 'Ô', r'\\^{U}': 'Û',
        r'\\"{a}': 'ä', r'\\"{e}': 'ë', r'\\"{i}': 'ï', r'\\"{o}': 'ö', r'\\"{u}': 'ü',
        r'\\"{A}': 'Ä', r'\\"{E}': 'Ë', r'\\"{I}': 'Ï', r'\\"{O}': 'Ö', r'\\"{U}': 'Ü',
        r'\\~{a}': 'ã', r'\\~{e}': 'ẽ', r'\\~{i}': 'ĩ', r'\\~{o}': 'õ', r'\\~{u}': 'ũ',
        r'\\~{A}': 'Ã', r'\\~{E}': 'Ẽ', r'\\~{I}': 'Ĩ', r'\\~{O}': 'Õ', r'\\~{U}': 'Ũ',
        r'\\c{c}': 'ç', r'\\c{C}': 'Ç',
        r'\\v{s}': 'š', r'\\v{S}': 'Š', r'\\v{z}': 'ž', r'\\v{Z}': 'Ž',
        r'\\v{c}': 'č', r'\\v{C}': 'Č', r'\\v{r}': 'ř', r'\\v{R}': 'Ř',
        r'\\v{n}': 'ň', r'\\v{N}': 'Ň', r'\\v{d}': 'ď', r'\\v{D}': 'Ď',
        r'\\v{t}': 'ť', r'\\v{T}': 'Ť', r'\\v{l}': 'ľ', r'\\v{L}': 'Ľ',
        r'\\o': 'ø', r'\\O': 'Ø',
        r'\\ae': 'æ', r'\\AE': 'Æ',
        r'\\oe': 'œ', r'\\OE': 'Œ',
        r'\\ss': 'ß',
        r'\\\'{n}': 'ń', r'\\\'{N}': 'Ń',
        r'\\\'{s}': 'ś', r'\\\'{S}': 'Ś',
        r'\\\'{l}': 'ł', r'\\\'{L}': 'Ł',
        r'\\\'{z}': 'ź', r'\\\'{Z}': 'Ź',
        r'\\\'{c}': 'ć', r'\\\'{C}': 'Ć',
        r'\\\'{r}': 'ŕ', r'\\\'{R}': 'Ŕ',
        r'\\\'{m}': 'ḿ', r'\\\'{M}': 'Ḿ',
        r'\\\'{w}': 'ẃ', r'\\\'{W}': 'Ẃ',
        r'\\\'{y}': 'ý', r'\\\'{Y}': 'Ý',
        r'\\\'{g}': 'ǵ', r'\\\'{G}': 'Ǵ',
        r'\\\'{k}': 'ḱ', r'\\\'{K}': 'Ḱ',
        r'\\\'{p}': 'ṕ', r'\\\'{P}': 'Ṕ',
        r'\\\'{f}': 'ḟ', r'\\\'{F}': 'Ḟ',
        r'\\\'{x}': 'ẍ', r'\\\'{X}': 'Ẍ',
        r'\\\'{v}': 'ṽ', r'\\\'{V}': 'Ṽ',
        r'\\\'{b}': 'ḃ', r'\\\'{B}': 'Ḃ',
        r'\\\'{d}': 'ḋ', r'\\\'{D}': 'Ḋ',
        r'\\\'{h}': 'ĥ', r'\\\'{H}': 'Ĥ',
        r'\\\'{j}': 'ĵ', r'\\\'{J}': 'Ĵ',
        r'\\\'{q}': 'q́', r'\\\'{Q}': 'Q́',
        r'\\\'{t}': 'ṱ', r'\\\'{T}': 'Ṱ',
        # Add specific patterns for dotless i and j
        r'\\\'{\i}': 'í', r'\\\'{\j}': 'ĵ',
        r'\\`{\i}': 'ì', r'\\`{\j}': 'j̀',
        r'\\^{\i}': 'î', r'\\^{\j}': 'ĵ',
        r'\\"{\i}': 'ï', r'\\"{\j}': 'j̈',
        r'\\~{\i}': 'ĩ', r'\\~{\j}': 'j̃',
        r'\\v{\i}': 'ǐ', r'\\v{\j}': 'ǰ',
        r'\\c{\i}': 'i̧', r'\\c{\j}': 'j̧',
    }
    
    # Apply the replacements safely
    result = text
    for pattern, replacement in latex_chars.items():
        try:
            result = re.sub(pattern, replacement, result)
        except Exception as e:
            # If a pattern causes issues, skip it and continue
            print(f"DEBUG: Warning - failed to apply LaTeX pattern {pattern}: {e}")
            continue
    
    return result

if __name__ == '__main__':
    init_db()
    app.run(debug=True, host='0.0.0.0', port=5004) 