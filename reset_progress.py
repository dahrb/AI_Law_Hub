#!/usr/bin/env python3
"""
Reset Progress Script for AI & Law Learning App
This script resets all user progress, achievements, and statistics in the database.
Use with caution as this will permanently delete all user data.
"""

import sqlite3
import os
import sys

def reset_database():
    """Reset all user progress and data in the database"""
    
    # Check if database exists
    if not os.path.exists('ai_law_learning.db'):
        print("❌ Database 'ai_law_learning.db' not found!")
        print("Please make sure the server has been run at least once to create the database.")
        return False
    
    try:
        # Connect to database
        conn = sqlite3.connect('ai_law_learning.db')
        cursor = conn.cursor()
        
        print("🗄️  Connected to AI & Law Learning database")
        
        # Get current data counts
        cursor.execute("SELECT COUNT(*) FROM users")
        user_count = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM progress")
        progress_count = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM user_achievements")
        achievement_count = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM user_stats")
        stats_count = cursor.fetchone()[0]
        
        print(f"📊 Current database state:")
        print(f"   - Users: {user_count}")
        print(f"   - Progress records: {progress_count}")
        print(f"   - User achievements: {achievement_count}")
        print(f"   - User stats: {stats_count}")
        
        # Confirm reset
        print("\n⚠️  WARNING: This will permanently delete all user data!")
        confirm = input("Type 'RESET' to confirm: ")
        
        if confirm != 'RESET':
            print("❌ Reset cancelled")
            return False.
        
        print("\n🔄 Starting database reset...")
        
        # Delete all user data (but keep achievements table structure)
        cursor.execute("DELETE FROM user_achievements")
        cursor.execute("DELETE FROM user_stats")
        cursor.execute("DELETE FROM progress")
        cursor.execute("DELETE FROM user_sessions")
        cursor.execute("DELETE FROM users")
        cursor.execute("DELETE FROM achievements")  # Clear old achievements
        
        # Reset auto-increment counters
        cursor.execute("DELETE FROM sqlite_sequence WHERE name IN ('users', 'progress', 'user_achievements', 'user_stats', 'user_sessions', 'achievements')")
        
        # Commit changes
        conn.commit()
        
        print("✅ Database reset completed successfully!")
        print("📊 New database state:")
        print(f"   - Users: 0")
        print(f"   - Progress records: 0")
        print(f"   - User achievements: 0")
        print(f"   - User stats: 0")
        print("\n🎉 All user progress has been reset!")
        print("Users can now register fresh accounts and start learning from scratch.")
        
        conn.close()
        return True
        
    except sqlite3.Error as e:
        print(f"❌ Database error: {e}")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False

def backup_database():
    """Create a backup of the current database"""
    if not os.path.exists('ai_law_learning.db'):
        print("❌ Database not found, cannot create backup")
        return False
    
    try:
        import shutil
        from datetime import datetime
        
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_name = f"ai_law_learning_backup_{timestamp}.db"
        
        shutil.copy2('ai_law_learning.db', backup_name)
        print(f"💾 Database backed up as: {backup_name}")
        return True
        
    except Exception as e:
        print(f"❌ Backup failed: {e}")
        return False

def main():
    print("=" * 60)
    print("🔄 AI & Law Learning - Database Reset Tool")
    print("=" * 60)
    
    # Check if we should create a backup
    if os.path.exists('ai_law_learning.db'):
        print("\n💾 Would you like to create a backup before resetting?")
        backup_choice = input("Create backup? (y/n): ").lower().strip()
        
        if backup_choice in ['y', 'yes']:
            if not backup_database():
                print("❌ Backup failed, aborting reset")
                return
    
    # Perform the reset
    if reset_database():
        print("\n🎯 Reset completed successfully!")
        print("You can now restart the server and users can register fresh accounts.")
    else:
        print("\n❌ Reset failed!")
        sys.exit(1)

if __name__ == "__main__":
    main() 