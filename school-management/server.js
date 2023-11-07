import Express from "express";
import connectDB from "./db.js";
import studentRoute from "./routes/student-route.js";
const app = Express();
const PORT = 3030;

app.use(Express.json());

app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.log("Error connecting to DB: ", err);
        res.status(500).send('Database Error');
    };
});

app.use('/', studentRoute);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});