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
import i18n from '../../../translations';
import {
  Header,
  TextInput,
  BloodGroup,
  Button,
  Spinner,
} from '../../../components';
import useFormInput from '../../../helpers/useFormInput';
import * as AC from '../../../actions';

import MALE from '../../../assets/images/gray/male.png';
import MALE_ACTIVE from '../../../assets/images/primary/male.png';
import FEMALE from '../../../assets/images/gray/female.png';
import FEMALE_ACTIVE from '../../../assets/images/primary/female.png';

const Register = props => {
  const name = useFormInput('');
  const email = useFormInput('');
  const confirmPassword = useFormInput('');
  const password = useFormInput('');
  const phoneNumber = useFormInput('');
  const [gender, setGender] = useState('male');
  const [group, setGroup] = useState('a+');

  const dispatch = useDispatch();

  const {error, authLoading} = useSelector(state => state.auth);

  const onRegister = () => {
    if (
      name.value === '' ||
      email.value === '' ||
      password.value === '' ||
      phoneNumber.value === ''
    ) {
      dispatch(AC.setError('Please fill all fields'));
    } else if (password.value !== confirmPassword.value) {
      dispatch(AC.setError("Passwords don't match"));
    } else {
      dispatch(
        AC.register(
          name.value,
          email.value,
          phoneNumber.value,
          gender,
          group,
          password.value,
        ),
      );
    }
  };

  if (authLoading) {
    return <Spinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header onBack={() => props.navigation.pop()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{i18n.t('Register')}</Text>
        <TextInput
          style={styles.input}
          placeholder={i18n.t('Name')}
          {...name}
        />
        <TextInput
          style={styles.input}
          placeholder={i18n.t('Email')}
          {...email}
          keyboardType="email-address"
          autoCapitalize="none"
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
        <TextInput
          style={styles.input}
          placeholder={i18n.t('Password')}
          {...password}
          autoCapitalize="none"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder={i18n.t('ConfirmPassword')}
          {...confirmPassword}
          autoCapitalize="none"
          secureTextEntry
        />
        {!!error && <Text style={styles.error}>{error}</Text>}
        <View style={styles.haveAccount}>
          <Text style={styles.font16}>{i18n.t('AlreadyHaveAccount')}</Text>
          <TouchableWithoutFeedback
            onPress={() => props.navigation.navigate('Login')}>
            <View style={styles.login}>
              <Text style={[styles.font16, styles.primary]}>
                {i18n.t('Login')}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Button
          text={i18n.t('Register')}
          style={styles.btn}
          onPress={onRegister}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
