import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

const authenticateUser = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token){
        return res.status(401).json({
            success: false,
            message: "Access denied! No access token provided."
        });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;

        next();

    } catch(err){
        console.error(err);
        return res.status(403).json({ 
            success: false,
            message: "Invalid or expired access token" 
        });
    }
}

export {authenticateUser};