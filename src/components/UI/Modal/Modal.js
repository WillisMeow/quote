import React, { Component } from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.show !== this.props.show || nextProps.children !== this.props.children) { //comparing previous state to current state. if different, return true (Also checking if the children of the Modal has changed or not. without the second part of the || statement, it would not update when the children are updated, but the modal itself isnt)
            return true;
        }
    };

    render () {
        return (
            <>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>  
                    <div 
                        className={classes.Modal}
                        style={{
                            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)', // translateY(-100vh) moves it above, and beyond viewport
                            opacity: this.props.show ? '1' : '0'
                            }}
                    >
                        {this.props.children}
                    </div>
            </>
        )
    }
}

export default Modal;