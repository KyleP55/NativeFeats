import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";

import { deletePlace, fetchOnePlace } from "../util/database";
import AppLoading from "expo-app-loading";
import LocationPicker from "../components/Places/LocationPicker";
import OutlinedButton from "../components/ui/OutlinedButton";
import { Colors } from "../const/colors";
import Button from "../components/ui/Button";


function PlaceDetails({ route, navigation }) {
    const isFocus = useIsFocused();

    const [loading, setLoading] = useState(true);
    const [place, setPlace] = useState();

    // Get info for place
    useEffect(() => {
        const placeID = route.params.id;
        async function getData() {
            const data = await fetchOnePlace(placeID);

            if (data !== undefined) {
                navigation.setOptions({ title: data.title });
            }

            setPlace(data)
            setLoading(false);
        }

        getData();
    }, []);

    // loading screen
    if (loading) return <AppLoading />

    // Show on map
    function showOnMapHandler(lat, lng) {
        navigation.navigate("Map", { lat: lat, lng: lng });
    }

    // Delete Handler
    async function deleteHandler(id) {
        setLoading(true);
        await deletePlace(id);
        navigation.navigate("AllPlaces");
    }

    // JSX
    return <ScrollView >
        <Image style={s.image} source={{ uri: place.imageUri }} />
        <View style={s.locationContainer}>
            <View style={s.addressContainer}>
                <Text style={s.address}>{place.location.address}</Text>
            </View>
            <OutlinedButton icon="map" onPress={showOnMapHandler}>View on Map</OutlinedButton>
        </View>
        <Button onPress={deleteHandler.bind(this, place.id)}>Delete Place</Button>

    </ScrollView>
}

export default PlaceDetails;

const s = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%'
    },
    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressContainer: {
        padding: 20,
    },
    address: {
        color: Colors.primary500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    }
});