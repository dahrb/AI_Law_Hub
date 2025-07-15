import pytest
import server

@pytest.fixture
def client():
    server.app.config['TESTING'] = True
    with server.app.test_client() as client:
        yield client

def test_recent_papers(client):
    response = client.get('/api/recent-papers')
    assert response.status_code == 200
    data = response.get_json()
    assert 'papers' in data
    assert isinstance(data['papers'], list) 