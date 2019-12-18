import React from 'react';
import Input from './Input/Input';
import { checkValidity, updateObject } from '../../../utils/helpers';
import Button from '../Button/Button';

/**
 * @param {Object} props.data.eleemnts An object which contains every element to build the form
 * @param {Boolean} props.data.validForm A boolean which represents the validty of the whole data
 * @param {Object} props.data.elements.input An object which coatains all the data of each eleemnt.
 * @param {String} props.data.elements.input.inputType. The type of the input.
 * @param {Object} props.data.elements.input.inputconfig An object which contains the input tag configuration.
 * @param {Object} props.data.elements.input.validationRules If the field should be validated.
 * @param {String} props.data.elements.input.value The current value of the input filed.
 * @param {Boolean} props.data.elements.input.valid The validity of the field.
 * @param {Boolean} props.data.elements.input.touched If the inut was touched
 * @param {Function} props.setData The function to update the data.
 * @param  {Function} props.SubmitAction A callback which is executed when the form is submited.
 */
const Form = props => {

    const handleChange = (event, id) => {
        const value = event.target.files ? event.target.files[0] : event.target.value;
        const updateData = {
            value,
            files: event.target.files,
            touched: true,
            valid: event.target.files ? true : checkValidity(value, props.data.elements[id].validation)
        };
        const updatedElement = updateObject(props.data.elements[id], updateData);
        const updatedData = updateObject(props.data.elements, { [id]: updatedElement });
        let formIsValid = true;
        for (let inputIdentifier in updatedData) formIsValid = updatedData[inputIdentifier].valid && formIsValid;
        const updatedProps = {
            elements: { ...updatedData },
            validForm: formIsValid
        }
        props.setData(updatedProps);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let formData = null;
        if (props.formData) {
            formData = new FormData();
            for (let formElementIdentifier in props.data.elements) {
                formData.append(formElementIdentifier, props.data.elements[formElementIdentifier].value);
            }
        } else {
            formData = {};
            for (let formElementIdentifier in props.data.elements) {
                formData[formElementIdentifier] = props.data.elements[formElementIdentifier].value;
            }
        }
        props.submitAction(formData);
    }

    const formElementsArray = [];
    for (let key in props.data.elements) {
        formElementsArray.push({
            id: key,
            config: props.data.elements[key]
        });
    }

    const form = <form onSubmit={handleSubmit}>
        {formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                label={formElement.config.label}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => handleChange(event, formElement.id)} />
        ))}
        <div style={props.cancelHandler ?
            {
                display: 'flex',
                justifyContent: 'space-between'
            } : {
                display: 'flex',
                justifyContent: 'center'
            }}>
            {props.cancelHandler ? <Button type="Danger" clicked={props.cancelHandler}>  Cancelar </Button> : null}
            <Button type="submit" disabled={!props.data.validForm}> Enviar </Button>
        </div>
    </form>

    return form;
};

export default Form;