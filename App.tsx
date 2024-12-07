import React from 'react';
import {View, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './Component/pages/Home';
import MainScreen from './Component/pages/Main';

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
        initialRouteName="Home" // Set the default tab to Home
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
            tabBarIcon: ({color}) => (
              <Image
              source={require('./assets/icon_book.png')}
              style={{tintColor: color}}
            />
            ),
          }}
        />
        <Tab.Screen
          name="PPOB"
          component={PPOBScreen}
          options={{
            tabBarLabel: 'PPOB',
            tabBarIcon: ({color}) => (
              <Image
                source={require('./assets/icon_transaction.png')}
                style={{tintColor: color}}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Home" // This is the name of the Home tab
          component={MainScreen} // HomeScreen should be here
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              <Image
                source={require('./assets/icon_home.png')}
                style={{tintColor: color}}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Market"
          component={MarketScreen}
          options={{
            tabBarLabel: 'Market',
            tabBarIcon: ({color}) => (
              <Image
                source={require('./assets/icon_cart.png')}
                style={{tintColor: color}}
              />
            ),
          }}
        />
        <Tab.Screen
          name="User"
          component={SettingsScreen}
          options={{
            tabBarLabel: 'User',
            tabBarIcon: ({color}) => (
              <Image
                source={require('./assets/icon_user.png')}
                style={{tintColor: color}}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
