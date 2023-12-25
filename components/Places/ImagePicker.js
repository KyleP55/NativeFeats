import { Alert, Button, View } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';

function ImagePicker() {
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

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

    // Open camera
    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) return;

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });
        console.log(image);
    }

    return <View>
        <View></View>
        <Button title="Take Image" onPress={takeImageHandler} />
    </View>
}

export default ImagePicker;