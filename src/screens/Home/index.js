import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector, useDispatch} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';

import styles from './styles';
import i18n from '../../translations';
import * as AC from '../../actions';

import REQUEST from '../../assets/images/primary/request.png';
import VOLUNTEER from '../../assets/images/primary/volunteer.png';
import SETTINGS from '../../assets/images/white/settings.png';
import {Spinner} from '../../components';

const Home = props => {
  const {donators, donatorsLoading} = useSelector(s => s.donators);
  const {requests, requestsLoading} = useSelector(s => s.requests);
  const {location} = useSelector(s => s.location);
  const {user} = useSelector(s => s.auth);
  const [refreshed, setRefreshed] = useState(false);

  const dispatch = useDispatch();
  const watchId = useRef(null);

  React.useEffect(() => {
    dispatch(AC.getUser());
    dispatch(AC.getDonators());
    dispatch(AC.getRequests());
    dispatch(AC.getMyDonations());
    dispatch(AC.getMyRequests());

    return () => {
      Geolocation.clearWatch(watchId.current);
    };
  }, []);

  const goToFind = type => {
    if (location) {
      props.navigation.navigate('Find', {to: type});
    } else {
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
              callLocation(type);
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
    }
  };

  const callLocation = type => {
    Geolocation.getCurrentPosition(
      position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);

        const location = {
          longitude: currentLongitude,
          latitude: currentLatitude,
        };

        dispatch(AC.setLocation(location));
        props.navigation.navigate('Find', {to: type});
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
      props.navigation.navigate('Find', {to: type});
    });
  };

  return (
    <LinearGradient
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={['#FF217A', '#FF4D4D']}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableWithoutFeedback
            onPress={() =>
              props.navigation.navigate('Settings', {
                onGoBack: () => setRefreshed(!refreshed),
                onLogout: () => dispatch(AC.logout()),
              })
            }>
            <View style={styles.iconContainer}>
              <Image style={styles.icon} source={SETTINGS} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.content}>
          <TouchableWithoutFeedback
            onPress={() => (donatorsLoading ? null : goToFind('donors'))}>
            <View style={styles.section}>
              {donatorsLoading ? (
                <Spinner color="white" />
              ) : (
                <>
                  <View style={styles.details}>
                    <Text style={styles.number}>{donators.length}</Text>
                    <Text style={styles.name}>{i18n.t('Donors')}</Text>
                  </View>
                  <View style={styles.btn}>
                    <Text style={styles.btnText}>
                      {i18n.t('FindDonors').toUpperCase()}
                    </Text>
                  </View>
                </>
              )}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => (requestsLoading ? null : goToFind('requests'))}>
            <View style={styles.section}>
              {requestsLoading ? (
                <Spinner color="white" />
              ) : (
                <>
                  <View style={styles.details}>
                    <Text style={styles.number}>{requests.length}</Text>
                    <Text style={styles.name}>{i18n.t('Requests')}</Text>
                  </View>
                  <View style={styles.btn}>
                    <Text style={styles.btnText}>
                      {i18n.t('SeeRequests').toUpperCase()}
                    </Text>
                  </View>
                </>
              )}
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.roundBtnsContainer}>
            <TouchableWithoutFeedback
              onPress={() => props.navigation.navigate('OfferHelp')}>
              <View style={styles.roundBtn}>
                <Image source={VOLUNTEER} style={styles.icon} />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => props.navigation.navigate('AskForHelp')}>
              <View style={styles.roundBtn}>
                <Image source={REQUEST} style={styles.icon} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;
