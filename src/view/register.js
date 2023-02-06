import React from 'react';
import { TextField, Button } from '../widgets/input.js';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: '',
            units: '1',
            value: '',
            registerEnabled: false,
        };
    }

    register(event) {
        const productName = this.state.productName;
        const units = this.state.units;
        const value = this.state.value;
        console.debug('Registering with: ' + productName + ', ' + units + ', ' + value);
    }

    validateStateUpdate(stateUpdate) {
        this.setState((prevState, _props) => {
            const statePreview = { ...prevState, ...stateUpdate };
            stateUpdate.registerEnabled = (
                statePreview.productName !== '' &&
                statePreview.units !== '' &&
                statePreview.value !== ''
            );
            return stateUpdate;
        });
    }

    render() {
        return (
            <div>
                <TextField
                    name="product_name"
                    hint="Nome do produto"
                    onChange={ (productName) => this.validateStateUpdate({ productName: productName }) }
                />
                <TextField
                    name="units"
                    hint="Quantidade"
                    type="uint"
                    value={ this.state.units }
                    onChange={ (units) => this.validateStateUpdate({ units: units }) }
                />
                <TextField
                    name="value"
                    hint="0,00"
                    type="money"
                    onChange={ (value) => this.validateStateUpdate({ value: value }) }
                />
                <Button
                    text="Cadastrar"
                    disabled={ !this.state.registerEnabled }
                    onClick={ (event) => this.register(event) }
                />
            </div>
        );
    }
}

