import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export function ch(size) {
  var ptg = (size / width) * 100;
  return wp(`${ptg}%`);
}

export function cv(size) {
  var ptg = (size / height) * 100;
  return hp(`${ptg}%`);
}
