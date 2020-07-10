import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';

import Auth from './auth';
import Main from './main';
import * as AC from '../actions';

const Stack = createStackNavigator();

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  const onAuthStateChanged = async data => {
    if (data) {
      await dispatch(AC.getUser());
      setUser(data);
    } else {
      setUser(data);
    }
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor="transparent" />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <>
            {/* <Stack.Screen name="Loading" component={Loading} /> */}
            <Stack.Screen name="Main" component={Main} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={Auth} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
