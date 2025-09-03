-- clearance status
CREATE TABLE clearanceStatus (
	id SERIAL PRIMARY KEY,
	status VARCHAR(30) NOT NULL	
);

-- clearance stages
CREATE TABLE clearanceStages (
	id SERIAL PRIMARY KEY,
	stageName VARCHAR(70) NOT NULL,
	feeRequired INT NOT NULL,
	requiresSenateList BOOLEAN DEFAULT FALSE,
	isFinalStage Boolean DEFAULT FALSE,
	clearanceStatusID INT,
	FOREIGN KEY (clearanceStatusID) REFERENCES clearanceStatus(id) ON DELETE CASCADE
);

-- clearance requiremnts
CREATE TABLE clearanceRequirements (
	id SERIAL PRIMARY KEY,
	requirementName VARCHAR(100) NOT NULL,
	stageID INT NOT NULL,
	FOREIGN KEY (stageID) REFERENCES clearanceStages(id) ON DELETE CASCADE
);

-- faculty
CREATE TABLE faculty (
	id SERIAL PRIMARY KEY,
	facultyName VARCHAR(100) NOT NULL
);

-- department
CREATE TABLE department (
	id SERIAL PRIMARY KEY,
	departmentName VARCHAR(100) NOT NULL
);

-- courses
CREATE TABLE courses (
	id SERIAL PRIMARY KEY,
	courseName VARCHAR(100) NOT NULL
);

-- campus
CREATE TABLE campus (
	id SERIAL PRIMARY KEY,
	campusName VARCHAR(150) NOT NULL
);

-- university
CREATE TABLE university (
	id SERIAL PRIMARY KEY,
	universityName VARCHAR(150) NOT NULL,
	universityLogo VARCHAR(100)
);

-- student
CREATE TABLE student (
	id SERIAL PRIMARY KEY,
	firstName VARCHAR(100) NOT NULL,
	middleName VARCHAR(100),
	lastName VARCHAR(100) NOT NULL,
	departmentID INT,
	facultyID INT,
	courseID INT,
	universityID INT,
	campusID INT,
	matricNumber VARCHAR(40),
	graduationYear DATE,
	maritalName VARCHAR(50),
	studentPhoto VARCHAR(100),
	FOREIGN KEY (departmentID) REFERENCES department(id) ON DELETE CASCADE,
	FOREIGN KEY (facultyID) REFERENCES faculty(id) ON DELETE CASCADE,
	FOREIGN KEY (courseID) REFERENCES courses(id) ON DELETE CASCADE,
	FOREIGN KEY (universityID) REFERENCES university(id) ON DELETE CASCADE,
	FOREIGN KEY (campusID) REFERENCES campus(id) ON DELETE CASCADE
);

-- clearance category
CREATE TABLE clearanceCategory (
	id SERIAL PRIMARY KEY,
	categoryName VARCHAR(100) NOT NULL
);

-- clearanceSubItems
CREATE TABLE clearanceSubItems (
	id SERIAL PRIMARY KEY,
	subItems VARCHAR(100) NOT NULL
);

-- studentClearanceProgress
CREATE TABLE studentClearanceProgress (
	id SERIAL PRIMARY KEY,
	isCompleted BOOLEAN DEFAULT FALSE,
	completionDate DATE,
	studentID INT,
	stageID INT,
	FOREIGN KEY (studentID) REFERENCES student(id),
	FOREIGN KEY (stageID) REFERENCES clearancestages(id)
);

-- semester
CREATE TABLE semester (
	id SERIAL PRIMARY KEY,
	semesterOptions VARCHAR(50)
);

-- level
CREATE TABLE level (
	id SERIAL PRIMARY KEY,
	levelOptions VARCHAR(50),
	semesterID INT,
	FOREIGN KEY (semesterID) REFERENCES semester(id)
);

-- administrators
CREATE TABLE administrators (
	id SERIAL PRIMARY KEY,
	admin_name VARCHAR(100) NOT NULL,
	admin_role VARCHAR(20),
	permissionLevel VARCHAR(50),
	universityID INT,
	FOREIGN KEY (universityID) REFERENCES university(id)
);

--users
CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	firstname VARCHAR(50) NOT NULL,
	middlename VARCHAR(50) NOT NULL,
	lastname VARCHAR(50) NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
	user_role VARCHAR(30) DEFAULT 'student',
	password VARCHAR(255) NOT NULL,
	date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);