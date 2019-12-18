import React, { useState, useEffect, useCallback } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Destination from './Destination/Destination';
import Searchbar from '../../components/Searchbar/Searchbar'
import Paginator from '../../components/UI/Pagination/Pagination';
import Spinner from '../../components/UI/Spinner/Spinner';
import Toast from '../../components/UI/Toast/toast';
import styles from './Destinations.module.css';
import countries from '../../config/countries';
import { setSelectedDestination } from '../../redux/actions';
import { updateObject, parseFormEvent } from '../../utils/helpers';;

const Destinations = ({ history, selectDestination }) => {
    const [destinations, setDestinations] = useState([]);
    const [message, setMessage] = useState(null);
    const [toastMessage, setToastMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [searchFilters, setSearchFilters] = useState({
        title: '',
        popular: '',
        type: '',
        country: ''
    })

    useEffect(() => {
        axios.get('/api/destinos')
            .then(dest => {
                setDestinations(dest.data);
                setLoading(false);
            })
            .catch(error => {
                setMessage(error.message);
                setLoading(false);
            });
    }, []);

    const editDestination = useCallback(destination => {
        selectDestination(destination);
        history.push('/destinos/crear-destino');
    }, [history, selectDestination]);

    const handleFilterChange = event => {
        const value = parseFormEvent(event);
        setSearchFilters(updateObject(searchFilters, { [event.target.name]: value }))
    };

    const showedDestinations = destinations
        .filter(element =>
            (!searchFilters.title || element.title.includes(searchFilters.title)) &&
            (!searchFilters.type || element.type === searchFilters.type) &&
            (!searchFilters.popular || element.popular + '' === searchFilters.popular) &&
            (!searchFilters.country || element.country === searchFilters.country)
        )
        .filter((element, index) => index + 1 > (page - 1) * 12 && index + 1 <= page * 12)

    return (
        <section>
            <h2> Destinos </h2>
            <div style={{ minHeight: '400px' }}>
                {loading ?
                    <Spinner /> :
                    <>{message ?
                        <h4 className="text-center"> {message} </h4> :
                        <>
                            <div className="row justify-content-center">
                                <div className="col-12 col-lg-10">
                                    <div className="my-4 p-4" style={{boxShadow: '2px 2px 10px #777777'}} >
                                        <Searchbar
                                            handleSearchValue={handleFilterChange}
                                            searchValue={searchFilters.title}
                                        >
                                            <div className="row">
                                                <div className="col-12 col-sm-6 col-lg-4 d-flex align-items-center justify-content-center">
                                                    <input
                                                        type="radio"
                                                        name="popular"
                                                        value=""
                                                        onChange={handleFilterChange}
                                                        checked={!searchFilters.popular} />
                                                    Todos
                                                <input
                                                        type="radio"
                                                        name="popular"
                                                        value="true"
                                                        onChange={handleFilterChange}
                                                        checked={searchFilters.popular === 'true'} />
                                                    Popular
                                                <input
                                                        type="radio"
                                                        name="popular"
                                                        value="false"
                                                        onChange={handleFilterChange}
                                                        checked={searchFilters.popular === 'false'} />
                                                    No popular
                                            </div>
                                                <div className="col-12 col-sm-6 col-lg-4 d-flex align-items-center justify-content-center">
                                                    <input
                                                        type="radio"
                                                        name="type"
                                                        value=""
                                                        onChange={handleFilterChange}
                                                        checked={!searchFilters.type} />
                                                    Todos
                                                <input
                                                        type="radio"
                                                        name="type"
                                                        value="Simple"
                                                        onChange={handleFilterChange}
                                                        checked={searchFilters.type === 'Simple'} />
                                                    Simple
                                                <input
                                                        type="radio"
                                                        name="type"
                                                        value="Grupal"
                                                        onChange={handleFilterChange}
                                                        checked={searchFilters.type === 'Grupal'} />
                                                    Grupal
                                            </div>
                                                <div className="col-12 col-lg-4 d-flex align-items-center">
                                                    <select
                                                        onChange={handleFilterChange}
                                                        name="country"
                                                        value={searchFilters.country} >
                                                        {countries.map(({ value, displayValue }) => (
                                                            <option value={value} > {displayValue} </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </Searchbar>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {showedDestinations
                                    .map(destination => (
                                        <Destination
                                            {...destination}
                                            deleteDestination={() => setDestinations(destinations.filter(value => value._id !== destination._id))}
                                            editDestination={() => editDestination(destination)}
                                            setToastMessage={setToastMessage}
                                        />
                                    ))}
                            </div>
                        </>}
                        {showedDestinations.length > 12 && <Paginator total={Math.ceil(showedDestinations.length / 12)} current={page} setCurrent={setPage} />}
                    </>
                }
            </div>
            <Link className={styles.AddDestinationButton} to="destinos/crear-destino" >
                <i className="fas fa-plus"></i>
            </Link>
            <Toast message={toastMessage} setMessage={setToastMessage} />
        </section>
    )
}

const mapDispatchToProps = dispatch => ({
    selectDestination: destination => dispatch(setSelectedDestination(destination))
})

export default connect(null, mapDispatchToProps)(Destinations);