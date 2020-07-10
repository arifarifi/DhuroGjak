import React from 'react';
import {Text, View, SafeAreaView, TouchableWithoutFeedback} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import styles from './styles';
import i18n from '../../../translations';
import {Header, TextInput, Button, Spinner} from '../../../components';
import useFormInput from '../../../helpers/useFormInput';
import * as AC from '../../../actions';

const Login = props => {
  const email = useFormInput('');
  const password = useFormInput('');

  const {authLoading, error} = useSelector(s => s.auth);

  const dispatch = useDispatch();

  const onLogin = () => {
    dispatch(AC.login(email.value, password.value));
  };

  if (authLoading) {
    return <Spinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header onBack={() => props.navigation.pop()} />
      <View style={styles.content}>
        <Text style={styles.title}>{i18n.t('Login')}</Text>
        <TextInput
          {...email}
          placeholder={i18n.t('Email')}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          {...password}
          placeholder={i18n.t('Password')}
          style={styles.input}
          autoCapitalize="none"
          secureTextEntry
        />
        {!!error && <Text style={styles.error}>{error}</Text>}
        <Button text={i18n.t('Login')} style={styles.btn} onPress={onLogin} />
        <View style={styles.dontHaveAccount}>
          <Text style={styles.text}>{i18n.t('DontHaveAccount')}</Text>
          <TouchableWithoutFeedback
            onPress={() => props.navigation.navigate('Register')}>
            <View style={styles.register}>
              <Text style={[styles.text, styles.primary]}>
                {i18n.t('Register')}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
