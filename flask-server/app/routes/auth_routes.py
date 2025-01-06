import os
from flask import Blueprint, current_app, flash, redirect, render_template, render_template_string, request, jsonify, session, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from app.models import User
from app import db, executor
from app.utils.common import get_client_ip, get_geolocation, verify_onboard_token
from app.utils.constants import CONFIRM_MAIL, LOGIN_ALERT_MAIL
from app.utils.forms import LoginForm, SignupForm
from app.utils.mail import render_confirm_register_email_content, render_login_alert_email_content, send_mail
from datetime import datetime
import requests
from app.utils.common import generate_onboard_token

bp = Blueprint('auth', __name__, url_prefix='/auth')

GEOAPIFY_API_KEY = os.getenv('GEOAPIFY_API_KEY')

# Signup form route (HTML-based form)
@bp.route('/signup', methods=['GET', 'POST'])
def signup_form():
    form = SignupForm()
    if form.validate_on_submit():
        # Check if the email is already taken
        if User.query.filter_by(Email=form.email.data).first():
            flash('Email already exists', 'danger')
            return redirect(url_for('auth.signup_form'))

        # Create a new user
        user = User(
            Name=form.name.data,
            Email=form.email.data,
            PreferredLanguage=form.preferred_language.data,
            EmotionDetection=form.emotion_detection.data
        )
        user.set_password(form.password.data)

        db.session.add(user)
        db.session.commit()

        # Generate onboarding token
        onboard_token = generate_onboard_token(user.UserID)

        # Generate the onboarding link
        onboarding_link = url_for('auth.onboard', token=onboard_token, _external=True)

        # Render email content
        try:
            subject, plain_text_content, html_content = render_confirm_register_email_content(
                CONFIRM_MAIL,
                user_name=user.Name,
                email=user.Email,
                verification_link=onboarding_link
            )
            
            # Send onboarding email asynchronously
            executor.submit(send_mail, subject, plain_text_content, html_content, user.Email)
        except Exception as e:
            flash("Onboarding email sending error.", 'warning')
            print(f"Error sending onboarding email: {e}")

        flash('Signup successful. Please check your email to complete onboarding.', 'success')
        return redirect(url_for('auth.login_form'))
    else:
        for field, errors in form.errors.items():
            for error in errors:
                flash(f"Error in {getattr(form, field).label.text}: {error}", 'danger')
    return render_template('auth/signup.html', form=form)


@bp.route('/login', methods=['GET', 'POST'])
def login_form():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(Email=form.email.data).first()
        if user and user.check_password(form.password.data):

            if not user.IsVerified:
                flash("Please verify your account. Check your email.", 'warning')
                return render_template('auth/login.html', form=form)
            
            # Fetch login details
            ip_address = get_client_ip(request)
            login_datetime = datetime.now()
            location, latitude, longitude = get_geolocation(ip_address)

            # Render email content
            try:
                subject, plain_text_content, html_content = render_login_alert_email_content(
                    LOGIN_ALERT_MAIL,
                    user_name=user.Name,
                    time=login_datetime.strftime('%Y-%m-%d %H:%M:%S'),
                    ip=ip_address,
                    location=location,
                    lat=latitude,
                    long=longitude,
                    map_image_url=f"https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=600&height=400&center=lonlat%3A{longitude}%2C{latitude}&zoom=10&apiKey={GEOAPIFY_API_KEY}"
                )
                
                # TODO: Uncomment the line below to send the email in Production
                # executor.submit(send_mail, subject, plain_text_content, html_content, user.Email)
            except Exception as e:
                flash("Login alert message sending error.", 'warning')
                print(f"Error sending login alert email: {e}")

            # Log the user in
            flash('Login successful!', 'success')
            session['user_id'] = user.UserID
            return redirect(url_for('dashboard.profile'))
        flash('Invalid email or password', 'danger')
    return render_template('auth/login.html', form=form)

# Logout
@bp.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    flash('Logged out successfully!', 'success')
    return redirect(url_for('auth.login_form'))

# Onboard route
@bp.route('/onboard/<token>', methods=['GET'])
def onboard(token):
    # Verify the token
    user_id = verify_onboard_token(token)
    if not user_id:
        flash("Invalid or expired onboard link.", "danger")
        return redirect(url_for('auth.login_form'))  # Redirect to login or appropriate page

    # Fetch the user
    user = User.query.get_or_404(user_id)
    return render_template('auth/onboard.html', user=user)

@bp.route('/resend_onboard_mail', methods=['GET', 'POST'])
def resend_onboard_mail():
    if request.method == 'POST':
        email = request.form.get('email')
        if not email:
            flash('Email is required.', 'danger')
            return redirect(url_for('auth.resend_onboard_mail'))

        # Check if the user exists
        user = User.query.filter_by(Email=email).first()
        if not user:
            flash('No account found with this email.', 'danger')
            return redirect(url_for('auth.resend_onboard_mail'))

        # Generate a new onboarding token
        onboard_token = generate_onboard_token(user.UserID)

        # Generate the onboarding link
        onboarding_link = url_for('auth.onboard', token=onboard_token, _external=True)

        # Render email content
        try:
            subject, plain_text_content, html_content = render_confirm_register_email_content(
                CONFIRM_MAIL,
                user_name=user.Name,
                email=user.Email,
                verification_link=onboarding_link
            )
            
            try: 
                send_mail(subject, plain_text_content, html_content, user.Email)
                flash('Onboarding email resent. Please check your inbox.', 'success')
                return redirect(url_for('auth.login_form'))
            except Exception as e:
                flash("Failed to resend onboarding email.", 'warning')
                print(f"Error sending onboarding email: {e}")

        except Exception as e:
            flash("Failed to resend onboarding email.", 'warning')
            print(f"Error sending onboarding email: {e}")

        return redirect(url_for('auth.login_form'))

    return render_template('auth/resend_onboard_mail.html')


# testing route
@bp.route('/test', methods=['GET'])
def test():
    user_id = 1  # Replace with the actual user ID
    onboard_token = generate_onboard_token(user_id)
    onboard_url = f"http://127.0.0.1:8000/auth/onboard/{onboard_token}"
    print(onboard_url)
    return jsonify({"url": onboard_url})

@bp.route('/GetTokenAndSubdomain', methods=['GET'])
def getTokenAndSubdomain():
	'Get the access token'
	if request.method == 'GET':
		try:
			headers = { 'content-type': 'application/x-www-form-urlencoded' }
			data = {
				'client_id': str(os.getenv('CLIENT_ID')),
				'client_secret': str(os.getenv('CLIENT_SECRET')),
				'resource': 'https://cognitiveservices.azure.com/',
				'grant_type': 'client_credentials'
			}

			resp = requests.post('https://login.windows.net/' + str(os.getenv('TENANT_ID')) + '/oauth2/token', data=data, headers=headers)
			jsonResp = resp.json()
			
			if ('access_token' not in jsonResp):
				print(jsonResp)
				raise Exception('AAD Authentication error')

			token = jsonResp['access_token']
			subdomain = os.getenv('SUBDOMAIN')

			return jsonify(token = token, subdomain = subdomain)
		except Exception as e:
			message = 'Unable to acquire Azure AD token. Check the debugger for more information.'
			print(message, e)
			return jsonify(error = message)