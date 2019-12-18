import React from 'react';

import Modal from '../../../components/UI/Modal/Modal';
import Form from '../../../components/UI/Form/Form';

export default ({ show, closing, reset, selected, data, setData, addContent, editContent }) => {

    function closeAndReset() {
        reset();
        closing();
    }

    function submitContent(data) {
        !selected ? addContent(data) : editContent(data);      
        closeAndReset();
    }

    return (
        <Modal closing={closeAndReset} show={show} >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3> Agregar un servicio </h3>
            </div>
            <Form
                cancelHandler={closeAndReset}
                data={data}
                setData={setData}
                submitAction={ submitContent }
                formData />
        </Modal>
    );
}

