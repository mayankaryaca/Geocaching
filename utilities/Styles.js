import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";

const geostyles = StyleSheet.create({
    container: { 
        backgroundColor: '#bdd3de',
        alignItems: 'center',
        height: 750,
    },
    prompt: {
        fontSize: 25,
        color : '#3371FF',
        backgroundColor : 'white',
        textAlign : 'center'
    },
    title: {
        fontSize: 25,
        color: "#0691d6",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 30,
        marginTop: 20
    },
    input: {
        fontSize: 25,
        width: "auto",
        height: 40,
        borderColor: "#1e380d",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 30
    },
    item_title: {
        fontSize: 20,
        margin: 5,
    },
    item_hint: {
        fontSize: 15,
        margin: 5,
    },
    separator:{
        padding : 10 
    },
    list_separator:{
        height: 3,
        marginBottom: 10,
        backgroundColor: "gray"
    },
    log_geocache: {
        color: "#0691d6",
        fontSize: 25,
        borderColor: "#1e380d",
        margin: 5,
    },
    text_box: {
        borderWidth: 1,
        padding: 5,
        borderRadius: 10,
    },
    text_geocache: {
        fontSize: 20,
        height: 150,
        width: 300,
        textAlignVertical: 'top'
    },
    card : {
        backgroundColor : 'white',
    },
    item_history : {
        width : '100%',
    },
    card_fav : {
        backgroundColor : 'white',
        width : 360,
        height: 60,
    },
    task: {
        marginTop: 18,
        fontSize: 25,
        color: "black",
    },

})
export {geostyles}