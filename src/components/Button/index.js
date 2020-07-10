import React from 'react';
import {Text, View, TouchableWithoutFeedback} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

const Button = props => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={[styles.container, props.style]}>
        <LinearGradient
          style={styles.gradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#FF217A', '#FF4D4D']}>
          <Text style={styles.text}>{props.text}</Text>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Button;
