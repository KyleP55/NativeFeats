import { Pressable, Text, StyleSheet } from "react-native";
import { Colors } from "../../const/colors";

function Button({ onPress, children }) {
    return <Pressable onPress={onPress} style={({ pressed }) => [s.button, pressed && s.pressed]}>
        <Text style={s.text}>{children}</Text>
    </Pressable>
}

export default Button;

const s = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        margin: 4,
        backgroundColor: Colors.primary800,

        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: .15,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 2,
    },
    pressed: {
        opacity: 0.5,
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        color: Colors.primary50,
    }
});