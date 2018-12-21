import { AsyncStorage } from 'react-native';

const saveProject = async (projects) => {
    try {
        await AsyncStorage.setItem('@projects', JSON.stringify(projects));
        return 'SUCCESS';
    } catch (e) {
        return e;
    }
};

export default saveProject;
