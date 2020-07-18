import React from 'react';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './Client.module.css';

const client = (props) => {
    let clientFormArray = [];
        for (let key in props.reduxState.clientForm) {
            clientFormArray.push({
                id: key,
                config: props.reduxState.clientForm[key]
            })
        }

        let form = <Spinner />

        if (props.reduxState.clients.length !== 0) {
            form = (
                <>
                    <form>
                        {clientFormArray.map(formElement => (
                            <div key={formElement.id} className={classes.InputElement}>
                                <Input
                                    key={formElement.id}
                                    elementType={formElement.config.elementType}
                                    elementConfig={formElement.config.elementConfig}

                                    value={formElement.config}
                                    invalid={!formElement.config.valid}
                                    shouldValidate={formElement.config.validation}
                                    touched={formElement.config.touched}
                                    changed={(event) => this.companyInputChangedHandler(event, formElement.id)}
                                    // valueType={this.props.clientForm.company.elementConfig.placeholder}
                                />
                            </div>
                        ))}
                    </form>

                </>
        )}
        return (
            <div className = {classes.ClientData}>
                <h2>Select a Client</h2>
                {form}
            </div>
        )
}

export default client;