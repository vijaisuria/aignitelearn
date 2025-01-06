from app.models import Goal
import os
from flask import Blueprint, current_app, flash, jsonify, redirect, render_template, request, url_for
from app import db

bp = Blueprint('goals', __name__, url_prefix='/goals')

# return a goal json for goalid
@bp.route('/<goal_id>', methods=['GET'])
def get(goal_id):
    goal = Goal.query.get(goal_id)
    return jsonify(goal.to_dict())

# return a json list of goals for a user
@bp.route('/user/<user_id>', methods=['GET'])
def list(user_id):
    goals = Goal.query.filter_by(UserID=user_id).all()
    return jsonify([goal.to_dict() for goal in goals])

@bp.route('/', methods=['POST'])
def create():
    try:
        # Parse JSON data
        data = request.get_json()

        # Validate required fields
        required_fields = ["GoalName", "GoalType", "GoalDescription", "StartDate", "TargetDate"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400

        # Validate goal type
        if data["GoalType"] not in ["Short-Term", "Long-Term"]:
            return jsonify({"error": "Invalid GoalType. Must be 'Short-Term' or 'Long-Term'."}), 400

        # Create new goal
        goal = Goal(
            UserID=data["UserID"],
            GoalName=data["GoalName"],
            GoalType=data["GoalType"],
            GoalDescription=data["GoalDescription"],
            StartDate=data["StartDate"],
            TargetDate=data["TargetDate"]
        )

        # Save to database
        db.session.add(goal)
        db.session.commit()

        # Return the created goal's data
        return jsonify(goal.to_dict()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

