import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import PlacesList from "../components/Places/PlacesList";
import { fetchPlaces } from "../util/database";


function AllPlaces() {
    const [places, setPlaces] = useState([]);

    const isFocus = useIsFocused();

    useEffect(() => {
        async function loadPlaces() {
            const places = await fetchPlaces();
            setPlaces(places);
        }

        loadPlaces();
    }, [isFocus]);

    return <PlacesList places={places} />
}

export default AllPlaces;