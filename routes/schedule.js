var express = require('express');
var router = express.Router();
const schedule_controller = require("../controllers/scheduleController");


/* GET home page. */
router.get('/', schedule_controller.schedule_list);

module.exports = router;