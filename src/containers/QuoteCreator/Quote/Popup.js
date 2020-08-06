import React from 'react';

import Modal from '../../../components/UI/Modal/Modal';
import Button from '../../../components/UI/Button/Button';

const popUp = (props) => {
    let modalOpen = props.modalOpen;
    let modalState = props.modalState;

    let modal = null;
        if (modalOpen && modalState === 'saveEdit') {
            modal = (
                <Modal show={modalState} modalClosed={props.cancel} >
                
                <p>Are you sure you want to Save Changes?</p>
                <Button clicked={() => props.buttonClicked('saveEdit', props.quoteData, props.editingKey)}>Yes</Button>
                <Button clicked={props.cancel}>No</Button>
                </Modal>
            )
        }
        if (modalOpen && modalState === 'delete') {
            modal = (
                <Modal show={modalState} modalClosed={props.cancel} >
                <p>Are you sure you want to Delete Job?</p>
                <Button clicked={() => props.buttonClicked('delete', props.quoteData, props.editingKey)}>Yes</Button>
                <Button clicked={props.cancel}>No</Button>
                </Modal>
            )
        }
        if (modalOpen && modalState === 'pdf') {
            modal = (
                <Modal show={modalState} modalClosed={props.cancel} >
                <p>What PDF File would you like to create?</p>
                <Button clicked={() => props.buttonClicked('quote', props.quoteData, props.editingKey)}>Quote</Button>
                <Button clicked={() => props.buttonClicked('invoice', props.quoteData, props.editingKey)}>Invoice</Button>
                </Modal>
            )
        }
    return (modal)

}

export default popUp