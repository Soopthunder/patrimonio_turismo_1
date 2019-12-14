import { updateObject } from '../utils/helpers';

export const addSingleDestinationForm = (type, data) => {
    let elements = {
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Destino'
            },
            value: data ? data.name || '' : '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        image: {
            elementType: 'input',
            elementConfig: {
                type: 'file'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: data ? data.country || '' : '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        destinationType: {
            elementType: 'input',
            elementConfig: {
                type: 'hidden'
            },
            value: type,
            validation: {},
            valid: true
        },
    }
    if (type === 'Grupal') {
        elements = updateObject(elements, {
            duration: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Duración'
                },
                value: data ? data.duration || 0 : 0,
                validation: {
                    min: 0
                },
                valid: false,
                touched: false
            },
            date: {
                elementType: 'input',
                elementConfig: {
                    type: 'date',
                    placeholder: 'Fecha de salida'
                },
                value: data ? data.date || new Date().toString() : new Date().toString(),
                validation: {},
                valid: false,
                touched: false
            },
            airport: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Aeropuerto'
                },
                value: data ? data.airport || '' : '',
                validation: {},
                valid: false,
                touched: false
            },
            food: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'desayuno', displayValue: 'Desayuno' },
                        { value: 'almuerzo', displayValue: 'Almuerzo' },
                        { value: 'cena', displayValue: 'Cena' },
                        { value: 'all-inclusive', displayValue: 'All inclusive' }
                    ]
                },
                value: data ? data.food || 'desayuno' : 'desayuno',
                validation: {},
                valid: true,
            },
            price: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Price'
                },
                value: data ? data.price || 0 : 0,
                validation: {
                    min: 0
                },
                valid: false,
                touched: false
            }
        })
    }

    return { elements: elements, validform: false };
}


export const loginForm = () => ({
    elements: {
        username: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Nombre de usuario'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Contraseña'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }
    },
    validform: false
})


export const passwordChangeForm = {
    elements: {
        newPassword: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Nueva contraseña'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        oldPassword: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Contraseña anterior'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        repeatOldPassword: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Repita la contraseña anterior'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }
    },
    validform: false
};


export const emailChangeForm = {
    elements: {
        username: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Nombre de usuario'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Contraseña'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }
    },
    validform: false
};

export const usernameChangeForm = {
    elements: {
        username: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Nombre de usuario'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Contraseña'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }
    },
    validform: false
};
