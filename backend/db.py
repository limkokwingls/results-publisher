from typing import Any
import firebase_admin
from firebase_admin import credentials, firestore

def get_db() -> tuple[Any, firestore.Client]:
    cred = credentials.Certificate("serviceAccountKey.json")
    app = firebase_admin.initialize_app(cred)
    db = firestore.client(app)
    return app, db

def cleanup_db(app: Any) -> None:
    firebase_admin.delete_app(app)
