import { AsyncStorage } from 'react-native';

const getUser = async () => {
    try {
        const value = await AsyncStorage.getItem('@user');
        if (value !== null) {
            return JSON.parse(value);
        }
        return '';
    } catch (error) {
    // Error retrieving data
        return '';
    }
};

export default getUser;
