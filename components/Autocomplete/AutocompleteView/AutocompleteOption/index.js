import { PropTypes } from 'prop-types';
import React, { PureComponent } from 'react';
import {
    Text,
    TouchableOpacity
} from 'react-native';

class AutocompleteOption extends PureComponent {
    handlePress = () => {
        const { onOptionPress, option: { key } } = this.props;
        onOptionPress(key);
    };

    render() {
        const { option: { key } } = this.props;
        return (
            <TouchableOpacity onPress={this.handlePress}>
                <Text
                    style={{
                        fontSize: 16,
                        padding: 10,
                    }}
                >
                    {key}
                </Text>
            </TouchableOpacity>
        );
    }
}

AutocompleteOption.propTypes = {
    onOptionPress: PropTypes.func.isRequired,
    option: PropTypes.shape({
        key: PropTypes.string.isRequired,
    }).isRequired,
};

export default AutocompleteOption;
