import MapView, { Marker } from "react-native-maps";
import { Alert, StyleSheet } from "react-native";
import { useCallback, useLayoutEffect, useState } from "react";
import IconButton from "../components/ui/IconButton";

function Map({ route, navigation }) {
    const [location, setLocation] = useState();
    const [latlng, setLatlng] = useState();

    // Setting header options
    useLayoutEffect(() => {
        // Check if static map view or map picker view
        if (route.params && !latlng) {
            setLatlng({ lat: route.params.lat, lng: route.params.lng });
        } else {
            navigation.setOptions({
                headerRight: ({ tintColor }) => <IconButton icon="save" size={24} color={tintColor} onPress={saveLocationHandler} />
            });
        }
    }, [navigation, selectLocationHandler]);


    const region = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };

    // map pressed handler
    function selectLocationHandler(event) {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;

        setLocation({
            lat: lat,
            lng: lng
        });
    }

    // Save Location
    const saveLocationHandler = useCallback(() => {
        if (!location) {
            Alert.alert("No Location Selected!", "Please tap the map to select a location.");
            return;
        }

        navigation.navigate('AddPlace', { pickedLat: location.lat, pickedLng: location.lng });
    }, [navigation, selectLocationHandler]);

    // JSX
    return <MapView initialRegion={region} style={s.map} onPress={selectLocationHandler}>
        {location && <Marker title={"Selected"} coordinate={{ latitude: location.lat, longitude: location.lng }} />}
    </MapView>
}

export default Map;

const s = StyleSheet.create({
    map: {
        flex: 1,
    }
});