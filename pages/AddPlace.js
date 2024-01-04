import { Text, View, StyleSheet } from "react-native";
import PlaceForm from "../components/Places/PlaceForm";

function AddPlace({ navigation }) {

    function createPlaceHandler(data) {
        navigation.navigate('AllPlaces', { place: data })
    }

    return <PlaceForm onCreate={createPlaceHandler} />
}

export default AddPlace;