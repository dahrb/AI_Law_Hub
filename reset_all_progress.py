#!/usr/bin/env python3
"""
Script to reset all user progress, achievements, and stats in the AI Law Learning database.
This will clear all progress data but keep user accounts intact.
"""

import sqlite3
import os

def get_db_connection():
    """Get database connection"""
    conn = sqlite3.connect('ai_law_learning.db')
    conn.row_factory = sqlite3.Row
    return conn

def reset_all_progress():
    """Reset all user progress, achievements, and stats"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        print("🔄 Resetting all user progress...")
        
        # Clear all progress records
        cursor.execute('DELETE FROM progress')
        progress_count = cursor.rowcount
        print(f"   ✅ Cleared {progress_count} progress records")
        
        # Clear all user achievements
        cursor.execute('DELETE FROM user_achievements')
        achievements_count = cursor.rowcount
        print(f"   ✅ Cleared {achievements_count} user achievements")
        
        # Reset all user stats to zero
        cursor.execute('''
            UPDATE user_stats 
            SET total_lessons_completed = 0, 
                total_score = 0, 
                total_questions_answered = 0, 
                current_streak = 0, 
                longest_streak = 0, 
                last_activity_date = CURRENT_DATE
        ''')
        stats_count = cursor.rowcount
        print(f"   ✅ Reset {stats_count} user stats records")
        
        # Commit changes
        conn.commit()
        conn.close()
        
        print("\n🎉 All user progress has been reset successfully!")
        print("   • All lesson progress cleared")
        print("   • All achievements reset")
        print("   • All user stats reset to zero")
        print("   • User accounts remain intact")
        
    except Exception as e:
        print(f"❌ Error resetting progress: {e}")
        if conn:
            conn.rollback()
            conn.close()

if __name__ == '__main__':
    # Check if database exists
    if not os.path.exists('ai_law_learning.db'):
        print("❌ Database file 'ai_law_learning.db' not found!")
        print("   Make sure you're running this script from the AI_Law directory.")
        exit(1)
    
    # Confirm with user
    print("⚠️  WARNING: This will reset ALL user progress!")
    print("   • All lesson completions will be lost")
    print("   • All achievements will be reset")
    print("   • All points and streaks will be reset to zero")
    print("   • User accounts will remain intact")
    print()
    
    confirm = input("Are you sure you want to continue? (yes/no): ").lower().strip()
    
    if confirm in ['yes', 'y']:
        reset_all_progress()
    else:
        print("❌ Operation cancelled.") 