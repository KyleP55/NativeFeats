import { useState } from "react";
import { Text, View, StyleSheet, ScrollView, TextInput } from "react-native";

import { Colors } from "../../const/colors";
import ImagePicker from "./ImagePicker";

function PlaceForm() {
    const [title, setTitle] = useState('');

    function changeTitleHandler(txt) {
        setTitle(txt);
    }

    return (
        <ScrollView style={s.container}>
            <View>
                <Text style={s.text}>Title</Text>
                <TextInput onChange={changeTitleHandler} value={title} style={s.input} />
            </View>
            <ImagePicker />
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