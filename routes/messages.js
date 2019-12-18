const Message = require('../models/message');
const User = require('../models/user');
const mailer = require('../services/mailing');
const { contectValidation } = require('../services/validation');
const { validationResult } = require('express-validator');
const { messageNotification } = require('../utils/emails');
const isAuth = require('../middlewares/isAuth');

module.exports = router => {
    router.post('/api/enviar-consulta', contectValidation, async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

            const admin = await User.find();
            const message = new Message({ ...req.body, creationDate: new Date });
            await message.save();
            await mailer.send(messageNotification(admin[0].email, { ...req.body }));
            res.status(200).send("Ok");
        } catch (error) {
            console.log(error)
            res.status(500).send('Ha ocurrido un error vuelva a intentarlo más tarde');;
        }
    });

    router.get('/api/mensajes', isAuth, async (req, res) => {
        try {
            const messages = await Message.find().sort({ _id: -1 });
            res.status(200).send(messages);
        } catch (error) {
            res.status(500).send('Ha ocurrido un error vuelva a intentarlo más tarde');;
        }
    });

    router.put('/api/mensajes/marcar-leido/:id', isAuth, async ({ params: { id } }, res) => {
        try {
            const message = await Message.findById(id);
            message.readed = true;
            message.save();
            res.status(200).send('Se ha marcado como leido');
        } catch (error) {
            res.status(500).send('Ha ocurrido un error vuelva a intentarlo más tarde');;
        }
    })
}