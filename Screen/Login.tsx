import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pswrd, setPswrd] = useState('');
  const navigation = useNavigation();

  const UserLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, pswrd)
      .then(() => {
        navigation.navigate('Home');
        ToastAndroid.show('User LogIn', ToastAndroid.BOTTOM);
      })
      .catch(error => {
        console.log(error);
        // ToastAndroid.show(error, ToastAndroid.BOTTOM);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100,
          }}>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: '#8b0000'}}>
            LogIn
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
        <View>
          <TouchableOpacity style={styles.loginButton} onPress={UserLogin}>
            <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>
              LogIn
            </Text>
          </TouchableOpacity>
        </View>

        <Pressable
          onPress={() => navigation.navigate('SignUp')}
          style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 10}}>
          <Text style={{textAlign: 'center', color: '#8b0000'}}>
            Don't have an account? SignUp
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  textBox: {
    fontSize: 20,
    width: 280,
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 10,
    backgroundColor: '#FFFFFF',
  },
  loginButton: {
    backgroundColor: '#8b0000',
    borderRadius: 10,
    marginTop: 40,
    padding: 10,
  },
});
