import {StyleSheet} from 'react-native';
import {ch, cv} from '../../helpers/responsive';

export default StyleSheet.create({
  container: {
    marginHorizontal: ch(24),
    height: cv(45),
    borderRadius: ch(25),
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ch(25),
  },
  text: {
    fontSize: ch(14),
    color: 'white',
  },
});
