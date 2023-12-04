import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BreedList from './src/view/components/BreedList';
import BreedDetails from './src/view/components/BreedDetails';
import { View, Text, Image } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="BreedList"
      component={BreedList}
      options={{
        title: 'Breed List',
        headerTitleStyle: { color: 'white' },
        headerStyle: { backgroundColor: '#8c6239' },
      }}
    />
    <Stack.Screen
      name="BreedDetails"
      component={BreedDetails}
      options={{
        title: 'Breed Details',
        headerTitleStyle: { color: 'white' },
        headerStyle: { backgroundColor: '#8c6239' },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <Image
            source={require(`./assets/back.png`)}
            style={{
              width: 20,
              height: 20,
              tintColor: 'white',
              marginLeft: 20,
            }}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

const SettingsScreen = () => (
  <View>
    <Text></Text>
  </View>
);

const App = () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ headerShown: false, tabBarActiveTintColor: '#8c6239' }}
      />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default App;
