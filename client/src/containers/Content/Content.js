import React, { useState } from 'react';

import WithDropdown from '../../components/UI/WithDropdown/withDropdown';
import RegionsManager from './RegionsManager/RegionsManager';
import Toast from '../../components/UI/Toast/toast';
import ContentManager from './ContentManager/ContentManager';
import GalleryManager from './GalleryManager/GalleryManager';
import CaatalogManager from './CatalogsManager/CatalogManager';
import { addService, addBanner, addOperator } from '../../config/form';
import CatalogManager from './CatalogsManager/CatalogManager';

const Content = props => {
    const [toastMessage, setToastMessage] = useState('');

    return (
        <section className="row">
            <h2 className="w-100"> Contenido </h2>
            <div className="col-12 col-md-6 mx-auto">
                <WithDropdown title="Banner principal" >
                    <ContentManager
                        getFormData={addBanner}
                        deleteDataUrl="/api/borrar-banner/"
                        editDataUrl="/api/editar-banner/"
                        addDataUrl="/api/agregar-banner"
                        fetchDataUrl="/api/banners"
                        messageElement="banner"
                        setToastMessage={setToastMessage} />
                </WithDropdown>
            </div>
            <div className="col-12 col-md-6 mx-auto">
                <WithDropdown title="Servicios">
                    <ContentManager
                        getFormData={addService}
                        deleteDataUrl="/api/borrar-servicio/"
                        editDataUrl="/api/editar-servicio/"
                        addDataUrl="/api/agregar-servicio"
                        fetchDataUrl="/api/servicios"
                        messageElement="servicio"
                        setToastMessage={setToastMessage} />
                </WithDropdown>
            </div>
            <div className="col-12 col-md-6 mx-auto">
                <WithDropdown title="Galería">
                    <GalleryManager />
                </WithDropdown>
            </div>
            <div className="col-12 col-md-6 mx-auto">
                <WithDropdown title="Regiones">
                    <RegionsManager setToastMessage={setToastMessage} />
                </WithDropdown>
            </div>
            <div className="col-12 col-md-6 mx-auto">
                <WithDropdown title="Operadores">
                    <ContentManager
                        getFormData={addOperator}
                        deleteDataUrl="/api/borrar-operador/"
                        editDataUrl="/api/editar-operador/"
                        addDataUrl="/api/agregar-operador"
                        fetchDataUrl="/api/operadores"
                        messageElement="operador"
                        setToastMessage={setToastMessage} />
                </WithDropdown>

            </div>
            <div className="col-12 col-md-6 mx-auto">
                <WithDropdown title="Catalogos">
                    <CatalogManager
                        messageElement="catálogo"
                        setToastMessage={setToastMessage}
                    />
                </WithDropdown>
            </div>
            <Toast message={toastMessage} setMessage={setToastMessage} />
        </section >
    )
}

export default Content;