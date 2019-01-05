import { AsyncStorage } from 'react-native';

const saveOptionProject = async (options) => {
    try {
        await AsyncStorage.setItem('@optionProjects', JSON.stringify(options));
        return 'SUCCESS';
    } catch (e) {
        return e;
    }
};

export default saveOptionProject;
