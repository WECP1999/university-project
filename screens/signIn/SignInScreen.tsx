import { Button } from '@ui-kitten/components';
import Constants from 'expo-constants';
import { useContext } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { Alert, StyleSheet } from 'react-native';
import CustomInput from '../../components/customInput';
import { Text, View } from '../../components/Themed';
import UserContext from '../../context/provider/UserProvider';

export default function TabThree({ navigation }: any) {
  const methods = useForm();
  const { user, signIn, logIn }: any = useContext(UserContext);

  const HandleSignIn = async (formInputs: FieldValues) => {
    console.log('imprimiendo usuario desde signInScreen', user);
    if (
      !formInputs.email ||
      !formInputs.password ||
      !formInputs.repit_password
    ) {
      Alert.alert('Campos vacios', 'Llene todo los campos');
      return;
    }

    if (formInputs.password !== formInputs.repit_password) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    const error = await signIn(formInputs.email, formInputs.password);

    if (error) {
      if(error.code === 'auth/invalid-email'){
        Alert.alert(
          'Email incorrecto',
          'Ingrese un email válido'
        );
        return;
      }
      if (error.code === 'auth/weak-password') {
        Alert.alert(
          'Contraseña débil',
          'La contraseña debe ser mayor a 6 carácteres'
        );
        return;
      }
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Usuario/Contraseña no válidos');
        return;
      }
      Alert.alert(error.code,error.message)
      return
    }
    Alert.alert("Usuario creado","usuario creado correctamente");
    navigation.navigate('Home')
    // createUserWithEmailAndPassword(auth,data.email,data.password)
    // .then( (UserCredential) =>{
    //   console.info("cuenta creada");
    //   const user = UserCredential.user
    //   console.log(user);
    // })
    // .catch( error =>{
    //   if(error.code === "auth/weak-password"){
    //     Alert.alert("Contraseña débil","La contraseña debe ser mayor a 6 carácteres")
    //     return
    //   }
    //   Alert.alert("Error",error.code)
    // })
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.h1, styles.textCenter, styles.white]}>Sign Up!</Text>
      <View style={styles.no_bkg}>
        <FormProvider {...methods}>
          <CustomInput
            label="Email"
            name="email"
            style={styles.mb_10}
            keyboardType="email-address"
          />
          <CustomInput label="Username" name="username" style={styles.mb_10} />
          <CustomInput
            label="Password"
            name="password"
            secureTextEntry
            style={styles.mb_10}
          />
          <CustomInput
            label="Repit password"
            name="repit_password"
            secureTextEntry
            style={styles.mb_10}
          />
        </FormProvider>
        <Button
          onPress={methods.handleSubmit(HandleSignIn)}
          style={styles.mt_10}
        >
          Create Account
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'center',
    paddingHorizontal: '2.5%',
    backgroundColor: '#417BA4',
  },
  no_bkg: {
    backgroundColor: 'rgba(255,255,255,0)',
  },
  h1: {
    fontSize: 36,
  },
  textCenter: {
    textAlign: 'center',
  },
  mb_10: {
    marginBottom: 10,
  },
  mt_10: {
    marginTop: 10,
  },
  white: {
    color: '#fff',
  },
  black: {
    color: '#000',
  },
});
