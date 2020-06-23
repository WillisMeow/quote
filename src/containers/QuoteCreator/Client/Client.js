import React, { Component } from 'react';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

class Client extends Component {
    state = {
        clientForm: {
            /* company: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Company Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }, */
            company: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'summerset karaka', displayValue: "SummerSet Karaka"},
                        {value: 'summerset manukau', displayValue: "Summerset Manukau"},
                        {value: 'summerset ellerslie', displayValue: "Summerset Ellerslie"},
                        {value: 'summerset henderson', displayValue: "Summerset Henderson"},
                    ]
                },
                value: 'summerset karaka',
                validation: {},
                valid: true
            },
            companyAddress: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Company Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            contactName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Contact Person'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            contactPhoneNumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Contact Phone Number'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            contactEmailAddress: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Contact Email Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
        }
    }

    render () {
        let clientFormArray = [];
        for (let key in this.state.clientForm) {
            clientFormArray.push({
                id: key,
                config: this.state.clientForm[key]
            })
        }
        let form = (
            <form>
                {clientFormArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                     />
                ))}
                <Button>
                    <p>CREATE QUOTE</p>
                </Button>
                <Button>
                    <p>ADD NEW COMPANY</p>
                </Button>
            </form>
        )
        return (
            <div>
                <p>Display Input Fields for Client Details</p>
                    {form}
            </div>
        );
    }
};

export default Client;