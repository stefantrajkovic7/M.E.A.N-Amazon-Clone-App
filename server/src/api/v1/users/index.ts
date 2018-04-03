import {jwtCheck} from "../../../middlewares/check-jwt";

const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/signup', controller.signup);
router.post('/login', controller.login);

router.route("/profile")
    .get(jwtCheck, controller.show)
    .post();

module.exports = router;