const express = require('express');
const router = express.Router();
let students = require('../data/students');

// 1. GET /students - Fetch all students (200 OK)
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: students
    });
});

// 2. GET /students/:id - Fetch single student by ID (200 OK / 404 Not Found)
router.get('/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: `Student with ID ${studentId} not found`
        });
    }

    res.status(200).json({
        success: true,
        data: student
    });
});

// 3. POST /students - Create a new student record (201 Created / 400 Bad Request)
router.post('/', (req, res) => {
    const { name, course, age } = req.body;

    // Validation
    if (!name || !course || !age) {
        return res.status(400).json({
            success: false,
            message: 'Please provide name, course, and age'
        });
    }

    const newStudent = {
        id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
        name,
        course,
        age: Number(age)
    };

    students.push(newStudent);

    res.status(201).json({
        success: true,
        message: 'Student record created successfully',
        data: newStudent
    });
});

// 4. PUT /students/:id - Update existing student record (200 OK / 400 Bad Request / 404 Not Found)
router.put('/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const { name, course, age } = req.body;

    const studentIndex = students.findIndex(s => s.id === studentId);

    if (studentIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `Student with ID ${studentId} not found`
        });
    }

    if (!name && !course && !age) {
        return res.status(400).json({
            success: false,
            message: 'Please provide at least one field to update (name, course, age)'
        });
    }

    // Update fields if provided
    if (name) students[studentIndex].name = name;
    if (course) students[studentIndex].course = course;
    if (age) students[studentIndex].age = Number(age);

    res.status(200).json({
        success: true,
        message: 'Student record updated successfully',
        data: students[studentIndex]
    });
});

// 5. DELETE /students/:id - Delete student record (200 OK / 404 Not Found)
router.delete('/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex(s => s.id === studentId);

    if (studentIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `Student with ID ${studentId} not found`
        });
    }

    const deletedStudent = students.splice(studentIndex, 1)[0];

    res.status(200).json({
        success: true,
        message: `Student with ID ${studentId} deleted successfully`,
        data: deletedStudent
    });
});

module.exports = router;