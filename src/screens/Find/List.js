import React from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Linking,
  Image,
} from 'react-native';
import {orderByDistance} from 'geolib';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import i18n from '../../translations';
import styles from './styles';
import PHONE from '../../assets/images/primary/phone.png';

const List = ({items, radius, filtered}) => {
  const {location} = useSelector(s => s.location);

  const renderItems = () => {
    return items.map(item => {
      const makeCall = () => {
        // let phoneNumber = '';
        // if (Platform.OS === 'android') {
        const phoneNumber = `tel:${item.user.phone}`;
        // } else {
        //   phoneNumber = `telprompt:${12345678}`;
        // }

        Linking.openURL(phoneNumber);
      };
      if (item) {
        return (
          <View style={styles.listItem} key={item.id}>
            <View>
              <Text style={styles.donatorName}>{item.user.name}</Text>
              <Text style={styles.donatorNumber}>{item.user.phone}</Text>
              <TouchableWithoutFeedback onPress={makeCall}>
                <View style={styles.itemBtn}>
                  <Image source={PHONE} style={styles.phone} />
                </View>
              </TouchableWithoutFeedback>
            </View>
            <LinearGradient
              style={styles.marker}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              colors={['#FF217A', '#FF4D4D']}>
              <Text style={styles.incDecr}>{item.group.toUpperCase()}</Text>
            </LinearGradient>
          </View>
        );
      }
    });
  };

  return <View style={styles.listContainer}>{renderItems()}</View>;
};

export default List;
