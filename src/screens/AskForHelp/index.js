import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';

import {Header, Button, Spinner, BloodGroup} from '../../components';
import i18n from '../../translations';
import styles from './styles';
import * as AC from '../../actions';

import NO_REQUESTS from '../../assets/images/askForBlood.png';
import PLUS from '../../assets/images/white/plus.png';
import CLOSE from '../../assets/images/primary/close.png';
import ROUNDED_TICK from '../../assets/images/primary/roundedTick.png';
import TICK from '../../assets/images/primary/tick.png';
import DOWN from '../../assets/images/gray/down.png';

const OfferHelp = props => {
  const {user} = useSelector(s => s.auth);
  const {myRequests, requestsLoading} = useSelector(s => s.requests);
  const {location} = useSelector(s => s.location);

  const [modalVisible, setModalVisible] = useState(false);
  const [group, setGroup] = useState(user.group);
  const [selectedItem, setSelectedItem] = useState(null);
  const [pickerVisible, setPickerVisible] = useState(false);

  const dispatch = useDispatch();

  const neededLocation = {
    latitude: location.latitude,
    longitude: location.longitude,
  };

  useEffect(() => {
    dispatch(AC.getMyRequests());
  }, []);

  const request = () => {
    setModalVisible(false);
    dispatch(AC.request(user, neededLocation, group));
    dispatch(AC.getUser());
  };

  const renderMyRequests = () => {
    return myRequests
      .slice(0)
      .reverse()
      .map(item => {
        return (
          <View style={styles.item} key={item.id}>
            <View style={[styles.row, styles.spaceBetween]}>
              <View style={styles.row}>
                <Text style={styles.itemText}>{i18n.t('YouRequested')}:</Text>
                <BloodGroup group={item.group.toUpperCase()} active />
              </View>
              <View>
                <Text style={styles.itemDate}>
                  {item.active ? i18n.t('PublishedAt') : i18n.t('WasHelpedAt')}:
                </Text>
                <Text style={styles.itemDate}>
                  {item.active ? item.created_at : item.updated_at}
                </Text>
              </View>
            </View>
            <View style={styles.statusContainer}>
              <View style={styles.row}>
                <Text style={styles.itemText}>{i18n.t('Status')}:</Text>
                <TouchableWithoutFeedback
                  onPress={() => {
                    if (item.active) {
                      setSelectedItem(item);
                      setPickerVisible(true);
                    }
                  }}>
                  <View
                    style={[
                      styles.dropDownContainer,
                      styles.row,
                      styles.spaceBetween,
                    ]}>
                    <Text
                      style={
                        item.active ? styles.status : styles.donatedStatus
                      }>
                      {i18n.t(item.active ? 'Pending' : 'Helped')}
                    </Text>
                    {item.active ? (
                      <Image source={DOWN} style={styles.downIcon} />
                    ) : (
                      <Image source={ROUNDED_TICK} style={styles.tick} />
                    )}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        );
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header
        onBack={() => props.navigation.pop()}
        title={i18n.t('YourRequests')}
      />
      {requestsLoading ? (
        <Spinner />
      ) : !user.requests ? (
        <View style={styles.noDonationsContainer}>
          <Image
            source={NO_REQUESTS}
            style={styles.noRequestsIcon}
            resizeMode="contain"
          />
          <Text style={styles.noDonationsDescription}>
            {i18n.t('YouMadeNoRequests')}
          </Text>
          <Button
            text={i18n.t('AskForHelp')}
            onPress={() => setModalVisible(true)}
          />
        </View>
      ) : (
        <View style={styles.content}>
          {renderMyRequests()}
          <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
            <View style={styles.roundedBtn}>
              <LinearGradient
                style={styles.gradient}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                colors={['#FF217A', '#FF4D4D']}>
                <Image source={PLUS} style={styles.plus} />
              </LinearGradient>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{i18n.t('AskForHelp')}</Text>
          <Text style={styles.modalText}>{i18n.t('BloodGroup')}</Text>
          <View style={styles.groups}>
            <BloodGroup
              group={'A+'}
              active={group == 'a+'}
              onPress={() => setGroup('a+')}
            />
            <BloodGroup
              group={'A-'}
              active={group == 'a-'}
              onPress={() => setGroup('a-')}
            />
            <BloodGroup
              group={'B+'}
              active={group == 'b+'}
              onPress={() => setGroup('b+')}
            />
            <BloodGroup
              group={'B-'}
              active={group == 'b-'}
              onPress={() => setGroup('b-')}
            />
          </View>
          <View style={styles.groups}>
            <BloodGroup
              group={'0+'}
              active={group === '0+'}
              onPress={() => setGroup('0+')}
            />
            <BloodGroup
              group={'0-'}
              active={group === '0-'}
              onPress={() => setGroup('0-')}
            />
            <BloodGroup
              group={'AB+'}
              active={group === 'ab+'}
              onPress={() => setGroup('ab+')}
            />
            <BloodGroup
              group={'AB-'}
              active={group === 'ab-'}
              onPress={() => setGroup('ab-')}
            />
          </View>
          <Button
            text={i18n.t('Submit')}
            onPress={request}
            style={styles.submit}
          />
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.closeContainer}>
              <Image source={CLOSE} style={styles.closeIcon} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
      <Modal
        isVisible={pickerVisible}
        onBackdropPress={() => setPickerVisible(false)}
        style={styles.pickerModal}>
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerTitle}>{i18n.t('Warning')}</Text>
          <Text style={styles.pickerSubtitle}>
            {i18n.t('YouCantMakeChanges')}
          </Text>
          <Text style={styles.pickerStatus}>{i18n.t('Status')}:</Text>
          <TouchableWithoutFeedback onPress={() => setPickerVisible(false)}>
            <View style={[styles.row, styles.spaceBetween, styles.pickerItem]}>
              <Text>{i18n.t('Pending')}</Text>
              <Image source={TICK} style={styles.downIcon} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              dispatch(AC.updateRequests(selectedItem.id));
              setPickerVisible(false);
            }}>
            <View style={styles.pickerItem}>
              <Text>{i18n.t('Helped')}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              dispatch(AC.removeRequests(selectedItem.id));
              setPickerVisible(false);
            }}>
            <View style={styles.pickerItem}>
              <Text>{i18n.t('CancelRequest')}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setPickerVisible(false)}>
            <View style={styles.closeBtnContainer}>
              <Text style={styles.closeText}>{i18n.t('Close')}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default OfferHelp;
