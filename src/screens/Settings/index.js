import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import {useDispatch} from 'react-redux';

import {Header} from '../../components';
import styles from './styles';
import I18n from 'react-native-i18n';
import i18n, {switchLanguage} from '../../translations';
import * as AC from '../../actions';

import RIGHT from '../../assets/images/gray/right.png';
import EDIT from '../../assets/images/primary/editUser.png';
import GLOBE from '../../assets/images/primary/globe.png';
import LOGOUT from '../../assets/images/primary/logout.png';
import TICK from '../../assets/images/primary/tick.png';
import LOCK from '../../assets/images/primary/lock.png';
import AL from '../../assets/images/albanian.png';
import GB from '../../assets/images/gb.png';

const Settings = ({navigation, route}) => {
  const [languageVisible, setLanguageVisible] = useState(false);
  const [language, setLanguage] = useState(I18n.currentLocale());
  const [logoutVisible, setLogoutVisible] = useState(false);

  const dispatch = useDispatch();

  const onBack = () => {
    route.params?.onGoBack();
    navigation.pop();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header onBack={onBack} title={i18n.t('Settings')} />
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('EditProfile')}>
        <View style={[styles.row, styles.item]}>
          <View style={styles.row}>
            <Image source={EDIT} style={styles.icon} />
            <Text style={styles.text}>{i18n.t('EditProfile')}</Text>
          </View>
          <Image source={RIGHT} style={styles.right} />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('ChangePassword');
        }}>
        <View style={[styles.row, styles.item]}>
          <View style={styles.row}>
            <Image source={LOCK} style={styles.icon} />
            <Text style={styles.text}>{i18n.t('ChangePassword')}</Text>
          </View>
          <Image source={RIGHT} style={styles.right} />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setLanguageVisible(true)}>
        <View style={[styles.row, styles.item]}>
          <View style={styles.row}>
            <Image source={GLOBE} style={styles.icon} />
            <Text style={styles.text}>{i18n.t('ChangeLanguage')}</Text>
          </View>
          <Image source={RIGHT} style={styles.right} />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setLogoutVisible(true)}>
        <View style={[styles.row, styles.item]}>
          <View style={styles.row}>
            <Image source={LOGOUT} style={styles.icon} />
            <Text style={styles.text}>{i18n.t('Logout')}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Modal
        isVisible={languageVisible}
        onBackdropPress={() => setLanguageVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{i18n.t('ChangeLanguage')}</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              switchLanguage('sq');
              setLanguage('sq');
              setLanguageVisible(false);
            }}>
            <View style={[styles.row, styles.item]}>
              <View style={styles.row}>
                <Image source={AL} style={styles.flag} resizeMode="contain" />
                <Text style={styles.text}>{i18n.t('Albanian')}</Text>
              </View>
              {language === 'sq' && (
                <Image source={TICK} style={styles.right} />
              )}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              switchLanguage('en');
              setLanguage('en');
              setLanguageVisible(false);
            }}>
            <View style={[styles.row, styles.item]}>
              <View style={styles.row}>
                <Image source={GB} style={styles.flag} />
                <Text style={styles.text}>{i18n.t('English')}</Text>
              </View>
              {language === 'en' && (
                <Image source={TICK} style={styles.right} />
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
      <Modal
        isVisible={logoutVisible}
        onBackdropPress={() => setLogoutVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{i18n.t('Logout')}</Text>
          <View style={[styles.row, styles.buttons]}>
            <TouchableWithoutFeedback onPress={() => route.params?.onLogout()}>
              <View style={styles.yesBtn}>
                <Text>{i18n.t('Yes')}</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setLogoutVisible(false)}>
              <View style={styles.noBtn}>
                <Text style={styles.white}>{i18n.t('No')}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Settings;
