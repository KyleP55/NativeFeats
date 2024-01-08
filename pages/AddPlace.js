import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

function AddPlace({ navigation }) {

    async function createPlaceHandler(data) {
        await insertPlace(data);

        navigation.navigate('AllPlaces');
    }

    return <PlaceForm onCreate={createPlaceHandler} />
}

export default AddPlace;