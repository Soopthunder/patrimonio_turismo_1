import React, { useState, useEffect } from 'react';

import axios from 'axios';

import styles from './RegionsManager.module.css'
import CountryContaienr from './CountryContainer/CountryContainer';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Form/Input/Input';
import countries from '../../../config/countries';

export default ({ setToastMessage }) => {
    const [continents, setContinents] = useState(null);
    const [selectedContinent, setSelectedContinent] = useState(0);
    const [selectedRegion, setSelectedRegion] = useState(0);
    const [toAddCountry, setToAddCountry] = useState(countries[0].displayValue);

    useEffect(() => {
        axios.get('/api/regiones')
            .then(res => {
                if (res.data.error) throw new Error(res.data.error);
                setContinents(res.data)
            })
            .catch(error => {
                setToastMessage(error.message);
            });
    }, [setToastMessage]);

    function deleteCountry(name) {
        const toUpdate = continents[selectedContinent].countries ?
            continents[selectedContinent].countries :
            continents[selectedContinent].regions[selectedRegion].countries;
        const updated = toUpdate.filter(country => country !== name);
        const updatedContinents = [...continents];
        continents[selectedContinent].countries ?
            updatedContinents[selectedContinent].countries = updated :
            updatedContinents[selectedContinent].regions[selectedRegion].countries = updated;
        setContinents(updatedContinents);
    }

    function addCountry(event) {
        event.preventDefault();
        const updated = continents[selectedContinent].countries ?
            [...continents[selectedContinent].countries] :
            [...continents[selectedContinent].regions[selectedRegion].countries];
        updated.push(toAddCountry);
        const updatedContinents = [...continents];
        continents[selectedContinent].countries ?
            updatedContinents[selectedContinent].countries = updated :
            updatedContinents[selectedContinent].regions[selectedRegion].countries = updated;
        setContinents(updatedContinents);
    }

    async function submitRegions() {
        try {
            const res = await axios.put('/api/actualizar-regiones', continents);
            if (res.data.error) throw new Error(res.data.error);
            setToastMessage(res.data.message);
        } catch (error) {
            setToastMessage(error.message);
        }
    }

    return continents ? (
        <div className={styles.RegionsManager + " container-fluid"} >
            <div className="row">
                <div className="col-12 col-md-6 d-flex justify-content-center">
                    <select
                        value={selectedContinent}
                        onChange={(event) => {
                            setSelectedContinent(event.target.value);
                        }} >
                        {continents.map((continent, index) => (
                            <option key={continent.name} value={index}>
                                {continent.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-12 col-md-6 d-flex justify-content-center">
                    {continents[selectedContinent].regions ? (
                        <select onChange={(event) => setSelectedRegion(event.target.value)} value={selectedRegion}>
                            {continents[selectedContinent].regions.map((region, index) => (
                                <option key={region.name} value={index} >
                                    {region.name}
                                </option>
                            ))}
                        </select>
                    ) : null}
                </div>
            </div>
            <div className={styles.CountriesContainer}>
                {!continents[selectedContinent].regions ?
                    continents[selectedContinent].countries.map(country => (
                        <CountryContaienr
                            key={country}
                            name={country}
                            deleteCountry={() => deleteCountry(country)} />
                    ))
                    :
                    continents[selectedContinent].regions[selectedRegion].countries.map(country => (
                        <CountryContaienr
                            name={country}
                            deleteCountry={() => deleteCountry(country)} />
                    ))
                }
            </div>
            <div className="row justify-content-between">
                <form onSubmit={addCountry} className="d-flex col-12 col-lg-6 align-items-center justify-content-end">
                    <div className="w-50">
                        <Input
                            elementType='select'
                            elementConfig={{ options: countries }}
                            changed={event => {
                                setToAddCountry(event.target.value);
                            }} />
                    </div>
                    <Button type="submit"> Agregar </Button>
                </form>
                <div className="col-12 col-lg-6 d-flex align-items-center justify-content-end">
                    <Button clicked={submitRegions} type="Danger"> Actualizar </Button>
                </div>
            </div>
        </div>
    ) : null;
};

