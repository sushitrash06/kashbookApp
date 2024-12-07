import React from 'react';
import {View, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './Component/pages/Home';

const PPOBScreen = () => (
  <View>
    <Text>PPOB Screen</Text>
  </View>
);

const MarketScreen = () => (
  <View>
    <Text>Market Screen</Text>
  </View>
);

const SettingsScreen = () => (
  <View>
    <Text>Settings Screen</Text>
  </View>
);

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="KasBook"
        screenOptions={{
          tabBarActiveTintColor: '#F86A6A',
          tabBarInactiveTintColor: '#aaa',
          tabBarStyle: {backgroundColor: '#fff'},
          headerShown: false,
        }}>
        <Tab.Screen
          name="KasBook"
          component={HomeScreen}
          options={{
            tabBarLabel: 'KasBook',
            tabBarIcon: ({color, size}) => (
              <Image
                source={require('./assets/icon_book.png')}
                style={{width: size, height: size, tintColor: color}}
              />
            ),
          }}
        />
        <Tab.Screen
          name="PPOB"
          component={PPOBScreen}
          options={{
            tabBarLabel: 'PPOB',
            tabBarIcon: ({color, size}) => (
              <Image
                source={require('./assets/icon_credit_card.png')}
                style={{width: size, height: size, tintColor: color}}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Market"
          component={MarketScreen}
          options={{
            tabBarLabel: 'Market',
            tabBarIcon: ({color, size}) => (
              <Image
                source={require('./assets/icon_cart.png')}
                style={{width: size, height: size, tintColor: color}}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({color, size}) => (
              <Image
                source={require('./assets/icon_cog.png')}
                style={{width: size, height: size, tintColor: color}}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
