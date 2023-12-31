import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export default StyleSheet.create({
    container:{
        flex:5,
        backgroundColor:"black",
    },
    text:{
        fontSize:20,
        fontStyle:"italic",
        color:"black",
        marginTop:10,
        marginLeft:10,
        padding:2,
        fontWeight:500,

    },
    inner_container:{
        flex:1,
        margin:30,
        backgroundColor:colors.slategray,
        borderRadius:20

    },
    button_container:{
        marginBottom:90,
    }
})