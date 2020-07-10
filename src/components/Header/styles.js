import {StyleSheet} from 'react-native';
import {cv, ch} from '../../helpers/responsive';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export default StyleSheet.create({
  container: {
    height: cv(44),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ch(8),
    marginTop: getStatusBarHeight(),
  },
  iconContainer: {
    width: ch(44),
    height: ch(44),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIccon: {
    width: ch(24),
    height: cv(24),
  },
  titleContainer: {
    position: 'absolute',
    alignSelf: 'center',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  title: {
    fontSize: ch(19),
    fontWeight: 'bold',
  },
});
