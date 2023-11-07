import Express from "express";
import { studentData, studentRegister, studentLogin, authMiddleware } from "../controller/student-controller.js"
const studentRoute = Express();

// get all students
studentRoute.get('/student-details', authMiddleware, studentData);

// register student data
studentRoute.post('/student-register', studentRegister);

// login student data
studentRoute.post('/student-login', studentLogin);

export default studentRoute;