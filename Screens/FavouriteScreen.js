import React, { useState, useEffect } from "react"
import {View, Text, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity, Button} from "react-native";
import { geostyles } from '../utilities/Styles'
import { db } from '../utilities/FirebaseManager'
import AsyncStorage from '@react-native-async-storage/async-storage';
 
function FavouriteScreen({navigation,route}) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [msg,setMsg] = useState('')
    const [refresh,setRefresh] = useState(false);
    
    let caches = []

    const getAllFavorites = () => {
      AsyncStorage.getItem("email").then(
        (dataFromStorage) =>{
          return dataFromStorage
        }
      )

      .then(
        (userEmail) => {
          db.collection("favourites").get()
          .then((querySnapshot) => {
            //console.log("User ",userEmail)
            querySnapshot.forEach((documentFromFirestore) => {
            const fav = {
              cahcLocId:  documentFromFirestore.get("cahcLocId"),
              email: documentFromFirestore.data().userEmail,
              desc : documentFromFirestore.get("desc")
            }
            if (userEmail === fav.email) {
                // console.log(`Cach: ${fav.cahcLocId}, ${fav.email}`)
                caches.push(fav)
              }
            })
            if (caches.length === 0) {
              alert("No Caches found")
              navigation.replace("GeoCaching")
            }
            setData(caches)
            setIsLoading(false)
          })

        .catch((error) => {
            console.error("Error retrieve Caches: ", error)
            setMsg("Error while retrieve Fav Cach")
        })
        }
      )
    }
    useEffect( () => {getAllFavorites()}, [refresh])

    return (
        <View style={geostyles.container}>
          <View style={geostyles.refresh}>
           <Button title="Refresh Favorites" onPress={()=> { setRefresh(!refresh)}}></Button>      
          </View>

        <Text style={geostyles.title}>My Favorites</Text>
        { isLoading ? (<ActivityIndicator animating={true} size="large"/>) : (
            <FlatList
            data = {data}
            keyExtractor = { (item, index) => { return item.cahcLocId }} 
            renderItem = { ( {item} ) => (
            <TouchableOpacity  onPress={ () => { 
                console.log(` Selected: ${JSON.stringify(item)}`)
                navigation.navigate("LogCache", {cachSelected: item.cahcLocId})
                }}>
                <View style={geostyles.card_fav} key={item.cahcLocId}>
                  <Text style={geostyles.item_title} id={item.cahcLocId}  >{item.desc}</Text>
                </View>
                <View  style={geostyles.list_separator}/>
            </TouchableOpacity>)}
            />
        )} 
        </View>
    );
}

export default FavouriteScreen;