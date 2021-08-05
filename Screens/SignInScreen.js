import React, {useState} from "react"
import { Button, SafeAreaView, Text, View, TextInput} from "react-native"
import { geostyles } from '../utilities/Styles'
import { db } from '../utilities/FirebaseManager'
import AsyncStorage from '@react-native-async-storage/async-storage'

function SignInScreen({navigation,route}) {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const signInPressed = () => {
    let isValid = false
 
    if (!userEmail || !userPassword) {
      alert('Please enter a Email/Password')
      return;
    }  

    db.collection('users').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentFromFirestore) => {
          if (userEmail === documentFromFirestore.data().email &&
              userPassword === documentFromFirestore.data().password) {
                console.log(`Exists ${JSON.stringify(documentFromFirestore.data())}`)
                isValid = true
          }
        })
      })
      .then(() => {
        if (isValid) {
          saveEmail()
          navigation.replace('GeoCaching')
        } else {
          alert(`User does not exist - Go to Signup`)
          setUserEmail('')
          setUserPassword('')
        }
      })
      .catch((error) => {
         alert(`Error getting document ${error}`)
     })
    }
  
    const saveEmail = () => {
      AsyncStorage.setItem("email", userEmail)
        .then(
          () => {
            console.log(`SIGNIN: Save Email was successfully ${userEmail}`)
          }
        )
        .catch(
          (error) => {
            console.log(`Error save Email ${error}`)
          }
        )
    }

    const goToSignUp = () => {
      navigation.navigate("SignUp");
    } 
  
  return (
    <SafeAreaView style={geostyles.container}>
        <Text style={geostyles.title}>Welcome to Geocaching</Text>
        <View >
            <TextInput
                style={geostyles.input}
                placeholder=" Enter Email"  
                placeholderTextColor="#243b16"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onChangeText={(userEmail) =>
                  setUserEmail(userEmail)
                }
            />

            <TextInput
                style={geostyles.input}
                placeholder=" Enter Password "  
                placeholderTextColor="#243b16"
                blurOnSubmit={false}
                secureTextEntry={true}
                returnKeyType="next"
                onChangeText={(userPassword) =>
                  setUserPassword(userPassword)
                }
              />
            <Button title="SignIn" onPress={signInPressed}/>
            <Button title="Don't have account? SignUp" onPress={goToSignUp}/>
        </View>
    </SafeAreaView>
  )
}

export default SignInScreen;