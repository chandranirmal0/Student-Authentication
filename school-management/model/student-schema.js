import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    rollnumber: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Must Be Min 8 Character'],
        maxlength: [10,'Maximum 10 Character Required'],
        unique: [true, 'Please enter valid password']
    }
});

const studentModel = mongoose.model('students', studentSchema);

export default studentModel;