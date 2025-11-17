const Task = require('../models/task')
const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = new Task({
            title,
            description
        })
        await task.save()
        const taskResponse = { id: task._id, title: task.title, description: task.description }
        res.status(201).json({
            success: true,
            data: taskResponse,
            message: "New task is created"
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error!",
            success: false,
            error: error.message
        })
    }
}

const getAllTask = async (req, res) => {
    try {
        const { limit = 10, page = 1, search, sort = '-createAt', filter } = req.query
        const query = {}

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ]
        }

        const limitNum = parseInt(limit);
        const total = await Task.countDocuments(query)
        const tasks = await Task.find(query)
            .limit(limitNum)
            .skip((page - 1) * limit)
            .sort(sort);

        res.status(200).json({
            success: true,
            data: {
                tasks,
                pagination: {
                    current: parseInt(page),
                    pages: Math.ceil(total / limit),
                    limit: limitNum,
                    total
                }
            },
            message: "Get all task successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error!",
            success: false,
            error: error.message
        })
    }
}

const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id)
        if (!task) {
            res.status(404).json({
                success: false,
                message: "Not found task!"
            })
        }
        res.status(200).json({
            success: true,
            data: task,
            message: "Get task successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error!",
            success: false,
            error: error.message
        })
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const dataUpdate = {
            id: id,
            title: title,
            description: description
        }
        const task = await Task.findByIdAndUpdate(
            id,
            dataUpdate,
            { new: true, runValidators: true }
        )
        if (!task) {
            res.status(404).json({
                success: false,
                message: "Not found task!"
            })
        }
        res.status(200).json({
            success: true,
            data: task,
            message: "Update task successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error!",
            success: false,
            error: error.message
        })
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id)
        if (!task) {
            res.status(404).json({
                success: false,
                message: "Not found task!"
            })
        }

        res.status(200).json({
            success: true,
            message: "Delete task successfully",
            data: task
        })

    } catch (error) {
        res.status(500).json({
            message: "Server error!",
            success: false,
            error: error.message
        })
    }
}

module.exports = {
    createTask, getAllTask, getTaskById, updateTask, deleteTask
}