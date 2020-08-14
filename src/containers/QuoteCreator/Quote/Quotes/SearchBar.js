import React from 'react';

import classes from './SearchBar.module.css'
import Input from '../../../../components/UI/Input/Input';

const searchBar = (props) => {
    let state = props.state;
    let formElementArray = [];
    for (let formElement in state.search) {
        formElementArray.push({
            id: formElement,
            config: state.search[formElement]
        })
    }

    let form = (
        <div>
            {formElementArray.map((formElement) => {
                return (
                    <Input
                        autoFocus={formElement.id === 'jobId' ? true : false} // to focus on jobId element when initially rendered
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value= {state.search.searchBar} // connected to different part of state 
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => props.onChange('searchFilter', event)}
                        // valueType={this.props.clientForm.company.elementConfig.placeholder}
                    />
                )
            })}
        </div>
    )
    return (
        <div>
            {form}
        </div>
    )

}

export default searchBar