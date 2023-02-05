import React from 'react';
import { TextField, Button } from '../widgets/input';

export default class Register extends React.Component {
    render() {
        return (
            <div>
                <TextField name="product_name" hint="Nome do produto" />
                <TextField name="units" hint="Quantidade" type="uint"/>
                <TextField name="value" hint="0,00" type="money" />
                <Button text="Cadastrar" />
            </div>
        );
    }
}

