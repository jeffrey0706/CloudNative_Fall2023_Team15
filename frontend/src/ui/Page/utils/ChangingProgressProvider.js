import React from "react";

class ChangingProgressProvider extends React.Component {
    static defaultProps = {
        interval: 1000
    };

    state = {
        valuesIndex: 0
    };

    componentDidMount() {
        setInterval(() => {
            if (this.state.valuesIndex === this.props.values.length - 1) {
                return;
            }
            this.setState({
                valuesIndex: (this.state.valuesIndex + 1) //  % this.props.values.length
            });
        }, this.props.interval);
    }

    render() {
        return this.props.children(this.props.values[this.state.valuesIndex]);
    }
}

export default ChangingProgressProvider;
