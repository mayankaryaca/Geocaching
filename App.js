import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from "react-native";
import SignInScreen from './Screens/SignInScreen';
import SignUpScreen from './Screens/SignUpScreen';
import HomeTabContainer from './Screens/HomeTabContainer';
import MapComponent from './Screens/CachingLocationMapComponent';
import LogCacheScreen from './Screens/LogCacheScreen'
const Stack = createStackNavigator();

export default function App(props) {
  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName="SignIn">
       <Stack.Screen name="SignIn" component={SignInScreen}/>
       <Stack.Screen name="SignUp" component={SignUpScreen}/>
       <Stack.Screen name="Map" component={MapComponent} />
       <Stack.Screen name="GeoCaching" component={HomeTabContainer}
       options={ 
        ({navigation}) => ({ headerRight: () => (
          <Button title="SignOut" color="#000" onPress={() => navigation.replace('SignIn')}/>
        )})
        } />
       <Stack.Screen name="LogCache" component={LogCacheScreen}
       options={ 
       ({navigation}) => ({ headerRight: () => (
         <Button title="SignOut" color="#000" onPress={() => navigation.replace('SignIn')}/>
       )})
      }  />
     </Stack.Navigator>
   </NavigationContainer>
  );
}
