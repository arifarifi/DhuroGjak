import {StyleSheet} from 'react-native';
import {ch, cv} from '../../helpers/responsive';
import Colors from '../../constants/Colors';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  section: {
    marginHorizontal: ch(24),
    padding: cv(24),
    borderRadius: ch(8),
    marginVertical: cv(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  number: {
    fontSize: ch(22),
    color: 'white',
  },
  name: {
    fontSize: ch(16),
    color: 'white',
  },
  details: {
    alignItems: 'center',
  },
  btn: {
    height: cv(44),
    width: ch(170),
    borderRadius: ch(25),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  btnText: {
    fontSize: ch(15),
    fontWeight: 'bold',
    color: Colors.primary,
  },
  header: {
    marginTop: getStatusBarHeight(),
    height: cv(64),
    marginRight: ch(7),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconContainer: {
    width: ch(44),
    height: ch(44),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: ch(5),
  },
  icon: {
    width: ch(32),
    height: ch(32),
  },
  roundBtnsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: cv(32),
  },
  roundBtn: {
    width: ch(64),
    height: ch(64),
    borderRadius: ch(32),
    marginHorizontal: ch(16),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
