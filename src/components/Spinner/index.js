import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const Spinner = props => {
  return (
    <View style={[styles.container, props.style]}>
      <ActivityIndicator size="large" color={props.color || Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Spinner;
