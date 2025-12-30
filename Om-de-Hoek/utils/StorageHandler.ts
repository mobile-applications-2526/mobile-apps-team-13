import AsyncStorage from "@react-native-async-storage/async-storage";

const saveInStorage = async (key: string, value: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(key, value);
    }
    catch (error) {
        console.error(`Error saving data to storage with key ${key}:`, error);
    }
}

const getFromStorage = async (key: string, defaultValue: string = ''): Promise<string> => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value !== null ? value : defaultValue;
    }
    catch (error) {
        console.error(`Error retrieving data from storage with key ${key}:`, error);
        return defaultValue;
    }
}

const deleteFromStorage = async (key: string): Promise<void> => {
    try {
        await AsyncStorage.removeItem(key);
    }
    catch (error) {
        console.error(`Error deleting data from storage with key ${key}:`, error);
    }
}

export { saveInStorage, getFromStorage, deleteFromStorage };