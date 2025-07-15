import requests

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

# Test with a sample ICAIL DOI
test_doi = "10.1145/261618.261660"
print(f"Testing DOI: {test_doi}")

# Try Unpaywall
print("\n1. Trying Unpaywall...")
abstract = fetch_unpaywall_abstract(test_doi)
if abstract:
    print(f"SUCCESS! Abstract: {abstract[:200]}...")
else:
    print("No abstract found")

# Try Semantic Scholar
print("\n2. Trying Semantic Scholar...")
abstract = fetch_semantic_scholar_abstract(test_doi)
if abstract:
    print(f"SUCCESS! Abstract: {abstract[:200]}...")
else:
    print("No abstract found") 