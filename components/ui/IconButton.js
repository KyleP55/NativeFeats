import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconButton({ icon, size, onPress, color }) {
    return <Pressable onPress={onPress} style={({ pressed }) => [s.button, pressed && s.pressed]}>
        <Ionicons name={icon} size={size} color={color} />
    </Pressable>
}

export default IconButton;

const s = StyleSheet.create({
    button: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pressed: {
        opacity: 0.5,
    }
});