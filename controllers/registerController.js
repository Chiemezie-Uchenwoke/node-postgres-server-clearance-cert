import { client } from "../config/config.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

const registerUser = async (req, res, next) => {
    try {

        const {firstname, middlename, lastname, email, password} = req.body;

        // validate user credentials
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided",
            });
        }

        const user = await client.query(`SELECT * FROM users WHERE email = $1`, [email]);

        if (user.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        } else {
            const hash = await bcrypt.hash(password, saltRounds);

            if (!hash) return res.status(400).json({
                success: false,
                message: "Error hashing password"
            });

            await client.query(`
                INSERT INTO users(firstname, middlename, lastname, email, password)
                VALUES
                ($1, $2, $3, $4, $5)
                `, [firstname, middlename, lastname, email, hash]);
            
            return res.status(201).json({
                success: true,
                message: "User registered successfully!"
            });
        }

    } catch (err){
        console.error(err);
        next(err);
    }

}

export {registerUser};