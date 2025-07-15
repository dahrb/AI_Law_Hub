#!/usr/bin/env python3
import sqlite3
import requests
import time

def fetch_semantic_scholar_citations(doi):
    """Fetch citation count from Semantic Scholar API given a DOI."""
    if not doi:
        return 0, 0
    api_url = f'https://api.semanticscholar.org/graph/v1/paper/{doi}?fields=citationCount,influentialCitationCount'
    headers = {'User-Agent': 'Mozilla/5.0 (compatible; AI_LawBot/1.0)'}
    try:
        resp = requests.get(api_url, headers=headers, timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            citation_count = data.get('citationCount', 0)
            influential_citations = data.get('influentialCitationCount', 0)
            return citation_count, influential_citations
    except Exception as e:
        print(f"DEBUG: Error fetching Semantic Scholar citations for DOI {doi}: {e}")
    return 0, 0

def fetch_crossref_citations(doi):
    """Fetch citation count from CrossRef API given a DOI."""
    if not doi:
        return 0
    api_url = f'https://api.crossref.org/works/{doi}'
    headers = {'User-Agent': 'Mozilla/5.0 (compatible; AI_LawBot/1.0)'}
    try:
        resp = requests.get(api_url, headers=headers, timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            # CrossRef doesn't directly provide citation counts, but we can get reference count
            # and other metadata that might be useful
            references = data.get('message', {}).get('reference-count', 0)
            return references
    except Exception as e:
        print(f"DEBUG: Error fetching CrossRef data for DOI {doi}: {e}")
    return 0

def fetch_and_update_citations(db_path='ai_law_learning.db', delay=1.0):
    """Fetch and update citation counts for all papers."""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Get all papers with DOIs that don't have citation counts
    cursor.execute('SELECT id, url, venue FROM recent_papers WHERE url LIKE "%doi.org/%" AND (citations IS NULL OR citations = 0)')
    papers = cursor.fetchall()
    print(f'Found {len(papers)} papers without citation counts.')
    
    updated_count = 0
    for pid, url, venue in papers:
        # Extract DOI from url
        doi = None
        if url and ('doi.org/' in url):
            doi = url.split('doi.org/')[-1].strip()
        
        if doi:
            print(f"Fetching citations for DOI: {doi}")
            # Try Semantic Scholar first (most reliable for citations)
            citation_count, influential_citations = fetch_semantic_scholar_citations(doi)
            
            if citation_count > 0:
                cursor.execute('UPDATE recent_papers SET citations = ? WHERE id = ?', (citation_count, pid))
                print(f'Updated citations for paper id {pid}: {citation_count} citations')
                updated_count += 1
            else:
                # Try CrossRef as fallback (though it doesn't provide citation counts directly)
                ref_count = fetch_crossref_citations(doi)
                if ref_count > 0:
                    # Use reference count as a proxy (not ideal but better than nothing)
                    cursor.execute('UPDATE recent_papers SET citations = ? WHERE id = ?', (ref_count, pid))
                    print(f'Updated references for paper id {pid}: {ref_count} references (proxy for citations)')
                    updated_count += 1
                else:
                    print(f'No citation data found for DOI: {doi}')
        
        time.sleep(delay)  # Be polite to the APIs
    
    conn.commit()
    
    # Report overall coverage
    cursor.execute('SELECT COUNT(*) FROM recent_papers')
    total = cursor.fetchone()[0]
    cursor.execute('SELECT COUNT(*) FROM recent_papers WHERE citations IS NOT NULL AND citations > 0')
    with_citations = cursor.fetchone()[0]
    print(f'Citation update complete. {with_citations}/{total} papers now have citation counts ({with_citations/total*100:.1f}%).')
    
    # Show some statistics
    cursor.execute('SELECT SUM(citations) FROM recent_papers WHERE citations > 0')
    total_citations = cursor.fetchone()[0] or 0
    print(f'Total citations across all papers: {total_citations:,}')
    
    conn.close()

if __name__ == "__main__":
    print("Fetching citation data for existing papers...")
    fetch_and_update_citations()
    print("Done!") 