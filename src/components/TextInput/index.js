import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {cv, ch} from '../../helpers/responsive';

const Input = props => {
  return (
    <TextInput
      {...props}
      style={[styles.container, props.style]}
      placeholderTextColor={'#A2A2A2'}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: ch(24),
    height: cv(44),
    borderRadius: ch(25),
    backgroundColor: '#EFEFEF',
    fontSize: ch(15),
    paddingHorizontal: ch(12),
  },
});

export default Input;
