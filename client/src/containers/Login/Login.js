import React, { useState } from 'react';

import { connect } from 'react-redux';

import styles from './Login.module.css';
import Logo from '../../components/Logo/Logo';
import Form from '../../components/UI/Form/Form';
import { loginForm } from '../../config/form';
import { login } from '../../redux/actions';

const Login = ({ onLogin, error }) => {
    const [data, setData] = useState(loginForm);

    const handleLogin = async data => {
        onLogin(data);
    };

    return (
        <section className="container-fluid">
            <div className={"col-12 col-md-8 col-lg-6 mx-auto " + styles.Login}>
                <Logo />
                <p> {error} </p>
                <Form
                    data={data}
                    setData={setData}
                    submitAction={handleLogin} />
            </div>
        </section>);
}

const mapStateToProps = state => ({
    error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
    onLogin: (data) => dispatch(login(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);