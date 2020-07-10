import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import styles from './styles';
import i18n from '../../translations';
import {Header, TextInput, BloodGroup, Button, Spinner} from '../../components';
import useFormInput from '../../helpers/useFormInput';
import * as AC from '../../actions';

import MALE from '../../assets/images/gray/male.png';
import MALE_ACTIVE from '../../assets/images/primary/male.png';
import FEMALE from '../../assets/images/gray/female.png';
import FEMALE_ACTIVE from '../../assets/images/primary/female.png';

const EditProfile = props => {
  const {user, error, authLoading} = useSelector(s => s.auth);

  const name = useFormInput(user.name);
  const phoneNumber = useFormInput(user.phone);
  const [gender, setGender] = useState(user.gender);
  const [group, setGroup] = useState(user.group);

  const dispatch = useDispatch();

  const onSave = () => {
    if (name.value === '' || phoneNumber.value === '') {
      dispatch(AC.setError('Please fill all fiekds'));
    } else {
      const data = {name: name.value, phone: phoneNumber.value, gender, group};

      dispatch(AC.updateProfile(data));
    }
  };

  if (authLoading) {
    return <Spinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onBack={() => props.navigation.pop()}
        title={i18n.t('EditProfile')}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TextInput
          style={styles.input}
          placeholder={i18n.t('Name')}
          {...name}
        />
        <TextInput
          style={styles.input}
          placeholder={user.email}
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder={i18n.t('PhoneNumber')}
          {...phoneNumber}
        />
        <Text style={styles.subTitle}>{i18n.t('Gender')}</Text>
        <View style={styles.genders}>
          <TouchableWithoutFeedback onPress={() => setGender('male')}>
            <View style={styles.gender}>
              <Image
                source={gender == 'male' ? MALE_ACTIVE : MALE}
                style={styles.genderIcon}
              />
              <Text
                style={[styles.genderName, gender == 'male' && styles.primary]}>
                {i18n.t('Male')}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.genderSeperator} />
          <TouchableWithoutFeedback onPress={() => setGender('female')}>
            <View style={styles.gender}>
              <Image
                source={gender == 'female' ? FEMALE_ACTIVE : FEMALE}
                style={styles.genderIcon}
              />
              <Text
                style={[
                  styles.genderName,
                  gender == 'female' && styles.primary,
                ]}>
                {i18n.t('Female')}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Text style={styles.subTitle}>{i18n.t('BloodGroup')}</Text>
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
            active={group == '0+'}
            onPress={() => setGroup('0+')}
          />
          <BloodGroup
            group={'0-'}
            active={group == '0-'}
            onPress={() => setGroup('0-')}
          />
          <BloodGroup
            group={'AB+'}
            active={group == 'ab+'}
            onPress={() => setGroup('ab+')}
          />
          <BloodGroup
            group={'AB-'}
            active={group == 'ab-'}
            onPress={() => setGroup('ab-')}
          />
        </View>
        {!!error && <Text style={styles.error}>{error}</Text>}
        <Button text={i18n.t('Save')} style={styles.btn} onPress={onSave} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
