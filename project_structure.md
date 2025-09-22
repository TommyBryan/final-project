```
study-app/
├── backend/                     # Flask backend (API)
│   ├── app/
│   │   ├── __init__.py          # Initialize Flask app
│   │   ├── routes/              # API endpoints
│   │   │   ├── __init__.py
│   │   │   ├── users.py         # Example: user endpoints
│   │   │   ├── subjects.py      # Example: subject endpoints
│   │   │   ├── flashcards.py    # Example: study flashcards endpoints
│   │   ├── models/              # Database models
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── subject.py
│   │   │   ├── flashcard.py
│   │   ├── services/            # Business logic
│   │   │   ├── __init__.py
│   │   │   ├── user_service.py
│   │   │   ├── study_service.py
│   │   ├── persistence/         # Database layer
│   │   │   ├── __init__.py
│   │   │   ├── repository.py    # Handles SQLite connections
│   │   ├── utils/               # Helpers (validation, JWT auth, etc.)
│   │   │   ├── __init__.py
│   │   │   ├── auth.py
│   │   │   ├── validators.py
│   ├── tests/                   # Backend unit tests
│   ├── config.py                # Flask/DB configs
│   ├── requirements.txt         # Python dependencies
│   └── wsgi.py                  # Entry point for Flask
│
├── frontend/                    # React frontend
│   ├── public/                  # Static files
│   │   ├── index.html
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Flashcard.jsx
│   │   ├── pages/               # Page-level components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   ├── services/            # API calls to Flask
│   │   │   ├── api.js
│   │   ├── App.jsx              # Root component
│   │   ├── index.js             # Entry point
│   ├── package.json             # React dependencies
│
├── database/                    # Database-related
│   ├── migrations/              # Alembic migrations (optional)
│   └── study_app.db             # SQLite database file
│
├── docker/                      # Docker setup
│   ├── backend.Dockerfile
│   ├── frontend.Dockerfile
│   └── docker-compose.yml
│
├── docs/                        # Documentation
│   ├── architecture.md
│   └── api_reference.md
│
├── .gitignore
├── README.md
```
