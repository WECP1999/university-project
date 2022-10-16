import { Text, View } from '../../components/Themed';
import { StyleSheet} from 'react-native'
import Constants from 'expo-constants';
import { FormProvider, useForm } from 'react-hook-form';
import Colors from '../../constants/Colors';
import CustomInput from '../../components/customInput';
import { Button } from '@ui-kitten/components';
export default function TabThree() {
  const methods = useForm();

  return (
    <View style={styles.container}>
      <Text style={[styles.h1,styles.textCenter,styles.white]}>Sign Up!</Text>
      <View style={styles.no_bkg}>
        <FormProvider {...methods}>
          <CustomInput
            label='Email'
            name='email'
            style={styles.mb_10}
          />
          <CustomInput
            label='Username'
            name='username'
            style={styles.mb_10}
          />
          <CustomInput
            label='Password'
            name='password'
            secureTextEntry
            style={styles.mb_10}
          />
          <CustomInput
            label='Repit password'
            name='repit_password'
            secureTextEntry
            style={styles.mb_10}
          />
        </FormProvider>
        <Button style={styles.mt_10}>Create Account</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop: Constants.statusBarHeight,
    justifyContent:'center',
    paddingHorizontal: '2.5%',
    backgroundColor:'#417BA4'
  },
  no_bkg:{
    backgroundColor:'rgba(255,255,255,0)'
  },
  h1:{
    fontSize:36,
  },
  textCenter:{
    textAlign:'center'
  },
  mb_10:{
    marginBottom:10
  },
  mt_10:{
    marginTop:10
  },
  white:{
    color:'#fff'
  },
  black:{
    color:'#000'
  }
})