# constants.py

LOGIN_ALERT_MAIL = {
    "subject": "Login Notification",
    "plain_text_content": """
    Hello {user_name},

    A login to your account was detected with the following details:

    IP Address: {ip}
    Date and Time: {time}
    Location: {location}
    Latitude: {lat}
    Longitude: {long}

    If this wasn't you, please secure your account immediately.

    Regards,
    Your App Team
    """,
    "html_content_file": "mail/login_alert.html"  # Relative path to the HTML template
}

CONFIRM_MAIL = {
    "subject": "Please Confirm Your Registration",
    "plain_text_content":
    """
    Dear {user_name},

    Your account has been successfully created with the email address: {email}.

    To verify your email and activate your account, please click the link below:

    Verify your account: {verification_link}


    As a platform leveraging AI, real-time analytics, and interactive experiences, we personalize learning journeys to enhance success in exams. We aim to empower individuals like you to achieve your aspirations.

    Cheers,
    The AIgnite Learn Team
    """,
    "html_content_file": "mail/confirm_registration.html"
}

# Other email types can follow the same structure.


FORGOT_PASSWORD_MAIL = {
    "subject": "Reset Your Password",
    "plain_text_content": "Hello! You can reset your password by clicking the link below.",
    "html_content_file": "reset_password.html"
}