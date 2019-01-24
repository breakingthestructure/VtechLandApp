import { PropTypes } from 'prop-types';
import React, { PureComponent } from 'react';
import {
    FlatList,
    TextInput,
    View
} from 'react-native';
import { Icon } from 'native-base';
import AutocompleteOption from './AutocompleteOption';
import Header from '../../screens/Home/Header';
import { dataNotFound } from '../../../Helpers';

class AutocompleteView extends PureComponent {
    render() {
        const {
            onBlur,
            onChangeText,
            onOptionPress,
            options,
            optionsListHeight,
            value,
        } = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Header back={'MapScreen'} navigation={this.props.navigation} />
                <View
                    style={{
                        height: 40,
                        borderRadius: 20,
                        marginHorizontal: 20,
                        marginTop: 20,
                        marginBottom: 10,
                        backgroundColor: '#cecece',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}
                >
                    <TextInput
                        autoFocus
                        onBlur={onBlur}
                        onChangeText={onChangeText}
                        style={{
                            height: 40,
                            marginLeft: 20,
                            width: '80%'
                        }}
                        value={value}
                    />
                    <Icon
                        active
                        name='ios-search'
                        style={{
                            color: 'orange',
                            paddingRight: 20,
                            fontSize: 22,
                            marginTop: 5
                        }}
                    />
                </View>
                <View
                    style={{
                        height: optionsListHeight,
                        marginHorizontal: 20,
                        borderTopWidth: 1,
                        borderColor: '#cecece'
                    }}
                >
                    <FlatList
                        data={options}
                        ListEmptyComponent={() => {
                            return dataNotFound();
                        }}
                        keyboardShouldPersistTaps="always"
                        renderItem={({ item }) => (
                            <AutocompleteOption
                                onOptionPress={onOptionPress}
                                option={item}
                            />
                        )}
                        style={{ flex: 1 }}
                    />
                </View>
            </View>
        );
    }
}

AutocompleteView.propTypes = {
    onBlur: PropTypes.func.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onOptionPress: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
    })).isRequired,
    optionsListHeight: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
};

export default AutocompleteView;
