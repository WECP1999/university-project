import { Button, CheckBox, Text, useTheme } from '@ui-kitten/components';
import Constants from 'expo-constants';
import { useContext, useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { Alert, Image, Pressable, ScrollView, StyleSheet } from 'react-native';
import CustomInput from '../../components/customInput';
import Icon from '../../components/icon';
import { View } from '../../components/Themed';
import UserContext from '../../context/provider/UserProvider';
import Colors from '../../styles/theme.json';


const LogInScreen = ({ navigation }: any) => {
  const methods = useForm();
  const [remember, setRemember] = useState(false);
  const theme = useTheme();
  const { user, signIn, logIn, persistentUser, checkPersistentUser}: any = useContext(UserContext);

  const handleLogIn = async (formInputs: FieldValues) => {
    console.log(user);

    if (!formInputs.email || !formInputs.password) {
      Alert.alert('Campos vacios', 'Llene todo los campos');
      return;
    }

    const error = await logIn(formInputs.email, formInputs.password);

    if (error) {
      if(error.code === 'auth/invalid-email'){
        Alert.alert(
          'Email incorrecto',
          'Ingrese un email válido'
        );
        return;
      }
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Usuario/Contraseña no válidos');
        return;
      }
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found'){
        Alert.alert("Usuario/Contraseña no válido","corrija los campos")
        return
      }
      Alert.alert(error.code,error.message)
      return
    }
    // Save the user on the device (Persistence)
    if(remember){
      console.log("entro :D en remember")
      await persistentUser(user);
      console.log("from LogInScreen:","usuario guardado localmente")
    }
    navigation.navigate('Home')
  };

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
              name="email"
              keyboardType='email-address'
              placeholder="email"
              accessoryLeft={() => {
                return <Icon size={24} name="user" color="#fff" />;
              }}
            />
            <CustomInput
              style={styles.input2}
              label=""
              name="password"
              placeholder="Password"
              secureTextEntry
              accessoryLeft={() => {
                return <Icon size={24} name="lock" color="#fff" />;
              }}
            />
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
          <Button onPress={methods.handleSubmit(handleLogIn)} style={styles.btnLogin}>LOGIN</Button>
          <View style={styles.singUp}>
            <Text>Don't have an account?</Text>
            <Pressable
              onPress={() =>
                navigation.navigate('Accesses', { screen: 'Signin' })
              }
            >
              <Text style={styles.singUpText}>Sing Up</Text>
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
    marginBottom: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#fff',
    borderStyle: 'solid',
  },
  input2: {
    borderLeftWidth: 1,
    borderLeftColor: '#fff',
    borderStyle: 'solid',
  },
  remember: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'row',
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
