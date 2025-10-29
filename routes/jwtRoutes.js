const  { Router } = require("express")
const router = Router();
const jwtController = require("../controllers/jwtController")

router.get('/signup', jwtController.signup_get)

router.get('/login', jwtController.login_get)

router.post('/signup', jwtController.signup_post)

router.post('/login', jwtController.login_post)

router.get('/logout', jwtController.logout_get)

module.exports = router;