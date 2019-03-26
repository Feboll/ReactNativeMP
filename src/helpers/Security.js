import * as Keychain from 'react-native-keychain';

class Security {
    saveCredential = async (username, password) => {
        await Keychain.setGenericPassword(username, password);
    };

    getToken = async () => {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) return credentials.password;
    };
}

export default new Security();
