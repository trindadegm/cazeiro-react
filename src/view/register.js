import React from 'react';
import { TextField, Button } from '../widgets/input.js';
import Nf from '../data/nf.js';

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

    register(_event) {
        const productName = this.state.productName;
        const ammount = this.state.ammount;
        const value = this.state.value;
        console.debug('Registering with: ' + productName + ', ' + ammount + ', ' + value);
        this.setState((state, _props) => {
            return {
                entries: state.entries.concat({
                    productName: productName,
                    ammount: Number.parseFloat(ammount),
                    unit: 'units',
                    value: value,
                    unitValue: (value.replace(',', '.')/ammount.replace(',', '.')).toFixed(2).replace('.', ','),
                }),
            };
        });
    }

    async submitNf() {
        console.debug('Submitting...');
        const nf = new Nf(null, 'BRL');
        nf.entries = this.state.entries;
        nf.value = nf.entries
            .map(e => Number.parseFloat(e.value.replace(',', '.')))
            .reduce((prev, curr, _i, _a) => prev + curr)
            .toFixed(2).replace('.', ',');
        try {
            const r = await nf.save();
            console.debug('Result: ' + JSON.stringify(r));
        } catch (e) {
            console.dir(e);
        }
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
                    <thead>
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
                    </thead>
                    <tbody>
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
                    </tbody>
                </table>
                <div>
                    <Button
                        text="Finalizar"
                        onClick={ async (_event) => await this.submitNf() }
                    />
                </div>
            </div>
        );
    }
}

