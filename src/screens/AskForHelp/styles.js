import {StyleSheet} from 'react-native';
import {ch, cv} from '../../helpers/responsive';
import Colors from '../../constants/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  noDonationsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  noRequestsIcon: {
    width: ch(120),
    height: ch(153),
    alignSelf: 'center',
  },
  noDonationsDescription: {
    fontSize: ch(14),
    opacity: 0.7,
    marginVertical: cv(24),
    marginHorizontal: ch(100),
    textAlign: 'center',
    alignSelf: 'center',
  },
  modal: {
    margin: 0,
  },
  modalContainer: {
    marginHorizontal: ch(24),
    borderRadius: ch(15),
    backgroundColor: 'white',
    paddingVertical: cv(32),
  },
  roundedBtn: {
    position: 'absolute',
    width: ch(64),
    height: ch(64),
    right: ch(24),
    bottom: ch(24),
  },
  gradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ch(32),
  },
  plus: {
    width: ch(32),
    height: ch(32),
  },
  modalTitle: {
    fontSize: ch(19),
    fontWeight: '500',
    alignSelf: 'center',
  },
  modalText: {
    fontSize: ch(17),
    margin: ch(24),
  },
  groups: {
    marginHorizontal: ch(24),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: cv(10),
  },
  submit: {
    marginTop: cv(14),
  },
  closeContainer: {
    position: 'absolute',
    alignSelf: 'center',
    borderWidth: ch(2),
    width: ch(44),
    height: ch(44),
    borderRadius: ch(22),
    borderColor: Colors.primary,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    top: cv(-22),
  },
  closeIcon: {
    width: ch(32),
    height: ch(32),
  },
  content: {
    backgroundColor: '#EFEFEF',
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    padding: ch(20),
    marginTop: cv(16),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: ch(15),
    marginRight: ch(16),
  },
  itemDate: {
    alignSelf: 'center',
    opacity: 0.5,
  },
  statusContainer: {
    marginTop: cv(24),
  },
  dropDownContainer: {
    width: ch(150),
    height: cv(36),
    paddingHorizontal: ch(8),
    borderRadius: ch(11),
    borderWidth: ch(1),
    borderColor: 'rgb(229,229,229)',
  },
  status: {
    fontSize: ch(15),
    opacity: 0.6,
  },
  donatedStatus: {
    fontSize: ch(15),
    color: Colors.primary,
  },
  downIcon: {
    width: ch(17),
    height: ch(17),
  },
  tick: {
    width: ch(28),
    height: ch(28),
  },
  pickerModal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  pickerContainer: {
    backgroundColor: 'white',
    paddingVertical: cv(32),
    paddingHorizontal: ch(24),
  },
  pickerTitle: {
    fontSize: ch(19),
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: cv(8),
  },
  pickerSubtitle: {
    fontSize: ch(16),
    alignSelf: 'center',
    marginBottom: cv(32),
  },
  pickerStatus: {
    fontSize: ch(15),
    marginBottom: cv(16),
    fontWeight: 'bold',
  },
  pickerItem: {
    paddingVertical: cv(16),
    borderBottomWidth: cv(1),
    borderColor: 'rgb(229,229,229)',
  },
  closeBtnContainer: {
    marginTop: cv(16),
    height: cv(44),
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: ch(15),
    fontWeight: 'bold',
  },
});
