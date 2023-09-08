import React, { useState } from 'react';
import { View,Alert, Text, Platform, TextInput,Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Import an icon from the Expo vector icons library
import Swal from 'sweetalert2';
import { Button } from 'react-native-web';



function LoginScreen({ navigation }) {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Send a POST request to your Node.js API to authenticate the user
    try {
      const response = await fetch('http://192.168.1.7:4000/adminLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(response.status);

      if(response.status == 429){
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
      
      }else{
        console.log(Platform.OS);
        const data = await response.json();
        console.log(data);
        console.log('status',data.status);
        if (data.token) {
          console.log("inside nav");
          
          // Authentication successful, navigate to another screen
          
           if(Platform.OS == 'web'){
            Swal.fire({
              title: `Logged in Sucessfully!`,
              icon: 'success',
              showCloseButton: true
              });
           }else{
            Alert.alert(
              'Success',
              'Logged in Successfully.',
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
          
         

        
          navigation.navigate('Dashboard');
        }else  {
          // Display an error message
          Alert.alert(
            'Error',
            `Invalid Username or Password`,
            [
              {
                text: 'OK',
                onPress: () => console.log('OK Pressed'),
              },
              // You can add more buttons here
            ],
            { cancelable: false } // Prevents the user from dismissing the alert by tapping outside
          );
            navigation.navigate('Login');
        }
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleRegister = () => {
    // Implement the logout logic here, e.g., clearing user authentication.
    // You can use AsyncStorage or a state management solution to manage user authentication state.

    // For simplicity, we'll navigate back to the login screen.
    navigation.navigate('Signup');
  };
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
        placeholder="Username"
        onChangeText={text => setEmail(text)}
      />
    </View>
    <View style={styles.inputContainer}>
      <AntDesign name="lock" size={24} color="gray" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={text => setPassword(text)}
      />
    </View>
    <TouchableOpacity style={styles.button} onPress={handleLogin}>
      <Text style={styles.buttonText}>Login</Text>
      
    </TouchableOpacity>
    <Button style={styles.buttonText} onPress={handleRegister} title="Register" />
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

export default LoginScreen;

// import React, { useState } from 'react';
// import { View, Text, TextInput,Image, TouchableOpacity, StyleSheet } from 'react-native';
// import { AntDesign } from '@expo/vector-icons'; // Import an icon from the Expo vector icons library

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     // Implement your login logic here.
//     // If login is successful, navigate to the dashboard screen.
    
//     // For simplicity, we'll navigate to the dashboard screen without authentication.
//     navigation.navigate('Dashboard');
//   };

//   return (
    
   
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   image: {
//     width: 200, // Adjust the width and height as needed
//     height: 200,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderColor: 'gray',
//     marginVertical: 10,
//   },
//   icon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     fontSize: 18,
//   },
//   button: {
//     backgroundColor: '#007AFF',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 8,
//     marginTop: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default LoginScreen;
