import {StyleSheet} from 'react-native';
import {ch} from '../../helpers/responsive';

export default StyleSheet.create({
  container: {
    width: ch(44),
    height: ch(44),
    borderRadius: ch(22),
    borderWidth: ch(1),
    borderColor: '#C9C9C9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#C9C9C9',
    fontSize: ch(16),
  },
  activeText: {
    color: 'white',
  },
  active: {
    borderWidth: 0,
  },
  gradient: {
    width: ch(44),
    height: ch(44),
    borderRadius: ch(22),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
