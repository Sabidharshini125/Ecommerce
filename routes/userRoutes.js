const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get("/", auth, userController.getUsers);
router.post("/", userController.createUser);
router.post("/login", userController.login);

module.exports = router;
