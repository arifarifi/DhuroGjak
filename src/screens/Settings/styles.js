import {StyleSheet} from 'react-native';
import {cv, ch} from '../../helpers/responsive';
import Colors from '../../constants/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    justifyContent: 'space-between',
    height: cv(44),
    marginVertical: cv(8),
    paddingHorizontal: ch(24),
  },
  icon: {
    width: ch(32),
    height: ch(32),
    marginRight: ch(8),
  },
  text: {
    fontSize: ch(15),
  },
  right: {
    width: ch(17),
    height: ch(17),
  },
  modalContainer: {
    paddingVertical: cv(32),
    backgroundColor: 'white',
    borderRadius: ch(8),
  },
  flag: {
    width: ch(44),
    height: ch(44),
    marginRight: ch(16),
  },
  modalTitle: {
    fontSize: ch(16),
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: cv(16),
  },
  buttons: {
    justifyContent: 'space-between',
  },
  yesBtn: {
    marginHorizontal: ch(24),
    flex: 1,
    height: cv(44),
    borderWidth: ch(1),
    borderColor: 'rgb(229,229,229)',
    borderRadius: ch(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  noBtn: {
    marginHorizontal: ch(24),
    flex: 1,
    height: cv(44),
    backgroundColor: Colors.primary,
    borderRadius: ch(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  white: {
    color: 'white',
  },
});
