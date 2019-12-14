import React, { useState } from 'react';

import DestinationFactory from './Destination/DestinationFactory';
import AddDestinationModal from './addDestinationModal';

import styles from './Destinations.module.css'

const Destination = props => {
    const [destinations, setDestinations] = useState([
        {
            id: '1',
            name: 'Paris',
            type: 'Simple',
            description: 'Esta es uan increible descripcion',
            imageLink: 'https://d39gusjpdm7p1o.cloudfront.net/data/layout_grouping/static_page_step/20784/a330628091ede7eb1548d6cda58e0357.jpg?ver=1477297804'
        },
        {
            id: '2',
            name: 'Londres',
            type: 'Simple',
            description: 'Esta es uan increible descripcion',
            imageLink: 'https://billete996.aireuropa.com/wp-content/uploads/2012/11/Londres-FB-1170x630.png'
        },
        {
            id: '3',
            name: 'Japan',
            type: 'Grupal',
            description: 'Esta es uan increible descripcion',
            imageLink: 'https://www.theinvisibletourist.com/wp-content/uploads/2017/04/featured_85.jpg'
        }
    ]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedElement, setSelectedElement] = useState(null);

    const closeModal = () => {
        setSelectedElement();
        setModalVisible(false);
    }

    return (
        <section>
            <AddDestinationModal
                show={modalVisible}
                closing= { closeModal } 
                resetSelected = {() => setSelectedElement(null)}
                selected = {selectedElement} 
            />
            <h2> Destinos </h2>
            <div className="row justify-content-between">
                {destinations.map(destination => (
                    DestinationFactory(destination,
                        () => setSelectedElement(destination),
                        () => setModalVisible(true))
                ))}
            </div>
            <div className={styles.AddDestinationButton}>
                Agregar destino
                <button onClick={() => setModalVisible(true)} >
                    <i className="fas fa-plus"></i>
                </button>
            </div>
        </section>
    )
}

export default Destination;