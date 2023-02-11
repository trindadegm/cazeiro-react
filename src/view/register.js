import React from 'react';
import { TextField, Button } from '../widgets/input.js';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: '',
            ammount: '1',
            value: '',
            registerEnabled: false,
            entries: [],
        };
    }

    register(event) {
        const productName = this.state.productName;
        const ammount = this.state.ammount;
        const value = this.state.value;
        console.debug('Registering with: ' + productName + ', ' + ammount + ', ' + value);
        this.setState((state, _props) => {
            return {
                entries: state.entries.concat({
                    productName: productName,
                    ammount: ammount,
                    value: value,
                }),
            };
        });
    }

    validateStateUpdate(stateUpdate) {
        this.setState((prevState, _props) => {
            const statePreview = { ...prevState, ...stateUpdate };
            stateUpdate.registerEnabled = (
                statePreview.productName !== '' &&
                statePreview.ammount !== '' &&
                statePreview.value !== ''
            );
            return stateUpdate;
        });
    }

    removeEntry(index) {
        this.setState((state, _props) => {
            return {
                entries:
                    state.entries.slice(0, index).concat(
                        state.entries.slice(index + 1, state.entries.length)
                    ),
            };
        });
    }

    render() {
        let entries = this.state.entries;

        return (
            <div>
                <table>
                    <tr>
                        <th>
                            <TextField
                                name="product_name"
                                hint="Nome do produto"
                                onChange={ (productName) => this.validateStateUpdate({ productName: productName }) }
                            />
                        </th>
                        <th>
                            <TextField
                                name="ammount"
                                hint="Quantidade"
                                type="uint"
                                value={ this.state.ammount }
                                onChange={ (ammount) => this.validateStateUpdate({ ammount: ammount }) }
                            />
                        </th>
                        <th>
                            <TextField
                                name="value"
                                hint="0,00"
                                type="money"
                                onChange={ (value) => this.validateStateUpdate({ value: value }) }
                            />
                        </th>
                        <th>
                            <Button
                                text="Adicionar"
                                disabled={ !this.state.registerEnabled }
                                onClick={ (event) => this.register(event) }
                            />
                        </th>
                    </tr>
                    {entries.map((entry, i) => <tr key={i}>
                        <th>{entry.productName}</th>
                        <th>{entry.ammount}</th>
                        <th>{entry.value}</th>
                        <th>
                            <Button
                                text="Remover"
                                onClick={ (_event) => this.removeEntry(i) }
                            />
                        </th>
                    </tr>)}
                </table>
                <div>
                    <Button
                        text="Finalizar"
                    />
                </div>
            </div>
        );
    }
}

