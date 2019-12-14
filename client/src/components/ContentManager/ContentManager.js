import React from 'react';
import { Carousel } from 'react-responsive-carousel';

import Button from '../UI/Button/Button';
import AddButton from '../UI/Button/EncapsulatedButtons/addButton';

const contentManager = props => {

    return (
        <div className="mb-4">
            <Carousel>
                {props.data.map(element => (
                    <div key={element.id}>
                        <img src={element.image} alt={element.title} />
                        <div className="legend">
                            <div className="d-flex align-items-center justify-content-between">
                                <Button type="Icon">
                                    <i className="fas fa-edit"></i>
                                </Button>
                                <h5> {element.title} </h5>
                                <Button type="Icon">
                                    <i class="fas fa-trash-alt"></i>
                                </Button>
                            </div>
                            <p>{element.description}</p>
                        </div>
                    </div>
                ))}
            </Carousel>
            <div style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'flex-end',
                position: 'relative',
                marginTop: '-105px',
                zIndex: '1'
            }}>
                <p>
                    {'Agregar ' + props.buttonText}
                </p>
                <AddButton />
            </div>
        </div>
    )
}

export default contentManager;