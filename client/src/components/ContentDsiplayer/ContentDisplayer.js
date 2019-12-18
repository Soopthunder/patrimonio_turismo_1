import React from 'react';
import { Carousel } from 'react-responsive-carousel';

import Button from '../UI/Button/Button';
import AddButton from '../UI/Button/EncapsulatedButtons/addButton';

const contentManager = ({ data, clicked, editContent, deleteContent }) => {
    return (
        <div className="mb-4">
            <div style={{ minHeight: '120px' }}>
                <Carousel showThumbs={false}>
                    {data.map(element => (
                        <div key={element._id}>
                            <img src={element.imageUrl} alt={element.title} />
                            <div className="legend">
                                <div className="d-flex align-items-center justify-content-between">
                                    <Button
                                        clicked={() => {
                                            editContent(element);
                                        }}
                                        type="Icon">
                                        <i className="fas fa-edit"></i>
                                    </Button>
                                    <h5> {element.title || element.name} </h5>
                                    <Button
                                        clicked={() => deleteContent(element._id)}
                                        type="Icon">
                                        <i class="fas fa-trash-alt"></i>
                                    </Button>
                                </div>
                                <p>{element.description}</p>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
            <div style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'flex-end',
                position: 'relative',
                marginTop: '20px',
                marginRight: '10px',
                zIndex: '1'
            }}>
                <AddButton clicked={clicked} />
            </div>
        </div>
    )
};


export default contentManager;