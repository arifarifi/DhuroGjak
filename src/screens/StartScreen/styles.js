import {StyleSheet, Dimensions} from 'react-native';
import {cv, ch} from '../../helpers/responsive';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  gradient: {
    height: cv(300),
    width: '100%',
    alignItems: 'center',
    paddingBottom: cv(5),
  },
  image: {
    width: ch(292),
    height: ch(292),
  },
  roundedView: {
    position: 'absolute',
    width: width,
    height: width,
    transform: [{scaleX: 2}],
    borderRadius: width / 2,
    backgroundColor: 'white',
    top: cv(255),
  },
  btn: {
    marginTop: cv(80),
    marginBottom: cv(20),
  },
});
