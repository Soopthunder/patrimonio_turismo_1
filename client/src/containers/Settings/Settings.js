import React, { useState } from 'react';

import axios from 'axios';

import { passwordChangeForm, emailChangeForm, usernameChangeForm } from '../../config/form';
import Form from '../../components/UI/Form/Form';
import Toast from '../../components/UI/Toast/toast';
import styles from './Settings.module.css';

const Settings = props => {
    const [changePassword, setChangePPassword] = useState(passwordChangeForm);
    const [changeEmail, setChangePEmail] = useState(emailChangeForm);
    const [changeUsername, setChangeUsername] = useState(usernameChangeForm);
    const [toastMessage, setToastMessage] = useState('');


    const handlePasswordChange = async data => {
        try {
            const res = await axios.put('/api/actualizar-password', data);
            setToastMessage(res.data);
        } catch (error) {
            setToastMessage(error.response.data);
        }
    }

    const handleEmailChange = async data => {
        try {
            const res = await axios.put('/api/actualizar-email', data);
            setToastMessage(res.data);
        } catch (error) {
            setToastMessage(error.response.data);
        }
    }

    const handleUsernameChange = async data => {
        try {
            const res = await axios.put('/api/actualizar-usuario', data);
            setToastMessage(res.data);
        } catch (error) {
            setToastMessage(error.response.data);
        }
    }

    return (
        <section>
            <h2>Configuración</h2>
            <article className={"col-12 col-md-9 col-lg-6 mx-auto my-4 " + styles.SettingsSection }>
                <h4 className="text-center">Cambiar contraseña</h4>
                <Form
                    data={changePassword}
                    setData={setChangePPassword}
                    submitAction={handlePasswordChange} />
            </article>
            <article className={"col-12 col-md-9 col-lg-6 mx-auto my-4 " + styles.SettingsSection }>
                <h4 className="text-center">Cambiar correo electrónico</h4>
                <Form
                    data={changeEmail}
                    setData={setChangePEmail}
                    submitAction={handleEmailChange} />
            </article>
            <article className={"col-12 col-md-9 col-lg-6 mx-auto my-4 " + styles.SettingsSection }>
                <h4 className="text-center">Cambiar nombre de usuario</h4>
                <Form
                    data={changeUsername}
                    setData={setChangeUsername}
                    submitAction={handleUsernameChange} />
            </article>
            <Toast message={toastMessage} setMessage={setToastMessage} />
        </section>
    );
};

export default Settings;