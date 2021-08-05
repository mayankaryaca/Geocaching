import React,{useState} from "react";
import { Button, SafeAreaView,TextInput ,Text ,View} from "react-native";
import { geostyles } from '../utilities/Styles'
import { db } from "../utilities/FirebaseManager";
import * as Location from "expo-location";

const AddCachLoc = ({navigation,route}) => {
    const [locDesc, setLocDesc] = useState('')
    const [locHint,setLocHint] = useState('')
    const [locLat,setLocLat] = useState('')
    const [locLng,setLocLng] = useState('')
    const [msg,setMsg] = useState('')

   const saveCachLoc = ()  => {
       const cachLocation = {
           lat : locLat,
           lng : locLng,
           desc : locDesc,
           hint : locHint,
           date : new Date().toLocaleDateString(),
           isActive : true
       }

    db.collection("cachLocations").add(cachLocation)
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        setMsg(`Successfully added`)
        setLocDesc('')
    setLocHint('')
    setLocLat('')
    setLocLng('')
    setMsg('')
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        setMsg("Error while saving Cach Location!");
    });

    
   }   

   const fetchCurrentLocation = () => {
        Location.requestForegroundPermissionsAsync()
        .then(
          (result) => {
            if (result.status === "granted") {
              console.log("User gave us permission to access their location")
              return Location.getCurrentPositionAsync({})
            }
            else {
              console.log("User denied permission")
              throw new Error("User didn't grant the permission");
            }
          }
        )
        .then( (location) => {
          console.log(`lat ${location.coords.latitude} lng ${location.coords.longitude} `)
          setLocLat(location.coords.latitude)
          setLocLng(location.coords.longitude)

        })
        .catch((err)=>{
          console.log("Error when requesting permission")
          console.log(err)
          setMsg("Error give us permission")
          //update the UI to inform user of deny permission
        })

   }

    return (
      <SafeAreaView style={geostyles.container}>
        <Text style={geostyles.title}>Hide a Geocaching</Text>
        <View >

              <TextInput
                style={geostyles.input}
                onChangeText={(desc) =>
                    setLocDesc(desc)
                }
                placeholder="Enter description.."  
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                returnKeyType="next"
                value={locDesc}
            />    
              <TextInput
                style={geostyles.input}
                onChangeText={(hint) =>
                    setLocHint(hint)
                }
                value={locHint}
                placeholder="Enter hint"  
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                returnKeyType="next"
            />    

              <Button style={geostyles.button} title="Fetch Location" onPress={fetchCurrentLocation}/>
                
              <TextInput
                style={geostyles.input}
                onChangeText={(lat) =>
                  setLocLat(lat)
                }
                placeholder="Enter Latitude"  
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                returnKeyType="next"
                value={String(locLat)}

            />    
              <TextInput
                style={geostyles.input}
                onChangeText={(lng) =>
                  setLocLng(lng)
                }
                placeholder="Enter Longitude"  
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                returnKeyType="next"
                value={String(locLng)}
            />    
             <Button title="Save Geocache Item" onPress={saveCachLoc}/>

          </View>
        <Text>{msg}</Text>

        </SafeAreaView>
    );
}

export default AddCachLoc;