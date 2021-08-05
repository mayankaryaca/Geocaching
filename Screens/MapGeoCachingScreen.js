import React from "react"
import {View} from "react-native";
import { geostyles } from '../utilities/Styles'
import GeoCachingList from "./GeoCachingListComponent";

//define the exponent
function MapGeoCachingScreen(props) {
      return (
        <View style={geostyles.container}>
          <GeoCachingList />
       
        </View>
      );
    
}



//export the component
export default MapGeoCachingScreen;