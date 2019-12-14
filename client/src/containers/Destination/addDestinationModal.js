import React, { useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Form from '../../components/UI/Form/Form';
import { addSingleDestinationForm } from '../../config/form';

const AddDestinationModal = props => {
    const [destinationType, setDestinationType] = useState('Simple')
    const [data, setData] = useState(addSingleDestinationForm('Simple'));

    useEffect(() => {
        setData(addSingleDestinationForm(destinationType))
    }, [destinationType])

    useEffect(() => {
        setDestinationType(props.selected ? props.selected.type : 'Simple')
        setData(addSingleDestinationForm(props.selected ? props.selected.type : 'Simple', props.selected))
    }, [props.selected])

    let toogleButton = null;
    if (destinationType === 'Grupal' && !props.selected ) {
        toogleButton = <button onClick={() => setDestinationType('Simple')}>Destino simple</button>;
    } else if(destinationType === 'Simple' && !props.selected ){
        toogleButton = <button onClick={() => setDestinationType('Grupal')}>Destino simple</button>;
    }

    return (
        <Modal {...props} >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3> Agregar un destino </h3>
                {toogleButton}
            </div>
            <Form
                cancelHandler={() => props.closing()}
                data={data}
                setData={setData}
                submitAction={() => { }} />
        </Modal>
    );
}

export default AddDestinationModal;