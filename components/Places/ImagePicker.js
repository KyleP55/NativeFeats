import { Alert, Text, Button, View, Image, StyleSheet } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { useState } from "react";
import { Colors } from "../../const/colors";
import OutlinedButton from "../ui/OutlinedButton";

function ImagePicker({ onImage }) {
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
    const [image, setImage] = useState();

    // Get Permissions
    async function verifyPermissions() {
        // Check if any permissions have been giving
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        // If denied
        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert("Insufficient Permissions!", "App needs camera permission to work!");
            return false;
        }

        return true;
    }

    // Open camera/Image Handler
    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) return;

        const imageTaken = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });

        if (imageTaken) {
            setImage(imageTaken.assets[0].uri);
            onImage(imageTaken.assets[0].uri);
            return;
        }

        Alert.alert("An Error has Accured", "Picture not taken, please try again.");
    }

    let imagePreview = <Text style={s.text}>No image taken yet</Text>
    if (image) {
        imagePreview = <Image source={{ uri: image }} style={s.image} />
    }

    return <View>
        <View style={s.imagePreview}>{imagePreview}</View>
        <OutlinedButton onPress={takeImageHandler} icon="camera">Take Image</OutlinedButton>
    </View>
}

export default ImagePicker;

const s = StyleSheet.create({
    text: {
        fontSize: 16,
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    image: {
        width: '100%',
        height: '100%',
    }
});