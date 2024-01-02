import { useState } from "react";
import { Text, View, StyleSheet, ScrollView, TextInput } from "react-native";

import { Colors } from "../../const/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../ui/Button";

function PlaceForm() {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState();
    const [location, setLocation] = useState();

    // Handlers for components
    function changeTitleHandler(txt) {
        setTitle(txt);
    }

    function imageHandler(uri) {
        setImage(uri);
    }

    function locationHandler(location) {
        setLocation(location);
    }

    function savePlaceHandler() { }

    return (
        <ScrollView style={s.container}>
            <View>
                <Text style={s.text}>Title</Text>
                <TextInput onChange={changeTitleHandler} value={title} style={s.input} />
            </View>
            <ImagePicker onImage={imageHandler} />
            <LocationPicker onLocation={locationHandler} />
            <Button onPress={savePlaceHandler}>Add Place</Button>
        </ScrollView>
    );
}

export default PlaceForm;

const s = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary200,
    },
    input: {
        fontSize: 16,
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100,
    }
});