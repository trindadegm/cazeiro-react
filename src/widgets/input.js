import React from 'react';

export class TextField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value ?? '',
        };
    }

    handleInput(event) {
        const newValue = event.target.value;
        // console.log('Value: ' + newValue);
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
            this.setState({ value: newValue });
            if (this.props.onChange) {
                this.props.onChange(newValue);
            }
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
        return (
            <button
                disabled={ this.props.disabled }
                onClick={(event) => {
                    if (this.props.onClick) {
                        this.props.onClick(event);
                    }
                }}
            >
                {this.props.text}
            </button>
        );
    }
}