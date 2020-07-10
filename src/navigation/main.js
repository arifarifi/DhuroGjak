import React, {useEffect, useRef, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch} from 'react-redux';

import * as AC from '../actions';
import Home from '../screens/Home';
import Find from '../screens/Find';
import OfferHelp from '../screens/OfferHelp';
import AskForHelp from '../screens/AskForHelp';
import Settings from '../screens/Settings';
import EditProfile from '../screens/EditProfile';
import ChangePassword from '../screens/ChangePassword';
import {Spinner} from '../components';

const Stack = createStackNavigator();

export default () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const watchId = useRef(null);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      callLocation();
    } else {
      async function requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            callLocation();
            setLoading(false);
          } else {
            requestLocationPermission();
          }
        } catch (err) {
          // alert('err', err);
          console.warn(err);
          requestLocationPermission();
        }
      }
      requestLocationPermission();
    }

    return () => {
      Geolocation.clearWatch(watchId.current);
    };
  }, []);

  const callLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);

        const location = {
          longitude: currentLongitude,
          latitude: currentLatitude,
        };

        dispatch(AC.setLocation(location));
      },
      error => console.log(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    watchId.current = Geolocation.watchPosition(position => {
      const currentLongitude = JSON.stringify(position.coords.longitude);
      const currentLatitude = JSON.stringify(position.coords.latitude);

      const location = {
        longitude: currentLongitude,
        latitude: currentLatitude,
      };

      dispatch(AC.setLocation(location));
    });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Find"
        component={Find}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen name="OfferHelp" component={OfferHelp} />
      <Stack.Screen name="AskForHelp" component={AskForHelp} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
};
