import React, { Component } from 'react';
import { Text } from 'react-native';
import Button from 'src/components/Button';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import PropTypes from 'prop-types';

class ConfirmDialog extends Component {
    state = {
        visible: false,
    };

    propTypes = {
        visible: PropTypes.bool.isRequired,
        message: PropTypes.string.isRequired,
        onConfirm: PropTypes.func.isRequired,
    };

    componentWillReceiveProps(nextProps) {
        const { visible } = nextProps;
        const { visible: current_visible } = this.props;

        // only update state if the corrosponding props haven't changed
        if (current_visible !== visible) {
            this.setState({ visible });
        }
    }

    confirm() {
        const { onConfirm } = this.props;

        // call user defined on confirm
        onConfirm();

        // hide dialog
        this.close();
    }

    close() {
        this.setState({ visible: false });
    }

    render() {
        const { message } = this.props;
        const { visible } = this.state;

        return (
            <Dialog width="70%" visible={visible} onTouchOutside={() => this.close()}>
                <DialogContent>
                    <Text>{message}</Text>
                    <Button
                        title="Confirm"
                        onPress={() => {
                            this.confirm();
                        }}
                    />
                    <Button title="Cancel" onPress={() => this.close()} />
                </DialogContent>
            </Dialog>
        );
    }
}

export default ConfirmDialog;
