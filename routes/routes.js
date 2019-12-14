const router = require('express').Router();

require('./auth')(router);
require('./destination')(router);

module.exports = router;