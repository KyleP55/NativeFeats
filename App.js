import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AllPlaces from './pages/AllPlaces';
import AddPlace from './pages/AddPlace';
import Map from './pages/Map.js';
import PlaceDetails from './pages/PlaceDetails.js';
import EditPlace from './pages/EditPlace.js';

import IconButton from './components/ui/IconButton';
import { Colors } from './const/colors.js';
import { useEffect, useState } from 'react';
import { initDb } from './util/database.js';
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);


  //Check for DB/Create DB
  useEffect(() => {
    async function init() {
      try {
        await initDb();
      } catch (err) {
        console.log(err);
        return;
      }
      setLoading(true);
    }

    init();
  }, []);

  // Loading Screen
  if (!loading) {
    return <AppLoading />
  }

  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 }
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Your Places',
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate('AddPlace')}
                />
              ),
            })}
          />

          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: 'Create New Place',
            }}
          />

          <Stack.Screen
            name="Map"
            component={Map}
          />

          <Stack.Screen
            name={"PlaceDetails"}
            component={PlaceDetails}
          />

          <Stack.Screen
            name={"EditPlace"}
            component={EditPlace}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

