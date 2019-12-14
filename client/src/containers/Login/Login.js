import React, { useState } from 'react';

import axios from 'axios';

import Form from '../../components/UI/Form/Form';
import { loginForm } from '../../config/form';

const Login = props => {
    const [data, setData] = useState(loginForm);
    const [message, setMessage] = useState(null);

    const handleLogin = async data => {
        try {
            await axios.post('/api/login', data);
            setMessage(null);
            props.setAuth();
        } catch (error) {
            if (error.response.status === 401) {
                setMessage('Usuario o contraseña incorrecta');
            } else {
                setMessage('Ha ocurrido un error. Intente nuevamente');
            }
        }
    };

    return (
        <section style={{ width: '40%', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center' }}>Login</h2>
            <p style={{ textAlign: 'center', height: '10px', margin: '15px 0' }}> {message} </p>
            <Form
                data={data}
                setData={setData}
                submitAction={handleLogin} />
        </section>);
}

export default Login;