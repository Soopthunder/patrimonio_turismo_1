import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import { connect } from 'react-redux'

import MessagesSummary from '../../components/MessagesSummary/MessagesSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import { readMessage, resetStatusMessage } from '../../redux/actions';
import Toast from '../../components/UI/Toast/toast';
import styles from './Dashboard.module.css';

const Dashboard = ({ messages, statusMessage, markAsReaded, resetToast }) => {
    const [lastDestinations, setLastDestinations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        axios.get('/api/ultimos-destinos')
            .then(response => {
                setLastDestinations(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.response.data)
                setLoading(false);
            })
    }, [])

    
    const content = error ?
        <p>{error} </p>
        :
        <section >
            <h2>Dashboard</h2>
            <div className="row justify-content-between">
                <article className="col-12 col-lg-6 my-4" >
                    <div className={styles.DashboardBox} >
                        <h3 className="text-center my-4" >Últimos destinos agregados</h3>
                        <Carousel>
                            {lastDestinations.map(element => (
                                <div key={element._id}>
                                    <img src={element.imageUrl} alt={element.name} />
                                    <div className="legend">
                                        <div className="d-flex align-items-center justify-content-center">
                                            <h5> {element.name} </h5>
                                        </div>
                                        <p>{element.description}</p>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </article>
                <article className="col-12 col-lg-6 my-4">
                    <div className={styles.DashboardBox}  >
                        <h3 className="text-center my-4" >Últimos mensajes recibidos</h3>
                        {messages.length ?
                            <MessagesSummary markAsReaded={markAsReaded} data={messages} /> :
                            <p style={{textAlign:'center'}}>No hay mensajes nuevos</p>
                        }
                    </div>
                </article>
            </div>
            <Toast message={statusMessage} setMessage={resetToast} />
        </section>;
    return loading ? <Spinner /> : content;
};

const mapDispatchToProps = dispatch => ({
    markAsReaded: (id) => dispatch(readMessage(id)),
    resetToast: () => dispatch(resetStatusMessage())
})

const mapStateToProps = state => ({
    messages: state.messages.messages.filter(message => !message.readed).reverse(),
    statusMessage: state.messages.statusMessage
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);