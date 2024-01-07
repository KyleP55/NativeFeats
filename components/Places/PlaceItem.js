import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { Colors } from "../../const/colors";

function PlaceItem({ place, onSelect }) {
    return <Pressable style={({ pressed }) => [styles.container, pressed && styles.pressed]} onPress={onSelect.bind(this, place.id)}>
        <Image style={styles.image} source={{ uri: place.imageUri }} />
        <View style={styles.info}>
            <Text style={styles.title}>{place.title}</Text>
            <Text style={styles.text}>{place.location.address}</Text>
        </View>
    </Pressable>
}

export default PlaceItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 6,
        marginVertical: 12,
        backgroundColor: Colors.primary500,

        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: .15,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 2,
    },
    pressed: {
        opacity: 0.5
    },
    image: {
        flex: 1,
        borderBottomLeftRadius: 6,
        borderTopLeftRadius: 6,
        height: 100
    },
    info: {
        flex: 2,
        padding: 12,
        maxHeight: 100,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.gray700
    },
    text: {
        fontSize: 14,
        color: Colors.gray700
    },
});