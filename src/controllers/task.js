const TaskModel = require("../models/TaskModel");


exports.TaskCreate = (req, res) => {
    const reqBody = req.body;
    reqBody.email = req.headers["email"]
    TaskModel.create(reqBody, (err, data) => {
        !err ? (
            res.json({
                status: 200,
                message:"Task Create Successfully",
                data:data,
            })
        ) : (
                res.json({
                    status: 401,
                    message:"Task Create Failed",
                    err:err
                })
        )
    })
}

exports.TaskDelete = (req, res) => {
    const id = req.params.id
    TaskModel.deleteOne({_id:id}, (err, data) => {
        !err ? (
            res.json({
                status: 200,
                message:"Task Delete Successfully",
                data:data,
            })
        ) : (
                res.json({
                    status: 401,
                    message:"Task Delete Failed",
                    err:err
                })
        )
    })
}

exports.TaskUpdate = (req, res) => {
    const id = req.params.id
    const { title, desc } = req.body;
    TaskModel.updateOne({_id:id}, { title, desc },(err, data) => {
        !err ? (
            res.json({
                status: 200,
                message:"Task Updated Successfully",
                data:data,
            })
        ) : (
                res.json({
                    status: 401,
                    message:"Task Updated Failed",
                    err:err
                })
        )
    })
}

exports.TaskStatusUpdate = (req, res) => {
    const id = req.params.id
    const { status } = req.body;
    TaskModel.updateOne({_id:id}, { status },(err, data) => {
        !err ? (
            res.json({
                status: 200,
                message:"Task Updated Successfully",
                data:data,
            })
        ) : (
                res.json({
                    status: 401,
                    message:"Task Updated Failed",
                    err:err
                })
        )
    })
}

exports.TaskList = (req, res) => {
    const email = req.headers["email"]
    TaskModel.find({email:email},(err, data) => {
        !err ? (
            res.json({
                status: 200,
                message:"Tasks Listed Successfully",
                data:data.reverse(),
            })
        ) : (
                res.json({
                    status: 401,
                    message:"Tasks Listed Failed",
                    err:err
                })
        )
    })
}

exports.TaskListByStatus = (req, res) => {
    const status = req.params.status;
    const email = req.headers.email;

    TaskModel.aggregate(
        [{ $match: { status, email } }], (err, data) => {
            if (err) {
                return res.json({
                    status: 400,
                    message: "Task Listing By Status Failed",
                    data:err
                })
            }
        
            return res.json({
                status: 200,
                message: "Task Listed By Status",
                data:data
            })
        }
    )
}