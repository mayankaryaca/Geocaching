import React, {useState, useEffect} from "react";
import { View, Dimensions} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from 'react-native-maps';



const MapComponent = (props) => {
  const [currRegion,setCurrentRegion] = useState({
        latitude: 43.6163539,
        longitude:  -79.3793008,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,   
      })

   

     useEffect(()=> { setCurrentRegion({latitude: Number(props.lat),
      longitude:  Number(props.lng),
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,  })},[props])

 
    return (
        <View>
          <MapView
           style={{width: Dimensions.get('window').width, height:300}}
           initialRegion={currRegion}
           showCurrentLocation='true'
           region={currRegion}
          >
           <Marker coordinate={{latitude: Number(props.lat), longitude: Number(props.lng)}} title={props.desc} onPress={()=> {console.log("Marker clicked")}}/>
           </MapView>
         
        </View>
    )
}

export default MapComponent;
