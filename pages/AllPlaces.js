import { useRoute } from "@react-navigation/native";
import PlacesList from "../components/Places/PlacesList";


function AllPlaces() {
    const route = useRoute();

    if (route.params) {
        console.log(route.params)
    }

    return <PlacesList />
}

export default AllPlaces;