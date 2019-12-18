import React, { useState, useEffect } from 'react';

import axios from 'axios'

import ContentDisplayer from '../../../components/ContentDsiplayer/ContentDisplayer';
import AddContentModal from '../Modals/AddContent';

export default ({ setToastMessage, fetchDataUrl, addDataUrl, editDataUrl,deleteDataUrl ,getFormData, messageElement }) => {
    const [services, setServices] = useState([]);
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState(null);
    const [modalData, setModalData] = useState(getFormData())

    useEffect(() => {
        axios.get(fetchDataUrl)
            .then(res => {
                if (res.data.error) throw new Error(res.data.error);
                setServices(res.data);
            })
            .catch(error => {
                setToastMessage(error.message);
            })
    }, [setToastMessage, fetchDataUrl])

    return (
        <>
            <AddContentModal
                show={show}
                closing={() => setShow(false)}
                selected={selected}
                data={modalData}
                reset={ () => {
                    setModalData(getFormData());
                    setSelected(null);
                }}
                setData={setModalData}
                addContent={async data => {
                    const response = await axios.post(addDataUrl, data);
                    debugger;
                    if (response.data.error) return setToastMessage(response.message);
                    const updated = [...services];
                    updated.push(response.data);
                    setServices(updated);
                    debugger;
                    setToastMessage("Se ha agregado el "+ messageElement +" con exito");
                }}
                editContent={async data => {
                    const response = await axios.put( editDataUrl + selected._id, data);
                    if (response.data.error) return setToastMessage(response.message);
                    const index = services.findIndex(service => service._id === response.data._id)
                    const updated = [...services];
                    updated[index] = response.data;
                    setServices(updated);
                    setToastMessage("Se ha editado el "+ messageElement +" con exito");
                }}
            />
            <ContentDisplayer
                data={services}
                editContent={ element => {
                    setModalData(getFormData(element));
                    setSelected(element);
                    setShow(true);
                }}
                deleteContent={async id => {
                    try {
                        const res = await axios.delete( deleteDataUrl + id)
                        if (res.data.error) throw new Error(res.data.message);
                        const updated = services.filter(value => value._id !== id);
                        setToastMessage("Se ha eliminado el "+ messageElement +" con exito");
                        setServices(updated);
                    } catch (error) {
                        setToastMessage(error.response.data.message);
                    }
                }}
                clicked={() => setShow(true)}
            />
        </>
    );
};