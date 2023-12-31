import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export default StyleSheet.create({
    upper_container:{
        flexDirection:"row",
        justifyContent:"space-around",
        alignSelf:"center"
    },
    değer_isimleri_total_container:{
        margin:5,
        marginTop:10,
        
        
    },
    değerler_total:{
        
        marginLeft:20,
        marginRight:39,
        alignSelf:"center",
        marginTop:5,
        color:colors.lightgray
    },
    değerler_total_kalori:{
        
        fontWeight:"bold",
        marginLeft:20,
        marginRight:39,
        alignSelf:"center",
        marginTop:5,
        color:"white"
    }
})