import { updateObject } from '../utils/helpers';
import React from 'react';

/**
 * 
 * @param {String} type The type of destinaation Simple for an unique destination and groupal for multiple destinations
 * @param {Object} data 
 */
export const addDestinationForm = (type, data) => {
    const elements = {
        title: data ? data.title || '' : '',
        description: data ? data.description || '' : '',
        popular: data ? data.popular || false : false,
        image: data ? data.image || '' : '',
        pdf: data ? data.pdf || '' : '',
        gallery: data ? data.gallery || [] : [],
        type
    }
    if (type === 'Grupal') {
        return updateObject(elements, {
            duration: data ? data.duration || 0 : 0,
            departureDate: data ? data.departureDate.substring(0,10) || new Date().toISOString.substring(0,10) : new Date().toISOString().substring(0,10),
            airport: data ? data.airport || '' : '',
            food: data ? data.food || 'desayuno' : 'desayuno',
            price: data ? data.price || 0 : 0,
        })
    }else if ( type ==='Simple'){
        return updateObject(elements, {
            continent: data ? data.continent || '' : '',
            region: data ? data.region || '' : '',
            country: data ? data.country || '' : '',
        })
    }
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
        repeatPassword: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Repita la contraseña'
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
        }
    },
    validform: false
};


export const emailChangeForm = {
    elements: {
        newEmail: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Nuevo correo electrónico'
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
        newUsername: {
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
        }
    },
    validform: false
};


export const addService = data => ({
    elements: {
        title: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Título'
            },
            value: data ? data.title || '' : '',
            validation: {
                required: true
            },
            valid: data ? true : false,
            touched: false
        },
        description: {
            elementType: 'textarea',
            elementConfig: {
                type: 'password',
                placeholder: 'Descripción'
            },
            value: data ? data.description || '' : '',
            validation: {
                required: true
            },
            valid: data ? true : false,
            touched: false
        },
        image: {
            elementType: 'input',
            elementConfig: {
                id: 'serviceImage',
                type: 'file'
            },
            value: undefined,
            label: <> <i className="far fa-image"></i> Imagen principal </> ,
            validation: {
                required: true
            },
            valid: data ? true : false,
            touched: false
        }
    },
    validform: false
});

export const addBanner = data => ({
    elements: {
        title: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Título'
            },
            value: data ? data.title || '' : '',
            validation: {
                required: true
            },
            valid: data ? true : false,
            touched: false
        },
        image: {
            elementType: 'input',
            elementConfig: {
                id: 'bannerImage',
                type: 'file'
            },
            value: undefined,
            validation: {
                required: true
            },
            label: <> <i className="far fa-image"></i> Imagen principal </> ,
            valid: data ? true : false,
            touched: false
        }
    },
    validform: false
});


export const addOperator = data => ({
    elements: {
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Nombre del oeprador'
            },
            value: data ? data.name || '' : '',
            validation: {
                required: true
            },
            valid: data ? true : false,
            touched: false
        },
        image: {
            elementType: 'input',
            elementConfig: {
                id: 'operatorImage',
                type: 'file'
            },
            value: undefined,
            validation: {
                required: true
            },
            label: <> <i className="far fa-image"></i> Imagen principal </> ,
            valid: data ? true : false,
            touched: false
        }
    },
    validform: false
});

export const addCatalog = data => ({
    elements: {
        title: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Título del catálogo'
            },
            value: data ? data.title || '' : '',
            validation: {
                required: true
            },
            valid: data ? true : false,
            touched: false
        },
        catalog: {
            elementType: 'input',
            elementConfig: {
                id: 'catalogFile',
                type: 'file'
            },
            value: undefined,
            validation: {
                required: true
            },
            label: <> <i className="far fa-image"></i> Catálogo </> ,
            valid: data ? true : false,
            touched: false
        }
    },
    validform: false
});