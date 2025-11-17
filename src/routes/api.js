const express = require('express');
const userController = require('../controllers/userController');
const { authAdmin } = require('../middleware/auth');
const taskController = require('../controllers/taskController');
const { apiLimiter } = require('../middleware/rateLimiter');

const routerAPI = express.Router();

routerAPI.use(apiLimiter);

routerAPI.get("/", (req, res) => { return res.status(200).json("Hello world api") })
routerAPI.get("/account", authAdmin, userController.account)

routerAPI.post("/register", userController.register)
routerAPI.post("/login", userController.login)
routerAPI.post("/refresh_token", userController.refresh_token)
routerAPI.post('/logout', userController.logout)

routerAPI.post('/task', taskController.createTask)
routerAPI.get('/task-all', taskController.getAllTask)
routerAPI.put('/task/:id', taskController.updateTask)
routerAPI.get('/task/:id', taskController.getTaskById)
routerAPI.delete('/task/:id', taskController.deleteTask)

module.exports = routerAPI;