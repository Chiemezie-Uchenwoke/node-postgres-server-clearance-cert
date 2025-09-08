import express from "express";
import { fetchDept, fetchFaculty, fetchUni, fetchCurrentLevel, handleStudentEnrolment, getStudent } from "../controllers/studentController.js";
import { authenticateUser } from "../middlewares/authenticateJwt.js";

const stdRouter = express.Router();

stdRouter.get("/departments", authenticateUser, fetchDept);
stdRouter.get("/faculty", authenticateUser, fetchFaculty);
stdRouter.get("/universities", authenticateUser, fetchUni);
stdRouter.get("/current-level", authenticateUser, fetchCurrentLevel);
stdRouter.post("/student-enrolment", authenticateUser, handleStudentEnrolment);
stdRouter.get("/me", authenticateUser, getStudent);

export default stdRouter;