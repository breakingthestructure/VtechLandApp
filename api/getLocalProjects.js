import { AsyncStorage } from 'react-native';

const getLocalProjects = async () => {
    try {
        const value = await AsyncStorage.getItem('@projects');
        if (value !== null) {
            return JSON.parse(value);
        }
        return '';
    } catch (error) {
    // Error retrieving data
        return '';
    }
};

export default getLocalProjects;
