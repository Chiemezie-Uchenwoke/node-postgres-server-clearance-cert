import { client } from "../config/config.js";

const fetchDept = async (req, res, next) => {
    try {
        const result = await client.query(`SELECT * FROM department`);

        if (result.rows.length === 0){
            return res.status(404).json({
                success: false,
                message: "No departments found"
            });
        } else {
            return res.status(200).json({
                success: true,
                departments: result.rows
            });
        }
    } catch (err){
        console.error("Database query failed:", err);
        next(err);
    }
}

const fetchFaculty = async (req, res, next) => {
    try {
        const result = await client.query(`SELECT * FROM faculty`);

        if (result.rows.length === 0){
             return res.status(404).json({
                success: false,
                message: "No faculty found"
            });
        } else {
            return res.status(200).json({
                success: true,
                faculty: result.rows
            });
        }

    } catch(err){
        console.error("Database query failed:", err);
        next(err);
    }
}

const fetchUni = async (req, res, next) => {
    try {
        const result = await client.query(`SELECT * FROM university`);

        if (result.rows.length === 0){
             return res.status(404).json({
                success: false,
                message: "No university found"
            });
        } else {
            return res.status(200).json({
                success: true,
                uni: result.rows
            });
        }

    } catch(err){
        console.error("Database query failed:", err);
        next(err);
    }
}

const fetchCurrentLevel = async (req, res, next) => {
    try {
        const result = await client.query(`SELECT * FROM level`);

        if (result.rows.length === 0){
             return res.status(404).json({
                success: false,
                message: "No level found"
            });
        } else {
            return res.status(200).json({
                success: true,
                currentLevel: result.rows
            });
        }

    } catch(err){
        console.error("Database query failed:", err);
        next(err);
    }
}

const getStudent = (req, res, next) => {
    const user = req.user;

    if (!user){
        return res.status(400).json({
            success: false,
            message: "Login to continue"
        });
    }

    return res.status(200).json({
        success: true,
        user
    });
}

const handleStudentEnrolment = async (req, res, next) => {
    try {
        const 
        {
            department_id, 
            faculty_id, 
            university_id,
            campus, 
            matric_number, 
            student_type, 
            number_of_levels,
            current_level,
            graduation_year
        } = req.body;
        const user_id = req.user.userId;

        const result = await client.query(`
                INSERT INTO student(user_id, department_id, faculty_id, university_id, campus, matric_number, student_type, number_of_levels, current_level, graduation_year)
                VALUES
                ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                RETURNING *
            `, [user_id, department_id, faculty_id,university_id, campus, matric_number, student_type, number_of_levels, current_level, graduation_year]);
            console.log(result.rows);

            if (result.rows.length > 0){
                return res.status(200).json({
                    success: true,
                    message: "Student enrolled successfully",
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Failed to enroll student"
                });
            }


    } catch (err){
        console.error(err);
        next(err);
    }
}

export {fetchDept, fetchFaculty, fetchUni, fetchCurrentLevel, handleStudentEnrolment, getStudent};