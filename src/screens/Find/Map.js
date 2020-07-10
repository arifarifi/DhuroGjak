import React, {useRef, useEffect, useState} from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Text,
  Platform,
  Image,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps';
import {useSelector} from 'react-redux';
import {isPointWithinRadius} from 'geolib';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';

import mapStyle from '../../constants/map.json';
import Colors from '../../constants/Colors';
import styles from './styles';
import i18n from '../../translations';
import {Button} from '../../components';
import {filterWithRadius} from './helpers';

import FILTER from '../../assets/images/white/filter.png';
import CLOSE from '../../assets/images/primary/close.png';
import TICK from '../../assets/images/primary/tick.png';

const Map = ({
  radius,
  radiusFiltered,
  onlyForMe,
  showMine,
  onFilter,
  onIncrement,
  onDecrement,
  items,
  route,
}) => {
  const {location} = useSelector(s => s.location);

  const mapRef = useRef(null);
  const circleRef = useRef(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [filterRadius, setFilterRadius] = useState(radiusFiltered);
  const [filterOnlyForMe, setFilterOnlyForMe] = useState(onlyForMe);
  const [filterShowMine, setFilterShowMine] = useState(showMine);

  const setCircleProps = () => {
    if (Platform.OS === 'ios') {
      circleRef.current.setNativeProps({
        fillColor: 'rgba(255,33,93,0.2)',
        strokeWidth: 5,
        strokeColor: Colors.primary,
      });
    }
  };

  useEffect(() => {
    if (radiusFiltered) {
      setCircleProps();
    }
  }, [radiusFiltered]);

  const renderMarkers = () => {
    return items.map(item => {
      if (item) {
        return (
          <Marker
            key={item.id}
            coordinate={{
              longitude: parseFloat(item.location.longitude),
              latitude: parseFloat(item.location.latitude),
            }}
            onPress={() => {
              mapRef.current.animateToRegion({
                longitude: parseFloat(item.location.longitude),
                latitude: parseFloat(item.location.latitude),
                longitudeDelta: parseFloat(0.15),
                latitudeDelta: parseFloat(0.15),
              });
            }}>
            <LinearGradient
              style={styles.marker}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              colors={['#FF217A', '#FF4D4D']}>
              <Text style={styles.incDecr}>{item.group.toUpperCase()}</Text>
            </LinearGradient>
          </Marker>
        );
      }
    });
  };

  const onModalClose = () => {
    setModalVisible(false);
    setFilterRadius(radiusFiltered);
    setFilterOnlyForMe(onlyForMe);
    setFilterShowMine(showMine);
  };

  return (
    <>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          longitude: parseFloat(location.longitude),
          latitude: parseFloat(location.latitude),
          longitudeDelta: parseFloat(0.15),
          latitudeDelta: parseFloat(0.15),
        }}
        showsUserLocation
        customMapStyle={mapStyle}
        style={styles.container}>
        {renderMarkers()}
        {radiusFiltered && (
          <Circle
            key={(location.latitude + location.longitude).toString()}
            ref={circleRef}
            center={{
              latitude: parseFloat(location.latitude),
              longitude: parseFloat(location.longitude),
            }}
            strokeWidth={Platform.OS !== 'ios' ? 5 : null}
            strokeColor={Platform.OS !== 'ios' ? Colors.primary : null}
            fillColor={Platform.OS !== 'ios' ? 'rgba(255,33,93,0.2)' : null}
            radius={radius * 1000}
          />
        )}
      </MapView>
      <LinearGradient
        style={styles.filterContainer}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#FF217A', '#FF4D4D']}>
        {radiusFiltered ? (
          <>
            <View style={styles.radiusContainer}>
              <TouchableWithoutFeedback onPress={onDecrement}>
                <View style={styles.incDecrContainer}>
                  <Text style={styles.incDecr}>-</Text>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.radiusContent}>
                <Text style={styles.radiusNr}>{radius} km</Text>
              </View>
              <TouchableWithoutFeedback onPress={onIncrement}>
                <View style={styles.incDecrContainer}>
                  <Text style={styles.incDecr}>+</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
              <Image source={FILTER} style={styles.filterIcon} />
            </TouchableWithoutFeedback>
          </>
        ) : (
          <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
            <Image source={FILTER} style={styles.filterIcon} />
          </TouchableWithoutFeedback>
        )}
        <Modal
          isVisible={modalVisible}
          onBackdropPress={onModalClose}
          style={styles.modal}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{i18n.t('Filter')}</Text>
            <View style={styles.filterItem}>
              <Text style={styles.modalText}>{i18n.t('Radius')}</Text>
              <TouchableWithoutFeedback
                onPress={() => setFilterRadius(!filterRadius)}>
                <View style={styles.checkBox}>
                  {filterRadius && <Image source={TICK} style={styles.tick} />}
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.filterItem}>
              <Text style={styles.modalText}>
                {i18n.t('OnlySuitableForMe')}
              </Text>
              <TouchableWithoutFeedback
                onPress={() => setFilterOnlyForMe(!filterOnlyForMe)}>
                <View style={styles.checkBox}>
                  {filterOnlyForMe && (
                    <Image source={TICK} style={styles.tick} />
                  )}
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.filterItem}>
              <Text style={styles.modalText}>
                {i18n.t(
                  route === 'donors' ? 'ShowMyDonations' : 'ShowMyRequests',
                )}
              </Text>
              <TouchableWithoutFeedback
                onPress={() => setFilterShowMine(!filterShowMine)}>
                <View style={styles.checkBox}>
                  {filterShowMine && (
                    <Image source={TICK} style={styles.tick} />
                  )}
                </View>
              </TouchableWithoutFeedback>
            </View>
            <Button
              text={i18n.t('Submit')}
              style={styles.submit}
              onPress={() => {
                setModalVisible(false);
                onFilter(filterRadius, filterOnlyForMe, filterShowMine);
              }}
            />
            <TouchableWithoutFeedback onPress={onModalClose}>
              <View style={styles.closeContainer}>
                <Image source={CLOSE} style={styles.closeIcon} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Modal>
      </LinearGradient>
    </>
  );
};

export default Map;
