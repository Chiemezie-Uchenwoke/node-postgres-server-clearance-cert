import { client } from "../config/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

const loginUser = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        const existingUser = await client.query(`SELECT * FROM users WHERE email = $1`, [email]);

        if (existingUser.rows.length === 0){
            return res.status(403).json({
                success: false,
                message: "Please register to get started!"
            });
        } else {
            const userRecord = existingUser.rows[0];
            const match = await bcrypt.compare(password, userRecord.password);

            if (!match){
                return res.status(400).json({
                    success: false,
                    message: "Wrong password. Please try again!"
                });
            } else {
                const user = {
                    userId: userRecord.id,
                    firstname: userRecord.firstname,
                    lastname: userRecord.lastname,
                    userRole: userRecord.user_role
                }

                const token = jwt.sign(user, jwtSecret, {expiresIn: "15m"});

                res.cookie("accessToken", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                    maxAge: 1000 * 60 * 15, // 15 mins
                });

                return res.status(200).json({
                    success: true,
                    message: "Login successful!",
                    user
                });
            }
        }

    } catch(err) {
        console.error(err);
        next(err);
    }
}

export {loginUser};