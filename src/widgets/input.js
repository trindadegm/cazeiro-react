import React from 'react';

export class TextField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
        };
    }

    handleInput(event) {
        const newValue = event.target.value;
        console.log('Value: ' + newValue);
        let pattern = null;
        switch (this.props.type ?? 'text') {
            case 'uint':
                pattern = /^([1-9][0-9]*|[0-9])$/;
                break;
            case 'money':
                pattern = /^([1-9][0-9]*|[0-9])(,[0-9]{0,2})?$/;
                break
            default:
                pattern = /.*/;
                break;
        }

        if (pattern.test(newValue) || newValue === '') {
            this.setState({ ...this.state, value: newValue });
        } else {
            this.setState({ ...this.state });
        }
    }

    render() {
        return (
            <input
                type="text"
                value={this.state.value}
                name={this.props.name}
                placeholder={this.props.hint}
                onInput={(event) => this.handleInput(event)}
            />
        );
    }
}

export class Button extends React.Component {
    render() {
        return <button>{this.props.text}</button>;
    }
}