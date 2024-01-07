import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import PlacesList from "../components/Places/PlacesList";
import { fetchPlaces } from "../util/database";


function AllPlaces({ navigation }) {
    const [places, setPlaces] = useState([]);

    const isFocus = useIsFocused();

    // Fetch places from DB
    useEffect(() => {
        async function loadPlaces() {
            const places = await fetchPlaces();
            setPlaces(places);
        }

        loadPlaces();
    }, [isFocus]);

    // pick place
    function onSelectHandler(id) {
        navigation.navigate("PlaceDetails", { id: id });
    }

    return <PlacesList places={places} onSelect={onSelectHandler} />
}

export default AllPlaces;