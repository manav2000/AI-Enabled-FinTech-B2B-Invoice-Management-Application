import React from 'react';
import FormModel from '../FormModel';

const buttonHOC = (WrappedComponent) => {
    class ButtonHOC extends React.PureComponent {
        constructor(props) {
            super(props)

            this.state = {
                open: false,
                modelMode: null
            }
        }

        handleOpen = () => {
            this.setState({
                open: !this.state.open,
                mode: this.props.modelMode
            })
        };
    
        handleClose = () => {
            this.setState({
                ...this.state,
                open: !this.state.open
            })
        };

        render() {
            return(
                <>
                    <WrappedComponent 
                        handleOpen={this.handleOpen}
                        handleClose={this.handleClose}
                        {...this.props}
                    />
                    {this.state.open
                        ? <FormModel 
                            open={this.state.open} 
                            handleClose={this.handleClose} 
                            mode={this.state.mode}
                        />
                        : <></>
                    }
                </>
            )
        }
    }
    return ButtonHOC
}


export default buttonHOC;