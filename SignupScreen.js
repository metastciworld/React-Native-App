import React, { useState } from 'react';
// import { View, Text, TextInput, Image, Alert,TouchableOpacity,AntDesign, Button, StyleSheet, Platform } from 'react-native';
import { View,Alert, Text, Platform, TextInput,Image,Button, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Import an icon from the Expo vector icons library
import Swal from 'sweetalert2';
// import * as firebase from 'firebase';

const SignupScreen = () => {
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');

  const sendOTP = async () => {
    const response = await fetch('http://192.168.1.3:4000/generateOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({contact }),
      });
      console.log(response.status);

  }


const verifyOTP = async() => {
    const response = await fetch('http://192.168.1.3:4000/verifyOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({contact }),
      });
      console.log(response.status);
      console.log(typeof(response.status));

      if(response.status == 429){
        if(Platform.OS == 'web'){
            Swal.fire({
              title: `Reached Max Reties, Tryafter 30 min`,
              icon: 'error',
              showCloseButton: true
              });
           }else{
            console.log(`code 429`);
            Alert.alert(
              'Error',
              'Reached Max Reties, Tryafter 30 min',
              [
                {
                  text: 'OK',
                  onPress: () => console.log('OK Pressed'),
                },
                // You can add more buttons here
              ],
              { cancelable: false } // Prevents the user from dismissing the alert by tapping outside
            );
           }
      }
      if(response.status == 200){
        if(Platform.OS == 'web'){
            Swal.fire({
              title: `OTP Verified SuccessFuly!`,
              icon: 'success',
              showCloseButton: true
              });
           }else{
            Alert.alert(
              'Success',
              'OTP Verified SuccessFuly!',
              [
                {
                  text: 'OK',
                  onPress: () => console.log('OK Pressed'),
                },
                // You can add more buttons here
              ],
              { cancelable: false } // Prevents the user from dismissing the alert by tapping outside
            );
      }
    }else if(response.status == 498){
        if(Platform.OS == 'web'){
            Swal.fire({
              title: `OTP Has Expired`,
              icon: 'error',
              showCloseButton: true
              });
           }else{
            Alert.alert(
              'Error',
              'OTP Has Expired',
              [
                {
                  text: 'OK',
                  onPress: () => console.log('OK Pressed'),
                },
                // You can add more buttons here
              ],
              { cancelable: false } // Prevents the user from dismissing the alert by tapping outside
            );
      }
    }
}

  return (

    <View style={styles.container}>
    <Image
      source={{ uri: 'https://img.freepik.com/free-vector/sign-page-abstract-concept-illustration-enter-application-mobile-screen-user-login-form-website-page-interface-ui-new-profile-registration-email-account_335657-936.jpg?w=2000' }}
      style={styles.image}
    />
    {/* <Text style={styles.title}>Login and Start</Text> */}
    <View style={styles.inputContainer}>
      <AntDesign name="user" size={24} color="gray" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Enter MObile"
        onChangeText={text => setContact(text)}
      />
    </View>
    <Button style={styles.buttonText} onPress={sendOTP} title="Send OTP" />
    <View style={styles.inputContainer}>
      <AntDesign name="lock" size={24} color="gray" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        
        onChangeText={text => setOtp(text)}
      />
    </View>
    {/* <TouchableOpacity style={styles.button} onPress={sendOTP}>
      <Text style={styles.buttonText}>Signup</Text>
      
    </TouchableOpacity> */}
    <Button style={styles.buttonText} onPress={verifyOTP} title="Verify OTP" />
  </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 240, // Adjust the width and height as needed
    height: 240,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});



    // <View style={styles.container}>
       
    //     <Image
    //   source={{ uri: 'https://cdni.iconscout.com/illustration/free/thumb/free-sign-up-form-4575543-3798675.png' }}
    //   style={styles.image}
    // />
        
     
      {/* <View style={styles.inputContainer}>
      <Text>Enter your mobile number:</Text>
        <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            onChangeText={(text) => setContact(text)}
            keyboardType="numeric"
        />
      </View> */}
      {/* <TouchableOpacity style={styles.button} onPress={handleLogin}>
      <Text style={styles.buttonText}>Login</Text>
      
    </TouchableOpacity> */}
      {/* <Button title="Send OTP" onPress={sendOTP} />
      
       <View style={styles.inputContainer}>
       <Text>Enter the OTP sent to your mobile:</Text>
       <TextInput
        style={styles.input}
        placeholder="OTP"
        onChangeText={(text) => setOtp(text)}
        keyboardType="numeric"
      />
       </View> 
      <Button title="Verify OTP" onPress={verifyOTP} />
    </View> */}
       
  
export default SignupScreen;
