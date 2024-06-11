const controller = require('../controllers/auth');
const router = require('express').Router();

// var tokenCheck =  require("../middleware/routeProtection");

// CRUD Routes /users
router.post('/login', controller.Login); 


module.exports = router;

