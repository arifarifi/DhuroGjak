import React from 'react';
import {StatusBar, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';
import {Button} from '../../components';
import i18n from '../../translations';

import BACKGROUND from '../../assets/images/StartScreen/background.png';

const StartScreen = props => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        style={styles.gradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#FF217A', '#FF4D4D']}>
        <Image source={BACKGROUND} style={styles.image} />
      </LinearGradient>
      <View style={styles.roundedView} />
      <Button
        text={i18n.t('Login').toUpperCase()}
        style={styles.btn}
        onPress={() => props.navigation.navigate('Login')}
      />
      <Button
        text={i18n.t('Register').toUpperCase()}
        onPress={() => props.navigation.navigate('Register')}
      />
    </View>
  );
};

export default StartScreen;
