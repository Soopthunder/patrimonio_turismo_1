import React from 'react';
import axios from 'axios';

import Button from '../../../components/UI/Button/Button';
import AddModal from '../Modals/AddContent';
import { addCatalog } from '../../../config/form';

export default ({ setToastMessage, messageElement }) => {
    const [operators, setOperators] = React.useState([]);;
    const [selectedOperator, setSelectedOperator] = React.useState(undefined);
    const [showModal, setShowModal] = React.useState(false);
    const [modalData, setModalData] = React.useState(addCatalog())

    React.useEffect(() => {
        axios.get('/api/operadores')
            .then(res => {
                setOperators(res.data)
            })
            .catch(error => {
                setToastMessage(error.message);
            });
    }, []);

    return (
        <div>
            <AddModal
                show={showModal}
                closing={() => setShowModal(false)}
                data={modalData}
                reset={() => setModalData(addCatalog())}
                setData={setModalData}
                addContent={async data => {
                    const response = await axios.put("/api/agregar-catalogo/" + selectedOperator._id, data);
                    if (response.data.error) return setToastMessage(response.message);
                    const updatedSelectedOperator = { ...selectedOperator, catalogs: response.data };
                    setSelectedOperator(updatedSelectedOperator);
                    const updatedOperators = [...operators];
                    const index = operators.findIndex(operator => operator._id === updatedSelectedOperator._id);
                    updatedOperators[index] = updatedSelectedOperator;
                    setOperators(updatedOperators);
                    setToastMessage("Se ha agregado el " + messageElement + " con exito");
                }}
                editContent={async data => {
                    setToastMessage("Se ha editado el " + messageElement + " con exito");
                }}
            />
            <select
                onChange={event => setSelectedOperator(operators.find(operator => operator._id === event.target.value))}
                value={selectedOperator ? selectedOperator._id : ""}
            >
                <option value=""> Seleccionar </option>
                {operators.map(operator => (
                    <option value={operator._id} >
                        {operator.name}
                    </option>
                ))}
            </select>
            <ul>
                {selectedOperator &&
                    selectedOperator.catalogs.map(catalog => (
                        <li>
                            <a target="_blank" href={catalog.catalog}> {catalog.title} </a>
                        </li>
                    ))
                }
            </ul>
            <Button
                disabled= {!selectedOperator}
                type="Success"
                clicked={() => setShowModal(true)} >
                Agregar catálogo
            </Button>
        </div>
    )
}


