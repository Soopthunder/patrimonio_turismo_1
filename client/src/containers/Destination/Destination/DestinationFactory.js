import React from 'react';
import SingleDestination from './SimpleDestination';
import GrouoDestination from './GroupDestination'

/**
 * @description Create a destination component.
 * @param {Object} data An javascript object which contains the information about the destination.
 * @param {String} data.type the type of the Destination. It could be group or simple.
 */
const Destinationfactory = (data, setAsSelected, openModal) => {
    switch (data.type) {
        case 'Simple': return <SingleDestination {...data} setAsSelected={() =>setAsSelected()} openModal={() => openModal()} />;
        case 'Grupal': return <GrouoDestination {...data} setAsSelected={() =>setAsSelected()} openModal={() => openModal()} />
        default: return;
    }
}

export default Destinationfactory;