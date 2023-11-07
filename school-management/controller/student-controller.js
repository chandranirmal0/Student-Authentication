import studentModel from '../model/student-schema.js';
import jsonwebtoken from 'jsonwebtoken';
const SECRET_KEY = 'qwyg12hhehvkvjkhwlwqjp2o012i'

// Middleware to verify JWT tokens
const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jsonwebtoken.verify(token, SECRET_KEY);
        console.log(`\nThe datas in the decoded variable after verify :\n${JSON.stringify(decoded)}`);
        next();
    } catch (err) {
        res.status(403).json({ message: 'Access denied. Invalid token.' });
    };
};

// register
const studentRegister = async (req, res) => {
    const { name, age, rollnumber, email, password } = req.body;
    try {
        const studentRegister = new studentModel({ name, age, rollnumber, email, password })
        await studentRegister.save();
        res.status(201).json({ message: "Registered Successfully" })
    } catch (err) {
        console.log(`There Is An Error In Register\n${err}`);
        res.status(500).send("Enter All Credentials");
    };
};

// login
const studentLogin = async (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Password and email must be required" })
    };
    // else =>
    try {
        const studentLogin = await studentModel.findOne({ name, email, password });
        if (studentLogin) {
            const verifyEmail = studentLogin.email;
            const verifyPassword = studentLogin.password;
            if (verifyEmail && verifyPassword) {
                var payload = {
                    _id: studentLogin._id,
                    name: studentLogin.name
                }
            } else {
                console.log(`Invalid Email or Password`);
                res.status(403).send('Invalid Email or Password');
            }
            // Sign Token
            const token = jsonwebtoken.sign(payload, SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({ token });
        }
        else {
            res.status(401).send('User Not Found');
        }
    } catch (err) {
        console.log(`There is an error in Login \n ${err}`)
        res.status(500).json({ "error": err })
    };
};

// dashboard
const studentData = async (req, res) => {
    try {
        const studentData = await studentModel.find({}, { __v: 0 });
        if (!studentData) {
            res.status(404).json({ message: "There Is No Data" });
        } else {
            res.status(200).send(studentData);
        };
    } catch (err) {
        console.log("Error in getting data", err);
        res.status(500).json({ error: err });
    };
};

export { studentData, studentRegister, studentLogin, authMiddleware };