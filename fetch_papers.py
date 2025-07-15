import sys
from server import fetch_all_papers, init_db
import re
import requests
import sqlite3
import time

def main():
    print('Initializing database...')
    init_db()
    print('Fetching and inserting ICAIL and JURIX papers...')
    count = fetch_all_papers()
    print(f'Inserted {count} new papers.')

def fetch_semantic_scholar_citations(doi):
    """Fetch citation count from Semantic Scholar API given a DOI."""
    if not doi:
        return 0
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

def fetch_unpaywall_abstract(doi):
    """Fetch abstract from Unpaywall API given a DOI."""
    if not doi:
        return ''
    api_url = f'https://api.unpaywall.org/v2/{doi}?email=ai_law_bot@example.com'
    headers = {'User-Agent': 'Mozilla/5.0 (compatible; AI_LawBot/1.0)'}
    try:
        resp = requests.get(api_url, headers=headers, timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            abstract = data.get('abstract', '')
            if abstract:
                return abstract.strip()
    except Exception as e:
        print(f"DEBUG: Error fetching Unpaywall abstract for DOI {doi}: {e}")
    return ''

def fetch_semantic_scholar_abstract(doi):
    """Fetch abstract from Semantic Scholar API given a DOI."""
    if not doi:
        return ''
    api_url = f'https://api.semanticscholar.org/graph/v1/paper/{doi}?fields=abstract'
    headers = {'User-Agent': 'Mozilla/5.0 (compatible; AI_LawBot/1.0)'}
    try:
        resp = requests.get(api_url, headers=headers, timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            abstract = data.get('abstract', '')
            if abstract:
                return abstract.strip()
    except Exception as e:
        print(f"DEBUG: Error fetching Semantic Scholar abstract for DOI {doi}: {e}")
    return ''

def fetch_acm_abstract(doi_url):
    """Fetch abstract from ACM Digital Library given a DOI URL."""
    import requests
    from bs4 import BeautifulSoup
    headers = {'User-Agent': 'Mozilla/5.0 (compatible; AI_LawBot/1.0; +https://yourdomain.example)'}
    try:
        # ACM DOI URLs are like https://doi.org/10.1145/261618.261660
        # The ACM page is at https://dl.acm.org/doi/10.1145/261618.261660
        acm_url = doi_url.replace('https://doi.org/', 'https://dl.acm.org/doi/')
        resp = requests.get(acm_url, headers=headers, timeout=10)
        if resp.status_code == 200:
            soup = BeautifulSoup(resp.text, 'html.parser')
            # ACM abstracts are in <div class="abstractSection abstractInFull">
            abs_div = soup.find('div', class_='abstractSection')
            if abs_div:
                abstract = abs_div.get_text(strip=True)
                return abstract
    except Exception as e:
        print(f"DEBUG: Error fetching ACM abstract for {doi_url}: {e}")
    return ''

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
        
        time.sleep(delay)  # Be polite to the APIs
    
    conn.commit()
    
    # Report overall coverage
    cursor.execute('SELECT COUNT(*) FROM recent_papers')
    total = cursor.fetchone()[0]
    cursor.execute('SELECT COUNT(*) FROM recent_papers WHERE citations IS NOT NULL AND citations > 0')
    with_citations = cursor.fetchone()[0]
    print(f'Citation update complete. {with_citations}/{total} papers now have citation counts ({with_citations/total*100:.1f}%).')
    
    conn.close()

def fetch_and_update_abstracts(db_path='ai_law_learning.db', delay=1.0):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    # Process all papers missing abstracts
    cursor.execute('SELECT id, url, venue FROM recent_papers WHERE abstract IS NULL OR abstract = ""')
    papers = cursor.fetchall()
    print(f'Found {len(papers)} papers without abstracts (full run).')
    for pid, url, venue in papers:
        # Extract DOI from url (if present)
        doi = None
        if url and ('doi.org/' in url):
            doi = url.split('doi.org/')[-1].strip()
        abstract = ''
        # Try CrossRef first
        if doi:
            api_url = f'https://api.crossref.org/works/{doi}'
            try:
                resp = requests.get(api_url, timeout=10)
                if resp.status_code == 200:
                    data = resp.json()
                    abstract = data.get('message', {}).get('abstract', '')
                    if abstract:
                        abstract = re.sub('<[^<]+?>', '', abstract)
            except Exception as e:
                print(f'Error fetching abstract for DOI {doi}: {e}')
        # Try Unpaywall for any paper if still missing
        if not abstract and doi:
            abstract = fetch_unpaywall_abstract(doi)
            if abstract:
                print(f"DEBUG: Got abstract from Unpaywall for {doi}")
        # Try Semantic Scholar for any paper if still missing
        if not abstract and doi:
            abstract = fetch_semantic_scholar_abstract(doi)
            if abstract:
                print(f"DEBUG: Got abstract from Semantic Scholar for {doi}")
        # Try ACM as last resort for ICAIL
        if not abstract and venue == 'ICAIL' and url and 'doi.org/' in url:
            abstract = fetch_acm_abstract(url)
            if abstract:
                print(f"DEBUG: Got abstract from ACM for {doi}")
        if abstract:
            cursor.execute('UPDATE recent_papers SET abstract = ? WHERE id = ?', (abstract, pid))
            print(f'Updated abstract for paper id {pid}')
        time.sleep(delay)  # Be polite to the APIs
    conn.commit()
    # Report overall coverage
    cursor.execute('SELECT COUNT(*) FROM recent_papers')
    total = cursor.fetchone()[0]
    cursor.execute('SELECT COUNT(*) FROM recent_papers WHERE abstract IS NOT NULL AND TRIM(abstract) != ""')
    with_abstract = cursor.fetchone()[0]
    print(f'Abstract update complete. {with_abstract}/{total} papers now have abstracts ({with_abstract/total*100:.1f}%).')
    conn.close()

if __name__ == '__main__':
    main()
    print('Fetching and updating abstracts...')
    fetch_and_update_abstracts()
    print('Fetching and updating citation counts...')
    fetch_and_update_citations() 