const express = require("express");

const router = express.Router();

const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getDashboardStats,
} = require("../controllers/studentController");

router.post("/", createStudent);
router.get("/", getStudents);
router.get("/dashboard/stats", getDashboardStats);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
