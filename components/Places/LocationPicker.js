import { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';

import OutlinedButton from "../ui/OutlinedButton";
import { Colors } from "../../const/colors";
import { getMapPreview } from "../../util/location";

function LocationPicker({ onLocation }) {
    //State
    const [locationPermissionsInformation, requestPermission] = useForegroundPermissions();
    const [mapLocation, setMapLocation] = useState();

    //Navigation
    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();

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
        if (hasPermission) {
            const location = await getCurrentPositionAsync();
            setMapLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
            onLocation(mapLocation);
        }
    };

    function useMapHandler() {
        navigation.navigate('Map');
    };

    // Get map image from map screen
    useEffect(() => {
        if (isFocused && route.params) {
            setMapLocation({
                lat: route.params.pickedLat,
                lng: route.params.pickedLng
            });
            onLocation(mapLocation);
        }
    }, [route, isFocused]);

    //

    return <View>
        <View style={s.mapPreview}>
            {mapLocation ? <Image style={s.image} source={{ uri: getMapPreview(mapLocation.lat, mapLocation.lng) }} /> : <Text>No location set yet!</Text>}
        </View>
        <View style={s.buttonsContainer}>
            <OutlinedButton icon="location" onPress={getLocationHandler}>Locate User</OutlinedButton>
            <OutlinedButton icon="map" onPress={useMapHandler}>Find on Map</OutlinedButton>
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
    },
    image: {
        width: '100%',
        height: '100%',
    }
});