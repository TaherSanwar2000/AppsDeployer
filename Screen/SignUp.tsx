import {
  View,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [pswrd, setPswrd] = useState('');
  const navigation = useNavigation();

  const CreateUser = () => {
    auth()
      .createUserWithEmailAndPassword(email, pswrd)
      .then(() => {
        ToastAndroid.show('User Created', ToastAndroid.BOTTOM);
        navigation.navigate('Home');
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          ToastAndroid.show('User already exist', ToastAndroid.BOTTOM);
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          ToastAndroid.show('Something went wrong', ToastAndroid.BOTTOM);
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
      }}>
      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100,
          }}>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: '#8b0000'}}>
            SignUp
          </Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Create an account
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.textBox}
          />
        </View>
        <View style={{marginTop: 20}}>
          <TextInput
            placeholder="Password"
            value={pswrd}
            onChangeText={text => setPswrd(text)}
            secureTextEntry={true}
            style={styles.textBox}
          />
        </View>
        <Pressable style={styles.SignUpButton} onPress={CreateUser}>
          <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>
            Sign Up
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 20}}>
          <Text style={{textAlign: 'center', color: '#8b0000'}}>
            Already have an account?
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
const styles = StyleSheet.create({
  textBox: {
    fontSize: 20,
    width: 280,
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 10,
    backgroundColor: '#FFFFFF',
  },
  SignUpButton: {
    width: 250,
    backgroundColor: '#8b0000',
    borderRadius: 10,
    marginTop: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
  },
});
