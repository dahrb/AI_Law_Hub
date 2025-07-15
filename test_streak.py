#!/usr/bin/env python3

import sqlite3
from datetime import datetime, timedelta

def update_user_streak(username, new_streak, new_score):
    """Update a user's streak and score for testing"""
    conn = sqlite3.connect('ai_law_learning.db')
    cursor = conn.cursor()
    
    try:
        # Get user ID
        cursor.execute('SELECT id FROM users WHERE username = ?', (username,))
        user_result = cursor.fetchone()
        
        if not user_result:
            print(f"User '{username}' not found")
            return False
        
        user_id = user_result[0]
        
        # Update user stats
        today = datetime.now().date()
        cursor.execute('''
            UPDATE user_stats 
            SET current_streak = ?, total_score = ?, last_activity_date = ?
            WHERE user_id = ?
        ''', (new_streak, new_score, today, user_id))
        
        conn.commit()
        print(f"Updated user '{username}': streak={new_streak}, score={new_score}")
        return True
        
    except Exception as e:
        print(f"Error updating user: {e}")
        return False
    finally:
        conn.close()

def show_current_stats():
    """Show current user stats"""
    conn = sqlite3.connect('ai_law_learning.db')
    cursor = conn.cursor()
    
    try:
        cursor.execute('''
            SELECT u.username, us.current_streak, us.total_score, us.last_activity_date
            FROM users u 
            JOIN user_stats us ON u.id = us.user_id
        ''')
        
        results = cursor.fetchall()
        print("\nCurrent user stats:")
        print("Username | Streak | Score | Last Activity")
        print("-" * 50)
        for row in results:
            print(f"{row[0]:<10} | {row[1]:<6} | {row[2]:<5} | {row[3]}")
            
    except Exception as e:
        print(f"Error reading stats: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    print("Testing streak display...")
    
    # Show current stats
    show_current_stats()
    
    # Update test user with a streak
    print("\nUpdating test user with streak=5 and score=150...")
    update_user_streak('test', 5, 150)
    
    # Show updated stats
    show_current_stats()
    
    print("\nTest complete! Check the UI at http://localhost:8003")
    print("Login as 'test' user to see the streak display.") 