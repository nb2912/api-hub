from sqlalchemy.orm import Session
from app.db.session import SessionLocal, engine
from app.models.api_hub import API, User, Base
from app.core.security import get_password_hash

def seed_data():
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    # Check if data already exists
    if db.query(User).filter(User.email == "admin@scholarhub.com").first():
        print("Data already seeded.")
        db.close()
        return

    # Create a system user
    system_user = User(
        email="admin@scholarhub.com",
        username="admin",
        hashed_password=get_password_hash("admin123"),
        full_name="ScholarHub Admin",
        is_admin=True
    )
    db.add(system_user)
    db.commit()
    db.refresh(system_user)

    # Seed APIs
    apis = [
        {
            "name": "NeuroGraph Engine",
            "description": "High-performance neural network visualization and structural analysis for academic datasets.",
            "base_url": "https://api.neurograph.edu",
            "category": "Machine Learning",
            "endpoints": [
                {"path": "/analysis", "method": "GET", "description": "Get graph analysis"},
                {"path": "/visualize", "method": "POST", "description": "Generate visualization"}
            ]
        },
        {
            "name": "ScholarVault DB",
            "description": "Decentralized peer-reviewed citation storage with ultra-low latency retrieval.",
            "base_url": "https://vault.scholarhub.io",
            "category": "Storage",
            "endpoints": [
                {"path": "/query", "method": "POST", "description": "Query citations"},
                {"path": "/upload", "method": "PUT", "description": "Upload manuscript"}
            ]
        },
        {
            "name": "EduAuth Identity",
            "description": "The standard for institutional single sign-on integration for student portals.",
            "base_url": "https://auth.edu-link.org",
            "category": "Authentication",
            "endpoints": [
                {"path": "/authorize", "method": "GET", "description": "OAuth2 authorize"},
                {"path": "/token", "method": "POST", "description": "Get access token"}
            ]
        },
        {
            "name": "GenomeMapper",
            "description": "Real-time gene sequence alignment and comparative genomics processing.",
            "base_url": "https://genomics.biotech.ac.uk",
            "category": "Health Stats",
            "endpoints": [
                {"path": "/sequence", "method": "PATCH", "description": "Align sequence"},
                {"path": "/compare", "method": "POST", "description": "Compare genomes"}
            ]
        },
        {
            "name": "Polyglot Doc AI",
            "description": "Accurate translation of technical manuscripts across 45 academic languages.",
            "base_url": "https://translate.scholar.ai",
            "category": "Natural Language",
            "endpoints": [
                {"path": "/translate", "method": "POST", "description": "Translate text"},
                {"path": "/languages", "method": "GET", "description": "List languages"}
            ]
        }
    ]

    for api_data in apis:
        api = API(
            name=api_data["name"],
            description=api_data["description"],
            base_url=api_data["base_url"],
            category=api_data["category"],
            endpoints=api_data["endpoints"],
            owner_id=system_user.id
        )
        db.add(api)
    
    db.commit()
    print("Database successfully seeded with ScholarHub API data.")
    db.close()

if __name__ == "__main__":
    seed_data()
