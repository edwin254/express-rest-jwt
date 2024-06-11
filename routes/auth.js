const controller = require('../controllers/auth');
const router = require('express').Router();

 var tokenCheck =  require("./middleware/auth");
// CRUD Routes /users
router.get('/login', controller.Login); 
router.get('/api/register', tokenCheck, controller.Login); 