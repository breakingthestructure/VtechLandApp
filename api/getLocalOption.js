import { AsyncStorage } from 'react-native';

const getLocalOption = async () => {
    try {
        const value = await AsyncStorage.getItem('@optionProjects');
        if (value !== null) {
            return JSON.parse(value);
        }
        return '';
    } catch (error) {
        // Error retrieving data
        return '';
    }
};

export default getLocalOption;
