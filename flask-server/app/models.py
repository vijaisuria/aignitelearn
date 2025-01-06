from app import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'
    
    # Column definitions
    UserID = db.Column(db.Integer, primary_key=True, autoincrement=True)  # Unique ID for each user
    Name = db.Column(db.String(100), nullable=False)                      # User's name
    Email = db.Column(db.String(100), unique=True, nullable=False)         # User's email
    PasswordHash = db.Column(db.String(255), nullable=False)               # Hashed password for security
    PreferredLanguage = db.Column(db.Enum('English', 'Japanese', 'German', 'French', 'Hindi', 'Tamil', name='languages'), nullable=False) 
    EmotionDetection = db.Column(db.Boolean, default=False)                # Emotion detection setting
    PrimaryPurpose = db.Column(db.Enum('Career Upskill', 'Career Transition', 'Entrance Exams Support', name='primary_purpose'))  # Main platform purpose
    Bio = db.Column(db.Text)                                               # User biography or description
    EducationStatus = db.Column(db.Enum('School', 'Undergraduate', 'Postgraduate', 'Professional', 'Other', name='education_status'), default='Other')  # Education status
    Skills = db.Column(db.Text)                                            # Comma-separated list of skills
    ProficiencyLevels = db.Column(db.Text)                                 # Matching levels for skills
    LearningStyle = db.Column(db.Enum('Visual', 'Auditory', 'Kinesthetic', 'Reading/Writing', name='learning_style'), default='Visual')  # Learning style
    PreferredTopics = db.Column(db.Text)                                   # Topics of interest
    StudySchedule = db.Column(db.String(100))                              # Preferred study schedule
    DesiredJobTitle = db.Column(db.String(100))                            # Desired job title
    TargetIndustry = db.Column(db.String(100))                             # Target industry
    TargetSalary = db.Column(db.Integer)                                   # Target salary
    IsVerified = db.Column(db.Boolean, default=False)                      # Verification Status (OnBoard)
    
    CreatedAt = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())  # Timestamp for account creation
    UpdatedAt = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())  # Timestamp for updates

    # Relationship to Goals (one-to-many)
    goals = db.relationship('Goal', backref='user', lazy=True)

    def set_password(self, password):
        self.PasswordHash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.PasswordHash, password)

class Goal(db.Model):
    __tablename__ = 'goals'
    
    GoalID = db.Column(db.Integer, primary_key=True, autoincrement=True)  # Unique ID for each goal
    UserID = db.Column(db.Integer, db.ForeignKey('users.UserID'), nullable=False)  # References the user who set the goal
    GoalType = db.Column(db.Enum('Short-Term', 'Long-Term', name='goal_type'), nullable=False)  # Type of goal
    GoalName = db.Column(db.String(100), nullable=False)  # Name of the goal
    GoalDescription = db.Column(db.Text, nullable=False)  # Detailed description of the goal
    StartDate = db.Column(db.Date, nullable=False)  # Deadline for achieving the goal
    TargetDate = db.Column(db.Date, nullable=False)  # Deadline for achieving the goal
    ProgressPercentage = db.Column(db.Float, default=0.0)  # Progress in percentage
    RoadmapData = db.Column(db.Text, nullable=True, default='{}')  # Default to an empty JSON object

    CreatedAt = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())  # When the goal was created
    UpdatedAt = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())  # Last update timestamp

    def to_dict(self):
        """Converts the Goal object into a dictionary."""
        return {
            "GoalID": self.GoalID,
            "UserID": self.UserID,
            "GoalName": self.GoalName,
            "GoalType": self.GoalType,
            "GoalDescription": self.GoalDescription,
            "StartDate": self.StartDate.isoformat() if self.StartDate else None,
            "TargetDate": self.TargetDate.isoformat() if self.TargetDate else None,
            "ProgressPercentage": self.ProgressPercentage,
            "RoadmapData": self.RoadmapData,  # Include the JSON data in the dictionary
            "CreatedAt": self.CreatedAt.isoformat() if self.CreatedAt else None,
            "UpdatedAt": self.UpdatedAt.isoformat() if self.UpdatedAt else None,
        }
