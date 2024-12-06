import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Component/pages/Home';
import MarketScreen from './Component/pages/Market';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'HOME KASBOOK APP' }} // Ubah judul header
        />
        <Stack.Screen 
          name="Details" 
          component={MarketScreen} 
          options={{ title: 'MARKET' }} // Ubah judul header
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
