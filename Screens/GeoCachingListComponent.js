import React, {useState} from "react";
import { View, Text, StyleSheet, Button, FlatList,ActivityIndicator, Pressable } from "react-native";
import { db } from "../utilities/FirebaseManager";
import { useEffect } from "react";
import MapComponent from "./CachingLocationMapComponent"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { geostyles } from '../utilities/Styles'
import * as Location from "expo-location";


const GeoCachingList = ({navigation,route}) => {
    const [locPinData,setLocPinData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [mapLng,setMapLng] = useState('');
    const [mapLat,setMapLat] = useState('');
    const [mapDesc,setMapDesc] = useState('');
    const [msg,setMsg] = useState('')
    const [email,setEmail] = useState('')
    const [refresh,setRefresh] = useState(false);

    let tempLocArray = [];
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
        setMapLat(location.coords.latitude)
        setMapLng(location.coords.longitude)
      })
      .catch((err)=>{
        console.log("Error when requesting permission")
        console.log(err)
        //update the UI to inform user of deny permission
      })

 }
    const getGeoCachingLocationFromFirebase = () => {
        db.collection("cachLocations").get().then((querySnapshot) => {
            querySnapshot.forEach((documentFromFirestore) => {
            // tempArray.push({title : documentFromFirestore.get("title"), id : documentFromFirestore.id});
            // setListData(tempArrray);
            tempLocArray.push({
                lat : documentFromFirestore.get("lat"),
                lng : documentFromFirestore.get("lng"), 
                desc : documentFromFirestore.get("desc"), 
                hint : documentFromFirestore.get("hint"), 
                key : documentFromFirestore.id })

            setLocPinData(tempLocArray);
            });
          });
          getEmail()
          setLoading(false)
    }

    useEffect(()=>{getGeoCachingLocationFromFirebase()},[refresh]);
    useEffect(()=>{fetchCurrentLocation()}, []);


    const addCachingLocToFav = (id,desc) => {    
        db.collection("favourites").add({
            cahcLocId : id,
            userEmail : email,
            desc : desc
        })
        .then((docRef) => {
            console.log(`Document written with ID: ${docRef.id}`);
            setMsg(`Successfully added to favourites`)
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            setMsg("Error while saving Cach Location to fav!");
        })  
        setMsg('')
    }

    const getEmail = () => {
        AsyncStorage.getItem("email")
          .then( 
            (dataFromStorage) => {
              if (dataFromStorage === null) {
                console.log(`Could not found`)
              } else {
                console.log(`Successful get Email ${dataFromStorage}`)
                setEmail(dataFromStorage)
              }
            }
          )
          .catch(
            (error) => {
              console.log(`Error get Primitive item ${error}`)
            }
          )
      }

      useEffect(() => {
        const interval = setInterval(() => {
          setMsg('')
        }, 5000);
        return () => clearInterval(interval);
      }, []);

    return (
    <View>
      <View style={geostyles.refresh} >
      <Button title="Refresh data" onPress={()=> { setRefresh(!refresh)}}></Button>
      </View>
    {isLoading ? (<ActivityIndicator animating={true} size="large"/>) : (
       <FlatList
                data = {locPinData}
                keyExtractor = { (item, index) => {return item.key;}}
                renderItem = { ({item}) => (<Pressable onPress={ () => { setMapLat(item.lat); setMapLng(item.lng); setMapDesc(item.desc)}}>
                    <View style={geostyles.card}>
                        <Text style={geostyles.item_title} id={item.key} > {item.desc} </Text>
                        <Text style={geostyles.item_hint}> {item.hint}</Text>
                        <Button title="Add To Fav" onPress={()=>{addCachingLocToFav(item.key,item.desc)}}></Button>
                    </View>
                    <View  style={geostyles.list_separator}/>
                </Pressable>)}
                /> 
    )}
    <Text style={geostyles.prompt}>{msg}</Text>
    <MapComponent lat={mapLat} lng={mapLng} desc={mapDesc}/>

    </View>)
}

export default GeoCachingList