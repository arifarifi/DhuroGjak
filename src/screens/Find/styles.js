import {StyleSheet} from 'react-native';
import {cv, ch} from '../../helpers/responsive';
import Colors from '../../constants/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  filterContainer: {
    position: 'absolute',
    top: cv(24),
    left: ch(24),
    right: ch(24),
    paddingHorizontal: cv(16),
    borderRadius: ch(25),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radiusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  radiusContent: {
    flex: 1,
    height: cv(44),
    borderRadius: ch(25),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: cv(16),
  },
  radiusNr: {
    fontSize: ch(16),
    color: Colors.primary,
    fontWeight: 'bold',
  },
  showAll: {
    marginLeft: ch(16),
    color: 'white',
    fontSize: ch(16),
  },
  incDecrContainer: {
    width: ch(44),
    height: ch(44),
    justifyContent: 'center',
    alignItems: 'center',
  },
  incDecr: {
    fontSize: ch(22),
    color: 'white',
    fontWeight: 'bold',
  },
  filter: {
    fontSize: ch(16),
    color: 'white',
  },
  tabsContainer: {
    marginTop: cv(16),
    flexDirection: 'row',
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    marginHorizontal: ch(16),
    paddingBottom: cv(5),
    borderBottomWidth: 1,
    borderColor: Colors.primary,
  },
  inactiveTabContainer: {
    borderBottomWidth: 0,
  },
  tab: {
    fontSize: ch(18),
  },
  activeTab: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  marker: {
    width: ch(64),
    height: ch(64),
    borderRadius: ch(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContent: {
    paddingVertical: cv(16),
  },
  listContainer: {
    backgroundColor: '#EFEFEF',
    flex: 1,
  },
  listItem: {
    padding: ch(20),
    backgroundColor: 'white',
    borderColor: 'rgb(192,192,192)',
    marginTop: cv(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  donatorName: {
    fontSize: ch(16),
    marginBottom: cv(5),
  },
  donatorNumber: {
    fontSize: ch(14),
    color: Colors.primary,
    marginBottom: cv(14),
  },
  itemBtn: {
    height: cv(44),
    width: ch(44),
    borderRadius: ch(22),
    borderWidth: ch(1),
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primary: {
    color: Colors.primary,
  },
  phone: {
    width: ch(32),
    height: ch(32),
  },
  filterIcon: {
    width: ch(32),
    height: ch(32),
    marginVertical: cv(8),
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
  modalTitle: {
    fontSize: ch(19),
    fontWeight: '500',
    alignSelf: 'center',
    marginBottom: cv(24),
  },
  modalText: {
    fontSize: ch(17),
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
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: ch(24),
    marginBottom: cv(15),
  },
  checkBox: {
    width: ch(24),
    height: ch(24),
    borderRadius: ch(5),
    borderColor: 'rgb(192,192,192)',
    borderWidth: ch(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tick: {
    width: ch(20),
    height: ch(20),
  },
});
