import React, {useState, useEffect} from "react"
import { Button, SafeAreaView, Text, View, TextInput, Switch, FlatList} from "react-native"
import { geostyles } from '../utilities/Styles'
import { db } from '../utilities/FirebaseManager'
 
function LogCacheScreen({navigation,route}) {
    const [userComments, setUserComments] = useState('')
    const [description, setDescription] = useState('')
    const [hint, setHint] = useState('')
    const [dtCreated, setDtCreated] = useState('')
    const [isSwitchOn, setIsSwitchOn] = useState(false)
    const [msg,setMsg] = useState('')
    const [refresh,setRefresh] = useState(false);
    let history = [];

    const [historyData, setHistoryData] = useState([]);

  
    const {cachSelected} = route.params

    const getGeocache  = () => {
        console.log("cachSelected:", cachSelected);
        db.collection('cachLocations').doc(String(cachSelected)).get()
        .then((querySnapshot) => {
            console.log(querySnapshot.data())
            const cache = querySnapshot.data()
            setDescription(cache.desc)
            setHint(cache.hint)
            setDtCreated(cache.date)
        })
        .catch((error) => {
             console.log("Error getting document:", error);
        });
    }

    const saveGeoCache = () => {
      setRefresh(!refresh);
        console.log("Comments ", userComments)
        db.collection("logCache").add({
                cahcLocId : cachSelected,
                comments : userComments,
                updated :  new Date().toLocaleDateString(),
                status: isSwitchOn
            })
            .then((docRef) => {
                console.log(`Document written with ID: ${docRef.id}`);
                setMsg(`Successfully added to logCache`)
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                setMsg("Error while saving logCache!");
            })  

           
    }

    const getHistoryFromFirebase = () => {
      db.collection("logCache").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentFromFirestore) => {
        const item = {
          cahcLocId :  documentFromFirestore.get("cahcLocId"),
          comments : documentFromFirestore.get('comments'),
          key : documentFromFirestore.id
        }
        if (cachSelected === item.cahcLocId) {
            console.log(`Cach: ${item.cahcLocId}, ${item.comments}`)
            history.push(item)
            setHistoryData(history);
          }
        })
  
      })
    .catch((error) => {
        console.error("Error retrieve Caches: ", error)
        setMsg("Error while retrieve Fav Cach")
    })
    
  
    
  }

    const switchChanged = (dataFromSwitch) => {
        console.log(dataFromSwitch)
        setIsSwitchOn(dataFromSwitch)
    }

    useEffect( () => {getGeocache()
      getHistoryFromFirebase()}, [refresh])

    return (
      <SafeAreaView style={geostyles.container}>
          <Text style={geostyles.title}>Log Geocach</Text>
          <Text style={geostyles.log_geocache}>{description}</Text>
          <Text style={geostyles.log_geocache}>{hint}</Text>
          <Text style={geostyles.log_geocache}>{dtCreated}</Text>
          <Text style={geostyles.log_geocache}>Tasked Completed ? 
            <Switch
                onValueChange={switchChanged}
                value={isSwitchOn}              
            />
        </Text>
                
          <View style={geostyles.text_box} > 
                <TextInput
                  style={geostyles.text_geocache}
                  placeholder="Write Your Comment"  
                  placeholderTextColor="#243b16"
                  autoCapitalize="none"
                  returnKeyType="next"
                  multiline={true}
                  numberOfLines={5}
                  onChangeText={(userComments) =>
                    setUserComments(userComments)
                  }
                />    
          </View>
          <Button title="Save" onPress={saveGeoCache}/>
          <Text style={geostyles.title}>History</Text>
          <FlatList
                data = {historyData}
                keyExtractor = { (item, index) => {return item["created_time"];}}
                renderItem = { ({item}) => (      
                     <View key={item.key} style={geostyles.item_history}>
                        <Text style={[geostyles.item_title, geostyles.item_history]}> {item.comments} </Text>
                    </View>
                )}
                /> 
      </SafeAreaView>
    )
  }
  
  export default LogCacheScreen;
