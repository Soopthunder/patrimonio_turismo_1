import React, { useState } from 'react';

import { passwordChangeForm, emailChangeForm, usernameChangeForm } from '../../config/form';
import Form from '../../components/UI/Form/Form';

const Settings = props => {
    const [changePassword, setChangePPassword] = useState(passwordChangeForm);
    const [changeEmail, setChangePEmail] = useState(emailChangeForm);
    const [changeUsername, setChangeUsername] = useState(usernameChangeForm);


    const handlePasswordChange = event => {
        event.preventDefault();
    }

    const handleEmailChange = event => {
        event.preventDefault();
    }

    const handleUsernameChange = event => {
        event.preventDefault();
    }

    return (
        <section>
            <h2>Configuración</h2>
            <article className="w-50 mx-auto">
                <h3 className="text-center">Cambiar contraseña</h3>
                <Form
                    data={changePassword}
                    setData={setChangePPassword}
                    submitAction={handlePasswordChange} />
            </article>
            <article className="w-50 mx-auto">
                <h3>Cambiar correo electrónico</h3>
                <Form
                    data={changeEmail}
                    setData={setChangePEmail}
                    submitAction={handleEmailChange} />
            </article>
            <article className="w-50 mx-auto">
                <h3>Cambiar nombre de usuario</h3>
                <Form
                    data={changeUsername}
                    setData={setChangeUsername}
                    submitAction={handleUsernameChange} />
            </article>
        </section>
    );
};

export default Settings;