import os
import requests
from flask import current_app
from itsdangerous import URLSafeTimedSerializer

def get_client_ip(request):
    """Extract the client IP address from the request."""
    return request.form.get('user_ip', 'Unknown')

def get_geolocation(ip_address):
    """Fetch geolocation details for a given IP address."""
    location = "Unknown"
    latitude = "Unknown"
    longitude = "Unknown"

    try:
        response = requests.get(f"http://ip-api.com/json/{ip_address}")
        if response.status_code == 200:
            location_data = response.json()
            location = f"{location_data.get('city')}, {location_data.get('region')}, {location_data.get('country')}"
            latitude = location_data.get('lat', 'Unknown')
            longitude = location_data.get('lon', 'Unknown')
    except Exception as e:
        print(f"Error fetching location: {e}")

    return location, latitude, longitude

def generate_onboard_token(user_id):
    """Generate a secure token for onboarding."""
    serializer = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])
    return serializer.dumps(user_id, salt='onboard-salt')

def verify_onboard_token(token, max_age=86400):
    """
    Verify the secure token and extract the user_id.
    Args:
        token (str): The secure token.
        max_age (int): Maximum age of the token in seconds (default: 1 hour).
    Returns:
        int or None: The user_id if the token is valid, else None.
    """
    serializer = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])
    try:
        user_id = serializer.loads(token, salt='onboard-salt', max_age=max_age)
        return user_id
    except Exception as e:
        print(f"Token verification failed: {e}")
        return None
