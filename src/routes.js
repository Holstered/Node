const { Router } = require('express');

const UserController = require('./app/Controllers/UserController');
const LoginCrontroller = require('./app/Controllers/LoginController');
const AuthMidleware = require('./app/midlewares/AuthMidleware')

const routes = new Router();

routes.post("/user", UserController.index);
//routes.get("/getUser", AuthMidleware, UserController.show);
routes.get("/getUser", UserController.show);
routes.post("/userAdd", UserController.store);

routes.post("/loginUser", LoginCrontroller.index);

module.exports = routes;
