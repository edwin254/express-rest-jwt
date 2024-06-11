const controller = require('../controllers/user');
const router = require('express').Router();
const jwt = require('jsonwebtoken')

// CRUD Routes /users
router.get('/', controller.getUsers); // /users
router.get('/:userId', controller.getUser); // /users/:userId
router.post('/', controller.createUser); // /users
router.put('/:userId', controller.updateUser); // /users/:userId
router.delete('/:userId', controller.deleteUser); // /users/:userId
router.post('/register',
    async(req,res,next)=>{
        try {
            let token = req.headers['authorization'].split(" ")[1];
            let decoded = jwt.verify(token,process.env.SECRET);
            req.user = decoded;
            next();
        } catch(err){
            res.status(401).json({"msg":"Couldnt Authenticate"});
            }
        } , controller.createUser); 

module.exports = router;