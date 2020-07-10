import {StyleSheet} from 'react-native';
import {cv, ch} from '../../helpers/responsive';
import Colors from '../../constants/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: ch(32),
    alignSelf: 'center',
    marginVertical: cv(24),
    fontWeight: 'bold',
  },
  input: {
    marginVertical: cv(10),
  },
  subTitle: {
    marginTop: cv(14),
    marginBottom: cv(24),
    fontSize: ch(16),
    fontWeight: 'bold',
    marginLeft: ch(24),
  },
  genders: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  genderIcon: {
    width: ch(48),
    height: ch(48),
    marginBottom: cv(10),
    marginHorizontal: ch(24),
  },
  genderSeperator: {
    width: ch(1),
    height: cv(40),
    marginTop: cv(10),
    backgroundColor: '#C9C9C9',
  },
  gender: {
    alignItems: 'center',
  },
  genderName: {
    color: '#A2A2A2',
    fontSize: ch(14),
  },
  primary: {
    color: Colors.primary,
  },
  groups: {
    marginHorizontal: ch(24),
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: cv(10),
  },
  haveAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: cv(10),
  },
  font16: {
    fontSize: ch(16),
  },
  login: {
    height: cv(44),
    justifyContent: 'center',
    paddingHorizontal: ch(8),
  },
  btn: {
    marginBottom: cv(32),
  },
  error: {
    textAlign: 'center',
    marginHorizontal: ch(24),
    color: 'red',
  },
});
