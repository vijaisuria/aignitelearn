from app import create_app
import os
from dotenv import load_dotenv

load_dotenv()

# Create the app instance
app = create_app()

if __name__ == "__main__":
    port = int(os.environ.get('FLASK_RUN_PORT', 5000)) 
    app.run(debug=True, port=port)
