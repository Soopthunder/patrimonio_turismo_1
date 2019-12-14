import React, { Suspense, useState, useEffect } from 'react';

import axios from 'axios';

import Layout from './containers/Layput/Layout';
import Routes from './components/Routes/Routes';
import Spinner from './components/UI/Spinner/Spinner';
import styles from './App.module.css'

const App = () => {
  const [isAuth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/current_user')
      .then(res => {
        res.data ? setAuth(true) : setAuth(false);
        setLoading(false);
      })
  })

  return (
    <div className={styles.app}>
      <Layout isAuth={isAuth} >
        <Suspense fallback={<Spinner />}>
          { loading ? <Spinner/> : <Routes isAuth={isAuth} setAuth={setAuth} />}
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
