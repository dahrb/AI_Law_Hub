import sqlite3

DB_PATH = 'ai_law_learning.db'

conn = sqlite3.connect(DB_PATH)
c = conn.cursor()

query = """
SELECT title, citations FROM recent_papers WHERE venue LIKE '%ICAIL%' AND publication_date LIKE '%2023%' LIMIT 10;
"""

print(f"{'Title':<80} | Citations")
print('-'*95)
for title, citations in c.execute(query):
    print(f"{title[:75]:<80} | {citations}")

conn.close() 