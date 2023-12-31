import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export default StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"space-between",
        backgroundColor:"black"
    },
    header:{
        color:colors.green,
        fontSize:60,
        fontWeight:"bold",
        marginLeft:87

    },
    inner_container:{
        marginBottom:100,
        
    },
    logo:{
        height: Dimensions.get('window').height / 3.5,
        width: Dimensions.get('window').width,
        resizeMode:'contain',
        tintColor:colors.green,
        marginTop:30
        
    },
    logo_container:{
        flex:1,
    }
})