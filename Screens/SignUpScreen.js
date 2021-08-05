import React,{useState} from "react";
import { Button, View, SafeAreaView,TextInput ,Text } from "react-native";
import { geostyles } from '../utilities/Styles'
import { db } from "../utilities/FirebaseManager"


function SignUpScreen({navigation,route}) {
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userPhone, setUserPhone] = useState('')
    const [userName, setUserName] = useState('')
    const [result, setResult] = useState('');

    const addUserToFirebase = (user) => {
        db.collection("users").add(user)
          .then((docRef) => {
              console.log("Document written with ID: ", docRef.id);
              setResult(`Successfully added to Users!`)
              navigation.navigate("SignIn");

          })
          .catch((error) => {
              console.error("Error adding document: ", error);
              setResult("Error while adding to Users!");
          });

    }
    const goToSignUp = () => {
        if (!userEmail || !userPassword) {
            alert('Please enter a Email/Password')
            return;
        }  
        const User = {
            email : userEmail,
            password : userPassword,
            phone : userPhone,
            name : userName
        }
        addUserToFirebase(User);
    }
    return (
        <SafeAreaView style={geostyles.container}>
        <Text style={geostyles.title}>Welcome to Geocaching</Text>
        <View >
             <TextInput
                style={geostyles.input}
                onChangeText={(userEmail) =>
                  setUserEmail(userEmail)
                }
                placeholder="Enter Email"  
                placeholderTextColor="#243b16"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
            />

            <TextInput
                style={geostyles.input}
                onChangeText={(userPassword) =>
                  setUserPassword(userPassword)
                }
                placeholder="Enter Password"  
                placeholderTextColor="#243b16"
                blurOnSubmit={false}
                secureTextEntry={true}
                returnKeyType="next"
              />      

            <TextInput
                style={geostyles.input}
                onChangeText={(phone) =>
                    setUserPhone(phone)
                }
                placeholder="Enter phone"  
                placeholderTextColor="#243b16"
                autoCapitalize="none"
                returnKeyType="next"
            />  
            <TextInput
                style={geostyles.input}
                onChangeText={(userName) =>
                  setUserName(userName)
                }
                placeholder="Enter name"  
                placeholderTextColor="#243b16"
                autoCapitalize="none"
                returnKeyType="next"
            />    
            <Button title="SignUp" onPress={goToSignUp}/>
            <Text>{result}</Text>
          </View>
        </SafeAreaView>
    );
}

export default SignUpScreen;