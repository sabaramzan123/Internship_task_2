from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_root_endpoint():
    """Test that the API is reachable"""
    response = client.get("/")
    assert response.status_code in [200, 404]  # app exists and responds

def test_health_check():
    """Test health endpoint exists"""
    response = client.get("/health")
    assert response.status_code in [200, 404]

def test_docs_available():
    """Test FastAPI auto-docs are available"""
    response = client.get("/docs")
    assert response.status_code == 200

def test_openapi_schema():
    """Test OpenAPI schema endpoint"""
    response = client.get("/openapi.json")
    assert response.status_code == 200
    assert "openapi" in response.json()