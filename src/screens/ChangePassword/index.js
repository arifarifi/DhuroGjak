import React from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import styles from './styles';
import {Header, TextInput, Button, Spinner} from '../../components';
import i18n from '../../translations';
import useFormInput from '../../helpers/useFormInput';
import * as AC from '../../actions';

const ChangePassword = ({navigation}) => {
  const oldPassword = useFormInput('');
  const newPassword = useFormInput('');
  const confirmPassword = useFormInput('');

  const dispatch = useDispatch();

  const {authLoading, error} = useSelector(state => state.auth);

  const onSave = () => {
    if (oldPassword.value === '' || newPassword.value === '') {
      dispatch(AC.setError('Please fill all fields!'));
    } else if (newPassword.value !== confirmPassword.value) {
      dispatch(AC.setError("Passwords don't match"));
    } else {
      dispatch(AC.changePassword(oldPassword.value, newPassword.value));
      oldPassword.onChangeText('');
      newPassword.onChangeText('');
      confirmPassword.onChangeText('');
    }
  };

  if (authLoading) {
    return <Spinner />;
  }

  return (
    <SafeAreaView style={styles.conatiner}>
      <Header
        title={i18n.t('ChangePassword')}
        onBack={() => navigation.pop()}
      />
      <TextInput
        {...oldPassword}
        placeholder={i18n.t('OldPassword')}
        secureTextEntry
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        {...newPassword}
        placeholder={i18n.t('NewPassword')}
        secureTextEntry
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        {...confirmPassword}
        placeholder={i18n.t('ConfirmPassword')}
        secureTextEntry
        autoCapitalize="none"
        style={styles.input}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
      <Button text={i18n.t('Save')} onPress={onSave} style={styles.save} />
    </SafeAreaView>
  );
};

export default ChangePassword;
