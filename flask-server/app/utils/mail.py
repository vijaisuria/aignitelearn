from datetime import datetime
import os
from azure.communication.email import EmailClient
from dotenv import load_dotenv

from flask import current_app, render_template_string

# Load environment variables from a .env file
load_dotenv()

def send_mail(subject: str, plain_text_content: str, html_content: str, recipient_email: str):
    try:
        # Get the connection string from environment variable
        connection_string = os.getenv("AZURE_COMMUNICATION_CONNECTION_STRING")
        if not connection_string:
            raise ValueError("Connection string is missing. Ensure it is set in environment variables.")
        # Initialize the email client
        client = EmailClient.from_connection_string(connection_string)

        # Construct the email message
        message = {
            "senderAddress": "",  # Replace with your sender email
            "recipients": {
                "to": [{"address": recipient_email}]
            },
            "content": {
                "subject": subject,
                "plainText": plain_text_content,
                "html": html_content
            },
            "replyTo": [{"address": "vijaisuria87@gmail.com"}]
        }

        # Send the email
        poller = client.begin_send(message)
        result = poller.result()
        
        print(f"Message sent: {result}")

    except Exception as ex:
        print(f"An error occurred while sending the email: {ex}")

        # Reraise the exception so it can be caught in the route function
        raise

# Usage
# send_mail(
#     subject="Please Confirm Your Registration",
#     plain_text_content="Hello! Please confirm your registration by clicking the link below.",
#     html_content="""
#     <html>
#         <body>
#             <h1>Welcome to Our Service!</h1>
#             <p>Please confirm your registration by clicking the link below:</p>
#             <a href="http://example.com/confirm">Confirm Registration</a>
#         </body>
#     </html>
#     """,
#     recipient_email="<you_email>@gmail.com"
# )


def render_login_alert_email_content(email_type, **kwargs):
    """
    Render email content dynamically based on the email type and passed arguments.
    
    Args:
        email_type (dict): Email configuration dictionary with keys: subject, plain_text_content, html_content_file.
        kwargs (dict): Additional variables to replace in the email templates.
    
    Returns:
        tuple: Rendered subject, plain text content, and HTML content.
    """
    # Extract subject and plain text
    subject = email_type["subject"]
    plain_text_content = email_type["plain_text_content"].format(**kwargs)
    
    # Load HTML template
    template_path = os.path.join(current_app.root_path, 'templates', email_type["html_content_file"])
    with open(template_path, 'r') as file:
        html_template = file.read()
    
    # Render HTML content with passed variables
    html_content = render_template_string(html_template, **kwargs)
    
    return subject, plain_text_content, html_content

def render_confirm_register_email_content(emailtype, **kwargs):
    """
    Render email content dynamically based on the email type and passed arguments.
    
    Args:
        email_type (dict): Email configuration dictionary with keys: subject, plain_text_content, html_content_file.
        kwargs (dict): Additional variables to replace in the email templates.
    
    Returns:
        tuple: Rendered subject, plain text content, and HTML content.
    """
    # Extract subject and plain text
    subject = emailtype["subject"]
    plain_text_content = emailtype["plain_text_content"].format(**kwargs)
    
    # Load HTML template
    template_path = os.path.join(current_app.root_path, 'templates', emailtype["html_content_file"])
    with open(template_path, 'r') as file:
        html_template = file.read()
    
    # Render HTML content with passed variables
    html_content = render_template_string(html_template, **kwargs)
    
    return subject, plain_text_content, html_content
