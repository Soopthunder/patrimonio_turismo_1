import React, { Suspense, useState, useEffect } from 'react';

import { connect } from 'react-redux'

import Layout from './containers/Layput/Layout';
import Routes from './components/Routes/Routes';
import Spinner from './components/UI/Spinner/Spinner';
import styles from './App.module.css'
import { fecthMessages, fetchAuth } from './redux/actions'

const App = ({ onFetchMessages, onFetchAuth }) => {
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);

    onFetchAuth()
      .then(res => {
        onFetchMessages()
          .then(res => {
            setLoading(false);
          });
      })

  }, [onFetchAuth, onFetchMessages])

  return (
    <div className={styles.app}>
      <Layout >
        <Suspense fallback={<Spinner />}>
          {loading ? <Spinner /> : <Routes />}
        </Suspense>
      </Layout>
    </div>
  );
}

const mapDispatchToProps = dipsatch => ({
  onFetchMessages: () => dipsatch(fecthMessages()),
  onFetchAuth: () => dipsatch(fetchAuth())
})

export default connect(null, mapDispatchToProps)(App);
