import { FlatList, View, Text, StyleSheet } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../const/colors";


function PlacesList({ places }) {
    if (!places || places.length === 0) {
        return <View style={s.container}>
            <Text style={s.title}>No places found!</Text>
            <Text style={s.text}>Start adding some!</Text>
        </View>
    }
    return (
        <FlatList
            data={places}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => { <PlaceItem place={item} /> }}
        />
    );
}

export default PlacesList;

const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        color: Colors.primary200,
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
        color: Colors.primary200,
    },
});