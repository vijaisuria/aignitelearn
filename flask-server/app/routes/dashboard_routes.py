import os
from flask import Blueprint, current_app, flash, redirect, render_template, render_template_string, request, jsonify, session, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from app.models import User
from app import db, executor
from app.utils.common import get_client_ip, get_geolocation
from app.utils.constants import CONFIRM_MAIL, LOGIN_ALERT_MAIL
from app.utils.forms import LoginForm, SignupForm
from app.utils.mail import render_confirm_register_email_content, render_login_alert_email_content, send_mail
from datetime import datetime
import requests

bp = Blueprint('dashboard', __name__, url_prefix='/dashboard')

# Dashboard home page
@bp.route('/', methods=['GET'])
def home():
    return render_template('dashboard.html')

# Profile API (JSON-based)
@bp.route('/profile', methods=['GET'])
def profile():
    user_id = session.get('user_id')
    if not user_id:
        flash('Unauthorized access. Please log in first.', 'danger')
        return redirect(url_for('auth.login_form'))

    user = User.query.get(user_id)
    if not user:
        flash('User not found.', 'danger')
        return redirect(url_for('auth.login_form'))

    return render_template('profile.html', user=user)
