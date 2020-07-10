import React from 'react';
import {Text, View, TouchableWithoutFeedback, Image} from 'react-native';
import styles from './styles';

import BACK from '../../assets/images/primary/left.png';

const Header = props => {
  return (
    <>
      <View style={styles.container}>
        {props.title && (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{props.title}</Text>
          </View>
        )}
        {props.onBack && (
          <TouchableWithoutFeedback onPress={props.onBack}>
            <View style={styles.iconContainer}>
              <Image source={BACK} style={styles.backIccon} />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </>
  );
};

export default Header;
