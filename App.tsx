import React from 'react';
import { View, Text, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './Component/pages/Home';
import MainScreen from './Component/pages/Main';
import MarketScreen from './Component/pages/Market';
import TransactionScreen from './Component/pages/Transaksi';

const PPOBScreen = () => (
  <View>
    <Text>PPOB Screen</Text>
  </View>
);

const SettingsScreen = () => (
  <View>
    <Text>Settings Screen</Text>
  </View>
);

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarActiveTintColor: '#F86A6A',
      tabBarInactiveTintColor: '#aaa',
      tabBarStyle: { backgroundColor: '#fff' },
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="KasBook"
      component={HomeScreen}
      options={{
        tabBarLabel: 'KasBook',
        tabBarIcon: ({ color }) => (
          <Image
            source={require('./assets/icon_book.png')}
            style={{ tintColor: color }}
          />
        ),
      }}
    />
    <Tab.Screen
      name="PPOB"
      component={PPOBScreen}
      options={{
        tabBarLabel: 'PPOB',
        tabBarIcon: ({ color }) => (
          <Image
            source={require('./assets/icon_transaction.png')}
            style={{ tintColor: color }}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Home"
      component={MainScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <Image
            source={require('./assets/icon_home.png')}
            style={{ tintColor: color }}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Market"
      component={MarketScreen}
      options={{
        tabBarLabel: 'Market',
        tabBarIcon: ({ color }) => (
          <Image
            source={require('./assets/icon_cart.png')}
            style={{ tintColor: color }}
          />
        ),
      }}
    />
    <Tab.Screen
      name="User"
      component={SettingsScreen}
      options={{
        tabBarLabel: 'User',
        tabBarIcon: ({ color }) => (
          <Image
            source={require('./assets/icon_user.png')}
            style={{ tintColor: color }}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Transaction"
          component={TransactionScreen}
          options={{ headerTitle: 'Transaction' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
