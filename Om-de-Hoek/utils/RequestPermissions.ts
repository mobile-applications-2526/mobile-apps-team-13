import {Camera} from 'expo-camera';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    return status === 'granted';
}

const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
}

const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if( status === 'granted'){
        const tokenData = await Notifications.getExpoPushTokenAsync();
        return { granted: true, token: tokenData.data };
    }
}

export {
    requestCameraPermission,
    requestLocationPermission,
    requestNotificationPermission
};