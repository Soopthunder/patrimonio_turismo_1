import React, { useState, useEffect, useCallback } from 'react';

import ImagesUploader from 'react-images-upload';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import { connect } from 'react-redux';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Spinner from '../../components/UI/Spinner/Spinner';
import Toast from '../../components/UI/Toast/toast';
import Button from '../../components/UI/Button/Button';
import styles from './Destinations.module.css';
import { updateObject, parseFormEvent, initContinents } from '../../utils/helpers';
import { addDestinationForm } from '../../config/form';
import { resetSelectedDestination, updateSelectedDestinationGallery } from '../../redux/actions';

const CreateDestination = ({ history, resetSelected, selectedDestination, updateSelectedGallery }) => {
    const [data, setData] = useState(addDestinationForm(selectedDestination ? selectedDestination.type : 'Simple', selectedDestination));
    const [continents, setContinents] = useState([]);
    const [toastMessage, setToastMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/regiones')
            .then(res => {
                setContinents(res.data);
                if (!selectedDestination) setData(initContinents(res.data, data));
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            })
        return () => resetSelected();
    }, [])

    const updateValues = useCallback(event => {
        const value = parseFormEvent(event);
        setData(updateObject(data, { [event.target.name]: value }));
    }, [data])

    const updateContinent = useCallback(event => {
        const value = parseFormEvent(event);
        const regions = continents[continents.findIndex(element => element.name === value)].regions;
        setData(updateObject(data, {
            [event.target.name]: value,
            region: regions ? regions[0].name : ''
        }));
    }, [data, continents])

    const onDrop = useCallback(pictureFiles => {
        setData(updateObject(data, { gallery: pictureFiles }));
    }, [data]);

    const submitDestination = useCallback(async event => {
        event.preventDefault();
        const formData = new FormData();
        for (let element in data) {
            data[element] instanceof Array ?
                data[element].forEach(subelement => formData.append(element, subelement)) :
                formData.append(element, data[element]);
        }
        try {
            selectedDestination ?
                await axios.put('/api/editar-destino/' + selectedDestination._id, formData) :
                await axios.post('/api/crear-destino', formData);
            history.push('/destinos');
        } catch (error) {
            setToastMessage(error.response.data)
        }
    }, [data, history, selectedDestination]);


    if (!loading && data.type === 'Simple') {
        var continentIndex = continents.findIndex(element => element.name === data.continent);
        var regionIndex = continents[continentIndex].regions ? continents[continentIndex].regions.findIndex(element => element.name === data.region) : 0;
    }

    let toogleButton = null;
    if (data.type === 'Grupal') {
        toogleButton =
            (<Button
                type="Success"
                clicked={() => setData(addDestinationForm('Simple', initContinents(continents)))}>
                Destino simple
            </Button>);
    } else if (data.type === 'Simple') {
        toogleButton =
            (<Button
                type="Success"
                clicked={() => setData(addDestinationForm('Grupal'))}>
                Destino grupal
            </Button>);
    }

    const galleryImages = selectedDestination ?
        selectedDestination.gallery.map((image, index) => (
            <div key={image}>
                <img src={image} alt={selectedDestination.title + '-' + (index + 1)} />
                <div className="legend d-flex align-items-center justify-content-between">
                    <h6 className="ml-3 mb-0"> {selectedDestination.title + '-' + (index + 1)} </h6>
                    <Button
                        clicked={async () => {
                            try {
                                const response = await axios.post('/api/eliminar-imagen-galeria/' + selectedDestination._id, { image });
                                updateSelectedGallery(response.data);
                                setToastMessage("Imagen de la gelería eliminado.")
                            } catch (error) {
                                setToastMessage(error.response.message);
                            }
                        }}
                        type="Icon">
                        <i class="fas fa-trash-alt"></i>
                    </Button>
                </div>
            </div>
        )) : null;

    return (loading ?
        <Spinner /> :
        <section>
            <header className="row justify-content-between ">
                <div className={selectedDestination ? "col-12 my-2" : "col-12 col-lg-6 my-2"}>
                    <h3 className="text-center"> {selectedDestination ? "Editar" : "Agregar"} un destino </h3>
                </div>
                {!selectedDestination ?
                    <div className="col-12 col-lg-6 d-flex justify-content-center my-2">
                        {toogleButton}
                    </div> :
                    null}
            </header>
            <form className={styles.Form + ' row mt-3'} onSubmit={submitDestination}>
                <div className="col-12 col-md-6">
                    <h5 className="text-center mb-3"> Datos del destino </h5>
                    <input
                        name="title"
                        type="text"
                        placeholder="Nombre del destino"
                        onChange={updateValues}
                        value={data.title}
                        required />
                    {data.type === 'Simple' ?
                        <>
                            <label> Regiones </label>
                            <div className="row">
                                <div className="col-4">
                                    <select
                                        name="continent"
                                        onChange={updateContinent}
                                        value={data.continent}
                                        required >
                                        {continents.map(continent => (
                                            <option key={continent.name} value={continent.name}>
                                                {continent.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-4">
                                    <select
                                        name="region"
                                        onChange={updateValues}
                                        value={data.region}
                                        disabled={!continents[continentIndex].regions}
                                        required >
                                        {continents[continentIndex].regions &&
                                            continents[continentIndex].regions
                                                .map(region => (
                                                    <option key={region.name} value={region.name}>
                                                        {region.name}
                                                    </option>
                                                ))}
                                    </select>
                                </div>
                                <div className="col-4">
                                    <select
                                        name="country"
                                        onChange={updateValues}
                                        value={data.country}
                                        required >
                                        {continents[continentIndex].regions ?
                                            continents[continentIndex].regions[regionIndex]
                                                .countries.map(country => (
                                                    <option key={country} value={country}>
                                                        {country}
                                                    </option>
                                                )) :
                                            continents[continentIndex].countries.map(country => (
                                                <option key={country} value={country}>
                                                    {country}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                        </> :
                        <>
                            <div className="row">
                                <div className="col-6">
                                    <label>Duración en días</label>
                                    <input
                                        name="duration"
                                        type="text"
                                        onChange={updateValues}
                                        value={data.duration} />
                                </div>
                                <div className="col-6">
                                    <label>Fecha de salida</label>
                                    <input
                                        name="departureDate"
                                        type="date"
                                        onChange={updateValues}
                                        value={data.departureDate} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label>Precio</label>
                                    <input
                                        name="price"
                                        type="number"
                                        onChange={updateValues}
                                        value={data.price} />
                                </div>
                                <div className="col-6">
                                    <label> Comidas</label>
                                    <select
                                        name="fod"
                                        onChange={updateValues}
                                        value={data.food} >
                                        <option value="desayuno">Desayuno</option>
                                        <option value="completo">Completo</option>
                                    </select>
                                </div>
                            </div>
                            <input
                                name="airport"
                                type="text"
                                placeholder="Aeropuerto"
                                onChange={updateValues}
                                value={data.airport} />
                        </>
                    }
                    <CKEditor
                        editor={ClassicEditor}
                        data={data.description}
                        onChange={(event, editor) => {
                            setData(updateObject(data, {
                                description: editor.getData(),
                            }));
                        }}
                    />
                    <div className="d-flex align-items-center ">
                        <label className="mr-3"> Destino popular </label>
                        <input
                            type="checkbox"
                            name="popular"
                            onChange={updateValues}
                            checked={data.popular}
                        />
                    </div>
                    <input
                        required
                        onChange={updateValues}
                        type="text"
                        name="type"
                        value={data.type}
                        hidden />
                </div>
                <div className="col-12 col-md-6">
                    <h5 className="text-center mb-3"> Multimedia </h5>
                    <ImagesUploader
                        withIcon={true}
                        withPreview={true}
                        label="Tamaño maximo 5 MB. Extensiones jpg, jpeg y png"
                        buttonText='Elige tus imagenes'
                        onChange={onDrop}
                        imgExtension={['.jpg', ".jpeg", '.png']}
                        fileTypeError="Formato no permitido"
                        maxFileSize={5242880}
                        fileSizeError="Iamgen demasiado grande"
                    />
                    {selectedDestination ?
                        <Carousel showThumbs={false}>
                            {galleryImages}
                        </Carousel> :
                        null
                    }
                    <div className="row justify-content-center">
                        <input
                            id="image"
                            name="image"
                            required={selectedDestination ? false : true}
                            type="file"
                            onChange={updateValues}
                            value={data.name} />
                        <label htmlFor="image">
                            <i className="far fa-image"></i> Imagen principal
                        </label>
                        <input
                            id="pdf"
                            name="pdf"
                            type="file"
                            onChange={updateValues}
                            value={data.name} />
                        <label htmlFor="pdf">
                            <i className="far fa-file-pdf"></i> Archivo informativo
                        </label>
                    </div>
                </div>
                <div className="row w-100 justify-content-end">
                    <Button type="submit" > Enviar </Button>
                </div>
            </form>
            <Toast message={toastMessage} setMessage={setToastMessage} />
        </section>
    );
};

const mapStatetoProps = state => ({
    selectedDestination: state.destination.selected
});

const mapDispatchToProps = dispatch => ({
    resetSelected: () => dispatch(resetSelectedDestination()),
    updateSelectedGallery: gallery => dispatch(updateSelectedDestinationGallery(gallery))
})

export default connect(mapStatetoProps, mapDispatchToProps)(CreateDestination)