const mailer = require('@sendgrid/mail');

mailer.setApiKey(process.env.SENGRID_APIKEY);

module.exports = mailer