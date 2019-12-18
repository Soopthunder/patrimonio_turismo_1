const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.updatePassword = async ({ body: { oldPassword, newPassword, repeatPassword }, user }, res) => {
    try {
        if (!await bcrypt.compare(oldPassword, user.password))
            return res.status(422).send('La contraseña anterior es incorrecta');
        if (newPassword !== repeatPassword)
            return res.status(422).send('Las contraseñas no coinciden');
        const toUpdateUser = await User.findById(user._id);
        toUpdateUser.password = await bcrypt.hash(newPassword, 12);
        await toUpdateUser.save();
        res.status(200).send('La contraseña se ha actualziado');
    } catch (error) {
        res.status(500).send("Ha ocurrido un error. Vuelva a intentarlo más tarde")
    }

};

exports.updateUsername = async ({ user: { id, username }, body: { newUsername } }, res) => {
    try {
        if( newUsername === username ) res.status(422).send("El nombre ingresado es igual al anterior")
        const toUpdateUser = await User.findById(id);
        toUpdateUser.username = newUsername;
        await toUpdateUser.save();
        res.status(200).send("Nombre de usuario actualiazdo")
    } catch (error) {
        res.status(500).send("Ha ocurrido un error. Vuelva a intentarlo más tarde")
    }
};

exports.updateEmail = async ({ user: { id, email }, body: { newEmail } }, res) => {
    try {
        if( newEmail === email ) res.status(422).send("El correo ingresado es igual al anterior")
        const toUpdateUser = await User.findById(id);
        toUpdateUser.email = newEmail;
        await toUpdateUser.save();
        res.status(200).send("Correo electrónico actualiazdo")
    } catch (error) {
        res.status(500).send("Ha ocurrido un error. Vuelva a intentarlo más tarde")
    }
};