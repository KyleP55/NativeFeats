import { Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import { Colors } from "../../const/colors";

function OutlinedButton({ onPress, icon, children }) {
    return <Pressable onPress={onPress} style={({ pressed }) => [s.button, pressed && s.pressed]}>
        <Ionicons name={icon} size={18} color={Colors.primary500} style={s.icon} />
        <Text style={s.text}>{children}</Text>
    </Pressable>
}

export default OutlinedButton;

const s = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.primary500,
    },
    pressed: {
        opacity: 0.5,
    },
    icon: {
        marginRight: 6,

    },
    text: {
        color: Colors.primary500,
    }
});