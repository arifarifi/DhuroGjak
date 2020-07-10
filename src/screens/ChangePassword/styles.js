import {StyleSheet} from 'react-native';
import {cv, ch} from '../../helpers/responsive';

export default StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    marginVertical: cv(12),
  },
  save: {
    marginTop: cv(24),
  },
  error: {
    textAlign: 'center',
    marginHorizontal: ch(24),
    color: 'red',
  },
});
