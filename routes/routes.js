const { Router } = require('express');
const router = Router();
const routeController = require('../controller/routescontroller');

router.get('/signup', routeController.getSignup);
router.get('/login', routeController.getLogin);
router.post('/signup', routeController.postSignup);
router.post('/login', routeController.postLogin);

module.exports = router;