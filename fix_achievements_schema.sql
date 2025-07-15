-- Migration script to allow user_id to be NULL in achievements table

PRAGMA foreign_keys=off;

-- 1. Rename the old table
ALTER TABLE achievements RENAME TO achievements_old;

-- 2. Create the new table with user_id nullable
CREATE TABLE achievements (
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
);

-- 3. Copy the data over
INSERT INTO achievements (
    id, user_id, achievement_name, description, requirement_type, requirement_value, points, icon, earned_at
) SELECT 
    id, user_id, achievement_name, description, requirement_type, requirement_value, points, icon, earned_at
FROM achievements_old;

-- 4. Drop the old table
DROP TABLE achievements_old;

PRAGMA foreign_keys=on; 