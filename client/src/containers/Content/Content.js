import React, { useState } from 'react';

import ContentManager from '../../components/ContentManager/ContentManager';
import WithDropdown from '../../hoc/withDropdown';

const Content = props => {
    const [services, setServices] = useState([
        {
            id: 2,
            title: 'Renta un auto',
            image: 'http://dev.patrimonioturismo.com/img/o1.jpg',
            description: 'A la hora de hacer un viaje turístico por un determinado país donde vas a planificar una ruta para conocer distintos lugares, alquilar un coche es la solución ideal.'
        },
        {
            id: 1,
            title: 'Reserva para crucero',
            image: 'http://dev.patrimonioturismo.com/img/o2.jpg',
            description: 'Tenemos disponible una gran variedad de destinos nacionales e internacionales para satisfacer a todos nuestros clientes.'
        }
    ]);
    const [popularDestinations, setPopularDestinations] = useState([
        {
            id: 1,
            title: 'Peru',
            image: 'http://dev.patrimonioturismo.com/img/destinos_inicio/peru.jpg',
            description: 'Patrimonios culturales'
        },
        {
            id: 2,
            title: 'Peru',
            image: 'http://dev.patrimonioturismo.com/img/destinos_inicio/peru.jpg',
            description: 'Patrimonios culturales'
        }
    ]);
    const [BannerImages, setBannerImages] = useState([
        {
            id: 1,
            title: 'Peru',
            image: 'http://dev.patrimonioturismo.com/img/destinos_inicio/peru.jpg',
            description: 'Patrimonios culturales'
        },
        {
            id: 2,
            title: 'Peru',
            image: 'http://dev.patrimonioturismo.com/img/destinos_inicio/peru.jpg',
            description: 'Patrimonios culturales'
        }
    ]);


    return (
        <section className="row">
            <h2 className="w-100"> Contenido </h2>
            <div className="col-12 col-md-10 col-lg-8 mx-auto">
                <WithDropdown title="Destinos Populares" show={true} >
                    <ContentManager buttonText="destino" data={popularDestinations} />
                </WithDropdown>
                <WithDropdown title="Banner principal" >
                    <ContentManager buttonText="banner" data={BannerImages} />
                </WithDropdown>
                <WithDropdown title="Servicios">
                    <ContentManager buttonText="servicio" data={services} />
                </WithDropdown>
            </div>
        </section>
    )
}

export default Content;