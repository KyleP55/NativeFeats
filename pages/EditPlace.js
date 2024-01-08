import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, ScrollView, TextInput } from "react-native";

import ImagePicker from "../components/Places/ImagePicker";
import LocationPicker from "../components/Places/LocationPicker";
import Button from "../components/ui/Button";
import { fetchOnePlace } from "../util/database";
import { Colors } from "../const/colors";

function EditPlace({ route, navigation }) {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState();
    const [location, setLocation] = useState();
    const [loading, setLoading] = useState(true);

    // Get current info
    useEffect(() => {
        const placeID = route.params.id;
        async function getData() {
            const data = await fetchOnePlace(placeID);

            setTitle(data.title);
            setImage(data.imageUri);
            setLocation(data.location)
            console.log(data.location)
            setLoading(false);
        }

        getData();
    }, []);

    // Update Handlers
    function imageHandler(uri) {
        if (uri) setImage(uri);
    }

    function locationHandler(location) {
        if (location) setLocation(location);
    }

    // Submit form
    function savePlaceHandler() {
        // Check all fields
        if (!title) {
            Alert.alert("Title empty!", "Please enter in a title.");
            return;
        }
        if (!image) {
            Alert.alert("No picture taken!", "Please add a picture.");
            return;
        }
        if (!location) {
            Alert.alert("No location!", "Please add a location.");
            return;
        }

        const placeData = new Place(title, image, location);
        onCreate(placeData)
    }

    if (loading) return <View style={s.container}><Text style={s.text}>Loading...</Text></View>

    return (
        <ScrollView style={s.container}>
            <View>
                <Text style={s.text}>Title</Text>
                <TextInput onChangeText={(e) => { setTitle(e) }} value={title} style={s.input} />
            </View>
            <ImagePicker onImage={imageHandler} oldImage={image} />
            <LocationPicker onLocation={locationHandler} oldLocation={{ lat: location.lat, lng: location.lng }} />
            <Button onPress={savePlaceHandler}>Add Place</Button>
        </ScrollView>
    );
}

export default EditPlace;

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