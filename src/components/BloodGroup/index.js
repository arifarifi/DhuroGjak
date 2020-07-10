import React from 'react';
import {Text, View, TouchableWithoutFeedback} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

const BloodGroup = props => {
  const {active, group, onPress} = props;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, active && styles.active, props.style]}>
        {props.active && (
          <LinearGradient
            style={styles.gradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#FF217A', '#FF4D4D']}>
            <Text style={[styles.text, styles.activeText]}>{group}</Text>
          </LinearGradient>
        )}
        {!active && <Text style={styles.text}>{group}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BloodGroup;
