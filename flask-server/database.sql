create database aignitelearn;

-- Users Table
CREATE TABLE Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100),
    Email VARCHAR(100) UNIQUE,
    PasswordHash VARCHAR(255),
    PreferredLanguage ENUM('English', 'Japanese', 'German', 'French', 'Hindi', 'Tamil') NOT NULL,
    EmotionDetection BOOLEAN,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Goals Table
CREATE TABLE Goals (
    GoalID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    GoalDescription TEXT,
    TargetDate DATE,
    ProgressPercentage FLOAT,
    GoalType ENUM('Entrance Exam', 'Career Switch', 'Upskill', 'Beginner') NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Reports Table
CREATE TABLE Reports (
    ReportID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    ReportContent JSON,
    GeneratedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Courses Table
CREATE TABLE Courses (
    CourseID INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(200) NOT NULL,
    Description TEXT,
    SkillTag VARCHAR(100),
    ImageURL VARCHAR(255), -- Field for course image
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Modules Table
CREATE TABLE Modules (
    ModuleID INT PRIMARY KEY AUTO_INCREMENT,
    CourseID INT, -- Foreign key to associate modules with a course
    Title VARCHAR(200) NOT NULL,
    Description TEXT,
    SkillTag VARCHAR(100),
    ImageURL VARCHAR(255), -- New field for storing image URL
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID) ON DELETE CASCADE -- Ensures referential integrity
);

