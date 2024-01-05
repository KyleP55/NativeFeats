import { useEffect, useState } from "react";
import { useRoute, useIsFocused } from "@react-navigation/native";
import PlacesList from "../components/Places/PlacesList";


function AllPlaces() {
    const [places, setPlaces] = useState([]);

    const route = useRoute();
    const isFocus = useIsFocused();

    useEffect(() => {
        if (isFocus && route.params) {
            setPlaces(currentPlaces => [...currentPlaces, route.params.place]);
        }
    }, [isFocus, route]);

    return <PlacesList places={places} />
}

export default AllPlaces;