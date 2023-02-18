const express = require("express")
const { TaskCreate, TaskDelete, TaskUpdate, TaskList, TaskStatusUpdate, TaskListByStatus } = require("../controllers/task")
const {requireSignIn} = require("../middlewares/AuthVerify")
const router = express.Router()


router.post("/task-create", requireSignIn, TaskCreate)
router.post("/task-delete/:id", TaskDelete)
router.post("/task-update/:id", requireSignIn, TaskUpdate)
router.post("/task-status-update/:id", requireSignIn, TaskStatusUpdate)
router.get("/task-status/:status", requireSignIn, TaskListByStatus)
router.get("/tasks", requireSignIn, TaskList)


module.exports = router ;
