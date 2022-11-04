import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import { Text, Input, CheckBox, Button, useTheme } from '@ui-kitten/components';
import Constants from 'expo-constants';
import Colors from '../../styles/theme.json';
import { FormProvider, useForm } from 'react-hook-form';
import CustomInput from '../../components/customInput';
import Icon from '../../components/icon';

const LogInScreen = () => {
  const methods = useForm();
  const [remember, setRemember] = useState(false);
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/login-image.png')}
        style={styles.image}
      />
      <Text category="h1">Welcome back</Text>
      <Text category="s1">Login to your account</Text>
      <ScrollView>
        <View style={styles.form}>
          <FormProvider {...methods}>
            <CustomInput
              style={styles.input}
              label=""
              name="username"
              placeholder="Username"
              accessoryLeft={() => {
                return <Icon size={24} name="user" color="#fff" />;
              }}/>
            <CustomInput
              label=""
              name="password"
              placeholder="Password"
              secureTextEntry
              accessoryLeft={() => {
                return <Icon size={24} name="lock" color="#fff" />;
              }}/>
          </FormProvider>
          <View style={styles.remember}>
            <CheckBox
              checked={remember}
              onChange={(toggle) => {
                setRemember(toggle);
              }}
            >
              remember me
            </CheckBox>
            <Pressable>
              <Text>Forgot password?</Text>
            </Pressable>
          </View>
          <Button style={styles.btnLogin}>login</Button>
          <View style={styles.singUp}>
            <Text>Don't have an account?</Text>
            <Pressable>
              <Text style={styles.singUpText}> Sing Up</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default LogInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: Colors['color-primary-300'],
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: 300,
  },
  scroll: {
    justifyContent: 'center',
  },
  form: {
    flex: 1,
    padding: 20,
    marginTop: 10,
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems: 'center',
  },
  input: {
    marginBottom:10
  },
  remember: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-evenly',
  },
  btnLogin: {
    marginTop: 30,
    width: '100%',
  },
  /**/
  singUp: {
    marginTop: 10,
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  singUpText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
