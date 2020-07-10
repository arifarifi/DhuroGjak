import React, {useRef, useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {useSelector} from 'react-redux';

import styles from './styles';
import {Header} from '../../components';
import i18n from '../../translations';
import Map from './Map';
import List from './List';
import {isWithinRadius, isMineItem, isSuitableForMe} from './helpers';
import {setMyDonations} from '../../actions/donators';

const Find = props => {
  const [radius, setRadius] = useState(5);
  const [radiusFiltered, setRadiusFiltered] = useState(true);
  const [onlyForMe, setOnlyForMe] = useState(true);
  const [showMine, setShowMine] = useState(false);
  const [tab, setTab] = useState(0);
  const [mapVisible, setMapVisible] = useState(false);

  const {donators} = useSelector(s => s.donators);
  const {requests} = useSelector(s => s.requests);
  const {location} = useSelector(s => s.location);
  const {user} = useSelector(s => s.auth);

  const swiperRef = useRef(null);

  const route = props.route.params?.to;

  const onFilter = (filterRadius, filterOnlyForMe, filterShowMine) => {
    setRadiusFiltered(filterRadius);
    setOnlyForMe(filterOnlyForMe);
    setShowMine(filterShowMine);
  };

  const itemsType = route === 'donors' ? donators : requests;

  const theItems = itemsType.map(item => {
    if (item.active) {
      if (!radiusFiltered && !onlyForMe && !showMine) {
        if (!isMineItem(item, user)) {
          return item;
        }
      }
      if (radiusFiltered && isWithinRadius(radius, location, item.location)) {
        if (!showMine) {
          if (!isMineItem(item, user)) {
            if (onlyForMe) {
              if (isSuitableForMe(route, user, item.group)) {
                return item;
              }
            } else {
              return item;
            }
          }
        } else {
          if (onlyForMe) {
            if (isSuitableForMe(route, user, item.group)) {
              return item;
            }
          } else {
            return item;
          }
        }
      } else if (!radiusFiltered && onlyForMe) {
        if (isSuitableForMe(route, user, item.group)) {
          if (!showMine) {
            if (!isMineItem(item, user)) {
              return item;
            }
          } else {
            return item;
          }
        }
      } else if (!radiusFiltered && !onlyForMe && showMine) {
        return item;
      }
    }
  });

  const showMap = () => {
    setTimeout(() => {
      setMapVisible(true);
    }, 500);
  };

  useEffect(() => {
    showMap();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header
        onBack={() => props.navigation.pop()}
        title={route === 'donors' ? i18n.t('Donors') : i18n.t('Requests')}
      />
      <View style={styles.container}>
        <View style={styles.tabsContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              setTab(0);
              swiperRef.current.scrollTo(0);
            }}>
            <View style={styles.tabContent}>
              <View
                style={[
                  styles.tabContainer,
                  tab == 1 && styles.inactiveTabContainer,
                ]}>
                <Text style={[styles.tab, tab == 0 && styles.activeTab]}>
                  {i18n.t('Map')}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              setTab(1);
              swiperRef.current.scrollTo(1);
            }}>
            <View style={styles.tabContent}>
              <View
                style={[
                  styles.tabContainer,
                  tab == 0 && styles.inactiveTabContainer,
                ]}>
                <Text style={[styles.tab, tab == 1 && styles.activeTab]}>
                  {i18n.t('List')}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {mapVisible && (
          <Swiper
            ref={swiperRef}
            loop={false}
            showsPagination={false}
            onIndexChanged={index => setTab(index)}>
            <Map
              radius={radius}
              type={route}
              radiusFiltered={radiusFiltered}
              onlyForMe={onlyForMe}
              showMine={showMine}
              showAll={() => setRadiusFiltered(false)}
              onFilter={onFilter}
              onIncrement={() => setRadius(radius + 1)}
              onDecrement={() => {
                if (radius !== 1) {
                  setRadius(radius - 1);
                }
              }}
              items={theItems}
              route={route}
            />
            <List
              type={route}
              radius={radius}
              items={theItems}
              filtered={radiusFiltered}
            />
          </Swiper>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Find;
