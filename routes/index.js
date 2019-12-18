const router = require('express').Router();

require('./auth')(router);
require('./destination')(router);
require('./banners')(router);
require('./regions')(router);
require('./services')(router);
require('./settings')(router);
require('./messages')(router);
require('./gallery')(router);
require("./operators")(router);

module.exports = router;