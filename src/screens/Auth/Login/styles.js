import {StyleSheet} from 'react-native';
import {cv, ch} from '../../../helpers/responsive';
import Colors from '../../../constants/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    marginTop: cv(40),
  },
  input: {
    marginVertical: cv(10),
  },
  btn: {
    marginTop: cv(14),
  },
  title: {
    fontSize: ch(32),
    alignSelf: 'center',
    marginBottom: cv(54),
    fontWeight: 'bold',
  },
  dontHaveAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: cv(64),
  },
  register: {
    height: cv(44),
    justifyContent: 'center',
    paddingHorizontal: ch(8),
  },
  text: {
    fontSize: ch(16),
  },
  primary: {
    color: Colors.primary,
  },
  error: {
    marginHorizontal: ch(24),
    textAlign: 'center',
    color: 'red',
  },
});
