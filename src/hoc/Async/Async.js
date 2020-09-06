/* import React, {Component} from 'react';

const Async = (importedComponent) => {
    return class extends Component {
        state = {
            Component: null
        }

        componentDidMount() {
            importedComponent()
            .then(cmp => {
                this.setState({component: cmp.default})
            });
        }

        render () {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null;
        }
    }
}

export default Async; */