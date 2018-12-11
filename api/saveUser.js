import { AsyncStorage } from 'react-native';

const saveUser = async (user) => {
    try {
        await AsyncStorage.setItem('@user', JSON.stringify(user));
        return 'SUCCESS';
    } catch (e) {
        return e;
    }
};

export default saveUser;
