import { Text, View, StyleSheet } from "react-native";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';

import OutlinedButton from "../ui/OutlinedButton";
import { Colors } from "../../const/colors";

function LocationPicker() {
    const [locationPermissionsInformation, requestPermission] = useForegroundPermissions();

    // Check/Get Location Permissions
    async function locationPermissions() {
        // Check if any permissions have been giving
        if (locationPermissionsInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        // If denied
        if (locationPermissionsInformation.status === PermissionStatus.DENIED) {
            Alert.alert("Insufficient Permissions!", "App needs location permission to work!");
            return false;
        }

        return true;
    }

    // Button Handlers
    async function getLocationHandler() {
        const hasPermission = await locationPermissions();
        const location = await getCurrentPositionAsync();
        console.log(location);
    };

    function useMapHandler() { };


    return <View>
        <View style={s.mapPreview}></View>
        <View style={s.buttonsContainer}>
            <OutlinedButton icon="location" onPress={getLocationHandler}>Locate User</OutlinedButton>
            <OutlinedButton icon="map" onPress={useMapHandler}>Find On Map</OutlinedButton>
        </View>
    </View>
}

export default LocationPicker;

const s = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
});