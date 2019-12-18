export const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
}

export const parseFormEvent = event => {
    switch (event.target.type) {
        case 'checkbox': return event.target.checked;
        case 'file': return event.target.files[0];
        default: return event.target.value;
    }
}

export const initContinents = (regionsData, toUpdateObject = {}) => {
    return updateObject(toUpdateObject, {
        continent: regionsData[0].name,
        region: regionsData[0].regions ? regionsData[0].regions[0].name : '',
        country: regionsData[0].countries ? regionsData[0].countries[0] : regionsData[0].regions[0].countries[0]
    })
};