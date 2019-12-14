import React from 'react';

import Button from '../Button';

const addButton = props => (
    <Button  width= "60px" height= "60px" type="Icon" form="circle" clicked={props.clicked}>
        <i style={{fontSize:'26px'}} className="fas fa-plus"></i>
    </Button>
);

export default addButton;